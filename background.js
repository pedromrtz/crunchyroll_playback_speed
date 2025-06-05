chrome.runtime.onInstalled.addListener(() => {
    console.log("Crunchyroll Speed Controller installed");
    chrome.action.disable(); // Desactiva el ícono por defecto
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.url) {
        if (tab.url.includes("crunchyroll.com")) {
            chrome.action.enable(tabId); // Activa ícono en Crunchyroll
        } else {
            chrome.action.disable(tabId); // Lo desactiva en otros sitios
        }
    }
});
