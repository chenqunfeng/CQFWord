var UnfamiliarBook, wordBook,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

wordBook = require('./WordBook');

UnfamiliarBook = (function(superClass) {
  extend(UnfamiliarBook, superClass);

  function UnfamiliarBook(selector, key) {
    UnfamiliarBook.__super__.constructor.call(this, selector, key);
  }

  UnfamiliarBook.prototype.setOneDayMission = function() {
    var index, missionTime, now, t, targetIndex, wordArr, wordObj;
    now = new Date();
    if (this.words) {
      missionTime = this.currentBook.time;
      if (!missionTime || this.compareDate(new Date(missionTime), now)) {
        index = this.words.hasLearningWordCount;
        targetIndex = this.words.learningNewWordCount;
        wordObj = this.words.objSet;
        wordArr = this.words.arrSet;
        t = wordArr.slice(index, index + targetIndex);
        this.currentBook['arrSet'] = t;
        this.currentBook['arrSetScore'] = [];
        this.currentBook['allCount'] = t.length;
        this.currentBook['learningNewWordCount'] = t.length;
        this.currentBook['hasLearningWordCount'] = 0;
        this.currentBook['time'] = now;
        return this.wordBook.saveSettings('learningMission', this.currentBook);
      }
    }
  };

  UnfamiliarBook.prototype.getWords = function() {
    this.words = this.wordBook.readSettings('words', 'unfamiliarBook.json');
    this.currentBook = this.wordBook.readSettings('learningMission', 'unfamiliarBook.json');
    return this;
  };

  UnfamiliarBook.prototype.template = function() {
    var book;
    this.setOneDayMission();
    book = document.createElement('div');
    book.setAttribute('class', 'unfamiliarBook borderBox');
    book.innerHTML = "<div class=\"bookName fl\">陌生单词本</div>\n<div class=\"todayWords fl\" title=\"单词数量\">\n    <div class=\"twCount\">" + this.currentBook.allCount + "</div>\n    <div class=\"twName\">单词数量</div>\n</div>\n<div class=\"newWords fl\" title=\"新词数\">\n    <div class=\"nCount\">" + (this.currentBook.allCount - this.currentBook.hasLearningWordCount) + "</div>\n    <div class=\"nName\">新词数</div>\n</div>\n<div class=\"finishWords fl\" title=\"已完成\">\n    <div class=\"fCount\">" + this.currentBook.hasLearningWordCount + "</div>\n    <div class=\"fName\">已完成</div>\n</div>\n<div class=\"divider fl\"></div>\n<div class=\"beginLearning fl pointer\" title=\"开始学习\">开始</div>";
    return book;
  };

  UnfamiliarBook.prototype.compareDate = function(past, current) {
    var cD, cM, cY, pD, pM, pY;
    if (past instanceof Date && current instanceof Date) {
      pY = past.getYear();
      pM = past.getMonth();
      pD = past.getDate();
      cY = current.getYear();
      cM = current.getMonth();
      cD = current.getDate();
      if (pY < cY) {
        return true;
      } else {
        if (pM < cM) {
          return true;
        } else {
          if (pD < cD) {
            return true;
          } else {
            return false;
          }
        }
      }
    } else {
      console.log('param error');
      return false;
    }
  };

  return UnfamiliarBook;

})(wordBook);

module.exports = UnfamiliarBook;
