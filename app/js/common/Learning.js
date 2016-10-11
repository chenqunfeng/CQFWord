var Component, LearningPage, wordBook,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component = require('./Component');

wordBook = require('../../../main/fileController');

LearningPage = (function(superClass) {
  extend(LearningPage, superClass);

  function LearningPage(selector) {
    LearningPage.__super__.constructor.call(this, selector);
    this.init();
  }

  LearningPage.prototype.init = function() {
    this.key = localStorage.getItem('currentBook');
    this.words = wordBook.readSettings('words', 'unfamiliarBook.json');
    this.learningMission = wordBook.readSettings('learningMission', 'unfamiliarBook.json');
    this.fWords = wordBook.readSettings('words', 'familiarBook.json');
    if ('unfamiliarBook' === this.key) {
      this.currentBook = this.learningMission;
    } else {
      this.currentBook = this.fWords;
    }
    return this.index = this.currentBook.hasLearningWordCount;
  };

  LearningPage.prototype.setData = function(data) {
    if ("object" === typeof data) {
      this.data = data;
    }
    return this;
  };

  LearningPage.prototype.setSomeDom = function() {
    this.restWordCount = this.contain.querySelector('.restWordCount');
    this.word = this.contain.querySelector('.word');
    this.pron = this.contain.querySelector('.pron');
    this.wordPlay = this.contain.querySelector('.wordPlay');
    this.wordExplain = this.contain.querySelector('.wordExplain p');
    this.audio = this.contain.querySelector('.wordPlayAudio');
    this.audioBtn = this.contain.querySelector('.wordPlayIcon');
    this.addToBook = this.contain.querySelector('.addToBook');
    this.realize = this.contain.querySelector('.realize');
    this.unrealize = this.contain.querySelector('.unrealize');
    this.next = this.contain.querySelector('.next');
    return this;
  };

  LearningPage.prototype.render = function() {
    this.addClass(this.contain, 'hide');
    this.contain.innerHTML = this.template();
    return this.setSomeDom().eventBind().eventSubscribe().nextWord();
  };

  LearningPage.prototype.template = function() {
    var html;
    html = "<div class=\"restWordCount\"></div>\n<div class=\"wordContainTop borderBox\">\n    <div class=\"wordInfo fl\">\n        <div class=\"word fl\" title=\"单词\"></div>\n        <div class=\"pron fl\" title=\"拼注\"></div>\n    </div>\n    <div class=\"wordPlay fl\">\n        <span class=\"wordPlayIcon pointer\" name=\"wordPlay\" title=\"播放\"></span>\n        <audio class=\"wordPlayAudio\" src=\"\"></audio>\n    </div>\n</div>\n<div class=\"wordExplain borderBox fl\">\n    <p class=\"hide\" title=\"单词释义\"></p>\n</div>\n<div class=\"realize pointer\" name=\"realize\" title=\"认识该单词\">认识</div>\n<div class=\"unrealize pointer\" name=\"unrealize\" title=\"不认识该单词\">不认识</div>\n<div class=\"next pointer hide\" name=\"next\" title=\"下一个\">下一个</div>";
    return html;
  };

  LearningPage.prototype.nextWord = function() {
    var word;
    if (this.index < this.currentBook['allCount']) {
      word = this.currentBook['arrSet'][this.index];
      _topBanner.getExplain(word, 'learning');
      return this.index++;
    } else {
      this.updateRecord();
      return alert('已经没有单词了');
    }
  };

  LearningPage.prototype.savePlan = function(score) {
    var scoreArr;
    this.currentBook.hasLearningWordCount = this.index;
    score && (scoreArr = this.currentBook.arrSetScore) && scoreArr.push(score);
    if ('unfamiliarBook' === this.key) {
      return wordBook.saveSettings("learningMission", this.currentBook, "unfamiliarBook.json");
    } else if ('familiarBook' === this.key) {
      if (this.currentBook.hasLearningWordCount === this.currentBook.allCount) {
        this.currentBook.hasLearningWordCount = 0;
      }
      wordBook.saveSettings("words", this.currentBook, "familiarBook.json");
      return console.log('familiarBook');
    }
  };

  LearningPage.prototype.updateRecord = function() {
    var fWords, familiarWord, i, j, k, lArrSet, lHasLearning, lScoreArr, pos, ref, ref1, s, t1, t2, w, wArrSet, wHasLearning, wObjSet;
    if ('unfamiliarBook' === this.key) {
      familiarWord = [];
      wObjSet = this.words.objSet;
      wArrSet = this.words.arrSet;
      wHasLearning = this.words.hasLearningWordCount;
      lArrSet = this.learningMission.arrSet;
      lScoreArr = this.learningMission.arrSetScore;
      lHasLearning = this.learningMission.hasLearningWordCount;
      this.words.hasLearningWordCount += lHasLearning;
      if (this.words.hasLearningWordCount === this.words.allCount) {
        this.words.hasLearningWordCount = 0;
      }
      pos = 0;
      for (i = j = 0, ref = lHasLearning - 1; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {
        w = lArrSet[i];
        s = lScoreArr[i];
        wObjSet[w]['count'] += s;
        if (wObjSet[w]['count'] < 0) {
          wObjSet[w]['count'] = 0;
        }
        if (wObjSet[w]['count'] >= 3) {
          familiarWord.push(w);
          if (0 === wHasLearning + i) {
            wArrSet = wArrSet.slice(wHasLearning + i + 1);
          } else {
            t1 = wArrSet.slice(0, wHasLearning + i - pos);
            t2 = wArrSet.slice(wHasLearning + i + 1 - pos);
            wArrSet = t1.concat(t2);
          }
          this.words.allCount--;
          pos++;
          delete wObjSet[w];
        }
      }
      this.words.arrSet = wArrSet;
      wordBook.saveSettings("words", this.words, "unfamiliarBook.json");
      fWords = wordBook.readSettings("words", "familiarBook.json");
      fWords.allCount += familiarWord.length;
      fWords.arrSet.concat(familiarWord);
      for (i = k = 0, ref1 = familiarWord.length - 1; 0 <= ref1 ? k <= ref1 : k >= ref1; i = 0 <= ref1 ? ++k : --k) {
        w = familiarWord[i];
        fWords.objSet[w] || (fWords.objSet[w] = {
          count: 0
        });
      }
      return wordBook.saveSettings("words", fWords, "familiarBook.json");
    } else if ('familiarBook' === this.key) {
      return console.log('familiarBook');
    }
  };

  LearningPage.prototype.renderExplain = function() {
    if (this.data.query) {
      this.removeClass(this.contain, 'hide');
      this.removeClass(this.realize, 'hide');
      this.removeClass(this.unrealize, 'hide');
      this.addClass(this.wordExplain, 'hide');
      this.addClass(this.next, 'hide');
      this.restWordCount.textContent = this.index + '/' + this.currentBook.allCount;
      this.word.textContent = this.data.query;
      this.pron.textContent = '/' + this.data.basic["us-phonetic"] + '/';
      if (this.data.audio) {
        this.removeClass(this.wordPlay, 'hide');
        this.audio.src = this.data.audio;
      } else {
        this.addClass(this.wordPlay, 'hide');
      }
      return this.renderBasicExplain();
    }
  };

  LearningPage.prototype.renderBasicExplain = function() {
    var html;
    html = "";
    this.data.basic.explains.map((function(_this) {
      return function(unit) {
        return html += unit + "<br>";
      };
    })(this));
    return this.wordExplain.innerHTML = html;
  };

  LearningPage.prototype.showMoreExplain = function() {
    this.addClass(this.realize, 'hide');
    this.addClass(this.unrealize, 'hide');
    this.removeClass(this.next, 'hide');
    return this.removeClass(this.wordExplain, 'hide');
  };

  LearningPage.prototype.eventBind = function() {
    this.contain.addEventListener('click', (function(_this) {
      return function(e) {
        var n;
        e = e.target;
        n = e.getAttribute('name');
        if ("wordPlay" === n) {
          _this.audio.play();
          return _this.addClass(_this.audioBtn, "audioPlay");
        } else if ("realize" === n) {
          _this.showMoreExplain();
          return _this.savePlan(1);
        } else if ("next" === n) {
          return _this.nextWord();
        } else if ("unrealize" === n) {
          _this.showMoreExplain();
          return _this.savePlan(-1);
        }
      };
    })(this));
    this.audio.addEventListener('ended', (function(_this) {
      return function() {
        return _this.removeClass(_this.audioBtn, "audioPlay");
      };
    })(this));
    return this;
  };

  LearningPage.prototype.eventSubscribe = function() {
    _topBanner.subscribe('getExplain_learning', (function(_this) {
      return function(publisher, type, data) {
        _this.setData(data);
        return _this.renderExplain();
      };
    })(this));
    return this;
  };

  return LearningPage;

})(Component.Components);

module.exports = LearningPage;
