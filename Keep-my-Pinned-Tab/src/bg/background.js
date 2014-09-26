chrome.tabs.onCreated.addListener(
  function(tab){
    if(tab.pinned) {
      chrome.tabs.executeScript(tab.id, {file: "src/js/onbeforeunload.js"});
    }
  }
);

chrome.tabs.onUpdated.addListener(
  function(tabId, changeInfo, tab) {
    if(changeInfo && changeInfo.pinned) {
      chrome.tabs.executeScript(tabId, {file: "src/js/onbeforeunload.js"});
    }
  }
);
