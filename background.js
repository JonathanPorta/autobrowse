var _data = [];
var _targetWindow = null;
var _enabled = false;

var doEet = () => {
  if (!_targetWindow != null) {
    chrome.windows.create(
      { url: ['https://google.com', 'https://porta.codes'] },
      w => {
        _targetWindow = w;
        console.log('w!', w);
        _enabled = true;
      }
    );
  } else {
    _enabled = true;
  }
};

setInterval(function() {
  console.log('rotatordaemon peaks its head up.');
  if (_enabled && _targetWindow != null) {
    console.log("We're fuckin' active babae!");
    chrome.tabs.query({ windowId: _targetWindow.id }, function(tabs) {
      // Sort tabs according to their index in the window.
      tabs.sort((a, b) => {
        return a.index < b.index;
      });
      let activeIndex = tabs.findIndex(tab => {
        return tab.active;
      });
      let lastTab = tabs.length - 1;
      let newIndex = -1;

      newIndex = activeIndex === 0 ? lastTab : activeIndex - 1;
      console.log('setting new active index to:', newIndex);
      // else  // 'flip-tabs-backwards'
      //   newIndex = activeIndex === lastTab ? 0 : activeIndex + 1;
      chrome.tabs.update(tabs[newIndex].id, {
        active: true,
        highlighted: true
      });
    });
  }
}, 10000);

// chrome.commands.onCommand.addListener(function(command) {
//   console.log('onCommand event received for message: ', command);
//   //alert('sdf');
//   //alert(command);
//   //chrome.tabs.executeScript({file: 'jquery.js'});
//   //chrome.tabs.executeScript({file: 'copy.js'});
//   //chrome.tabs.executeScript({code: 'alert("selected: " + window.getSelection())'});
//
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, { test: 'test' }, function(response) {
//       //alert("selected: " + response);
//       //alert("selected: " + response.selected);
//       console.log(response);
//       // _data.push(response.selected);
//
//       // Create a simple text notification:
//       var notification = webkitNotifications.createNotification(
//         '', // icon url - can be relative
//         'Added to Clipboard', // notification title
//         response.selected // notification body text
//       );
//
//       // Or create an HTML notification:
//       //var notification = webkitNotifications.createHTMLNotification(
//       //  'notification.html'  // html url - can be relative
//       //);
//
//       // Then show the notification.
//       notification.show();
//     });
//   });
//   return true;
// });
