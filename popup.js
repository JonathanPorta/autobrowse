function onLoadWindow() {
  console.log('hi');
  //alert("popup.js");

  var btn = document.querySelector('.btn');
  btn.addEventListener('click', doEet);

  listView();
}
function listView() {
  //alert("listview");
  chrome.runtime.getBackgroundPage(function(bg) {
    //alert("ggghjjgkhjkhggjhkjhgjhgkjkgjkgh");
    var items = bg._data;
    if (items.length > 0) {
      //alert("addding");
      $.each(items, function(i) {
        $('#listview').append('<li>' + items[i] + '</li>');
      });
    }
    //alert("no add");
  });
}

function doEet() {
  //alert("listview");
  chrome.runtime.getBackgroundPage(function(bg) {
    alert('ggghjjgkhjkhggjhkjhgjhgkjkgjkgh');
    console.log('BackgroundPage::', bg);
    bg.doEet();
    // var items = bg.;
    // if (items.length > 0)
    // {
    // 	//alert("addding");
    // 	$.each(items, function(i){
    // 		$("#listview").append("<li>" + items[i] + "</li>");
    // 	});
    // }
    //alert("no add");
  });
}

window.onload = onLoadWindow;
