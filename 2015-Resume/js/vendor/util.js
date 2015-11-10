// Generated by CoffeeScript 1.8.0
(function() {
  var ESCAPE_HTML_MAP, ESCAPE_HTML_REGEXP, ESCAPE_REGEXP, HIGHLIGHT_DEFAULTS, buildFragment,
    __slice = [].slice;

  this.$ = function(selector, el) {
    if (el == null) {
      el = document;
    }
    try {
      return el.querySelector(selector);
    } catch (_error) {

    }
  };

  this.$$ = function(selector, el) {
    if (el == null) {
      el = document;
    }
    try {
      return el.querySelectorAll(selector);
    } catch (_error) {

    }
  };

  $.id = function(id) {
    return document.getElementById(id);
  };

  $.hasChild = function(parent, el) {
    if (!parent) {
      return;
    }
    while (el) {
      if (el === parent) {
        return true;
      }
      if (el === document.body) {
        return;
      }
      el = el.parentElement;
    }
  };

  $.closestLink = function(el, parent) {
    if (parent == null) {
      parent = document.body;
    }
    while (el) {
      if (el.tagName === 'A') {
        return el;
      }
      if (el === parent) {
        return;
      }
      el = el.parentElement;
    }
  };

  $.on = function(el, event, callback) {
    var name, _i, _len, _ref;
    if (event.indexOf(' ') >= 0) {
      _ref = event.split(' ');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        $.on(el, name, callback);
      }
    } else {
      el.addEventListener(event, callback);
    }
  };

  $.off = function(el, event, callback) {
    var name, _i, _len, _ref;
    if (event.indexOf(' ') >= 0) {
      _ref = event.split(' ');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        $.off(el, name, callback);
      }
    } else {
      el.removeEventListener(event, callback);
    }
  };

  $.trigger = function(el, type, canBubble, cancelable) {
    var event;
    if (canBubble == null) {
      canBubble = true;
    }
    if (cancelable == null) {
      cancelable = true;
    }
    event = document.createEvent('Event');
    event.initEvent(type, canBubble, cancelable);
    el.dispatchEvent(event);
  };

  $.click = function(el) {
    var event;
    event = document.createEvent('MouseEvent');
    event.initMouseEvent('click', true, true, window, null, 0, 0, 0, 0, false, false, false, false, 0, null);
    el.dispatchEvent(event);
  };

  $.stopEvent = function(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
  };

  buildFragment = function(value) {
    var child, fragment, _i, _len, _ref;
    fragment = document.createDocumentFragment();
    if ($.isCollection(value)) {
      _ref = $.makeArray(value);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        child = _ref[_i];
        fragment.appendChild(child);
      }
    } else {
      fragment.innerHTML = value;
    }
    return fragment;
  };

  $.append = function(el, value) {
    if (typeof value === 'string') {
      el.insertAdjacentHTML('beforeend', value);
    } else {
      if ($.isCollection(value)) {
        value = buildFragment(value);
      }
      el.appendChild(value);
    }
  };

  $.prepend = function(el, value) {
    if (!el.firstChild) {
      $.append(value);
    } else if (typeof value === 'string') {
      el.insertAdjacentHTML('afterbegin', value);
    } else {
      if ($.isCollection(value)) {
        value = buildFragment(value);
      }
      el.insertBefore(value, el.firstChild);
    }
  };

  $.before = function(el, value) {
    if (typeof value === 'string' || $.isCollection(value)) {
      value = buildFragment(value);
    }
    el.parentElement.insertBefore(value, el);
  };

  $.after = function(el, value) {
    if (typeof value === 'string' || $.isCollection(value)) {
      value = buildFragment(value);
    }
    if (el.nextSibling) {
      el.parentElement.insertBefore(value, el.nextSibling);
    } else {
      el.parentElement.appendChild(value);
    }
  };

  $.remove = function(value) {
    var el, _i, _len, _ref;
    if ($.isCollection(value)) {
      _ref = $.makeArray(value);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        el = _ref[_i];
        el.parentElement.removeChild(el);
      }
    } else {
      value.parentElement.removeChild(value);
    }
  };

  $.empty = function(el) {
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }
  };

  $.batchUpdate = function(el, fn) {
    var parent, sibling;
    parent = el.parentNode;
    sibling = el.nextSibling;
    parent.removeChild(el);
    fn(el);
    if (sibling) {
      parent.insertBefore(el, sibling);
    } else {
      parent.appendChild(el);
    }
  };

  $.rect = function(el) {
    return el.getBoundingClientRect();
  };

  $.offset = function(el, container) {
    var left, top;
    if (container == null) {
      container = document.body;
    }
    top = 0;
    left = 0;
    while (el && el !== container) {
      top += el.offsetTop;
      left += el.offsetLeft;
      el = el.offsetParent;
    }
    return {
      top: top,
      left: left
    };
  };

  $.scrollParent = function(el) {
    var _ref;
    while (el = el.parentElement) {
      if (el.scrollTop > 0) {
        break;
      }
      if ((_ref = getComputedStyle(el).overflowY) === 'auto' || _ref === 'scroll') {
        break;
      }
    }
    return el;
  };

  $.scrollTo = function(el, parent, position, options) {
    var height, parentHeight, scrollTop, top;
    if (position == null) {
      position = 'center';
    }
    if (options == null) {
      options = {};
    }
    if (!el) {
      return;
    }
    if (parent == null) {
      parent = $.scrollParent(el);
    }
    if (!parent) {
      return;
    }
    parentHeight = parent.clientHeight;
    if (!(parent.scrollHeight > parentHeight)) {
      return;
    }
    top = $.offset(el, parent).top;
    switch (position) {
      case 'top':
        parent.scrollTop = top - (options.margin != null ? options.margin : 20);
        break;
      case 'center':
        parent.scrollTop = top - Math.round(parentHeight / 2 - el.offsetHeight / 2);
        break;
      case 'continuous':
        scrollTop = parent.scrollTop;
        height = el.offsetHeight;
        if (top <= scrollTop + height * (options.topGap || 1)) {
          parent.scrollTop = top - height * (options.topGap || 1);
        } else if (top >= scrollTop + parentHeight - height * ((options.bottomGap || 1) + 1)) {
          parent.scrollTop = top - parentHeight + height * ((options.bottomGap || 1) + 1);
        }
    }
  };

  $.scrollToWithImageLock = function() {
    var args, el, image, parent, _i, _len, _ref;
    el = arguments[0], parent = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
    if (parent == null) {
      parent = $.scrollParent(el);
    }
    if (!parent) {
      return;
    }
    $.scrollTo.apply($, [el, parent].concat(__slice.call(args)));
    _ref = parent.getElementsByTagName('img');
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      image = _ref[_i];
      if (!image.complete) {
        (function() {
          var onLoad, timeout, unbind;
          onLoad = function(event) {
            clearTimeout(timeout);
            unbind(event.target);
            return $.scrollTo.apply($, [el, parent].concat(__slice.call(args)));
          };
          unbind = function(target) {
            return $.off(target, 'load', onLoad);
          };
          $.on(image, 'load', onLoad);
          return timeout = setTimeout(unbind.bind(null, image), 3000);
        })();
      }
    }
  };

  $.lockScroll = function(el, fn) {
    var parent, top;
    if (parent = $.scrollParent(el)) {
      top = $.rect(el).top;
      if (parent !== document.body && parent !== document.documentElement) {
        top -= $.rect(parent).top;
      }
      fn();
      parent.scrollTop = $.offset(el, parent).top - top;
    } else {
      fn();
    }
  };

  $.extend = function() {
    var key, object, objects, target, value, _i, _len;
    target = arguments[0], objects = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    for (_i = 0, _len = objects.length; _i < _len; _i++) {
      object = objects[_i];
      if (object) {
        for (key in object) {
          value = object[key];
          target[key] = value;
        }
      }
    }
    return target;
  };

  $.makeArray = function(object) {
    if (Array.isArray(object)) {
      return object;
    } else {
      return Array.prototype.slice.apply(object);
    }
  };

  $.isCollection = function(object) {
    return Array.isArray(object) || typeof (object != null ? object.item : void 0) === 'function';
  };

  ESCAPE_HTML_MAP = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;'
  };

  ESCAPE_HTML_REGEXP = /[&<>"'\/]/g;

  $.escape = function(string) {
    return string.replace(ESCAPE_HTML_REGEXP, function(match) {
      return ESCAPE_HTML_MAP[match];
    });
  };

  ESCAPE_REGEXP = /([.*+?^=!:${}()|\[\]\/\\])/g;

  $.escapeRegexp = function(string) {
    return string.replace(ESCAPE_REGEXP, "\\$1");
  };

  $.urlDecode = function(string) {
    return decodeURIComponent(string.replace(/\+/g, '%20'));
  };

  $.noop = function() {};

  $.popup = function(value) {
    open(value.href || value, '_blank');
  };

  $.isTouchScreen = function() {
    return typeof ontouchstart !== 'undefined';
  };

  $.isWindows = function() {
    var _ref;
    return ((_ref = navigator.platform) != null ? _ref.indexOf('Win') : void 0) >= 0;
  };

  $.isMac = function() {
    var _ref;
    return ((_ref = navigator.userAgent) != null ? _ref.indexOf('Mac') : void 0) >= 0;
  };

  HIGHLIGHT_DEFAULTS = {
    className: 'highlight',
    delay: 1000
  };

  $.highlight = function(el, options) {
    if (options == null) {
      options = {};
    }
    options = $.extend({}, HIGHLIGHT_DEFAULTS, options);
    el.classList.add(options.className);
    setTimeout((function() {
      return el.classList.remove(options.className);
    }), options.delay);
  };

}).call(this);