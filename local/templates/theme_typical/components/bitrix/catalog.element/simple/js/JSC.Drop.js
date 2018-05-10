!function(global) {
  'use strict';

  function Drop(elem, params) {
    this.$element = jQuery(elem);
    this.params = params || {};

    this.onInit = this.params.onInit || null;
    this.onShow = this.params.onShow || null;
    this.onHide = this.params.onHide || null;
    this.duration = this.params.duration || 0;
    this.classReady = this.params.classReady || 'JS-Drop-ready';
    this.classActive = this.params.classActive || 'drop-active';
    this.classVisible = this.params.classVisible || 'drop-visible';

    this.__construct();
  };

  Drop.prototype.__construct = function __construct() {
    this.$window = jQuery(window);
    this.$menu = this.$element.find('.JS-Drop-Menu');
    this.$switcher = this.$element.find('.JS-Drop-Switcher');
    this.$bar = this.$element.find('.JS-Drop-Bar');
    this.$content = this.$element.find('.JS-Drop-Content');

    this._init();
  };

  Drop.prototype._init = function _init() {
    var _this = this;

    if( jQuery.isFunction(this.onInit) ){
      this.onInit.apply(window, []);
    }

    this.$window.on('resize.JS-Drop', function(e, data) {
      _this._update.apply(_this, []);
    });

    this.$switcher.on('click.JS-Drop', function(e, data) {
      _this._toggle.apply(_this, []);
    });

    this._update();
    this._ready();
  };

  Drop.prototype._ready = function _ready() {
    this.$element
      .addClass('JS-Drop-ready')
      .addClass(this.classReady);
  };

  Drop.prototype._update = function _update() {
    var barHeight,
        contentHeight;

    barHeight = this.$bar.height();
    contentHeight = this.$content.height();

    if (contentHeight > barHeight) {
      this.$element
        .addClass('JS-Drop-Visible')
        .addClass(this.classVisible);
    } else {
      this.$element
        .removeClass('JS-Drop-Visible')
        .removeClass(this.classVisible);
    }
  };

  Drop.prototype._show = function _show() {
    this.$element.addClass(this.classActive);

    this.$menu.slideDown(this.duration);

    if( jQuery.isFunction(this.onShow) ){
      this.onShow.apply(window, [this.$element]);
    }
  };

  Drop.prototype._hide = function _hide() {
    this.$element.removeClass(this.classActive);

    this.$menu.slideUp(this.duration);

    if( jQuery.isFunction(this.onHide) ){
      this.onHide.apply(window, [this.$element]);
    }
  };
  
  Drop.prototype._toggle = function _toggle(e) {
    if (!this.$element.hasClass(this.classActive)) {
      this._show();
    } else {
      this._hide();
    }
  };
  /*--/Drop--*/

  global.Drop = Drop;
}(this);
