pinnedTabs = {};

const code = `window.addEventListener('beforeunload', (event) => {
  // Cancel the event as stated by the standard.
  // Chrome requires returnValue to be set.
  event.returnValue = 'This is a pinned tab';
});`;

function patchTab(tabId){
    chrome.tabs.executeScript(tabId, {code});
};

chrome.tabs.onCreated.addListener(function(tab){
  if(tab.pinned) {
    pinnedTabs[tab.id] = true;
    patchTab(tab.id);
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo && changeInfo.pinned) {
    // Check to see if the tab that got updates wasn't already pinned
    if(!pinnedTabs[tabId]){
      pinnedTabs[tabId] = true;
      patchTab(tabId);
    }
  } else if (changeInfo && !changeInfo.pinned) {
    // Check to see if the tab that got updates was pinned
    if(pinnedTabs[tabId]){
      delete pinnedTabs[tabId];
      chrome.tabs.executeScript(tabId, {code: "window.onbeforeunload = null;"});
    }
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  if(pinnedTabs[tabId]){
    delete pinnedTabs[tabId];
  }
});
