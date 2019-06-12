const CSS = "img{visibility: hidden !important;} *{background-image: none !important;}";
const TITLE_ON = "Images are hidden (Click to unhide)";
const TITLE_OFF = "Images are NOT hidden (Click to hide)";
const ICON_ON = "icons/block-48.png";
const ICON_OFF = "icons/block-disabled-48.png";

const ON = 1;
const OFF = 0;
var current = OFF;

function toggle_ON_OFF(tab) {
    if (current === ON) {
      current = OFF;
      browser.tabs.removeCSS({allFrames: true, code: CSS});
      browser.browserAction.setIcon({tabId: tab.id, path: ICON_OFF});
      browser.browserAction.setTitle({tabId: tab.id, title: TITLE_OFF});
    } else {
      current = ON;
      browser.tabs.insertCSS({allFrames: true, code: CSS, runAt: "document_start"});
      browser.browserAction.setIcon({tabId: tab.id, path: ICON_ON});
      browser.browserAction.setTitle({tabId: tab.id, title: TITLE_ON});
    }
}

browser.browserAction.onClicked.addListener(toggle_ON_OFF);

browser.tabs.onUpdated.addListener(loadAllTabs);

function loadAllTabs() {
    browser.tabs.query({}).then((tabs) => {
        for (let tab of tabs) {
            addTab(tab);
        }
    });
}

function addTab(tab) {
    if (current === ON) {
        browser.tabs.insertCSS({allFrames: true, code: CSS, runAt: "document_start"});
        browser.browserAction.setIcon({tabId: tab.id, path: ICON_ON});
        browser.browserAction.setTitle({tabId: tab.id, title: TITLE_ON});
    } else {
        browser.browserAction.setIcon({tabId: tab.id, path: ICON_OFF});
        browser.tabs.removeCSS({allFrames: true, code: CSS});
        browser.browserAction.setTitle({tabId: tab.id, title: TITLE_OFF});
    }
}