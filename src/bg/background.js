pinnedTabs = {};

chrome.tabs.onCreated.addListener(function(tab){
  if(tab.pinned) {
    pinnedTabs[tab.id] = true;
    chrome.tabs.executeScript(tab.id, {code: "window.onbeforeunload = function(e) { return 'This is a pinned tab'; };"});
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo && changeInfo.pinned) {
    // Check to see if the tab that got updates wasn't already pinned
    if(!pinnedTabs[tabId]){
      pinnedTabs[tabId] = true;
      chrome.tabs.executeScript(tabId, {code: "window.onbeforeunload = function(e) { return 'This is a pinned tab'; };"});
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