var Common, Component, TopBanner, config,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component = require('./Component');

Common = require('./Common');

config = require('./config');

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

  TopBanner.prototype.analysis = function(html, v) {
    var data, fun;
    data = JSON.parse(html);
    if (Common.isEn(v)) {
      fun = "enAnalysis";
      data.audio = "http://dict.youdao.com/dictvoice?audio=" + data.query;
    } else if (Common.isCh(v)) {
      fun = "chAnalysis";
    }
    data["sort"] = fun;
    return data;
  };

  TopBanner.prototype.getExplain = function(v, postfix) {
    var url;
    Common.loading();
    url = config.url + "?type=" + config.type + "&doctype=" + config.doctype + "&version=" + config.version + "&relatedUrl=" + config.relatedUrl + "&keyfrom=" + config.keyfrom + "&key=" + config.key + "&translate=" + config.translate + "&q=" + v;
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
