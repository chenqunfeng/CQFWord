var Component, Loading,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Component = require('../common/Component');

Loading = (function(superClass) {
  extend(Loading, superClass);

  function Loading(selector) {
    Loading.__super__.constructor.call(this, selector);
    this.init();
  }

  Loading.prototype.init = function() {
    return console.log("Loading init");
  };

  return Loading;

})(Component.Components);

module.exports = Loading;
