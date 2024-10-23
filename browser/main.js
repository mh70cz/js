function onGot(historyItems) {
    for (item of historyItems) {
      console.log(item.url);
      console.log(new Date(item.lastVisitTime));
    }
  }
  
  var searching = browser.history.search({text: ""});
  
  searching.then(onGot);