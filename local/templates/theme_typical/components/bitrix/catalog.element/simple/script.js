function changeImgDetail(event) {
  console.log(event);
    var nowItem = $(event.currentTarget).parents('.JS-Gallery-temp'),
        indexImg = $(nowItem).find('.detailBigSlider img:eq(' + event.item.index + ')').data('index');
      if($(nowItem).find('.popup-gallery__box').length > 0){
        var indexNewImg = $(nowItem).find(".product-gallery-list .item a[data-index="+indexImg+"]");
      }
      else
      {
        var indexNewImg = $(nowItem).find(".product-gallery-list .owl-item:not(.cloned) a[data-index="+indexImg+"]");
      }

      if(!!event.item.index)
      {
        $(nowItem).find('.product-gallery-list .product-gallery__label').removeClass('product-gallery__l_active');
        indexNewImg.addClass('product-gallery__l_active');
      }
}

function accrodionElem(tab){
  var needOpen = $(tab).data('href');
  if(!$('#'+needOpen).hasClass('tabs_elem-active')){
    $('.tabs_elem').removeClass('tabs_elem-active');
    $('.mob-tab__wi').removeClass('active-tab__wi');
    $('#'+needOpen).addClass('tabs_elem-active');
    $(tab).parents('.mob-tab__wi').addClass('active-tab__wi');
  }
  else {
    $('.tabs_elem').removeClass('tabs_elem-active');
    $('.mob-tab__wi').removeClass('active-tab__wi');
  }
}

function changedSliderAndOther(elementObj){
  var idItem = elementObj.find('.js-add2basketpid').val(),
      idElem = elementObj.data('elementid'),
      newHtml = '',
      newBigHtml = '',
      owlBigSlider = $('.detailBigSlider'),
      owlSlider = $('.product-gallery.JS-Gallery-List'),
      imgs = REDG_PRODUCTS[idElem].IMAGES[idItem];

  $('.offer_id_small_pic_'+idItem).show();
  if($('#set_product .offer_some_prop:visible').length < 1){
    $('.product-menu a[href="#set_product"]').parents('.product-menu__item').hide();
  }
  else if($('#set_product .offer_some_prop:visible').length > 0) {
    $('.product-menu a[href="#set_product"]').parents('.product-menu__item').show();
  }

  newHtml = '<div class="product-gallery-list JS-Slider-Gallery">';
  newBigHtml = '<div class="JS-SliderBigDetail">';
  var i = 0;;
  for (var img in imgs.PHOTO)
  {
    newBigHtml += '<img data-index="'+i+'" class="product-preview__icon js-picture-glass JS-Gallery-Target" src="'+imgs.PHOTO[img]+'" alt="">';
    newHtml += '<div class="product-gallery__item item">'+
        '<a data-index="'+i+'" class="product-gallery__label JS-Gallery-Link " href="'+imgs.PHOTO[img]+'">'+
          '<img class="product-gallery__img" src="'+imgs.PHOTO[img]+'" alt="">'+
        '</a></div>';
    i++;
  }
  newBigHtml += '</div>';
  newHtml += '</div>';
  owlSlider.html(newHtml);
  owlBigSlider.html(newBigHtml);
  initOwlCarousel();
  initGallery();
  owlSlider.find(".owl-item:not(.cloned):first a").trigger("click");

  // button basket
  if(idItem in ReDG_INBASKET)
  {
    $(elementObj).find('.mob-icon__basket').addClass('mob-icon__img-active');
    $(elementObj).find('.product-button').find('.js-add_basket').hide();
    $(elementObj).find('.product-button').find('.in_cart').show();
  }
  else {
    $(elementObj).find('.mob-icon__basket').removeClass('mob-icon__img-active');
    $(elementObj).find('.product-button').find('.js-add_basket').show();
    $(elementObj).find('.product-button').find('.in_cart').hide();
  }

}

function RSReDSetBuy1click(){
  var value = '';
  $('.js-set-constructor').find('.set-list__item').each(function(){
    var productItem = $(this);

    value += BX.message("ReDigital_PROD_ID") + ': ' + productItem.attr('data-elementid') + '\n' +
      BX.message("ReDigital_PROD_NAME") + ': ' + productItem.attr('data-name') + '\n' +
      BX.message("ReDigital_PROD_LINK") + ': ' + productItem.attr('data-link') + '\n' +
      '-----------------------------------------------------'+'\n';
  });
  $('#buy1click').find('.popup-form textarea[name="RS_AUTHOR_ORDER_LIST"]').val( value );
}

function RSReD_buy1click(){
  if($('.product-detail').length > 0){
      var value = '';
      value = BX.message("ReDigital_PROD_ID") + ': ' + $('.product-detail').find('.js-add2basketpid').val() + '\n' +
      
      BX.message("ReDigital_PROD_NAME") + ': ' + $('.product-detail').data('elementname') + '\n' +
      BX.message("ReDigital_PROD_LINK") + ': ' + window.location.href + '\n' +
      '-----------------------------------------------------';
    $('#buy1click').find('textarea[name="RS_AUTHOR_ORDER_LIST"]').val( value );

  }
  else {
    return false;
  }
}

$(document).ready(function(){

  $(document).on('click', '.JS-Popup-Img', function(e){
    if(RSDevFunc_PHONETABLET)
    {
      return false;
    }
  }).on('click', '.tabs_control', function(){
    accrodionElem($(this));
  }).on('click', '.product-description__inner .detail-switcher__label_open', function(){
    accrodionElem($('a[data-href="product-content"]'));
  });

  $('.product-menu .product-menu__label').click(function(){
    var el = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(el).offset().top-30}, 500);
    return false;
  });


  $(document).on('click', '.product .product-menu .product-menu__label', function(){
    var el = $(this).attr('href');
    $('body').animate({
      scrollTop: $(el).offset().top-50}, 1000);
    return false;
  });

  // add this element to viewed list
  $(window).load(function(){
    setTimeout(function(){
      var viewedUrl = '/bitrix/components/bitrix/catalog.element/ajax.php';
      var viewedData = {
        AJAX    : 'Y',
        SITE_ID   : SITE_ID,
        PARENT_ID : $('.elementdetail').data('elementid'),
        PRODUCT_ID  : $('.elementdetail').find('.js-add2basketpid').val()
      };
      $.ajax({
        type: 'POST',
        url: viewedUrl,
        data: viewedData
      }).done(function(response){
        console.warn( 'Element add to viewed' );
      }).fail(function(){
        console.warn( 'Element can\'t add to viewed' );
      });
    },500);
  });

  $(document).on('ReDGOnOfferChange', function(e, elementObj){
    changedSliderAndOther(elementObj);
  });
  
});



