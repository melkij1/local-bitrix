!function(global) {
  'use strict';

  function Dropdown(elem, params) {
    this.$element = jQuery(elem);
    this.params = params || {};

    this.onInit = this.params.onInit || null;
    this.onBeforeShow = this.params.onBeforeShow || null;
    this.onShow = this.params.onShow || null;
    this.onHide = this.params.onHide || null;
    this.duration = this.params.duration || 0;
    this.classReady = this.params.classReady || 'JS-Dropdown-ready';
    this.classActive = this.params.classActive || 'dropdown-active';

    this.__construct();
  };

  Dropdown.prototype.__construct = function __construct() {
    this.$document = jQuery(document);
    this.$all = jQuery('*');
    this.$menu = this.$element.find('.JS-Dropdown-Menu');
    this.$switcher = this.$element.find('.JS-Dropdown-Switcher');
    this.$overlay = this.$element.find('.JS-Dropdown-Overlay');

    this._init();
  };

  Dropdown.prototype._init = function _init() {
    var _this = this;

    if( jQuery.isFunction(this.onInit) ){
      this.onInit.apply(window, []);
    }

    this.$switcher.on('click.JS-Dropdown', function(e, data) {
      GLOBAL.stopEvent(e);
      _this._toggle.apply(_this, []);
    });

    this.$overlay.on('click.JS-Dropdown', function(e, data) {
      _this._toggle.apply(_this, []);
    });

    this.$all.on('click.JS-Dropdown', function(e, data) {
      _this._clickOutside(e);
    });
		
    this.$document.on('js-dropdown-close', function(e, data) {
      _this._hide();
    });

    this._ready();
  };

  Dropdown.prototype._ready = function _ready() {
    this.$element
      .addClass('JS-Dropdown-ready')
      .addClass(this.classReady);
  };

  Dropdown.prototype._clickOutside = function _clickOutside(e) {
    if ((!this.$element.is(e.target)) && (this.$element.has(e.target).length === 0)) {
      this._hide();
    }
  };

  Dropdown.prototype._beforeShow = function _beforeShow() {
    if( jQuery.isFunction(this.onBeforeShow) ){
      this.onBeforeShow.apply(window, []);
    }
  };

  Dropdown.prototype._show = function _show() {
    this.$element.addClass(this.classActive);

    this.$menu.slideDown(this.duration);

    if( jQuery.isFunction(this.onShow) ){
      this.onShow.apply(window, [this.$element]);
    }
  };

  Dropdown.prototype._hide = function _hide() {
    this.$element.removeClass(this.classActive);

    this.$menu.slideUp(this.duration);

    if( jQuery.isFunction(this.onHide) ){
      this.onHide.apply(window, [this.$element]);
    }
  };
  
  Dropdown.prototype._toggle = function _toggle(e) {
    if (!this.$element.hasClass(this.classActive)) {
      this._beforeShow();
      this._show();
    } else {
      this._hide();
    }
  };
  /*--/Dropdown--*/

  global.Dropdown = Dropdown;
}(this);
