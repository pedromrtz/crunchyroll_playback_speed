/**
 * VIDEO SPEED CONTROLLER
 * 
 * Features:
 * - Spacebar: Tap to play/pause, hold to fast-forward (2x speed)
 * - Shift + Up/Down Arrow: Adjust playback speed
 * - Shift + R: Reset playback speed to 1.0
 * - Persists playback speed between page loads
 * - Visual feedback when changing speed
 */

/**
 * GLOBAL VARIABLES
 * space_down_time: Timestamp when spacebar was pressed
 * space_held_timeout: Timeout reference for hold detection
 * was_playing: Stores playback state before hold action
 * speed_indicator: Reference to the active speed display element
 */
let space_down_time = null;
let space_held_timeout = null;
let was_playing = false;
let speed_indicator = null;

/**
 * Ensures playback rate stays within reasonable bounds
 * @param {number} playback_rate - Desired playback rate
 * @returns {number} Clamped playback rate between 0.0 and 2.0
 */
const check_limit = (playback_rate) => Math.min(Math.max(playback_rate, 0.0), 2.0);

/**
 * Manages localStorage persistence of playback speed
 * @param {HTMLVideoElement} video_player - The video element
 * @param {number|string} playback_value - Value to store, or empty string to retrieve
 */
const get_or_update_playback_value = (video_player, playback_value) => {
    if (playback_value !== '') {
        // Store new value
        localStorage.setItem('cr_playback_speed', playback_value);
    } else {
        // Retrieve stored value or use default
        const stored = localStorage.getItem('cr_playback_speed');
        video_player.playbackRate = stored ? check_limit(parseFloat(stored)) : 1.0;
    }
};

/**
 * Safely removes speed indicator if it exists
 */
const remove_speed_indicator = () => {
    if (speed_indicator && speed_indicator.parentNode) {
        speed_indicator.remove();
    }
    speed_indicator = null;
};

/**
 * Displays playback speed indicator with animation
 * @param {HTMLVideoElement} video_player - The video element
 * @param {number} playback_rate - Current playback rate to display
 * @param {boolean} [persistent=false] - Whether indicator should stay visible
 */
const show_playback_rate_value = (video_player, playback_rate, persistent = false) => {
    // Safely remove existing indicator if present
    remove_speed_indicator();

    // Create new indicator element
    speed_indicator = document.createElement('div');
    speed_indicator.id = 'cr-playback-speed';
    speed_indicator.textContent = `${playback_rate}x playback speed`;
    
    // Apply initial styles (hidden state for fade-in)
    Object.assign(speed_indicator.style, {
        fontSize: '14px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontWeight: '500',
        color: '#ffffff',
        position: 'fixed',
        zIndex: '9999',
        top: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(4px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        padding: '8px 12px',
        minWidth: '120px',
        textAlign: 'center',
        transition: 'all 0.2s ease-out',
        opacity: '0',
        transform: 'translateY(10px)'
    });

    // Add to DOM
    document.body.appendChild(speed_indicator);

    // Track animation state
    let animation_timeout;
    let fadeout_timeout;

    const cancel_pending_animations = () => {
        clearTimeout(animation_timeout);
        clearTimeout(fadeout_timeout);
    };

    const start_fadeout = () => {
        if (!speed_indicator) return;
        speed_indicator.style.opacity = '0';
        fadeout_timeout = setTimeout(remove_speed_indicator, 200);
    };

    // Animate entrance
    requestAnimationFrame(() => {
        if (!speed_indicator) return;
        
        // Cancel any pending animations
        cancel_pending_animations();
        
        // Reset to initial state
        speed_indicator.style.opacity = '0';
        speed_indicator.style.transform = 'translateY(10px)';
        
        // Force reflow to ensure reset takes effect
        void speed_indicator.offsetHeight;
        
        // Start new animation
        speed_indicator.style.opacity = '1';
        speed_indicator.style.transform = 'translateY(0)';
        
        // Only set exit animation if not in persistent mode
        if (!persistent) {
            animation_timeout = setTimeout(start_fadeout, 500);
        }
    });
};

/**
 * Handles video speed controls
 * @param {HTMLVideoElement} video_player - Video element to control
 * @param {KeyboardEvent} e - Keyboard event that triggered control
 */
const video_controls = (video_player, e) => {
    // Handle speed adjustments
    if (e.shiftKey && (e.code === 'ArrowUp' || e.code === 'ArrowDown')) {
        const delta = e.code === 'ArrowDown' ? -0.25 : 0.25;
        const new_rate = check_limit(video_player.playbackRate + delta);
        video_player.playbackRate = new_rate;
        get_or_update_playback_value(video_player, new_rate);
        show_playback_rate_value(video_player, new_rate);
    } 
    // Handle speed reset
    else if (e.shiftKey && e.code === 'KeyR') {
        video_player.playbackRate = 1.0;
        get_or_update_playback_value(video_player, 1.0);
        show_playback_rate_value(video_player, 1.0);
    }
};

// Keydown event listener for all controls
document.addEventListener('keydown', (e) => {
    // Spacebar handling
    if (e.code === 'Space') {
        e.stopImmediatePropagation();
        
        if (space_down_time === null) {
            space_down_time = Date.now();
            const video = document.querySelector('video');
            if (!video) return;

            // Set timeout to detect spacebar hold (500ms threshold)
            space_held_timeout = setTimeout(() => {
                was_playing = !video.paused;
                video.playbackRate = 2.0;
                if (video.paused) video.play();
                
                // Show persistent indicator while holding space
                if (!speed_indicator) {
                    show_playback_rate_value(video, 2.0, true);
                }
            }, 500);
        }
    } 
    // Playback speed controls
    else if (e.shiftKey && (e.code === 'ArrowUp' || e.code === 'ArrowDown' || e.code === 'KeyR')) {
        e.preventDefault();
        const video = document.querySelector('video');
        if (video) {
            video_controls(video, e);
            show_playback_rate_value(video, video.playbackRate);
        }
    }
}, true);

// Keyup event listener for spacebar release
document.addEventListener('keyup', (e) => {
    if (e.code === 'Space') {
        e.stopImmediatePropagation();

        const video = document.querySelector('video');
        if (!video) return;

        // Calculate spacebar hold duration
        const held_time = Date.now() - (space_down_time || 0);
        clearTimeout(space_held_timeout);

        // Determine action based on hold duration
        if (held_time < 500) {
            // Short press: toggle play/pause
            video.paused ? video.play() : video.pause();
        } else {
            // Long press release: restore normal speed
            video.playbackRate = 1.0;
            if (!was_playing) video.pause();
            
            // Update and fade out indicator
            if (speed_indicator) {
                speed_indicator.textContent = '1.0x playback speed';
                setTimeout(() => {
                    if (!speed_indicator) return;
                    speed_indicator.style.opacity = '0';
                    setTimeout(remove_speed_indicator, 200);
                }, 500);
            }
        }

        // Reset tracking variables
        space_down_time = null;
        was_playing = false;
    }
}, true);

// Initialize video settings when page loads
window.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('video');
    if (!video) return;

    // Ensure default playback rate
    video.addEventListener('loadeddata', () => {
        video.playbackRate = 1.0;
    });
});