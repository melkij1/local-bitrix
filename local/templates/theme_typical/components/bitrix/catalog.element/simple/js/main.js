/*--GLOBAL--*/
  var GLOBAL = GLOBAL || {};

  GLOBAL.parseData = function parseData(data) {
    try {
      data = JSON.parse(data.replace(/'/gim, '"'));
    } catch(e) {
      data = {};
    }
    return data;
  };
  
  GLOBAL.stopEvent = function(event, mode) {
    if (arguments.length == 0 || !event || !jQuery) {
      return;
    } else {
      if ((arguments.length == 1 || (''+mode).toLowerCase().search(/(^|\|)propagation($|\|)/) != -1 ) && jQuery.isFunction(event.stopPropagation)) {
        event.stopPropagation();
      }
      if ((arguments.length == 1 || (''+mode).toLowerCase().search(/(^|\|)default($|\|)/) != -1) && jQuery.isFunction(event.preventDefault)) {
        event.preventDefault();
      }
      if ((arguments.length == 2 && (''+mode).toLowerCase().search(/(^|\|)immediate($|\|)/) != -1) && jQuery.isFunction(event.stopImmediatePropagation)) {
        event.stopImmediatePropagation();
      }
    }
  };
/*--/global--*/


/*--FANCYBOX--*/
  GLOBAL.fancybox = GLOBAL.fancybox || {};
    GLOBAL.fancybox.common = GLOBAL.fancybox.common || {};
      GLOBAL.fancybox.common.title = false;
      GLOBAL.fancybox.common.fitToView = true;
      GLOBAL.fancybox.common.tpl = GLOBAL.fancybox.common.tpl || {};
        GLOBAL.fancybox.common.tpl.closeBtn = '<a class="fancybox-close" href="javascript:;" title="Закрыть">&#215;</a>';

  GLOBAL.fancybox.popup = GLOBAL.fancybox.popup || {};
    GLOBAL.fancybox.popup.wrapCSS = 'fancy-popup';
    GLOBAL.fancybox.popup.padding = 0;
    GLOBAL.fancybox.popup.openSpeed = 100;
    GLOBAL.fancybox.popup.closeSpeed = 100;
    

  GLOBAL.fancybox.img = GLOBAL.fancybox.img || {};
    GLOBAL.fancybox.img.wrapCSS = 'fancy-popup-img';
    GLOBAL.fancybox.img.type = 'ajax';
    GLOBAL.fancybox.img.beforeShow = function () {
      initOwlCarousel();
      initGallery();
      var src = jQuery('.product-gallery-list .JS-Gallery-Link.product-gallery__l_active').attr('href'),
			    obj = jQuery('.popup-gallery__list').find('.product-gallery__label[href^="' + src + '"]');
			jQuery(obj).trigger('click');
		};
    GLOBAL.fancybox.img.afterShow = function(){
      
      //initGallery();
    };
		
  GLOBAL.fancybox.buy = GLOBAL.fancybox.buy || {};

GLOBAL.fancybox.buy_click = GLOBAL.fancybox.buy_click || {};
  	GLOBAL.fancybox.buy_click.beforeShow = function(){
  		RSReD_buy1click();
  	};

GLOBAL.fancybox.buy_set_click = GLOBAL.fancybox.buy_set_click || {};
    GLOBAL.fancybox.buy_set_click.beforeShow = function(){
      RSReDSetBuy1click();
    };

		
  GLOBAL.fancybox.ajax = GLOBAL.fancybox.ajax || {};
    GLOBAL.fancybox.ajax.wrapCSS = 'fancy-popup_wide';
    GLOBAL.fancybox.ajax.type = 'ajax';

  function initPopup() {
    if(!jQuery.fancybox) {
      return;
    }

    jQuery('.JS-Popup').fancybox(jQuery.extend({}, GLOBAL.fancybox.common, GLOBAL.fancybox.popup, { }));


		if(!RSDevFunc_PHONETABLET){
		  jQuery('.JS-Popup-Img').fancybox(jQuery.extend({}, GLOBAL.fancybox.common, GLOBAL.fancybox.popup, GLOBAL.fancybox.img, { }));
    }
    
		jQuery('.JS-Popup-Buy').fancybox(jQuery.extend({}, GLOBAL.fancybox.common, GLOBAL.fancybox.popup, GLOBAL.fancybox.buy, { }));
		
		jQuery('.JS-Popup-Buy_Click1').fancybox(jQuery.extend({}, GLOBAL.fancybox.common, GLOBAL.fancybox.popup, GLOBAL.fancybox.buy_click, GLOBAL.fancybox.ajax,{ }));

    jQuery('.JS-Popup-Buy_Set_Click1').fancybox(jQuery.extend({}, GLOBAL.fancybox.common, GLOBAL.fancybox.popup, GLOBAL.fancybox.buy_set_click, GLOBAL.fancybox.ajax,{ }));
		
    jQuery('.JS-Popup-Ajax').fancybox(jQuery.extend({}, GLOBAL.fancybox.common, GLOBAL.fancybox.popup, GLOBAL.fancybox.ajax,{ }));

    jQuery('.JS-Popup-Close').on('click', function(){
      jQuery.fancybox.close();
    });
  }

  function openPopup(popup, mode, params) {
    jQuery.fancybox(jQuery(popup), jQuery.extend({}, GLOBAL.fancybox.common, GLOBAL.fancybox[mode] || GLOBAL.fancybox.popup, params || {}));
  }
/*--/fancybox--*/


/*--OWLCAROUSEL--*/
  GLOBAL.owlCarousel = GLOBAL.owlCarousel || {};
    GLOBAL.owlCarousel.common = GLOBAL.owlCarousel.common || {};
     GLOBAL.owlCarousel.common.loop = true;
     GLOBAL.owlCarousel.common.autoPlay = false;
     GLOBAL.owlCarousel.common.nav = true;
     GLOBAL.owlCarousel.common.smartSpeed = 300;
     GLOBAL.owlCarousel.common.dotsSpeed = 400;
     GLOBAL.owlCarousel.common.items = 1;
     GLOBAL.owlCarousel.common.navText = false;
			GLOBAL.owlCarousel.common.onRefresh= function () {
				this.settings.loop = (this._items.length <= this.settings.items) ? false : this.options.loop;
			};
			GLOBAL.owlCarousel.common.onInitialize= function () {
				this.settings.loop = (this.$element.children().size() <= this.settings.items) ? false : this.options.loop;
			};
			GLOBAL.owlCarousel.common.onInitialized= function () {
				this.$element.addClass('owl-carousel');
			};
			GLOBAL.owlCarousel.common.onResize= function () {
				this.settings.loop = (this._items.length <= this.settings.items) ? false : this.options.loop;
			};

    GLOBAL.owlCarousel.simple = GLOBAL.owlCarousel.simple || {};
      GLOBAL.owlCarousel.simple.nav = false;

    GLOBAL.owlCarousel.detailBig = GLOBAL.owlCarousel.detailBig || {};
      GLOBAL.owlCarousel.detailBig.onChanged = function (event) {
        changeImgDetail(event);
      };

    GLOBAL.owlCarousel.multi = GLOBAL.owlCarousel.multi || {};
      GLOBAL.owlCarousel.multi.smartSpeed = 200;
      GLOBAL.owlCarousel.multi.fluidSpeed = 200;
      GLOBAL.owlCarousel.multi.dots = false;
      GLOBAL.owlCarousel.multi.responsive = {1024:{items:7}, 768:{items:5}, 400:{items:4}, 0:{items:2}};

    GLOBAL.owlCarousel.fix = GLOBAL.owlCarousel.fix || {};
      GLOBAL.owlCarousel.fix.margin = 17;

    GLOBAL.owlCarousel.products = GLOBAL.owlCarousel.products || {};
      GLOBAL.owlCarousel.products.responsive = {1024:{items:4}, 768:{items:3},0:{items:2}};

    GLOBAL.owlCarousel.rare = GLOBAL.owlCarousel.rare || {};
      GLOBAL.owlCarousel.rare.margin = 16;
      GLOBAL.owlCarousel.rare.responsive = {1024:{items:4}, 850:{items:3},490:{items:2},0:{items:1}};

    GLOBAL.owlCarousel.extra = GLOBAL.owlCarousel.extra || {};
      GLOBAL.owlCarousel.extra.dots = false;
      GLOBAL.owlCarousel.extra.margin = 10;
      GLOBAL.owlCarousel.extra.responsive = {768:{items:3}, 660:{items:2}, 0:{items:1}};

    GLOBAL.owlCarousel.gallery = GLOBAL.owlCarousel.gallery || {};
      GLOBAL.owlCarousel.gallery.dots = false;
      GLOBAL.owlCarousel.gallery.margin = 6;
      GLOBAL.owlCarousel.gallery.items = 4;

    GLOBAL.owlCarousel.set = GLOBAL.owlCarousel.set || {};
      GLOBAL.owlCarousel.set.dots = false;
      GLOBAL.owlCarousel.set.loop = false;
      GLOBAL.owlCarousel.set.margin = 54;
      GLOBAL.owlCarousel.set.responsive = {1024:{items:4}, 768:{items:3}, 660:{items:2}, 0:{items:2, margin:18}};

    GLOBAL.owlCarousel.setinit = GLOBAL.owlCarousel.setinit || {};
      GLOBAL.owlCarousel.setinit.dots = false;
      GLOBAL.owlCarousel.setinit.loop = false;
      GLOBAL.owlCarousel.setinit.responsive = {1024:{items:5}, 940:{items:4}, 768:{items:3}, 660:{items:2}, 0:{items:2}};
			
    GLOBAL.owlCarousel.catalog = GLOBAL.owlCarousel.catalog || {};
      GLOBAL.owlCarousel.catalog.dots = false;
      GLOBAL.owlCarousel.catalog.responsive = {1024:{items:5}, 940:{items:4}, 768:{items:3}, 660:{items:2}, 0:{items:2}};

    GLOBAL.owlCarousel.selection = GLOBAL.owlCarousel.selection || {};
      GLOBAL.owlCarousel.selection.dots = false;
      GLOBAL.owlCarousel.selection.responsive = {1240:{items:4}, 1024:{items:3}, 400:{items:2}, 0:{items:1}};

  function initOwlCarousel() {
    jQuery('.JS-Slider').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, {}));

    jQuery('.JS-SliderSimple').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.simple, {}));

    jQuery('.JS-SliderBigDetail').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.simple, GLOBAL.owlCarousel.detailBig, {}));
		
    jQuery('.JS-Slider-Multi').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.multi, {}));

    jQuery('.JS-Slider-Multi-Fix').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.multi, GLOBAL.owlCarousel.fix, {}));

    jQuery('.JS-Slider-Products').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.multi, GLOBAL.owlCarousel.products, {}));

    jQuery('.JS-Slider-Products-Rare').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.multi, GLOBAL.owlCarousel.products, GLOBAL.owlCarousel.rare, {}));

    jQuery('.JS-Slider-Products-Extra').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.extra, {}));

    jQuery('.JS-Slider-Gallery').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.gallery, {}));

    jQuery('.JS-Slider-Set').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.set, {}));
		
    jQuery('.JS-Slider-Catalog').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.catalog, {}));

    jQuery('.JS-Slider-Selection').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.selection, {}));
  }
	
  function initOwlCarouselSetinit() {
		jQuery('.JS-Slider-Setinit').owlCarousel(jQuery.extend({}, GLOBAL.owlCarousel.common, GLOBAL.owlCarousel.setinit, {}));
  }
/*--/owlCarousel--*/

/*--INIT--*/
  function initDropdown() {
    var common = {
      classActive : 'dropdown-active'
    };

    jQuery('.JS-Dropdown').not('.JS-Dropdown-ready').each(function(){
      new Dropdown(this, common);
    });
  }

  function initDrop() {
    var common = {
      classActive : 'drop-active'
    };

    jQuery('.JS-Drop').not('.JS-Drop-ready').each(function(){
      new Drop(this, common);
    });
  }

  function initDropdownMenu() {
    var position,
        common;

    common = {
      classActive : 'dropdown-active',
      duration : 200,
      onBeforeShow : function() {
        position = jQuery(window).scrollTop();
      },
      onShow : function() {
        if (!jQuery('body').hasClass('body-fix')) {
          jQuery('body').addClass('body-fix');
        }
      },
      onHide : function() {
        jQuery('body').removeClass('body-fix');
        jQuery(window).trigger('js-multilevel-start');

        jQuery(window).scrollTop(position);
      }
    };

    jQuery('.JS-Dropdown-Mobile').not('.JS-Dropdown-ready').each(function(){
      new Dropdown(this, common);
    });
  }

  function initDropdownSearch() {
    var common = {
      classActive : 'dropdown-active',
      onShow : function($element) {
        $element.find('.JS-Dropdown-Search-Input').focus();
      }
    };

    jQuery('.JS-Dropdown-Search').not('.JS-Dropdown-ready').each(function(){
      new Dropdown(this, common);
    });
  }

  function initAdaptiveMenu() {
    if (typeof(AdaptiveMenu) === 'undefined' || !jQuery.isFunction(AdaptiveMenu)) {
      return false;
    }

    var common = {
      classHidden : 'g-hidden',
      classUnvisible : 'g-unvisible',
      classActive : 'catalog-menu_active'
    };

    jQuery('.JS-AdaptiveMenu').not('.JS-AdaptiveMenu-ready').each(function(){
      new AdaptiveMenu(this, common);
    });
  }

  function initMultilevelMenu() {
    if (typeof(MultilevelMenu) === 'undefined' || !jQuery.isFunction(MultilevelMenu)) {
      return false;
    }

    var common = {};

    jQuery('.JS-MultilevelMenu').not('.JS-MultilevelMenu-ready').each(function(){
      var local = GLOBAL.parseData(jQuery(this).data('multilevelmenu'));
      new MultilevelMenu(this, jQuery.extend({}, common, local));
    });
  }

  function initAccordion() {
    if (typeof Accordion === 'undefined' || !jQuery.isFunction(Accordion)) {
      return false;
    }

    var common = {
      duration: 150,
      classActive: 'accordion-active'
    };

    jQuery('.JS-Accordion').not('.JS-Accordion-ready').each(function() {
       new Accordion(this, common);
    });
  }
  
  function initShiftsMenu() {
    if (typeof ShiftsMenu === 'undefined' || !jQuery.isFunction(ShiftsMenu)) {
      return false;
    }

    var common = {
      classActive : 'catalog-menu-active'
    };

    jQuery('.JS-ShiftsMenu').not('.JS-ShiftsMenu-ready').each(function() {
      new ShiftsMenu(this, common);
    });
  }

  function initHelp() {
    jQuery('.JS-Help').each(function() {
      var $field = jQuery(this).find('.JS-Help-Field'),
        $switcher = jQuery(this).find('.JS-Help-Switcher'),
        text;

      $switcher.click(function() {
        text = jQuery(this).text();
        $field.val(text);
      });
    });
  }

  function startMap() {
    if (typeof(Map) === 'undefined' || !jQuery.isFunction(Map)) {
      return false;
    }

    var common = {};

    jQuery('.JS-Map').not('.JS-Map-ready').each(function(){
      var local = GLOBAL.parseData(jQuery(this).data('map'));
      new Map(this, jQuery.extend({}, common, local));
    });
  }

  function initMap() {
    if (typeof(ymaps) === 'undefined') {
      return false;
    }

    ymaps.ready(startMap);
  }

  /*function startMap() {
    if (typeof(Map) === 'undefined' || !jQuery.isFunction(Map)) {
      return false;
    }

    var common = {};

    jQuery('.JS-Map').not('.JS-Map-ready').each(function(){
      var local = GLOBAL.parseData(jQuery(this).data('map'));
      new Map(this, jQuery.extend({}, common, local));
    });
  }*/

  function initSelect() {
    if (typeof(Select) === 'undefined' || !jQuery.isFunction(Select)) {
      return false;
    }

    var common = {
      onSetValue : function() {
        jQuery(document).trigger('js-dropdown-close');
      },
      onSetFocus : function() {
        jQuery(document).trigger('js-dropdown-close');
      }
    };

    jQuery('.JS-Select').not('.JS-Select-ready').each(function(){
      var local = GLOBAL.parseData(jQuery(this).data('select'));
      new Select(this, jQuery.extend({}, common, local));
    });
  }

  function initDigitalField( ){
    function getChar(event) {
      if (event.which == null) {  // IE
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode)
      }

      if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which);
      }
      return null;
    }

    jQuery('.JS-DigitalField').each(function(){
      var digitalField = jQuery(this);

      digitalField.on('keypress', function(e){
        var pressedChar = getChar(e);

        if (e.ctrlKey || e.altKey || e.metaKey) {
          return;
        }
        if ( pressedChar < '0' || pressedChar > '9' ) {
          return false;
        }
      });
    });
  }

  function initGallery() {
    if (typeof(Gallery) === 'undefined' || !jQuery.isFunction(Gallery)) {
      return false;
    }

    var common = {};

    jQuery('.JS-Gallery').not('.JS-Gallery-ready').each(function() {
      var local = GLOBAL.parseData(jQuery(this).data('gallery'));
      new Gallery(this, jQuery.extend({}, common, local));
    });
  }

  function initTab() {
    if (typeof(Tab) === 'undefined' || !jQuery.isFunction(Tab)) {
      return false;
    }

    var common = {};

    jQuery('.JS-Tab').not('.JS-Tab-ready').each(function() {
      var local = GLOBAL.parseData(jQuery(this).data('tab'));
      new Tab(this, jQuery.extend({}, common, local));
    });
  }

  function initRatingDecor() {
    if (typeof(RatingDecor) === 'undefined' || !jQuery.isFunction(RatingDecor)) {
      return false;
    }

    var common = {};

    jQuery('.JS-RatingDecor').not('.JS-RatingDecor-ready').each(function() {
      var local = GLOBAL.parseData(jQuery(this).data('rating-decor'));
      new RatingDecor(this, jQuery.extend({}, common, local));
    });
  }

  function initFix() {
    if (typeof(Fix) === 'undefined' || !jQuery.isFunction(Fix)) {
      return false;
    }

    var common = {};

    jQuery('.JS-Fix').not('.JS-Fix-ready').each(function() {
      var local = GLOBAL.parseData(jQuery(this).data('fix'));
      new Fix(this, jQuery.extend({}, common, local));
    });
  }
/*--/init--*/


jQuery(function(){
  initPopup();
  initDropdown();
  initDrop();
  initDropdownMenu();
  initDropdownSearch();
  initAdaptiveMenu();
  initMultilevelMenu();
  initOwlCarousel();
	initOwlCarouselSetinit();
  initAccordion();
  initShiftsMenu();
  initHelp();
  initMap();
  initSelect();
  initDigitalField();
  initGallery();
  initTab();
  initRatingDecor();
  initFix();
});
