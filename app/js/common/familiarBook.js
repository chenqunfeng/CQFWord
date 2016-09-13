var FamiliarBook, wordBook,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

wordBook = require('./WordBook');

FamiliarBook = (function(superClass) {
  extend(FamiliarBook, superClass);

  function FamiliarBook(selector, key) {
    FamiliarBook.__super__.constructor.call(this, selector, key);
  }

  FamiliarBook.prototype.getWords = function() {
    this.currentBook = this.wordBook.readSettings('words', 'familiarBook.json');
    return this;
  };

  FamiliarBook.prototype.template = function() {
    var book;
    book = document.createElement('div');
    book.setAttribute('class', 'familiarBook borderBox');
    book.innerHTML = "<div class=\"bookName fl\">熟悉单词本</div>\n<div class=\"todayWords fl\" title=\"单词数量\">\n    <div class=\"twCount\">" + this.currentBook.allCount + "</div>\n    <div class=\"twName\">已掌握单词</div>\n</div>\n<div class=\"divider fl\"></div>\n<div class=\"beginLearning fl pointer\" title=\"开始学习\">回顾复习</div>";
    return book;
  };

  return FamiliarBook;

})(wordBook);

module.exports = FamiliarBook;
