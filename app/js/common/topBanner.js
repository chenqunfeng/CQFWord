var Common, Component, TopBanner,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component = require('./Component');

Common = require('./Common');

TopBanner = (function(superClass) {
  extend(TopBanner, superClass);

  function TopBanner(selector) {
    TopBanner.__super__.constructor.call(this, selector);
    this.init();
  }

  TopBanner.prototype.init = function() {
    return console.log("init");
  };

  TopBanner.prototype.render = function() {
    this.contain.innerHTML = this.template();
    return this.eventBind();
  };

  TopBanner.prototype.template = function() {
    var html;
    html = "<div class=\"logo fl pointer\" title=\"主页\"></div>\n<div class=\"searchContain fl\" title=\"搜索框\">\n    <span class=\"searchIcon fl\"></span>\n    <input class=\"search fl\" type=\"text\" autofocus=\"autofocus\" placeholder=\"搜索单词\">\n</div>\n<div class=\"confirm fl pointer\" title=\"确定\">\n    确定\n</div>";
    return html;
  };

  TopBanner.prototype.eventBind = function() {
    var confirm, input, logo;
    logo = this.contain.querySelector('.logo');
    input = this.contain.querySelector('.search');
    confirm = this.contain.querySelector('.confirm');
    document.addEventListener('keydown', (function(_this) {
      return function(e) {
        var v;
        if (13 === e.keyCode) {
          if ((v = input.value)) {
            return _this.getExplain(v);
          }
        }
      };
    })(this));
    confirm.addEventListener('click', (function(_this) {
      return function() {
        var v;
        if ((v = input.value)) {
          return _this.getExplain(v);
        }
      };
    })(this));
    return logo.addEventListener('click', (function(_this) {
      return function() {
        return ipcRenderer.send('change-index-window');
      };
    })(this));
  };

  TopBanner.prototype.chAnalysis = function(data) {
    var def, p1, p2;
    if ((def = data.definition)) {
      p1 = /(<p[^>]*>|<span[^>]+>|<\/span>|<a[^>]*>|<\/a>|[\n]|[0-9\u4e00-\u9fa5])/g;
      p2 = /<\/p>/g;
      data.definition = def.replace(p1, "").replace(p2, "\n");
    } else {
      data.definition = "暂无更多释义";
    }
    data.audio = "";
    return data;
  };

  TopBanner.prototype.enAnalysis = function(data) {
    var def, error, p1, p2;
    if ((def = data.definition)) {
      p1 = /([\n]|<ul>|<\/ul>|<li>)/g;
      p2 = /<\/li>/g;
      data.definition = def.replace(p1, "").replace(p2, "\n");
    } else {
      data.definition = "暂无更多释义";
    }
    if ((error = data.error)) {
      p1 = /(<span[^>]*>|<\/span>|[\n])/g;
      p2 = /<a[^>]*>/g;
      data.error = error.replace(p1, "").replace(p2, "<a class='reSearch pointer' name='reSearch'>");
    }
    data.audio = "http://dict.youdao.com/dictvoice?audio=" + data.content;
    return data;
  };

  TopBanner.prototype.analysis = function(html, v) {
    var c, data, fun, key, p, table;
    if (Common.isCh(v)) {
      fun = "chAnalysis";
    } else if (Common.isEn(v)) {
      fun = "enAnalysis";
    }
    if (fun) {
      data = {};
      table = {
        content: /<span.*class="keyword">(.+?)<\/span>/,
        pron: /<span.*class="phonetic">(.+?)<\/span>/,
        definition: /<div class="trans-container">([\s\S]+?)<\/div>/,
        error: /<p class="typo-rel">([\s\S]+?)<\/p>/
      };
      for (key in table) {
        p = table[key];
        c = html.match(p);
        c && (data[key] = c[1]);
        c || (data[key] = "");
      }
      data['sort'] = fun;
      return this[fun](data);
    }
  };

  TopBanner.prototype.getExplain = function(v, postfix) {
    var url;
    Common.loading();
    url = "http://youdao.com/w/" + v;
    return fetch(url).then((function(_this) {
      return function(response) {
        return response.text().then(function(html) {
          var data, t;
          t = "getExplain";
          if (postfix) {
            t = t + '_' + postfix;
          }
          Common.loaded();
          data = _this.analysis(html, v);
          return _this.publish(t, data);
        });
      };
    })(this));
  };

  return TopBanner;

})(Component.Components);

module.exports = TopBanner;
