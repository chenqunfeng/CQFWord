var Component, Saying,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component = require('./Component');

Saying = (function(superClass) {
  extend(Saying, superClass);

  function Saying(selector) {
    Saying.__super__.constructor.call(this, selector);
    this.init();
  }

  Saying.prototype.init = function() {
    return this.collection = [
      {
        saying: "你仿佛在逗我笑！？",
        author: "CQF"
      }
    ];
  };

  Saying.prototype.getCollection = function() {
    var index, len;
    len = this.collection.length;
    index = parseInt(Math.random() * len);
    return this.collection[index];
  };

  Saying.prototype.render = function() {
    var collection;
    collection = this.getCollection();
    return this.contain.innerHTML = "<cite>\n    " + collection.saying + " -- " + collection.author + "\n</cite>";
  };

  return Saying;

})(Component.Components);

module.exports = Saying;
