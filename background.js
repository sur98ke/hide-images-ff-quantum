const CSS = "img{visibility: hidden;}";
const TITLE_APPLY = "Block images";
const TITLE_REMOVE = "Show images";
var current = TITLE_APPLY;

function toggleCSS(tab) {
  function gotTitle(title) {
    if (current === TITLE_APPLY) {
      current = TITLE_REMOVE;
      browser.browserAction.setIcon({tabId: tab.id, path: "icons/block-disabled-48.png"});
      browser.tabs.removeCSS({code: CSS});
    } else {
      current = TITLE_APPLY;
      browser.browserAction.setIcon({tabId: tab.id, path: "icons/block-48.png"});
      browser.tabs.insertCSS({code: CSS, runAt: "document_start"});
    }
    browser.browserAction.setTitle({tabId: tab.id, title: current});
  }

  var gettingTitle = browser.browserAction.getTitle({tabId: tab.id});
  gettingTitle.then(gotTitle);
}

browser.browserAction.onClicked.addListener(toggleCSS);

browser.tabs.onUpdated.addListener(loadAllTabs);

function loadAllTabs() {
    browser.tabs.query({}).then((tabs) => {
        for (let tab of tabs) {
            addTab(tab);
        }
    });
}

function addTab(tab) {
     if (current === TITLE_APPLY) {
       browser.browserAction.setIcon({tabId: tab.id, path: "icons/block-48.png"});
       browser.tabs.insertCSS({code: CSS, runAt: "document_start"});
    } else {
       browser.browserAction.setIcon({tabId: tab.id, path: "icons/block-disabled-48.png"});
       browser.tabs.removeCSS({code: CSS});
    }
   browser.browserAction.setTitle({tabId: tab.id, title: current});
}