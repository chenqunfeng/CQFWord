var Components, Events,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Events = (function() {
  function Events() {
    this.subscription = {};
  }

  Events.prototype.subscribe = function(type, fn, cons) {
    var f, id, p, r;
    if ("undefined" === typeof this.subscription.eventmap) {
      this.subscription.eventmap = {};
    }
    if ("undefined" === typeof this.subscription[type]) {
      this.subscription[type] = [];
    }
    p = this.subscription[type];
    r = false;
    if (p.length > 0) {
      f = fn.toString();
      r = !this.each.call(p, function(item) {
        if (item && f === item.response.toString() && cons && cons === item.caller) {
          return false;
        }
      });
    }
    if (false === r) {
      id = Math.floor(Math.random() * 1000000000000000).toString(36);
      this.subscription.eventmap[id] = type;
      p.push({
        "id": id,
        "response": fn,
        "caller": cons
      });
    }
    return id;
  };

  Events.prototype.publish = function(type) {
    var p, params, publisher;
    p = this.subscription[type];
    if (p && p.length) {
      params = arguments.length > 0 ? Array.prototype.slice.call(arguments) : [];
      publisher = this;
      params.unshift(publisher);
      this.each.call(p, function(item) {
        var cons;
        if (item) {
          cons = item.caller || null;
          return item.response.apply(cons, params);
        }
      });
    }
    return this;
  };

  Events.prototype.unsubscribe = function(id, handle) {
    var map, p, type;
    if ("string" === typeof id) {
      if ("type" === handle) {
        this.subscription[type] && (this.subscription[type].length = 0);
      } else {
        map = this.subscription.eventmap;
        type = map[id];
        if (type) {
          p = this.subscription[type];
          if (p && p.length > 0) {
            this.each.call(p, function(item, index) {
              if (item && id === item.id) {
                p[index] = null;
                map[id] = null;
                delete map[id];
                return false;
              }
            });
          }
        }
      }
    } else {
      this.subscription = {};
    }
    return this;
  };

  Events.prototype.each = function(fn) {
    var i, index, item, key, len, len1, params, result;
    len = this.length;
    params = arguments.length > 1 ? Array.prototype.slice.call(arguments) : [];
    params.length > 1 && params.shift();
    if (len) {
      for (index = i = 0, len1 = this.length; i < len1; index = ++i) {
        item = this[index];
        result = fn.apply(this, [item, index].concat(params));
        if (result === false) {
          return false;
        }
      }
    } else {
      for (key in this) {
        item = this[key];
        if (this.hasOwnProperty(key)) {
          result = fn.apply(this, [item, key].concat(params));
          if (result === false) {
            return false;
          }
        }
      }
    }
    return true;
  };

  return Events;

})();

Components = (function(superClass) {
  extend(Components, superClass);

  function Components(selector) {
    var node;
    Components.__super__.constructor.call(this);
    this.contain = null;
    if ("string" === typeof selector) {
      node = document.querySelector(selector);
    } else if ("object" === typeof selector && selector.nodeType && 1 === selector.nodeType) {
      node = selector;
    }
    if (node && node.getAttribute) {
      this.contain = node;
    }
    this.subscribe("render", this.init, this);
  }

  Components.prototype.render = function(fn) {
    fn.call(this);
    return this.publish("render");
  };

  Components.prototype.init = function() {};

  Components.prototype.contains = function(parent, child) {
    if (parent === child) {
      return 0;
    }
    if (parent.contains) {
      if (parent.contains(child)) {
        return 1;
      }
    } else {
      if (!!(parent.compareDocumentPosition(child) & 16)) {
        return 1;
      }
    }
    return -1;
  };

  Components.prototype.upperStyleName = function(s) {
    return s && s.length && s.replace(/-([a-z])/g, function(a, b) {
      return b.toUpperCase();
    }) || '';
  };

  Components.prototype.lowerStyleName = function(s) {
    return s && s.length && s.replace(/([A-Z])/g, function(a, b) {
      return '-' + b.toLowerCase();
    }) || '';
  };

  Components.prototype.addClass = function(node, className) {
    if (node && node.getAttribute) {
      if (!this.hasClass(node, className)) {
        node.className += " " + className;
      }
    }
    return this;
  };

  Components.prototype.removeClass = function(node, className) {
    var oldClass, reg;
    if (node && node.getAttribute) {
      if (this.hasClass(node, className)) {
        oldClass = node.className;
        reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
        node.className = oldClass.replace(reg, " ").replace(/(^\s+|\s+$)/g, "");
      }
    }
    return this;
  };

  Components.prototype.hasClass = function(node, className) {
    var reg;
    if (node && node.getAttribute) {
      reg = new RegExp("(^|\\s)" + className + "(\\s|$)");
      return node.className && reg.test(node.className);
    }
    return false;
  };

  return Components;

})(Events);

module.exports = {
  Events: Events,
  Components: Components
};
