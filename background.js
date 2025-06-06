/**
 * BACKGROUND SCRIPT: ICON VISIBILITY CONTROL
 *
 * Features:
 * - Logs installation event
 * - Disables extension icon by default
 * - Enables icon only on Crunchyroll tabs
 */

// Event: Extension installed
chrome.runtime.onInstalled.addListener(() => {
    console.log("Crunchyroll Speed Controller installed");

    // Disable extension icon by default
    chrome.action.disable();
});

// Event: Tab updated (URL change, loading complete, etc.)
chrome.tabs.onUpdated.addListener((tab_id, change_info, tab) => {
    // Only act when the page has fully loaded
    if (change_info.status === "complete" && tab.url) {
        // Enable icon only if tab is Crunchyroll
        if (tab.url.includes("crunchyroll.com")) {
            chrome.action.enable(tab_id);
        } else {
            // Disable icon on non-Crunchyroll sites
            chrome.action.disable(tab_id);
        }
    }
});