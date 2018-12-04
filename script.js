
var isExtensionOn;

chrome.storage.sync.get('isExtensionOn', function (data) {
  if (data.isExtensionOn === undefined) {
    chrome.storage.sync.set({ isExtensionOn: true });
    chrome.browserAction.setIcon({ path: 'light-on-16.png' });
  } else {
    isExtensionOn = data.isExtensionOn;
  }
  if (isExtensionOn) {
    var loadBackground = () => {
      var req = new XMLHttpRequest();
      req.overrideMimeType("application/json");
      req.open('GET', 'https://api.unsplash.com/photos/random?client_id=8d891d9e4a06713a0ad1c67160a520d2f71ae692d8f44a66dcdbfe10dfafb090&collections=3606641', true);
      req.onload = function () {
        var jsonResponse = JSON.parse(req.responseText);
        console.log(jsonResponse);
        document.getElementById('background-image').style.backgroundImage = "url('" + jsonResponse.urls.full + "')";
        if (jsonResponse.user.first_name && jsonResponse.user.last_name) {
          document.getElementById('nameUrl').innerText = jsonResponse.user.first_name + ' ' + jsonResponse.user.last_name;
        } else {
          document.getElementById('nameUrl').innerText = jsonResponse.user.first_name;
        }
        document.getElementById('nameUrl').setAttribute('href', jsonResponse.user.links.html);
        document.getElementById('downloadUrl').setAttribute('href', jsonResponse.links.download + "?force=true");
      };
      req.send(null);
    }
    loadBackground();

    var updateTime = () => {
      var time = new Date();
      var hour;
      var seconds;
      if (time.getHours() < 10) {
        hour = '0' + time.getHours();
      } else if (time.getHours() > 9 && time.getHours() < 13) {
        hour = time.getHours();
      } else if (time.getHours() > 12 && time.getHours() < 22) {
        hour = '0' + (time.getHours() - 12);
      } else if (time.getHours() > 21) {
        hour = time.getHours() - 12;
      }
      time.getMinutes() < 10 ? minutes = '0' + time.getMinutes() : minutes = time.getMinutes();
      time.getSeconds() < 10 ? seconds = '0' + time.getSeconds() : seconds = time.getSeconds();
      document.getElementById('time').innerText = hour + ":" + minutes + ":" + seconds;
    }
    setInterval(() => { updateTime() }, 1000);
  }
});

