document.addEventListener('DOMContentLoaded', async () => {
    // Load saved hold_speed value when popup opens
    const load_saved_hold_speed = async () => {
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // Send message to content script to get saved hold_speed
            const response = await chrome.tabs.sendMessage(tab.id, { 
                action: 'get_hold_speed' 
            });
            
            if (response && response.hold_speed) {
                document.querySelector('#hold-speed').value = response.hold_speed
            }
        } catch (error) {
            console.log('Could not load saved hold_speed:', error);
        }
    };

    // Save hold_speed when changed
    document.querySelector('#hold-speed').onchange = async () => {
        const hold_speed = document.querySelector('#hold-speed').value;
        
        try {
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            // Send message to content script to save hold_speed
            await chrome.tabs.sendMessage(tab.id, { 
                action: 'set_hold_speed', 
                hold_speed: hold_speed 
            });
            
            console.log('Hold speed saved:', hold_speed);
        } catch (error) {
            console.log('Could not save hold_speed:', error);
        }
    };

    // Load saved value on popup open
    await load_saved_hold_speed();
});