var Component, LearningPage, unfamiliarBook,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component = require('../common/Component');

unfamiliarBook = require('../../../main/UnfamiliarBook');

LearningPage = (function(superClass) {
  extend(LearningPage, superClass);

  function LearningPage(selector) {
    LearningPage.__super__.constructor.call(this, selector);
    this.init();
  }

  LearningPage.prototype.init = function() {
    this.ufWords = unfamiliarBook.readSettings('words');
    return console.log("LearningPage init");
  };

  LearningPage.prototype.render = function() {
    return this.contain.innerHTML = this.template();
  };

  LearningPage.prototype.template = function() {
    var html;
    html = "<div class=\"restWordCount\"></div>\n<div class=\"wordContainTop borderBox\">\n    <div class=\"wordInfo fl\">\n        <div class=\"word fl\" title=\"单词\"></div>\n        <div class=\"pron fl\" title=\"拼注\"></div>\n    </div>\n    <div class=\"wordPlay fl\">\n        <span class=\"wordPlayIcon pointer\" title=\"播放\"></span>\n        <audio class=\"wordPlayAudio\" src=\"\"></audio>\n    </div>\n</div>\n<div class=\"realize pointer\" title=\"认识该单词\">认识</div>\n<div class=\"unrealize pointer\" title=\"不认识该单词\">不认识</div>\n<div class=\"next pointer hide\" title=\"下一个\">下一个</div>\n<div class=\"\">";
    return html;
  };

  return LearningPage;

})(Component.Components);

module.exports = LearningPage;
