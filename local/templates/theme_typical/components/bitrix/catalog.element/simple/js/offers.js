var ReDG_OffersExt_timeout_id = 0;


function ReDG_OffersExt_ChangeHTML($elementObj) {

	var element_id = $elementObj.data('elementid');

	if( ReDG_OFFERS[element_id] ) {
		// get all selected values
		var arrFullChosed = new Object();
		$elementObj.find('.div_option.active').each(function(index1){
			var $optionObj = $(this);
			var code = $optionObj.parents('.offer_prop').data('code');
			var value = $optionObj.data('value');
			arrFullChosed[code] = value;
		});

		// get offerID (key=ID)
		var finedOfferID = 0,
		    all_prop_true2 = true;
		for(offerID in ReDG_OFFERS[element_id].OFFERS) {
			all_prop_true2 = true;
			for(pCode in arrFullChosed) {
				if( arrFullChosed[pCode] != ReDG_OFFERS[element_id].OFFERS[offerID].PROPERTIES[pCode] ) {
					all_prop_true2 = false;
					break;
				}
			}
			if(all_prop_true2) {
				finedOfferID = offerID;
				break;
			}
		}
		$('.offer_some_prop').hide();

		if($elementObj.hasClass('product-detail')){
			$elementObj.parent('.product').find('#set_product').find('.offer_some_prop').hide().closest('.offer_set_'+finedOfferID).css('display', 'block');
		}

        if(parseInt(finedOfferID)<1) {
            console.error('offers.js -> Can not find offer ID');
            return;
        }
		// set current offer id
		$elementObj.attr('data-curerntofferid',finedOfferID);
		
		// article
		if( $elementObj.find('.for_article').length>0 ) {
			if( ReDG_OFFERS[element_id].OFFERS[finedOfferID].ARTICLE ) {
				$elementObj.find('.for_article').html( ReDG_OFFERS[element_id].OFFERS[finedOfferID].ARTICLE );
			}
		}
		// set solo price
    if( ReDG_OFFERS[element_id].OFFERS[finedOfferID].MIN_PRICE ) {

      var MIN_PRICE = ReDG_OFFERS[element_id].OFFERS[finedOfferID].MIN_PRICE,
			    PRICE_CODE = 'pricemin';

			$('.price_solo .price_solo_economy').addClass('g-hidden');
			$('.price_solo .product-price__old').addClass('g-hidden');
			if( $elementObj.find('.price_solo') ) {
				$elementObj.find('.price_solo .product-price__actual-digit').html( MIN_PRICE.PRINT_DISCOUNT_VALUE );
			}
			if( $elementObj.find('.product-price__old') ) {
				if( parseInt(MIN_PRICE.DISCOUNT_DIFF)>0 ) {
					$('.price_solo .price_solo_economy').removeClass('g-hidden');
					$elementObj.find('.price_solo_economy .economy__price').html( MIN_PRICE.PRINT_DISCOUNT_DIFF );
				} else {
					$elementObj.find('.price_solo_economy .economy__price').html( '' );
				}
			}
			if( $elementObj.find('.price_solo_economy') ) {
				if( parseInt(MIN_PRICE.DISCOUNT_DIFF)>0 ) {
					$('.price_solo .product-price__old').removeClass('g-hidden');
					$elementObj.find('.product-price__old').html( MIN_PRICE.PRINT_VALUE );
				} else {
					$elementObj.find('.product-price__old').html( '' );
				}
			}
    }
        // set multi price
		if( ReDG_OFFERS[element_id].OFFERS[finedOfferID].PRICES ) {
			if(Object.keys(ReDG_OFFERS[element_id].OFFERS[finedOfferID].PRICES).length < 4 &&
        Object.keys(ReDG_OFFERS[element_id].OFFERS[finedOfferID].PRICES).length > 1)
			{
				$('.product-economy').addClass('g-hidden');
				$('.product-price__old').addClass('g-hidden');
				var PRICES = ReDG_OFFERS[element_id].OFFERS[finedOfferID].PRICES;
				for(var PRICE_CODE in PRICES) {
					var nowPrice = $elementObj.find('.price_thr_'+PRICE_CODE);
					if( nowPrice ) {
						nowPrice.find('.product-price__actual-digit').html( PRICES[PRICE_CODE].PRINT_DISCOUNT_VALUE );
					}
					if( nowPrice) {
						if( parseInt(PRICES[PRICE_CODE].DISCOUNT_DIFF)>0 ) {
							nowPrice.find('.product-economy').removeClass('g-hidden');
							nowPrice.find('.economy .economy__price').html( PRICES[PRICE_CODE].PRINT_DISCOUNT );
						} else {
							nowPrice.find('.economy .economy__price').html( '' );
						}
					}
					if( nowPrice) {
						if( parseInt(PRICES[PRICE_CODE].DISCOUNT_DIFF)>0 ) {
							nowPrice.find('.product-price__old').removeClass('g-hidden');
							nowPrice.find('.product-price__old').html( PRICES[PRICE_CODE].PRINT_VALUE );
						} else {
							nowPrice.find('.product-price__old').html( '' );
						}
					}
				}
			}
			else if(Object.keys(ReDG_OFFERS[element_id].OFFERS[finedOfferID].PRICES).length > 4)
			{
				var PRICES = ReDG_OFFERS[element_id].OFFERS[finedOfferID].PRICES;
				$('.economy').addClass('g-hidden');
				$('.product-price__old').addClass('g-hidden');
				for(var PRICE_CODE in PRICES) {
					var nowPrice = $elementObj.find('.price_mult_'+PRICE_CODE);
					if( nowPrice ) {
						nowPrice.find('.product-price__actual-digit').html( PRICES[PRICE_CODE].PRINT_DISCOUNT_VALUE );
					}
					if( nowPrice.find('.economy') ) {
						if( parseInt(PRICES[PRICE_CODE].DISCOUNT_DIFF)>0 ) {
							nowPrice.find('.economy').removeClass('g-hidden');
							nowPrice.find('.economy').html( PRICES[PRICE_CODE].PRINT_DISCOUNT_DIFF );
						} else {
							nowPrice.find('.economy').html( '' );
						}
					}
					if( nowPrice.find('.product-price__old') ) {
						if( parseInt(PRICES[PRICE_CODE].DISCOUNT_DIFF)>0 ) {
							nowPrice.find('.product-price__old').removeClass('g-hidden');
							nowPrice.find('.product-price__old').html( PRICES[PRICE_CODE].PRINT_VALUE );
						} else {
							nowPrice.find('.product-price__old').html( '' );
						}
					}
				}
			}
		}
		
		// set ratio
		if( ReDG_OFFERS[element_id].OFFERS[finedOfferID].CATALOG_MEASURE_RATIO && $elementObj.find('.js-quantity') ) {
			$elementObj.find('.js-quantity').data('ratio',ReDG_OFFERS[element_id].OFFERS[finedOfferID].CATALOG_MEASURE_RATIO);
			$elementObj.find('.js-quantity').val( $elementObj.find('.js-quantity').data('ratio') );
		}
		if( ReDG_OFFERS[element_id].OFFERS[finedOfferID].CATALOG_MEASURE_NAME && $elementObj.find('.select-unit') ) {
			$elementObj.find('.select-unit').html( ReDG_OFFERS[element_id].OFFERS[finedOfferID].CATALOG_MEASURE_NAME );
		}
		// daysarticle & quickbuy
		$elementObj.removeClass('qb da2');
		$elementObj.find('.product-counter').addClass('g-hidden');
		if( ReDG_OFFERS[element_id].ELEMENT.QUICKBUY || ReDG_OFFERS[element_id].OFFERS[finedOfferID].QUICKBUY ) {
			$elementObj.addClass('qb');
			if( $elementObj.find('.product-counter_'+element_id).length>0 ) {
				$elementObj.find('.product-counter_'+element_id).removeClass('g-hidden');
			} else if ( $elementObj.find('.product-counter_'+finedOfferID).length>0 ) {
				$elementObj.find('.product-counter_'+finedOfferID).removeClass('g-hidden');
			}
		}
		if( ReDG_OFFERS[element_id].ELEMENT.DAYSARTICLE2 || ReDG_OFFERS[element_id].OFFERS[finedOfferID].DAYSARTICLE2 ) {
			$elementObj.addClass('da2');
			if( $elementObj.find('.product-counter_'+element_id).length>0 ) {
				$elementObj.find('.product-counter_').hide();
				$elementObj.find('.product-counter_'+element_id).removeClass('g-hidden');
			} else if ( $elementObj.find('.product-counter_'+finedOfferID).length>0 ) {
				$elementObj.find('.product-counter_').hide();
				$elementObj.find('.product-counter_'+finedOfferID).removeClass('g-hidden');
			}
		}

		// change product id
		$elementObj.find('.js-add2basketpid').val( finedOfferID );
		if(ReDG_OFFERS[element_id].OFFERS[finedOfferID].CAN_BUY) {
			$elementObj.find('.add2basketform').removeClass('cantbuy');
		} else {
			$elementObj.find('.add2basketform').addClass('cantbuy');
		}

		// stores
		if( $elementObj.find('.js-stores').length>0 && finedOfferID>0 ) {
			if( ReDG_STOCK[element_id] )
      {
        if(ReDG_STOCK[element_id].SHOW_QUANT_WT_WH != true)
        {
          // change stores
          if ($.isEmptyObject(ReDG_STOCK[element_id].JS.SKU[finedOfferID])) //Check empty object
          {
            if (ReDG_STOCK[element_id].USE_MIN_AMOUNT == true) {
              $elementObj.find('.js-stores .JS-Dropdown-Menu').find('.amount').each(function () {
                $(this).removeClass('store_green store_red').addClass('store_red').html(ReDG_STOCK[element_id].MESSAGE_EMPTY);
              });
            }
            else
            {
              $elementObj.find('.js-stores .JS-Dropdown-Menu').find('.amount').each(function () {
                $(this).removeClass('store_green store_red').addClass('store_red').html('0');
              });
            }
          }
          else {
            for (storeID in ReDG_STOCK[element_id].JS.SKU[finedOfferID]) {
              var stores = ReDG_STOCK[element_id].JS.SKU[finedOfferID];
              var quantity = stores[storeID];
              if (ReDG_STOCK[element_id].USE_MIN_AMOUNT == true) {
                if (quantity < 1) {
                  $elementObj.find('.js-stores').find('.store_' + storeID).find('.amount').removeClass('store_green store_red').addClass('store_red').html(ReDG_STOCK[element_id].MESSAGE_EMPTY);
                } else {
                  $elementObj.find('.js-stores').find('.store_' + storeID).find('.amount').removeClass('store_green store_red').addClass('store_green').html(ReDG_STOCK[element_id].MESSAGE_ISSET);
                }
              } else {
                if(quantity > 0)
                {
                  $elementObj.find('.js-stores').find('.store_' + storeID).find('.amount').removeClass('store_green store_red').addClass('store_green').html(quantity);
                }
                else
                {
                  $elementObj.find('.js-stores').find('.store_' + storeID).find('.amount').removeClass('store_green store_red').addClass('store_red').html(quantity);
                }
              }
              if (ReDG_STOCK[element_id].SHOW_EMPTY_STORE == false && quantity < 1) {
                $elementObj.find('.js-stores').find('.store_' + storeID).hide();
              } else {
                $elementObj.find('.js-stores').find('.store_' + storeID).show();
              }
            }
          }
        }
				// change general
				if( ReDG_STOCK[element_id].QUANTITY[element_id] )
        {
					var quantity = parseInt( ReDG_STOCK[element_id].QUANTITY[finedOfferID] );
					if( ReDG_STOCK[element_id].USE_MIN_AMOUNT==true )
          {
						if( quantity < 1 )
            {
							$elementObj.find('.js-stores').find('.js-availability_main').html( ReDG_STOCK[element_id].MESSAGE_EMPTY );
						} else
            {
							$elementObj.find('.js-stores').find('.js-availability_main').html( ReDG_STOCK[element_id].MESSAGE_ISSET );
						}
					} else
          {
						$elementObj.find('.js-stores').find('.js-availability_main').html( quantity );
					}
				}
			} else {
				console.warn( 'OffersExt_ChangeHTML -> store not found' );
			}
		}
		var detail_url = $elementObj.data('detail');
		$elementObj.find('.product-img a.JS-Popup-Img').attr('href', detail_url+'?POPUP_GALLERY=Y&AJAX=Y&OFFER_ID='+finedOfferID);
		/*$('.product-counter').addClass('g-hidden');
		$('.product-counter_'+finedOfferID).removeClass('g-hidden');*/
		// event
		$(document).trigger('ReDGOnOfferChange',[$elementObj]);
	}
}

function ReDG_OffersExt_PropChanged($optionObj) {
	
	var element_id = $optionObj.parents('.js-element').data('elementid'),
	    CURRENT_PROP_CODE = $optionObj.parents('.offer_prop').data('code'),
	    value = $optionObj.data('value');

	if( ReDG_OFFERS[element_id] && !$optionObj.hasClass('disabled') ) {
		// change styles
		$optionObj.parents('.offer_prop').removeClass('opened').addClass('closed');
		$optionObj.parents('.offer_prop').find('.div_option').removeClass('active');

		$optionObj.addClass('active');
		if($optionObj.hasClass('select-list__item')){
			
			var prop = $optionObj.data('value');
			$optionObj.parents('.select-box').find('.prop_item_check').text(prop);
		}
		
		// set current value
		if( $optionObj.parents('.offer_prop').hasClass('color') ) { // color 
			$optionObj.parents('.offer_prop').find('.div_selected span').css({'backgroundImage':$optionObj.find('span').css('backgroundImage')});
		} else {
			$optionObj.parents('.offer_prop').find('.div_selected span').html(value);
		}
		
		var next_index = 0,
		    NEXT_PROP_CODE = '',
            PROP_CODE = '',
            arCurrentValues = new Object();
		
		// get current values
		for(index in ReDG_OFFERS[element_id].SORT_PROPS) {
			PROP_CODE = ReDG_OFFERS[element_id].SORT_PROPS[index];
			arCurrentValues[PROP_CODE] = $optionObj.parents('.js-element').find('.prop_'+PROP_CODE).find('.div_option.active').data('value');
			// save next prop_code
			if(PROP_CODE==CURRENT_PROP_CODE) {
				next_index = parseInt(index)+1;
				if( ReDG_OFFERS[element_id].SORT_PROPS[next_index] )
					NEXT_PROP_CODE = ReDG_OFFERS[element_id].SORT_PROPS[next_index];
				else
					NEXT_PROP_CODE = false;
				break;
			}
		}

		// get enabled values for next property
		if(NEXT_PROP_CODE) {
			var allPropTrue1 = true,
			    arNextEnabledProps = new Array();
			for(offerID in ReDG_OFFERS[element_id].OFFERS) {
				allPropTrue1 = true;
				for(pCode1 in arCurrentValues) {
					if( arCurrentValues[pCode1] != ReDG_OFFERS[element_id].OFFERS[offerID].PROPERTIES[pCode1] ) {
						allPropTrue1 = false;
					}
				}
				if(allPropTrue1) {
					arNextEnabledProps.push( ReDG_OFFERS[element_id].OFFERS[offerID].PROPERTIES[NEXT_PROP_CODE] );
				}
			}

			// disable and enable values for NEXT_PROP_CODE
			$optionObj.parents('.js-element').find('.prop_'+NEXT_PROP_CODE).find('.div_option').each(function(i){
				var $option = $(this),
				    emptyInEnabled = true;
				for(inden in arNextEnabledProps) {
					if( $option.data('value') == arNextEnabledProps[inden] ) {
						emptyInEnabled = false;
						break;
					}
				}
				$option.addClass('disabled');
				if(!emptyInEnabled)
					$option.removeClass('disabled');
			});

			// call itself
			var nextOptionObj;
			if(!$optionObj.parents('.js-element').find('.prop_'+NEXT_PROP_CODE).find('.div_option').hasClass('active')) {
				nextOptionObj = $optionObj.parents('.js-element').find('.prop_'+NEXT_PROP_CODE).find('.div_option.active');
			} else {
				nextOptionObj = $optionObj.parents('.js-element').find('.prop_'+NEXT_PROP_CODE).find('.div_option:not(.disabled):first');
			}
            ReDG_OffersExt_PropChanged(nextOptionObj);
		} else {
            ReDG_OffersExt_ChangeHTML( $optionObj.parents('.js-element') );
		}
	}
}

$(document).ready(function(){
	
	// prop select -> click
	$(document).on('click','.div_option',function(e){
		e.stopPropagation();
		clearTimeout( ReDG_OffersExt_timeout_id );
		var $optionObj = $(this);
		if(!$optionObj.hasClass('disabled')) {
			ReDG_Area2Darken($optionObj.closest('.js-element'), 'picload');
			var element_id = $optionObj.parents('.js-element').data('elementid');

			if( element_id > 0 ) {
				var propCode = $optionObj.parents('.offer_prop').data('code'),
				    value = $optionObj.data('value');
				    
				if( ReDG_OFFERS[element_id] ) {
                    ReDG_OffersExt_PropChanged($optionObj);
                    ReDG_Area2Darken($optionObj.closest('.js-element'));
				} else {
                    //ReDG_Area2Darken( $optionObj.parents('.js-element'), 'picload' );
					var url = $optionObj.parents('.js-element').data('detail') + '?AJAX_CALL=Y&action=get_element_json&element_id=' + element_id;
					$.getJSON(url, {}, function(json){
                        ReDG_OFFERS[element_id] = json;
                        ReDG_OffersExt_PropChanged($optionObj);
                        //ReDG_Area2Darken( $optionObj.parents('.js-element'), 'picload' );
					}).fail(function(data){
						console.warn( 'Get element JSON -> fail request' );                     
					}).always(function(data){
						ReDG_Area2Darken($optionObj.closest('.js-element'));
					});
				}
			} else {
				console.warn( 'offers.js -> element_id is empty' );
			}
			
		}
		return false;
	});
	$(document).on('click','.div_selected',function(e){
		$('.offer_prop.opened:not(.prop_'+ $(this).parents('.offer_prop').data('code')+')').removeClass('opened').addClass('closed');
		if( $(this).parents('.offer_prop').hasClass('closed') ) { // was closed 
			$(this).parents('.offer_prop').removeClass('closed').addClass('opened');
		} else { // was opened
			$(this).parents('.offer_prop').removeClass('opened').addClass('closed');
		}
		return false;
	});
	// close prop select by click outside
	$(document).on('click',function(e){
		if( $(e.target).parents('.offer_prop').length>0 && !$(e.target).parents('.offer_prop').hasClass('color') ) {

		} else {
			$('.offer_prop').removeClass('opened').addClass('closed');
		}
	});

});