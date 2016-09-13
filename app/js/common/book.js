var Component, UnfamiliarBook,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component = require('../common/pubComponent');

UnfamiliarBook = (function(superClass) {
  extend(UnfamiliarBook, superClass);

  function UnfamiliarBook(selector) {
    UnfamiliarBook.__super__.constructor.call(this, selector);
    this.init();
  }

  UnfamiliarBook.prototype.init = function() {
    return console.log("init");
  };

  UnfamiliarBook.prototype.render = function() {
    this.contain.innerHTML = this.template();
    return this.eventBind();
  };

  UnfamiliarBook.prototype.template = function() {
    var html;
    html = "<div class=\"bookName\">陌生单词本</div>\n<div class=\"todayWords\">\n    <div class=\"twCount\"></div>\n    <div class=\"twName\"></div>\n</div>\n<div class=\"newWords\">\n    <div class=\"nCount\"></div>\n    <div class=\"nName\"></div>\n</div>\n<div class=\"finishWords\">\n    <div class=\"fCount\"></div>\n    <div class=\"fName\"></div>\n</div>";
    return html;
  };

  return UnfamiliarBook;

})(Component.Components);

module.exports = UnfamiliarBook;
