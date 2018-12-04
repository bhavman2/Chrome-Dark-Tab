chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.storage.sync.get('isExtensionOn', function (data) {
    if (data.isExtensionOn === true) {
      chrome.storage.sync.set({ isExtensionOn: false });
      chrome.browserAction.setIcon({ path: 'light-off-16.png' });
      // chrome.browserAction.setBadgeText({ text: '' });
    } else {
      chrome.storage.sync.set({ isExtensionOn: true });
      chrome.browserAction.setIcon({ path: 'light-on-16.png' });
      // chrome.browserAction.setBadgeBackgroundColor({ color: 'black' });
      // chrome.browserAction.setBadgeText({ text: 'ON' });
    }
  });
});