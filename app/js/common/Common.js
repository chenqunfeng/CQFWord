var Common;

Common = new Object();

Common.loading = function() {
  var searchLoading, searchWord;
  searchLoading = document.querySelector(".searchLoading");
  searchWord = document.querySelector(".searchLoading .searchWord");
  this.removeClass(searchLoading, "hide");
  return this.addClass(searchWord, "searchWordAnimation");
};

Common.loaded = function() {
  return setTimeout((function(_this) {
    return function() {
      var searchLoading, searchWord;
      searchLoading = document.querySelector(".searchLoading");
      searchWord = document.querySelector(".searchLoading .searchWord");
      _this.addClass(searchLoading, "hide");
      return _this.removeClass(searchWord, "searchWordAnimation");
    };
  })(this), 666);
};

Common.addClass = function(node, className) {
  if (node && node.getAttribute) {
    if (!this.hasClass(node, className)) {
      node.className += " " + className;
    }
  }
  return this;
};

Common.removeClass = function(node, className) {
  var oldClass, reg;
  if (node && node.getAttribute) {
    if (this.hasClass(node, className)) {
      oldClass = node.className;
      reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
      node.className = oldClass.replace(reg, " ").replace(/(^\s+|\s+$)/g, "");
    }
  }
  return this;
};

Common.hasClass = function(node, className) {
  var reg;
  if (node && node.getAttribute) {
    reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
    return node.className && reg.test(node.className);
  }
  return false;
};

Common.isCh = function(t) {
  var re;
  re = /[0-9\u4e00-\u9fa5]/;
  return re.test(t);
};

Common.isEn = function(t) {
  var re;
  re = /[a-zA-Z]/;
  return re.test(t);
};

module.exports = Common;
