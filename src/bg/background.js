pinedTabs = {};

chrome.tabs.onCreated.addListener(function(tab){
  if(tab.pinned) {
    pinedTabs[tab.id] = true;
    chrome.tabs.executeScript(tab.id, {code: "window.onbeforeunload = function(e) { return 'This is a pinned tab'; };"});
  }
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if(changeInfo && changeInfo.pinned) {
    // Check to see if the tab that got updates wasn't already pinned
    if(!pinedTabs[tabId]){
      pinedTabs[tabId] = true;
      chrome.tabs.executeScript(tabId, {code: "window.onbeforeunload = function(e) { return 'This is a pinned tab'; };"});
    }
  } else if (changeInfo && !changeInfo.pinned) {
    // Check to see if the tab that got updates was pinned
    if(pinedTabs[tabId]){
      delete pinedTabs[tabId];
      chrome.tabs.executeScript(tabId, {code: "window.onbeforeunload = null;"});
    }
  }
});

chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  if(pinedTabs[tabId]){
    delete pinedTabs[tabId];
  }
});