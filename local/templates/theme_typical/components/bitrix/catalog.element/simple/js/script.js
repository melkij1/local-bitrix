var RSGoPro_Hider_called = false;

if (window.frameCacheVars !== undefined)
{
  BX.addCustomEvent("onFrameDataReceived" , function(json) {
    setTimeout(function(){
      reInitCompSite();
    },200);
  });
}

function reInitCompSite() {
  initTab();
  SetPropCheck();
  initDropdown();
  initSelect();
  ReDG_SetViewed();
}

function RSGoPro_Hider() {
  RSGoPro_Hider_called = true;
  $('.filter-box, #composite_sorter, .sort_extra').hide();
  $('.side-menu.side-menu_catalog').hide();
  $('.l-container').css('margin-left', '0');
}

function reInitAjax(){
    if(!RSDevFunc_PHONETABLET)
    {
      if($('.showcase .catalog-product').length > 0) {
        $('.showcase .catalog-product').addClass('pc-device');
      }      
    }
    callTimer();
    initTab();
    SetPropCheck();
    initDropdown();
    initSelect();
}

function RSReDGSortInner(json,ajaxpagesid, page, $linkObj) {
  json = BX.parseJSON(json);
  $template = $('#'+ajaxpagesid);
  if(page) {
    $template.find('.catalog-list').append(json.HTML["catalogproducts"]);
    if(json.HTML["catalogajaxpages"]) {
      $template.find('.ajaxpages').replaceWith( json.HTML["catalogajaxpages"] );
    } else {
      $template.find('.ajaxpages').remove();
    }
    ReDG_Area2Darken($('.ajaxpages'),'picload');
  } else {
    $template.html(json[ajaxpagesid]);
  }
  //FOR AJAXPAGES
  if($linkObj) {
    if(json.HTML.catalognames !== "undefined") {
      $('#'+ajaxpagesid).find('.gallery').append( json.HTML.catalognames );
    }
    if(json.HTML.catalogproducts !== "undefined") {
      $('#'+ajaxpagesid).find('.table').append( json.HTML.catalogproducts );
    }
    if(json.HTML.showcaseview !== "undefined") {
      $('#'+ajaxpagesid).find('#showcaseview').append( json.HTML.showcaseview );
    }
    if($linkObj && json.HTML.catalogajaxpages) {
      $linkObj.parents('.ajaxpages').replaceWith( json.HTML.catalogajaxpages );
    } else if($linkObj) {
      $linkObj.parents('.ajaxpages').remove();
    }
  }
}

function RSAL_HandlerFancyOnBeforeShow()
{
  if($('.fancybox-inner').find('.errortext').length>0)
    $('.fancybox-inner').find('.errortext').hide();
  if($('.fancybox-inner').find('.notetext').length>0)
    $('.fancybox-inner').find('.notetext').hide();
  if($('.fancybox-inner').find('.reviews-note-error').length>0)
    $('.fancybox-inner').find('.reviews-note-error').hide();
}



//   COMPARE
function add2compare(item) {
  var $linkObj = $(item),
    url = $linkObj.parents('.js-element').data('detail'),
    id = parseInt( $linkObj.parents('.js-element').data('elementid') ),
    action = '';
  if(id>0){
    if( url.indexOf('?')==-1 ) {
      url = url + '?';
    }
    if( ReDG_COMPARE[id]=='Y' || parseInt(ReDG_COMPARE[id])>0 ) {
      action = 'DELETE_FROM_COMPARE_LIST';
      $('.rsec_compare .rsec_cnt').html(ReDG_COUNT_COMPARE - 1);
    } else {
      action = 'ADD_TO_COMPARE_LIST';
      $('.rsec_compare .rsec_cnt').html(ReDG_COUNT_COMPARE + 1);
    }
    url = url+'AJAX_CALL=Y&action='+action+'&id='+id;
    if($linkObj.parents('.product-detail').length > 0)
    {
      ReDG_Area2Darken($linkObj.closest('.product-detail'), 'picload');
    }
    else {
      if(!$linkObj.closest('.element_section').hasClass('c-list__item'))
        ReDG_Area2Darken($linkObj.closest('.element_section'), 'picload');
      else
        ReDG_Area2Darken($linkObj.closest('.element_section'), '1');
    }
    $.getJSON(url, {}, function(json){
      if(json.TYPE=="OK"){
        if( action=='DELETE_FROM_COMPARE_LIST' ){ // delete from compare{
          delete ReDG_COMPARE[id];
        } else { // add to compare
          ReDG_COMPARE[id] = 'Y';
        }
        ReDG_COUNT_COMPARE = json.COUNT;
        if( ReDG_COUNT_COMPARE>0 ){
          $('.comparelist').removeClass('hidden').find('.count').html( json.COUNT_WITH_WORD );
        } else {
          $('.comparelist').addClass('hidden');
        }
      } else {
        console.warn( 'compare - error responsed' );
      }
    }).fail(function(data){
      console.warn( 'compare - fail request' );
    }).always(function(){
      if($linkObj.parents('.product-detail').length > 0)
      {
        ReDG_Area2Darken($linkObj.closest('.product-detail'), 'picload');
      }
      else
      {
        ReDG_Area2Darken($linkObj.closest('.element_section'));
      }
      ReDG_SetCompared();
    });
  }
  return false;
}

//   FAVORITE
function add2favorite(item) {
  var $linkObj = $(item),
    url = $linkObj.parents('.js-element').data('detail'),
    id = parseInt( $linkObj.find('.js-add2favorite').val() ),
    seriData = $linkObj.serialize() + '&AJAX_CALL=Y&action=add2favorite&element_id='+id;
  if(id>0)
  {
    if($linkObj.parents('.product-detail').length > 0)
    {
      ReDG_Area2Darken($linkObj.closest('.product-detail'), 'picload');
    }
    else {
      if(!$linkObj.closest('.element_section').hasClass('c-list__item'))
        ReDG_Area2Darken($linkObj.closest('.element_section'), 'picload');
      else
        ReDG_Area2Darken($linkObj.closest('.element_section'), '1');
    }
    $.getJSON(url, seriData, function(json){
      if(json.TYPE=="OK")
      {
        ReDG_COUNT_FAVORITE = json.COUNT;
        if( ReDG_FAVORITE[id]=='Y' ) // remove from favorite
        {
          delete ReDG_FAVORITE[id];
          var countD = Math.round($('#favorinfo').html());
          $('.rsec_favorite .rsec_cnt').html(countD - 1);
        } else { // add to favorite
          ReDG_FAVORITE[id] = 'Y';
          var countA = Math.round($('#favorinfo').html());
          $('.rsec_favorite .rsec_cnt').html(countA + 1);
        }

      } else {
        console.warn( 'favorite - error responsed' );
      }
    }).fail(function(data){
      console.warn( 'favorite - fail request' );
    }).always(function(){
      if($linkObj.parents('.product-detail').length > 0)
      {
        ReDG_Area2Darken($linkObj.closest('.product-detail'), 'picload');
      }
      else
      {
        ReDG_Area2Darken($linkObj.closest('.element_section'));
      }
      ReDG_SetFavorite();
      ajaxBasket('fav', $('.favorite_in'));
    });
  }
  return false;
}

//   BASKET
function add2basket(item){
  var $formObj = $(item),
    url = $formObj.parents('.js-element').data('detail'),
    id = parseInt( $formObj.find('.js-add2basketpid').val() ),
    seriData = $formObj.serialize() + '&ajax_basket=Y';
  if( id>0 ) {
    if(!$formObj.closest('.element_section').hasClass('c-list__item'))
      ReDG_Area2Darken($formObj.closest('.element_section'), 'picload');
    else
      ReDG_Area2Darken($formObj.closest('.element_section'));

    $.ajax({
      type: 'POST',
      dataType: 'html',
      data: seriData,
      success: function(data) {
        ReDG_INBASKET[id] = "Y";
      },
      fail: function(data){
        console.warn( 'add2basket - can\'t load json' );
      },
      complete: function(){
        ReDG_Area2Darken($formObj.closest('.element_section'), 'picload');
        //ReDG_Area2Darken($formObj.closest('.js-element'), 'picload');
        ReDG_SetInBasket();
        ajaxBasket('basket', $('.basket_in .js-dropdown_basket_pc'));
        ajaxBasket('basket', $('.favorites-mob .js-dropdown_basket_mob'));
      }
    });
  } else {
    console.warn( 'add product to basket failed' );
  }
  return false;
}
// Update basket.line Items
function updateBasketLine(url) {

    if(!!url && url != "")
    {
        url = url + '?action=ADD2BASKET&AJAX_CALLS=Y';
        $.getJSON(url, function(json){
            if(json.HTMLBYID != '')
            {
                $('#basket_pc').find('.favorites__data').html(json.HTMLBYID.basketinfo);
                $('.mob-icon__amount').html(json.HTMLBYID.numItem);
            }
        }).fail(function(data){
            console.warn( 'add2basket - can\'t load json' );
        });
    }
  var defer = $.Deferred();
  $.post(window.location, {AJAX: 'Y', REFRESH_BASKET_LINE: 'Y'}, function (html) {
    defer.resolve();
        ajaxBasket('basket', $('.basket_in .js-dropdown_basket_pc'));
    ajaxBasket('basket', $('.favorites-mob .js-dropdown_basket_mob'));
  }, "html");

  return defer.promise();
}
// UPDATE BASKET AND FAVORITE
function ajaxBasket(obj, classPaste){
    url = SITE_DIR;
    if(obj == 'fav'){
        action = 'REFRESH_FAVORITE';
        data = {'AJAX': 'Y','REFRESH_FAVORITE' : 'Y'};
    }
    else if(obj == 'basket') {
        data = {'AJAX': 'Y','REFRESH_BASKET_PC' : 'Y'};
    }
    $.post(url,data, function(data){        
        if(obj == 'basket') {
            data = BX.parseJSON(data);
            $('#basket_pc .favorites__data').html(data.basketinfo);
            $('.mob-icon__amount').html(data.numItem);
            $('#basket_pc').find('#basketinfo').removeClass('JS-Dropdown-ready');
            $('.js-basket_mobile_drop').find('.dropdown_cart.JS-Dropdown').removeClass('JS-Dropdown-ready');
            classPaste.html(data.BASKET);           
        } else {
          classPaste.html(data);
        }
        initDropdown();
    });
    return false;
}


//   CHANGE TABS ON MAIN PAGE
function ajaxPagesReDG(tab){
    var catalogList = $('#tab_main_page > div:visible');
    ReDG_Area2Darken(catalogList, 'picload');
    url = SITE_DIR;
    tabs = tab.data('item');
    tab.closest('.links').find('.links__item').removeClass('links__item_current');
    tab.closest('.links__item').addClass('links__item_current');
    $.get(url, {'AJAX': 'Y', 'TAB': tabs}, function(data){
        ReDG_Area2Darken(catalogList, 'picload');
        $('#tab_main_page').children().hide();
        $('#tab_main_page').append(data);
        //$('#tab_main_page').html(data);
        reInitAjax();
    });
    return false;
}


//   CALL TIMER
function callTimer()
{
    $('.this_timer').timer({
        days:".days",
        hours:".hour",
        minute:".minute",
        second:".second",
        blockTime:".timer__item",
        linePercent:".progress-bar__indicator",
        textLinePercent:".num_percent"
    });
}

function timerCanDelete(timer){
  $(timer).hide();
}
// set set
function ReDG_SetSet() {
    ReDG_SetCompared();
}

// Area2Darken
function ReDG_Area2Darken(areaObj, anim) {
    if(!areaObj.hasClass('loader')){
        if(anim == 'picload'){
            var width = areaObj.width();
            var height = areaObj.height();
            var topAnim = height/2 - 25;
            var leftAnim = width/2 - 25;
            areaObj.addClass('loader').css({"position":"relative"}).append('<div class="loader-inner square-spin"><div></div></div>');
            areaObj.find('.loader-inner.square-spin').css({'top': topAnim, 'left' : leftAnim});
        }
        else {
            areaObj.addClass('loader');
        }
    } else {
        areaObj.removeClass('loader').removeAttr('style').find('.loader-inner.square-spin').remove();
    }
}
function SetPropCheck()
{
    ReDG_SetFavorite();
    ReDG_SetCompared();
    ReDG_SetInBasket();
}
// set favorite
function ReDG_SetFavorite()
{
    var numElemFav = 0;
    $('.catalog-description__favorites .gui-checkbox-input').removeAttr('checked');
    if($('.mob-icon__fav').length > 0){
      $('.mob-icon__fav').removeClass('mob-icon__img-active');
    }
    for(element_id in ReDG_FAVORITE)
    {
        numElemFav++;
        if(ReDG_FAVORITE[element_id]=='Y' && $('.js-elementid'+element_id).find('.catalog-description__favorites').find('.gui-checkbox').length>0)
        {
            $('.js-elementid'+element_id).find('.catalog-description__favorites').find('.gui-checkbox-input').prop('checked', true);
        }
        if($('.js-elementid'+element_id).find('.mobile-icon_section').length > 0) {
          $('.js-elementid' + element_id).find('.mobile-icon_section').find('.mob-icon__fav').addClass('mob-icon__img-active');
        }
    }
    $('.rsec_favorite .statistic-amount.rsec_cnt').html(numElemFav);
}
// set compare
function ReDG_SetCompared() {
    var numElemCompare = 0;
    $('.catalog-description__compare .gui-checkbox-input').removeAttr('checked');
    $('.sort-compare').hide();
    if($('.mob-icon__comp').length > 0){
      $('.mob-icon__comp').removeClass('mob-icon__img-active');
    }
    for(element_id in ReDG_COMPARE)
    {
        numElemCompare++;
        if(ReDG_COMPARE[element_id]=='Y' && $('.js-elementid'+element_id).find('.catalog-description__compare').find('.gui-checkbox-input').length>0) {
            $('.js-elementid'+element_id).find('.catalog-description__compare').find('.gui-checkbox-input').prop('checked', true);
            $('.js-elementid'+element_id).find('.catalog-description__compare').find('.count_compare').html('('+ReDG_COUNT_COMPARE+')');
            if($('.js-elementid'+element_id).find('.mobile-icon_section').length > 0)
              $('.js-elementid'+element_id).find('.mobile-icon_section').find('.mob-icon__comp').addClass('mob-icon__img-active');

            if(ReDG_COUNT_COMPARE == 1)
            {
              $('.num_count_compare_sort').html(ReDG_COUNT_COMPARE);
              $('.item-compare').hide();
              $('.sort-compare, .item-compare1').show();

            }
            else if(ReDG_COUNT_COMPARE > 1 && ReDG_COUNT_COMPARE < 5)
            {
              $('.num_count_compare_sort').html(ReDG_COUNT_COMPARE);
              $('.item-compare').hide();
              $('.sort-compare, .item-compare-a').show();
            }
            else if(ReDG_COUNT_COMPARE >= 5)
            {
              $('.num_count_compare_sort').html(ReDG_COUNT_COMPARE);
              $('.item-compare').hide();
              $('.sort-compare, .item-compare-ov').show();
            }

        }
    }
    $('.catalog-description__compare .gui-checkbox-input:not(:checked)').closest('.js-element').find('.count_compare').html('');
    $('.rsec_compare .statistic-amount.rsec_cnt').html(numElemCompare);
}

// set in basket
function ReDG_SetInBasket() {
    if($('.mob-icon__basket').length > 0){
      $('.mob-icon__basket').removeClass('mob-icon__img-active');
    }
    for(element_id in ReDG_INBASKET) {
        if(ReDG_INBASKET[element_id]=='Y' && $(".js-add2basketpid[value='"+element_id+"']").length>0) {
            $('.js-add2basketpid[value="'+element_id+'"]').parents('.add2basketform').find('.butt_add_basket').css('display', 'none');
            $('.js-add2basketpid[value="'+element_id+'"]').parents('.add2basketform').find('.in_cart').css('display', 'block');
        }
        if($(".js-add2basketpid[value='"+element_id+"']").parents('.js-element').find('.mob-icon__basket').length > 0) {
          $(".js-add2basketpid[value='"+element_id+"']").parents('.js-element').find('.mob-icon__basket').addClass('mob-icon__img-active');
        }
    }
}

$(document).ready(function(){

  if(!RSDevFunc_PHONETABLET)
    {
      if($('.showcase .catalog-product').length > 0) {
        $('.showcase .catalog-product').addClass('pc-device');
      }      
    }

  $('.icon-back_to_top').click(function(){
    $('html, body').animate({ scrollTop: 0 }, 600);
    return false;
  });

  if(RSGoPro_Hider_called) {
    RSGoPro_Hider();
  }
    $(window).load(function(){
        initDropdown();
    });

    callTimer();
  $(document).on("onFrameDataReceived",function(json){
    console.log('DINAMIC_DATA');
  });

  // MOBILE ICON CLICK
  $(document).on('click', '.mob-icon__basket', function(){
    if($(this).hasClass('mob-icon__img-active')){
      document.location.href = "/personal/cart/";
    }
    else {
      add2basket($(this).parents('.js-element').find('.add2basketform'));
    }
  }).on('click', '.mob-icon__fav', function(){
    add2favorite($(this).parents('.js-element').find('.add2favorite'));
  }).on('click', '.mob-icon__comp', function(){
    add2compare($(this).parents('.js-element').find('.catalog-description__compare'));
  });


  $(document).on('click', '.field__captcha-reload', function(){
        var $object = $(this).closest('.field');
        BX.ajax.loadJSON("/bitrix/tools/ajax_captcha.php", function(data) {
            $object.find('.field__captcha').attr('src','/bitrix/tools/captcha.php?captcha_sid='+data.captcha_sid);
            $object.find('.hidden_input_captcha').val(data.captcha_sid);
        });
        return false;
    }).on('click', '.reload_tabs',function(e){
        e.preventDefault();
        var newClassTab = $(this).data('item');
        if($('#tab_main_page').find('.'+newClassTab).length > 0)
        {
            $(this).closest('.links').find('.links__item').removeClass('links__item_current');
            $(this).closest('.links__item').addClass('links__item_current');
            $('#tab_main_page').children().fadeOut(200);
            setTimeout(function(){
                $('#tab_main_page').find('.'+newClassTab).fadeIn();
            }, 200);
        }
        else
        {
            ajaxPagesReDG($(this));
        }
        return false;
    });


    //add2Basket
    $(document).on('submit','.add2basketform',function(){
        add2basket($(this));
        return false;
    });
    //compare
    $(document).on('click','.catalog-description__compare',function(){
        add2compare($(this));
        return false;
    });
    // AJAX -> add2favorite
    $(document).on('click','.catalog-description__favorites',function(){
        add2favorite($(this));
        return false;
    });

    // quantity
    $(document).on('blur','.js-quantity',function(){
        var $input = $(this);
        var ratio = parseFloat( $input.data('ratio') );
        var ration2 = ratio.toString().split('.', 2)[1];
        var length = 0;
        if( ration2!==undefined ) { length = ration2.length; }
        var val = parseFloat( $input.val() );
        if( val>0 ) {
            $input.val( (ratio*(Math.floor(val/ratio))).toFixed(length) );
        } else {
            $input.val( ratio );
        }
    });


});
