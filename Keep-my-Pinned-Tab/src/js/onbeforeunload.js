if (!window.onbeforeunload) {
  window.onbeforeunload = function(e) {
      return 'This is a pinned tab';
  }
};