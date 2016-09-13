var Component, WordBook, wordBook,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component = require('../common/Component');

wordBook = require('../../../main/fileController');

WordBook = (function(superClass) {
  extend(WordBook, superClass);

  function WordBook(selector, key) {
    WordBook.__super__.constructor.call(this, selector);
    this.init(key);
  }

  WordBook.prototype.init = function(key) {
    console.log(key + " init");
    this.key = key || 'unfamiliarBook';
    return this.wordBook = wordBook;
  };

  WordBook.prototype.getWords = function() {
    return console.log(this.key + " getWords");
  };

  WordBook.prototype.canLearn = function() {
    return this.currentBook && this.currentBook.allCount > this.currentBook.hasLearningWordCount;
  };

  WordBook.prototype.render = function() {
    return this.getWords().append().eventBind();
  };

  WordBook.prototype.append = function() {
    this.contain.appendChild(this.template());
    return this;
  };

  WordBook.prototype.template = function() {
    return console.log(this.key + " template");
  };

  WordBook.prototype.eventBind = function() {
    var c;
    c = this.contain.querySelector("." + this.key + " .beginLearning");
    c && c.addEventListener('click', (function(_this) {
      return function() {
        if (_this.canLearn()) {
          localStorage.setItem("currentBook", _this.key);
          return ipcRenderer.send('change-learning-window');
        } else {
          return alert('该单词本没有单词');
        }
      };
    })(this));
    return this;
  };

  return WordBook;

})(Component.Components);

module.exports = WordBook;
