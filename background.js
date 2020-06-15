function openMyPage() {
    browser.tabs.create({
        "url": "/config.html"
    });
}

browser.browserAction.onClicked.addListener(openMyPage);