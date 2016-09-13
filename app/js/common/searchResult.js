var Component, SearchResult, wordBook,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component = require('./Component');

wordBook = require('../../../main/fileController');

SearchResult = (function(superClass) {
  extend(SearchResult, superClass);

  function SearchResult(selector) {
    SearchResult.__super__.constructor.call(this, selector);
    this.init();
  }

  SearchResult.prototype.init = function() {
    wordBook.openFile('unfamiliarBook.json');
    return this.ufWords = wordBook.readSettings('words');
  };

  SearchResult.prototype.setData = function(data) {
    if ("object" === typeof data) {
      this.data = data;
    }
    return this;
  };

  SearchResult.prototype.render = function() {
    this.contain.innerHTML = this.template();
    return this.setSomeDom().eventBind();
  };

  SearchResult.prototype.template = function() {
    var html;
    html = "<div class=\"wordContain borderBox\">\n    <div class=\"wordContainTop borderBox\">\n        <div class=\"wordInfo fl\">\n            <div class=\"word fl\" title=\"单词\"></div>\n            <div class=\"pron fl\" title=\"拼注\"></div>\n        </div>\n        <div class=\"wordPlay fl\">\n            <span class=\"wordPlayIcon pointer\" title=\"播放\"></span>\n            <audio class=\"wordPlayAudio\" src=\"\"></audio>\n        </div>\n    </div>\n    <div class=\"wordExplain borderBox fl\">\n        <p title=\"单词释义\"></p>\n    </div>\n</div>\n<div class=\"wordFailedTip borderBox hide\">您输入的内容有误</div>\n<div class=\"addToBook pointer\" title=\"添加到单词本\" name=\"addToBook\">添加到单词本</div>\n<div class=\"wordError hide\">\n    <div>您可能要找的是：</div>\n    <div class=\"wordPossibility\"></div>\n</div>";
    return html;
  };

  SearchResult.prototype.setSomeDom = function() {
    this.wordContain = this.contain.querySelector('.wordContain');
    this.word = this.contain.querySelector('.word');
    this.pron = this.contain.querySelector('.pron');
    this.wordPlay = this.contain.querySelector('.wordPlay');
    this.wordExplain = this.contain.querySelector('.wordExplain p');
    this.audio = this.contain.querySelector('.wordPlayAudio');
    this.wordError = this.contain.querySelector('.wordError');
    this.wordPossibility = this.contain.querySelector('.wordPossibility');
    this.audioBtn = this.contain.querySelector('.wordPlayIcon');
    this.addToBook = this.contain.querySelector('.addToBook');
    this.wordFailedTip = this.contain.querySelector('.wordFailedTip');
    return this;
  };

  SearchResult.prototype.renderExplain = function() {
    if (this.data.content && !this.data.error) {
      this.word.textContent = this.data.content;
      this.pron.textContent = this.data.pron && '/' + this.data.pron + '/';
      this.data.audio || this.addClass(this.wordPlay, 'hide');
      this.data.audio && this.removeClass(this.wordPlay, 'hide');
      this.audio.src = this.data.audio;
      this.wordExplain.innerHTML = this.data.definition.replace(/\n/g, "<br>");
      return this.data.sort !== 'enAnalysis' && this.addClass(this.addToBook, 'hide');
    } else {
      if (this.data.error) {
        this.removeClass(this.wordError, 'hide');
        this.wordPossibility.innerHTML = this.data.error;
      } else {
        this.removeClass(this.addToBook, 'hide');
        this.removeClass(this.wordFailedTip, 'hide');
      }
      return this.addClass(this.wordContain, 'hide');
    }
  };

  SearchResult.prototype.eventBind = function() {
    this.audioBtn.addEventListener('click', (function(_this) {
      return function() {
        _this.audio.play();
        return _this.addClass(_this.audioBtn, "audioPlay");
      };
    })(this));
    this.audio.addEventListener('ended', (function(_this) {
      return function() {
        return _this.removeClass(_this.audioBtn, "audioPlay");
      };
    })(this));
    this.addToBook.addEventListener('click', (function(_this) {
      return function() {
        var exist;
        exist = _this.ufWords.objSet[_this.data.content];
        if (exist) {
          return alert('该单词已经存在');
        } else {
          _this.ufWords.objSet[_this.data.content] = {
            count: 0,
            used: false
          };
          _this.ufWords.arrSet.push(_this.data.content);
          _this.ufWords.allCount += 1;
          wordBook.saveSettings('words', _this.ufWords, 'unfamiliarBook.json');
          return alert('添加成功');
        }
      };
    })(this));
    return this.wordError.addEventListener('click', (function(_this) {
      return function(e) {
        var n, v;
        e = e.target;
        n = e.getAttribute('name');
        if ('reSearch' === n) {
          v = e.textContent;
          return _this.publish('reSearch', v);
        }
      };
    })(this));
  };

  return SearchResult;

})(Component.Components);

module.exports = SearchResult;
