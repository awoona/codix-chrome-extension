//alert("background loaded");

chrome.tabs.onUpdated.addListener(onTabUpdated);

function onTabUpdated(tabId, changeInfo, tab) {
    if(changeInfo.url) {
        alert(changeInfo.url);
    }
}
