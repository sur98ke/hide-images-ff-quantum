const CSS = "img,svg{visibility: hidden !important;} img{background-color: hsla(0,0,50,0.3)} *{background-image: none !important;}";
const TITLE_ON = "Images are hidden (Click to unhide)";
const TITLE_OFF = "Images are NOT hidden (Click to hide)";
const ICON_ON = "icons/block-48.png";
const ICON_OFF = "icons/block-disabled-48.png";

const ON = 1;
const OFF = 0;
var current = OFF;

function insert(tabId) {
    browser.tabs.insertCSS(tabId, 
        {allFrames: true, code: CSS, runAt: "document_start"});
}

function remove(tabId) {
    browser.tabs.removeCSS(tabId, 
        {allFrames: true, code: CSS});
}

function tabUpdated(tabId, changeInfo, tab) {
    if ( (! tab.discarded) && (! tab.hidden) ) {
        insert(tab.id)
    }
}

function toggle_ON_OFF() {
    if (current === ON) {
        current = OFF;
        browser.tabs.onUpdated.removeListener(tabUpdated);
        browser.browserAction.setIcon({path: ICON_OFF});
        browser.browserAction.setTitle({title: TITLE_OFF});
    } else {
        current = ON;
        browser.tabs.onUpdated.addListener(tabUpdated);
        browser.browserAction.setIcon({path: ICON_ON});
        browser.browserAction.setTitle({title: TITLE_ON});
    }
    browser.tabs.query({discarded: false}).then((tabs) => {
        for (let tab of tabs) {
            if (current === ON) {
                insert(tab.id);
            } else {
                remove(tab.id);
            }
        }
    });
}

if (current === ON){
    browser.tabs.onUpdated.addListener(tabUpdated);
}

browser.browserAction.onClicked.addListener(toggle_ON_OFF);

