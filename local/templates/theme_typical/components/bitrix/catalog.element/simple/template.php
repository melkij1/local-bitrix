<?if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();

//JS
$APPLICATION->AddHeadScript($templateFolder."/js/main.js");
$APPLICATION->AddHeadScript($templateFolder."/js/jquery.cookie.js" );
$APPLICATION->AddHeadScript($templateFolder."/js/timer/timer.js" );
$APPLICATION->AddHeadScript($templateFolder."/js/script.js" );
$APPLICATION->AddHeadScript($templateFolder."/js/offers.js" );

use \Bitrix\Main\Localization\Loc;
$this->setFrameMode(true);

$HAVE_OFFERS = (is_array($arResult['OFFERS']) && count($arResult['OFFERS'])>0) ? true : false;
if($HAVE_OFFERS) { $PRODUCT = &$arResult['OFFERS'][0]; } else { $PRODUCT = &$arResult; }


$arPhotoTo = array();
if( is_array($arResult['PROPERTIES'][$arParams['PROP_MORE_PHOTO']]['VALUE'][0]['RESIZE']) )
{
	foreach($arResult['PROPERTIES'][$arParams['PROP_MORE_PHOTO']]['VALUE'] as $arImage)
	{
		$arPhotoTo[] = $arImage['SRC'];
	}
}

if(is_array($arResult['DETAIL_PICTURE']['RESIZE']) ){
	array_push($arPhotoTo, $arResult['DETAIL_PICTURE']['SRC']);
}

$arImgs = array();
$arMass = array();
if($HAVE_OFFERS)
{
	foreach($arResult['OFFERS'] as $key1=>$arOffer)
	{
		if( is_array($arOffer['DETAIL_PICTURE']) )
		{
			$arImgs[$arOffer['ID']]['PHOTO'][0] = $arOffer['DETAIL_PICTURE']['SRC'];

		}
		if(isset($arOffer['DISPLAY_PROPERTIES'][$arParams['PROP_SKU_MORE_PHOTO']]['FILE_VALUE']['0']))
		{
        foreach($arOffer['DISPLAY_PROPERTIES'][$arParams['PROP_SKU_MORE_PHOTO']]['FILE_VALUE'] as $key2=>$arPhoto){
        	$arImgs[$arOffer['ID']]['PHOTO'][] = $arPhoto['SRC'];
        }
    	}
    	else
    	{
    		$arImgs[$arOffer['ID']]['PHOTO'][] = $arOffer['DISPLAY_PROPERTIES'][$arParams['PROP_SKU_MORE_PHOTO']]['FILE_VALUE']['SRC'];
    	}

			$arImgs[$arOffer['ID']]['PHOTO'] = array_merge($arImgs[$arOffer['ID']]['PHOTO'], $arPhotoTo);
			$arImgs[$arOffer['ID']]['PHOTO'] = array_filter($arImgs[$arOffer['ID']]['PHOTO']);
    }
  $arImgsImg = $arImgs[$PRODUCT['ID']]['PHOTO'];
}
else {
	$arImgsImg = $arPhotoTo;
} ?>


<div class="product">
    <div class="product-detail js-element elementdetail js-elementid<?=$arResult['ID']?>
            <?php
                echo (isset($PRODUCT['DAYSARTICLE2']) || isset($arResult['DAYSARTICLE2']) ? ' da2' : '');
                echo (isset($PRODUCT['QUICKBUY']) || isset($arResult['QUICKBUY']) ? ' qb' : '');
            ?>"
            data-detail="<?=$arResult['DETAIL_PAGE_URL']?>" data-elementid="<?=$arResult['ID']?>" data-elementname="<?=$arResult['NAME'];?>"
            data-curerntofferid="<?=$PRODUCT['ID']?>"
        >
            <div class="product-col JS-Gallery">
                <div class="product-title-bar">
                    <h1 class="product-title"><?=$arResult['NAME']?></h1>
                    <?php if (isset($PRODUCT['DISPLAY_PROPERTIES'][$arParams['PROP_ARTICLE']]['VALUE']) && $PRODUCT['DISPLAY_PROPERTIES'][$arParams['PROP_ARTICLE']]['VALUE'] != ''): ?>
                        <div class="product-code">
                            <span class="product-code__label">
                                <?=Loc::getMessage('ARTICLE_ELEM_IN_DETAIL')?>
                                <span class="for_article"><?=$PRODUCT['DISPLAY_PROPERTIES'][$arParams['PROP_ARTICLE']]['VALUE']?></span>
                            </span>
                        </div>
                    <?php endif; ?>
                </div>

                <div class="product-img JS-Gallery JS-Gallery-temp" data-gallery="{'classActive':'product-gallery__l_active'}">
					<a class="product-preview JS-Popup-Img" href="<?=$arResult['DETAIL_PAGE_URL']?>?OFFER_ID=<?=$PRODUCT['ID']?>&POPUP_GALLERY=Y&AJAX=Y">
                        <div class="">
                            <div class="block-660 mobile-icon_section">
                                <div class="mobile-bckg_section"></div>
                                <div class="mob-icon__img mob-icon__basket">&#xe66e;</div>
                                <div class="mob-icon__img mob-icon__fav">&#xe642;</div>
                                <div class="mob-icon__img mob-icon__comp">&#xe64b;</div>
                            </div>
                        </div>

						<?php if (isset($arResult['FIRST_PIC_DETAIL']['SRC'])):
							?><div class="detailBigSlider">
								<div class="JS-SliderBigDetail">
									<?php foreach ($arImgsImg  as $key=>$arPhoto):?>
										<img data-index="<?=$key?>" class="product-preview__icon js-picture-glass JS-Gallery-Target" src="<?=$arPhoto?>" alt="" />
									<?php endforeach;?>
								</div>
								<div class="js-glass-lupa"></div>
							</div>
						<?php else: ?>
							<img class="product-preview__icon" src="<?=SITE_TEMPLATE_PATH?>/images/img/default-img.png" alt="" />
						<?php endif;?>

                        <span class="catalog-stickers">
                            <span class="catalog-stickers__item catalog-stickers__item_cheap"><?=Loc::getMessage('QUICKBUY_DETAIL')?></span>
                            <span class="catalog-stickers__item catalog-stickers__item_favorite"><?=Loc::getMessage('DAYSARTICLE2_DETAIL')?></span>
                            <?php if($PRODUCT['MIN_PRICE']['DISCOUNT_DIFF'] > 0):?>
                                <span class="catalog-stickers__item catalog-stickers__item_discount"><?='-'.$PRODUCT['MIN_PRICE']['DISCOUNT_DIFF_PERCENT'].'%'?></span>
                            <?php endif;?>
                        </span>

                        <span class="catalog-add-info">
                            <span class="catalog-marks">
                                <?php if($PRODUCT['MIN_PRICE']['DISCOUNT_DIFF'] > 0):?>
                                    <span class="catalog-marks__item catalog-marks__item_discount"><?=Loc::getMessage('DISCOUNT_DETAIL')?></span>
                                <?php endif;?>
                                <?php if ($arResult['PROPERTIES'][$arParams['PROP_NEW_ITEM']]['VALUE'] == 'Y'):?>
                                    <span class="catalog-marks__item catalog-marks__item_new"><?=Loc::getMessage('NEW_ITEM_DETAIL')?></span>
                                <?php endif;?>
                                <?php if($arResult['PROPERTIES'][$arParams['PROP_BEST_SELLER']]['VALUE'] == 'Y'):?>
                                    <span class="catalog-marks__item catalog-marks__item_hit"><?=Loc::getMessage('BEST_SELLERS')?></span>
                                <?php endif;?>
                                <?php if($PRODUCT['MIN_PRICE']['DISCOUNT_DIFF'] > 0):?>
                                    <span class="catalog-marks__item catalog-marks__item_benefits"><?=Loc::getMessage('DISCOUNT_PRICE_DETAIL').$PRODUCT['MIN_PRICE']['PRINT_DISCOUNT_DIFF']?></span>
                                <?php endif;?>
                            </span>
                        </span>
				    </a>

					<?php if (isset($arResult['FIRST_PIC_DETAIL']['SRC'])):?>
						<span class="product-zoom"><span class="zoom-icon product-zoom_icon"></span><?=Loc::getMessage('LOOP_IMAGE')?></span>
					<?php endif;?>

					<div class="product-gallery JS-Gallery-List">
					   <div class="product-gallery-list JS-Slider-Gallery">
							<?php foreach ($arImgsImg as $key1=>$arPhoto): ?>
								<div class="product-gallery__item item">
									<a data-index="<?=$key1?>" 
                                        class="product-gallery__label JS-Gallery-Link <?if($key1 == 0) { echo ' JS-Gallery-Item-active product-gallery__l_active';}?>"
                                        href="<?=$arPhoto?>"><img class="product-gallery__img"
                                        src="<?=$arPhoto?>" alt="" 
                                    /></a>
								</div>
							<?php endforeach;?>
					    </div>
					</div>
				</div><!--/product-img-->



                <div class="product-description">
					<div class="product-description__inner">
							<div class="product-rating">
								<?php $APPLICATION->IncludeComponent(
									 'bitrix:iblock.vote',
									 'redg',
									 Array(
										'IBLOCK_TYPE' => '',
										'IBLOCK_ID' => $PRODUCT['IBLOCK_ID'],
										'ELEMENT_ID' => $PRODUCT['ID'],
										'MAX_VOTE' => '',
										'VOTE_NAMES' => $PRODUCT['ID'],
										'DISPLAY_AS_RATING' => 'vote_avg',
										'CACHE_TYPE' => $arParams['CACHE_TYPE'],
										'CACHE_TIME' => $arParams['CACHE_TIME'],
									 ),
									 $component
								);?>
							</div>

							<?php if(count($PRODUCT['PRICES']) > 3):?>
								<div class="product-price-multi">
    								<?php 
                                    foreach($arResult['CAT_PRICES'] as $key1=>$titlePrices):
    									if(!$arResult['CAT_PRICES'][$key1]['CAN_VIEW'])
    										continue;
    									if(isset($PRODUCT['PRICES'][$key1])):
    										$titlePrices['TITLE']; ?>
    										<div class="product-price price_mult_<?=$key1;?>">
    											<span class="product-price__item product-price__actual">
    												<span class="product-price__actual-label"><?=$titlePrices['TITLE']?></span>
    												<span class="product-price__actual-digit"><?=$PRODUCT['PRICES'][$key1]['PRINT_DISCOUNT_VALUE']?></span>
    											</span>
    											<span class="product-price__item product-price__old<?
    												if($PRODUCT['PRICES'][$key1]['DISCOUNT_DIFF'] < 1){
    													echo ' g-hidden';
    												}
    											?>"><?=$PRODUCT['PRICES'][$key1]['PRINT_VALUE']?></span>
    											<span class="economy<?
    												if($PRODUCT['PRICES'][$key1]['DISCOUNT_DIFF'] < 1){
    													echo ' g-hidden';
    												}
    											?>"><?=Loc::getMessage('PROFIT_PRICE_DETAIL')?><span class="economy__price"><?=$PRODUCT['PRICES'][$key1]['PRINT_DISCOUNT_DIFF']?></span></span>
    										</div>
    									<?php endif;?>
    								<?php endforeach; ?>
								</div>
							<?php
							elseif(count($PRODUCT['PRICES']) > 1):
								foreach($arResult['CAT_PRICES'] as $key1=>$titlePrices):
									if(!$arResult['CAT_PRICES'][$key1]['CAN_VIEW'])
										continue;
									if(isset($PRODUCT['PRICES'][$key1])):?>
										<div class="price_thr_<?=$key1;?>">
											<div class="product-price">
												<span class="product-price__item product-price__actual">
													<span class="product-price__actual-label"><?=$titlePrices['TITLE']?></span>
													<span class="product-price__actual-digit"><?=$PRODUCT['PRICES'][$key1]['PRINT_DISCOUNT_VALUE']?></span>
												</span>
												<span class="product-price__item product-price__old
													<?php echo ($PRODUCT['MIN_PRICE']['DISCOUNT_DIFF'] < 1 ? ' g-hidden' : '');?>
												"><?=$PRODUCT['PRICES'][$key1]['PRINT_VALUE']?></span>
											</div>
											<div class="product-economy
												<?php echo ($PRODUCT['MIN_PRICE']['DISCOUNT_DIFF'] < 1 ? ' g-hidden' : '');?>
											">
												<span class="economy"><?=Loc::getMessage('PROFIT_PRICE_DETAIL')?><span class="economy__price"><?=$PRODUCT['PRICES'][$key1]['PRINT_DISCOUNT_DIFF']?></span></span>
											</div>
										</div>
									<?php endif; ?>
								<?php endforeach; ?>
							<?php else: ?>
								<?php if(isset($PRODUCT['MIN_PRICE'])):?>
									<div class="product-price price_solo">
										<span class="product-price__item product-price__actual">
											<span class="product-price__actual-label"><?=$titlePrices['TITLE']?></span>
                                            <span class="product-price__actual-digit"><?=$PRODUCT['MIN_PRICE']['PRINT_DISCOUNT_VALUE']?></span>
										</span>
										<span class="product-price__item product-price__old
											<?php echo ($PRODUCT['MIN_PRICE']['DISCOUNT_DIFF'] < 1 ? ' g-hidden' : '');?>
										?>"><?=$PRODUCT['MIN_PRICE']['PRINT_VALUE']?></span>
									</div>
								<?php endif; ?>
									<div class="product-economy price_solo_economy
                                        <?php echo ($PRODUCT['MIN_PRICE']['DISCOUNT_DIFF'] < 1 ? ' g-hidden' : '');?>
                                    ">
										<span class="economy">
                                            <?=Loc::getMessage('PROFIT_PRICE_DETAIL')?>
                                            <span class="economy__price"><?=$PRODUCT['MIN_PRICE']['PRINT_DISCOUNT_DIFF']?></span>
                                        </span>
									</div>
							<?php endif; ?>

								<?php // STORES
									if($arParams['USE_STORE']=='Y'):?>
										<div class="product-availability">
                                            <?php
                                            $APPLICATION->IncludeComponent(
												'bitrix:catalog.store.amount',
												'redg',
												array(
													"ELEMENT_ID" => $arResult["ID"],
													"STORE_PATH" => $arParams["STORE_PATH"],
													"CACHE_TYPE" => "A",
													"CACHE_TIME" => "36000",
													"MAIN_TITLE" => $arParams["MAIN_TITLE"],
													"USE_STORE_PHONE" => $arParams["USE_STORE_PHONE"],
													"SCHEDULE" => $arParams["USE_STORE_SCHEDULE"],
													"USE_MIN_AMOUNT" => $arParams["USE_MIN_AMOUNT"],
													"MIN_AMOUNT" => $arParams["MIN_AMOUNT"],
													"SHOW_EMPTY_STORE" => $arParams['SHOW_EMPTY_STORE'],
													"SHOW_GENERAL_STORE_INFORMATION" => $arParams['SHOW_GENERAL_STORE_INFORMATION'],
													"USER_FIELDS" => $arParams['USER_FIELDS'],
													"FIELDS" => $arParams['FIELDS'],
													'DATA_QUANTITY' => $arResult['DATA_QUANTITY'],
													'FIRST_ELEMENT_ID' => $PRODUCT['ID'],
                                                    'SHOW_QUANT_WT_WH' => $arParams['SHOW_QUANT_WT_WH']
												),
												$component,
												array('HIDE_ICONS'=>'Y')
											); ?>

										</div>
									<?php endif;?>



							<?php // PROPERTIES

							if(is_array($arResult['OFFERS_EXT']['PROPERTIES']) && count($arResult['OFFERS_EXT']['PROPERTIES'])>0):
								foreach($arResult['OFFERS_EXT']['PROPERTIES'] as $propCode => $arProperty):
									if(!empty($arProperty)):
										$isColor = false;
										if(is_array($arParams['PROPS_ATTRIBUTES_COLOR']) && in_array($propCode,$arParams['PROPS_ATTRIBUTES_COLOR']))
										{
											$isColor = true;
										}
										if($isColor): ?>
											<div class="product-color offer_prop prop_<?=$propCode?>" data-code="<?=$propCode?>">
												<span class="colors-title"><?=$arResult['OFFERS_EXT']['PROPS'][$propCode]['NAME']?></span>
												<ul class="colors-list">
													<?php foreach ($arProperty as $arImg):?>
														<li data-value="<?=htmlspecialcharsbx($arImg['VALUE'])?>" class="div_option colors-list__item <?echo ($arImg['DISABLED_FOR_FIRST'] == Y ? 'disabled' : '');?> <?echo ($arImg['FIRST_OFFER'] == 'Y' ? 'active' : '');?>">
															<span class="colors-checkbox"></span>
															<span class="colors-cover "><span style="background-image:url(<?=$arImg['PICT']['SRC']?>);" class="colors-cover__icon"></span></span>
														</li>
													<?php endforeach;?>
												</ul>
											</div>
										<?php else:?>
											<div class="product-select offer_prop prop_<?=$propCode?>" data-code="<?=$propCode?>">
												<div class="select-box">
												<span class="select-label"><?=$arResult['OFFERS_EXT']['PROPS'][$propCode]['NAME'];?></span>
													<div class="dropdown dropdown_select select JS-Dropdown JS-Select">

														<div class="select-field JS-Dropdown-Switcher JS-Select-Field">
    														<?php foreach($arProperty as $arSelect):
    															if($arSelect['FIRST_OFFER'] == 'Y'): ?>
    																<span class="dropdown-switcher gui-input select-input JS-Select-Input JS-DigitalField prop_item_check"><?=$arSelect['VALUE']?></span>															
                                                                <?php endif; ?>
    														<?php endforeach; ?>
															<span class="select-field-icon"></span>
														</div>
														<div class="dropdown-menu select-bar JS-Dropdown-Menu">
															<ul class="select-list">
																<?php foreach ($arProperty as $arSelect):?>
																	<li data-value="<?=htmlspecialcharsbx($arSelect['VALUE'])?>" class="div_option select-list__item <?echo ($arSelect['DISABLED_FOR_FIRST'] == Y ? 'disabled' : '');?> <?echo ($arSelect['FIRST_OFFER'] == 'Y' ? 'active' : '');?>">
                                                                        <a class="select-list__label JS-Select-Label" href="javascript:;"><?=$arSelect['VALUE']?></a>
                                                                    </li>
																<?php endforeach; ?>
															</ul>
														</div>
													</div>
												</div>
											</div>
										<?php endif; ?>
								    <?php endif; ?>
								<?php endforeach; ?>
							<?php endif; ?>
							<?php if(strlen($arResult['PREVIEW_TEXT'])> 300):
									$rest = substr($arResult['PREVIEW_TEXT'], 0, 250); ?>
									<div class="product-announce"><?=$rest;?>...</div>
									<a href="#product-content" class="g-switcher detail-switcher">
										<span class="detail-switcher__label detail-switcher__label_open"><?=Loc::getMessage('MORE_TEXT_PREVIEW')?></span>
									</a>
							<?php else:?>
								<div class="product-announce"><?=$arResult['PREVIEW_TEXT']?></div>
							<?php endif;?>
					</div><!--/product-description__inner-->
                </div><!--/product-description-->
            </div><!--/product-col-->
        <div class="product-bar">
        <?php if (is_array($arTimers) && count($arTimers)>0):
          $have_vis = false;
	        foreach ($arTimers as $timer):
                $KY = 'TIMER';
				if(isset($timer['DINAMICA_EX']))
					$KY = 'DINAMICA_EX';

				$jsTimer = array(
                    'DATE_FROM' => $timer[$KY]['DATE_FROM'],
                    'DATE_TO' => $timer[$KY]['DATE_TO'],
                    'AUTO_RENEWAL' => $timer['AUTO_RENEWAL'],
                );
			    if (isset($arTimer['DINAMICA']))
					$jsTimer['DINAMICA_DATA'] = $arTimer['DINAMICA'] == 'custom' ? array_flip(unserialize($arTimer['DINAMICA_DATA'])) : $arTimer['DINAMICA'];?>

				<div class="product-counter_<?=$timer['ELEMENT_ID']?> product-counter<?
					if(($arResult['ID']==$timer['ELEMENT_ID'] || $PRODUCT['ID']==$timer['ELEMENT_ID']) && !$have_vis)
					{
						$have_vis = true;
					} else {
						?> g-hidden<?
					}
				?>">
					<div class=" product-counter-title"><?=Loc::getMessage('TIMER_END_TO_DETAIL')?></div>
					<span class="counter counter_wide this_timer" data-timer='<?=json_encode($jsTimer)?>'>
					    <span class="timer">
							<span class="timer__item">
                                <span class="timer__item__digit days">0</span>
                                <span class="timer__item__label"><?=Loc::getMessage('DAY_TIMER_DETAIL')?></span>
							</span>
                            <span class="timer__item">
                                <span class="timer__item__digit hour">0</span>
                                <span class="timer__item__label"><?=Loc::getMessage('HOUR_TIMER_DETAIL')?></span>
                            </span>
                            <span class="timer__item">
                                <span class="timer__item__digit minute">0</span>
                                <span class="timer__item__label"><?=Loc::getMessage('MIN_TIMER_DETAIL')?></span>
                            </span>
                            <span class="timer__item">
                                <span class="timer__item__digit second">0</span>
                                <span class="timer__item__label"><?=Loc::getMessage('SEC_TIMER_DETAIL')?></span>
                            </span>
							<?php if ($timer['QUANTITY'] > 0 ): ?>
								<span class="timer__item">
								  <span class="timer__item__digit"><?=$timer['QUANTITY']?></span>
								  <span class="timer__item__label"><?=Loc::getMessage('COUNT_TIMER_DETAIL')?></span>
								</span>
							<?php endif;?>
						</span>
						<span class="progress-bar">
							<span class="progress-bar__indicator" style="width:50%;"></span>
                        </span>
					</span>
			    </div>
	        <?php endforeach;?>
	      <?php endif;?>


	      <?php if ($PRODUCT['CAN_BUY'] == 1): ?>

	       	<form class="add2basketform" name="add2basketform">
	       		<input type="hidden" name="<?=$arParams['ACTION_VARIABLE']?>" value="ADD2BASKET">
                <input type="hidden" name="<?=$arParams['PRODUCT_ID_VARIABLE']?>" class="js-add2basketpid" value="<?=$PRODUCT['ID']?>">
	            <div class="product-amount">
	                <div class="dropdown dropdown_select select JS-Dropdown JS-Select" data-select="{'classUndisabled':'select-field_undisabled'}">
	                   <div class="select-field JS-Dropdown-Switcher JS-Select-Field">
	                       <input class="dropdown-switcher gui-input select-input select-input_amount JS-Select-Input js-quantity" data-ratio="<?=$PRODUCT['CATALOG_MEASURE_RATIO'];?>" type="text" value="<?=$PRODUCT['CATALOG_MEASURE_RATIO']?>" name="quantity" />
	                       <span class="select-unit"><?=$PRODUCT['CATALOG_MEASURE_NAME']?></span>
	                       <span class="select-field-icon"></span>
	                    </div>
    	                <div class="dropdown-menu select-bar JS-Dropdown-Menu">
        	                <ul class="select-list">
        	                <?php for($i=1;$i<10;$i++): ?>
                                <li class="select-list__item"><a class="select-list__label JS-Select-Label" href="javascript:;">
                                  <?=$PRODUCT['CATALOG_MEASURE_RATIO']*$i;?></a>
                                </li>
                            <?php endfor; ?>
        	                    <li class="select-list__item"><a class="select-list__label JS-Select-LabelMore" href="javascript:;">
                                    <?=$PRODUCT['CATALOG_MEASURE_RATIO']*10;?>+</a>
                                </li>
        	                </ul>
	                    </div>
	                </div>
	            </div>

	            <div class="product-button">
	                <input class="gui-button product-submit product-submit_cart add_2_cart butt_add_basket js-add_basket" type="submit" value="<?=Loc::getMessage('DETAIL_ADD_2_CART');?>" name="add_cart" />
	                <a class="check_in_cart" href="<?=SITE_DIR.'personal/cart/'?>"><input class="gui-button product-submit product-submit_cart add_2_cart in_cart butt_add_basket" value="<?=Loc::getMessage('DETAIL_ADD_2_CART_IN');?>" type="button" /></a>
	            </div>
            </form>
        <?php endif; ?>

        <?php if (($arParams["SHOW_BUTTON_BUY1CLICK"] == "not_item" && $PRODUCT['CAN_BUY'] == 1) || $arParams["SHOW_BUTTON_BUY1CLICK"] == "always"): ?>
            <div class="product-button">
                <a class="product-submit product-submit_buy buy1click_button JS-Popup-Buy_Click1" data-input='{"name": "RS_AUTHOR_ORDER_LIST"}' href="<?=SITE_DIR?>popup/buy1click.php" rel="nofollow"><?=Loc::getMessage('DETAIL_BUY1CLICK');?></a>
              </div>
        <?php endif; ?>

        <?php if ($arParams["USE_BUTTON_CREDIT"] == "Y"): ?>
            <div class="product-button">
                <a class="product-submit product-submit_credit" href="<?=$arParams['LINK_BUTTON_CREDIT']?>" rel="nofollow"><?=Loc::getMessage('DETAIL_BUY_CREDIT');?></a>
            </div>
        <?php endif; ?>

        <div class="product-bar__foot">
			<?php if (isset($arResult['DISPLAY_PROPERTIES'][$arParams['PROP_COND_DELIVERY']]['DISPLAY_VALUE'])): ?>
                <?php $arResult['NOT_FOR_GROUPPER'][] = $arParams['PROP_COND_DELIVERY']; ?>
				<div class="product-transfer">
					<a class="g-switcher product-transfer__label JS-Popup" href="#delivery"><?=Loc::getMessage('CONDITION_DELYVERY')?></a>
					<div class="g-hidden">
						<div class="popup" id="delivery"><?=$arResult['DISPLAY_PROPERTIES'][$arParams['PROP_COND_DELIVERY']]['DISPLAY_VALUE'];?></div>
					</div>
				</div>
			<?php endif; ?>

            <div class="product-favorites">
                <label class="input-label catalog-description__label catalog-description__compare" href="javascript:;">
                    <span class="gui-checkbox">
                        <input class="gui-checkbox-input" name="compare" type="checkbox" />
                        <span class="gui-checkbox-icon"></span>
                    </span>
                    <span class="g-switcher">
                        <?=Loc::getMessage('TO_COMPARE')?>
                        <span class="count_compare"></span>
                    </span>
                </label>
                <label class="input-label catalog-description__label catalog-description__favorites" href="javascript:;">
                    <span class="gui-checkbox">
                        <input class="gui-checkbox-input" name="compare" type="checkbox" />
                        <span class="gui-checkbox-icon"></span>
                    </span>
                    <span class="g-switcher add2favorite">
                        <input type="hidden" name="<?=$arParams['PRODUCT_ID_VARIABLE']?>" class="js-add2favorite" value="<?=$arResult['ID']?>">
                        <?=Loc::getMessage('TO_FAVORITE')?>
                    </span>
                </label>
            </div>

    	   <?php // SHARE
            if($arParams['USE_SHARE']=='Y'): ?>
                <div class="product-share">
                    <span id="detailYaShare_<?=$arResult['ID']?>"></span>
                    <script type="text/javascript">
                      new Ya.share({
                        link: 'http://<?=$_SERVER['HTTP_HOST']?><?=$arResult['DETAIL_PAGE_URL']?>',
                        title: '<?=CUtil::JSEscape($arResult['TITLE'])?>',
                        <?if(isset($arResult['PREVIEW_TEXT']) && $arResult['PREVIEW_TEXT']!=''):?>description: '<?=CUtil::JSEscape($arResult['PREVIEW_TEXT'])?>',<?endif;?>
                        <?if(isset($arResult['FIRST_PIC'])):?>image: 'http://<?=$_SERVER['HTTP_HOST']?><?=$arResult['FIRST_PIC']['RESIZE']['src']?>',<?endif;?>
                        element: 'detailYaShare_<?=$arResult['ID']?>',
                        elementStyle: {
                          'type': 'button',
                          'border': false,
                          'text': '<?=Loc::getMessage('YSHARE')?>',
                          'quickServices': ['yaru','vkontakte','facebook','twitter','odnoklassniki','moimir']
                        },
                        popupStyle: {
                          blocks: {
                            '<?=Loc::getMessage('YSHARE2')?>': ['yaru','vkontakte','facebook','twitter','odnoklassniki','gplus','liveinternet','lj','moikrug','moimir','myspace']
                          },
                          copyPasteField: false
                        }
                      });
                      </script>
                  </div>
            <?php endif; ?>
        </div>
    </div><!--/product-bar-->
</div><!--/product-detail-->

<ul class="product-menu">

	<?php if ($PRODUCT['HAVE_SET']): ?>
        <li class="product-menu__item">
            <a class="product-menu__label" href="#set_product"><?=Loc::getMessage('SET_DETAIL')?></a>
        </li>
    <?php endif;?>

    <?php if (!empty($arResult['ACCESSORIES']) && count($arResult['ACCESSORIES'])> 0):
        foreach($arResult['ACCESSORIES'] as $sPropCode=>$propCode):?>
          <li class="product-menu__item">
            <a class="product-menu__label" href="<?='#'.$propCode['CODE'];?>"><?=$arResult['ACCESSORIES'][$sPropCode]['NAME'] ?></a>
          </li>
        <?php endforeach;?>
    <?php endif; ?>

    <?php if ($arResult['DETAIL_TEXT'] != ''): ?>
        <li class="product-menu__item">
            <a class="product-menu__label" href="#product-content"><?=Loc::getMessage('DESCRIPTION_DETAIL')?></a>
        </li>
    <?php endif; ?>

    <?php if (!empty($arResult['DOCUMENT']) && count($arResult['DOCUMENT'])> 0): ?>
        <li class="product-menu__item">
            <a class="product-menu__label" href="#documentation"><?=Loc::getMessage('DOCUMENT_DETAIL')?></a>
        </li>
    <?php endif; ?>
    <?php 
    $characteristics = false;
    foreach($arResult['DISPLAY_PROPERTIES'] as $arProp){
    	if(!empty($arProp['VALUE'])){
    		$characteristics = true;
    		break;
    	}
    }

    if ($characteristics): ?>
        <li class="product-menu__item">
            <a class="product-menu__label" href="#characteristics"><?=Loc::getMessage('PROPERTIES_DETAIL')?></a>
        </li>
    <?php endif; ?>
    <?php if ($arParams['USE_REVIEW']=='Y' && IsModuleInstalled('forum') ): ?>
        <li class="product-menu__item">
            <a class="product-menu__label" href="#reviews"><?=Loc::getMessage('REVIEWS_DETAIL')?></a>
        </li>
    <?php endif;?>
    <?php if ($arParams['USE_MODIFICATION'] == 'Y' && count($arResult['OFFERS']) > 0): ?>
        <li class="product-menu__item">
            <a class="product-menu__label" href="#mod"><?=Loc::getMessage('SKU_MOD_DETAIL').' ('.count($arResult['OFFERS']).')'?></a>
        </li>
    <?php endif;?>
</ul>



<?php foreach($arResult['OFFERS'] as $arOffer):?>
    <li class="product-menu__item mob-tab__wi offer_set_<?=$arOffer['ID']?>" <?echo ($arOffer['ID'] != $PRODUCT['ID'] ? 'style="display: none;"' : '')?> >
        <a class="product-menu__label tabs_control" data-href="set_product"><?Loc::getMessage('SET_DETAIL') ?></a>
        <span class="select-field-icon"></span>
    </li>
<?php endforeach; ?>



<div id="set_product" class="tabs_elem">
    <?php if (isset($arResult['OFFERS']) && !empty($arResult['OFFERS'])):
		foreach($arResult['OFFERS'] as $arOffer):
			if(!$arOffer['HAVE_SET'])
				continue;?>
			
            <span class="offer_some_prop offer_set_<?=$arOffer['ID']?>" <?echo ($arOffer['ID'] != $PRODUCT['ID'] ? 'style="display: none;"' : '')?>>
				<div class="detail-content set JS-Drop">
                    <h2><?=Loc::getMessage('SET_DETAIL')?></h2>
					<?php
                    $APPLICATION->IncludeComponent('bitrix:catalog.set.constructor',
						'redg',
						array(
							'IBLOCK_ID' => $arResult['OFFERS_IBLOCK'],
							'ELEMENT_ID' => $arOffer['ID'],
							'PRICE_CODE' => $arParams['PRICE_CODE'],
							'BASKET_URL' => $arParams['BASKET_URL'],
							'OFFERS_CART_PROPERTIES' => $arParams['OFFERS_CART_PROPERTIES'],
							'CACHE_TYPE' => $arParams['CACHE_TYPE'],
							'CACHE_TIME' => $arParams['CACHE_TIME'],
							'CACHE_GROUPS' => $arParams['CACHE_GROUPS'],
							'PROPCODE_MORE_PHOTO' => $arParams['PROPCODE_MORE_PHOTO'],
							'PROPCODE_SKU_MORE_PHOTO' => $arParams['PROPCODE_SKU_MORE_PHOTO'],
							'PROPCODE_ARTIKUL' => $arParams['PROPCODE_ARTIKUL'],
							'PROPCODE_DOSTAVKA' => $arParams['PROPCODE_DOSTAVKA'],
							'PROPCODE_MAKER_LOGO' => $arParams['PROPCODE_MAKER_LOGO'],
							'PROPCODE_MAKER' => $arParams['PROPCODE_MAKER'],
							'PROPCODE_ACCESSORIES' => $arParams['PROPCODE_ACCESSORIES'],
							'POPUP_DETAIL_VARIABLE' => $arParams['POPUP_DETAIL_VARIABLE'],
							'USE_QUANTITY_AND_STORES' => $arParams['USE_QUANTITY_AND_STORES'],
							'USE_PRODUCT_QUANTITY' => $arParams['USE_PRODUCT_QUANTITY'],
							'USE_SHARE_BUTTONS' => $arParams['USE_SHARE_BUTTONS'],
							'USE_KREDIT' => $arParams['USE_KREDIT'],
							'USE_LIKES' => $arParams['USE_LIKES'],
							'USE_COMPARE' => $arParams['USE_COMPARE'],
							'KREDIT_URL' => $arParams['KREDIT_URL'],
							'POPUP_DETAIL_VARIABLE' => $arParams['POPUP_DETAIL_VARIABLE'],
							'ACTION_VARIABLE' => $arParams['ACTION_VARIABLE'],
							'PRODUCT_ID_VARIABLE' => $arParams['PRODUCT_ID_VARIABLE'],
							'PRODUCT_QUANTITY_VARIABLE' => $arParams['PRODUCT_QUANTITY_VARIABLE'],
							'BASKET_URL' => $arParams['BASKET_URL'],
							'CONVERT_CURRENCY' => $arParams['CONVERT_CURRENCY'],
							'CURRENCY_ID' => $arParams['CURRENCY_ID']
						),
						null,
						array('HIDE_ICONS' => 'Y')
					);
                    ?>
				</div>
			</span>
		<?php endforeach;?>
	<?php else:?>
        <span class="offer_some_prop offer_set_<?=$PRODUCT['ID']?>">

        <?php
        $APPLICATION->IncludeComponent('bitrix:catalog.set.constructor',
            'redg',
            array(
              'IBLOCK_ID' => $arParams['IBLOCK_ID'],
              'ELEMENT_ID' => $arResult['ID'],
              'PRICE_CODE' => $arParams['PRICE_CODE'],
              'BASKET_URL' => $arParams['BASKET_URL'],
              'CACHE_TYPE' => $arParams['CACHE_TYPE'],
              'CACHE_TIME' => $arParams['CACHE_TIME'],
              'CACHE_GROUPS' => $arParams['CACHE_GROUPS'],
              'PROPCODE_MORE_PHOTO' => $arParams['PROPCODE_MORE_PHOTO'],
              'PROPCODE_SKU_MORE_PHOTO' => $arParams['PROPCODE_SKU_MORE_PHOTO'],
              'PROPCODE_ARTIKUL' => $arParams['PROPCODE_ARTIKUL'],
              'PROPCODE_DOSTAVKA' => $arParams['PROPCODE_DOSTAVKA'],
              'PROPCODE_MAKER_LOGO' => $arParams['PROPCODE_MAKER_LOGO'],
              'PROPCODE_MAKER' => $arParams['PROPCODE_MAKER'],
              'PROPCODE_ACCESSORIES' => $arParams['PROPCODE_ACCESSORIES'],
              'POPUP_DETAIL_VARIABLE' => $arParams['POPUP_DETAIL_VARIABLE'],
              'USE_QUANTITY_AND_STORES' => $arParams['USE_QUANTITY_AND_STORES'],
              'USE_PRODUCT_QUANTITY' => $arParams['USE_PRODUCT_QUANTITY'],
              'USE_SHARE_BUTTONS' => $arParams['USE_SHARE_BUTTONS'],
              'USE_KREDIT' => $arParams['USE_KREDIT'],
              'USE_LIKES' => $arParams['USE_LIKES'],
              'USE_COMPARE' => $arParams['USE_COMPARE'],
              'KREDIT_URL' => $arParams['KREDIT_URL'],
              'POPUP_DETAIL_VARIABLE' => $arParams['POPUP_DETAIL_VARIABLE'],
              'ACTION_VARIABLE' => $arParams['ACTION_VARIABLE'],
              'PRODUCT_ID_VARIABLE' => $arParams['PRODUCT_ID_VARIABLE'],
              'PRODUCT_QUANTITY_VARIABLE' => $arParams['PRODUCT_QUANTITY_VARIABLE'],
              'BASKET_URL' => $arParams['BASKET_URL'],
              'CONVERT_CURRENCY' => $arParams['CONVERT_CURRENCY'],
              'CURRENCY_ID' => $arParams['CURRENCY_ID']
            ),
            null,
            array('HIDE_ICONS' => 'Y')
          );
        ?>
        </span>
    <?php endif;?>
</div>


<?php global $lightFilter;
    if(!empty($arResult['ACCESSORIES']) && count($arResult['ACCESSORIES'])> 0):
        foreach($arResult['ACCESSORIES'] as $sPropCode=>$propCode):
			$lightFilter = array(
				'ID' => $arResult['ACCESSORIES'][$sPropCode]['VALUE'],
			); ?>
            <li class="product-menu__item mob-tab__wi">
              <a class="product-menu__label tabs_control" data-href="<?=$propCode['CODE'];?>"><?=$arResult['ACCESSORIES'][$sPropCode]['NAME']?></a>
              <span class="select-field-icon"></span>
            </li>

			<div id="<?=$propCode['CODE'];?>" class="product-accessories tabs_elem">
				<h2><?=$arResult['ACCESSORIES'][$sPropCode]['NAME']?></h2>						
                <?$intSectionID = $APPLICATION->IncludeComponent(
					'bitrix:catalog.section',
					'light',
					array(
						'IBLOCK_TYPE' => $arParams['IBLOCK_TYPE'],
						'IBLOCK_ID' => $arParams['IBLOCK_ID'],
						'ELEMENT_SORT_FIELD' => $arParams['ELEMENT_SORT_FIELD'],
						'ELEMENT_SORT_ORDER' => $arParams['ELEMENT_SORT_ORDER'],
						'ELEMENT_SORT_FIELD2' => $arParams['ELEMENT_SORT_FIELD2'],
						'ELEMENT_SORT_ORDER2' => $arParams['ELEMENT_SORT_ORDER2'],
						'PROPERTY_CODE' => $arParams['LIST_PROPERTY_CODE'],
						'META_KEYWORDS' => $arParams['LIST_META_KEYWORDS'],
						'META_DESCRIPTION' => $arParams['LIST_META_DESCRIPTION'],
						'BROWSER_TITLE' => $arParams['LIST_BROWSER_TITLE'],
						'INCLUDE_SUBSECTIONS' => $arParams['INCLUDE_SUBSECTIONS'],
						'BASKET_URL' => $arParams['BASKET_URL'],
						'ACTION_VARIABLE' => $arParams['ACTION_VARIABLE'],
						'PRODUCT_ID_VARIABLE' => $arParams['PRODUCT_ID_VARIABLE'],
						'SECTION_ID_VARIABLE' => $arParams['SECTION_ID_VARIABLE'],
						'PRODUCT_QUANTITY_VARIABLE' => $arParams['PRODUCT_QUANTITY_VARIABLE'],
						'PRODUCT_PROPS_VARIABLE' => $arParams['PRODUCT_PROPS_VARIABLE'],
						'FILTER_NAME' => 'lightFilter',
						'CACHE_TYPE' => $arParams['CACHE_TYPE'],
						'CACHE_TIME' => $arParams['CACHE_TIME'],
						'CACHE_FILTER' => $arParams['CACHE_FILTER'],
						'CACHE_GROUPS' => $arParams['CACHE_GROUPS'],
						'SET_TITLE' => $arParams['SET_TITLE'],
						'SET_STATUS_404' => $arParams['SET_STATUS_404'],
						'DISPLAY_COMPARE' => $arParams['USE_COMPARE'],
						'PAGE_ELEMENT_COUNT' => $arParams['PAGE_ELEMENT_COUNT'],
						'LINE_ELEMENT_COUNT' => $arParams['LINE_ELEMENT_COUNT'],
						'PRICE_CODE' => $arParams['PRICE_CODE'],
						'USE_PRICE_COUNT' => $arParams['USE_PRICE_COUNT'],
						'SHOW_PRICE_COUNT' => $arParams['SHOW_PRICE_COUNT'],

						'PRICE_VAT_INCLUDE' => $arParams['PRICE_VAT_INCLUDE'],
						'USE_PRODUCT_QUANTITY' => $arParams['USE_PRODUCT_QUANTITY'],
						'ADD_PROPERTIES_TO_BASKET' => (isset($arParams['ADD_PROPERTIES_TO_BASKET']) ? $arParams['ADD_PROPERTIES_TO_BASKET'] : ''),
						'PARTIAL_PRODUCT_PROPERTIES' => (isset($arParams['PARTIAL_PRODUCT_PROPERTIES']) ? $arParams['PARTIAL_PRODUCT_PROPERTIES'] : ''),
						'PRODUCT_PROPERTIES' => $arParams['PRODUCT_PROPERTIES'],

						'DISPLAY_TOP_PAGER' => $arParams['DISPLAY_TOP_PAGER'],
						'DISPLAY_BOTTOM_PAGER' => $arParams['DISPLAY_BOTTOM_PAGER'],
						'PAGER_TITLE' => $arParams['PAGER_TITLE'],
						'PAGER_SHOW_ALWAYS' => $arParams['PAGER_SHOW_ALWAYS'],
						'PAGER_TEMPLATE' => $arParams['PAGER_TEMPLATE'],
						'PAGER_DESC_NUMBERING' => $arParams['PAGER_DESC_NUMBERING'],
						'PAGER_DESC_NUMBERING_CACHE_TIME' => $arParams['PAGER_DESC_NUMBERING_CACHE_TIME'],
						'PAGER_SHOW_ALL' => $arParams['PAGER_SHOW_ALL'],

						'OFFERS_PROPERTY_CODE' => $arParams['OFFERS_PROPERTY_CODE'],
						'PROPS_ATTRIBUTES'	=> $arParams['PROPS_ATTRIBUTES'],
						'PROPS_ATTRIBUTES_COLOR'	=> $arParams['PROPS_ATTRIBUTES_COLOR'],

						'SECTION_ID' => $arResult['VARIABLES']['SECTION_ID'],
						'SECTION_CODE' => $arResult['VARIABLES']['SECTION_CODE'],
						'SECTION_URL' => $arResult['FOLDER'].$arResult['URL_TEMPLATES']['section'],
						'DETAIL_URL' => $arResult['FOLDER'].$arResult['URL_TEMPLATES']['element'],
						'CONVERT_CURRENCY' => $arParams['CONVERT_CURRENCY'],
						'CURRENCY_ID' => $arParams['CURRENCY_ID'],
						'HIDE_NOT_AVAILABLE' => $arParams['HIDE_NOT_AVAILABLE'],

						'PROP_MORE_PHOTO' => $arParams['PROP_MORE_PHOTO'],
						'PROP_ARTICLE' => $arParams['PROP_ARTICLE'],
						'PROP_ACCESSORIES' => $arParams['PROP_ACCESSORIES'],
						'USE_FAVORITE' => $arParams['USE_FAVORITE'],
						'USE_SHARE' => $arParams['USE_SHARE'],
						'SHOW_ERROR_EMPTY_ITEMS' => $arParams['SHOW_ERROR_EMPTY_ITEMS'],
						'PROP_SKU_MORE_PHOTO' => $arParams['PROP_SKU_MORE_PHOTO'],
						'PROP_SKU_ARTICLE' => $arParams['PROP_SKU_ARTICLE'],
						'PROPS_ATTRIBUTES' => $arParams['PROPS_ATTRIBUTES'],
						// store
						'USE_STORE' => $arParams['USE_STORE'],
						'USE_MIN_AMOUNT' => $arParams['USE_MIN_AMOUNT'],
						'MIN_AMOUNT' => $arParams['MIN_AMOUNT'],
						'MAIN_TITLE' => $arParams['MAIN_TITLE'],
						'LINK_IBLOCK_ID' => $arParams['LINK_IBLOCK_ID'],
						// some...
						'BY_LINK' => 'Y',
						// seo
						"ADD_SECTIONS_CHAIN" => "N",
						"SET_BROWSER_TITLE" => "N",
						"SET_META_KEYWORDS" => "N",
						"SET_META_DESCRIPTION" => "N",
						"ADD_ELEMENT_CHAIN" => "N",
						'PROP_BEST_SELLER' => $arParams['PROP_BEST_SELLER'],
						'PROP_NEW_ITEM' => $arParams['PROP_NEW_ITEM'],
					),
					$component,
					array('HIDE_ICONS'=>'Y')
				);?>
			</div><!-- /product-accessories -->
		<?php endforeach;?>
    <?php endif; ?>


    <?php if($arResult['DETAIL_TEXT'] != ''): ?>
        <li class="product-menu__item mob-tab__wi">
            <a class="product-menu__label tabs_control" data-href="product-content"><?=Loc::getMessage('DESCRIPTION_DETAIL')?></a>
            <span class="select-field-icon"></span>
        </li>
		<div id="product-content" class="product-content detail-content JS-Drop tabs_elem">
			<h2 class="product-content__title"><?=Loc::getMessage('DESCRIPTION_DETAIL')?></h2>
			<div class="product-content__info">
			    <?=$arResult['DETAIL_TEXT'];?>
		    </div>

			<a class="g-switcher detail-switcher product-content__switcher JS-Drop-Switcher" href="javascript:;">
    			<span class="detail-switcher__label detail-switcher__label_open"><?=Loc::getMessage('MORE_TEXT_DETAIL')?></span>
    			<span class="detail-switcher__label detail-switcher__label_close"><?=Loc::getMessage('LESS_TEXT_DETAIL')?></span>
			</a>
		</div><!--/product-description-->
    <?php endif; ?>


    <?php if(!empty($arResult['DOCUMENT']) && count($arResult['DOCUMENT'])> 0):?>
        <?php foreach($arResult['DOCUMENT'] as $key1=>$arDoc):?>
            <li class="product-menu__item mob-tab__wi">
                <a class="product-menu__label tabs_control" data-href="documentation"><?=Loc::getMessage('DOCUMENT_DETAIL')?></a>
                <span class="select-field-icon"></span>
            </li>
			<div id="documentation" class="documentation tabs_elem">
				<h2><?=Loc::getMessage('DOCUMENT_DETAIL')?></h2>
				<ul class="documentation__list">
					<?php foreach($arDoc['FILE_VALUE'] as $val):
						$arVal = explode('.',$val['FILE_NAME']);
						$end = end($arVal);
						$name = substr($val['ORIGINAL_NAME'],0, -(strlen($end)+1));
                    ?>
					    <li class="documentation__item">
                            <a class="documentation__label" href="<?=$val['SRC'];?>">
                                <span class="documentation-icon"><span class="documentation-icon__name"><?=$end?></span></span>
                                <span class="documentation__detail"><?=$name?></span>
                            </a>
					    </li>
					<?php endforeach; ?>
				</ul><!--/documentation__list-->
			</div><!--/documentation-->
        <?php endforeach; ?>
    <?php endif;?>

    <?php if (count($arParams['PROPS_TABS']) > 0): ?>
        <li class="product-menu__item mob-tab__wi">
            <a class="product-menu__label tabs_control" data-href="characteristics"><?=Loc::getMessage('PROPERTIES_DETAIL')?></a>
            <span class="select-field-icon"></span>
        </li>
		<div id="characteristics" class="characteristics tabs_elem"><?
			$characteristics = false;
                foreach($arResult['DISPLAY_PROPERTIES'] as $arProp){
                    if(!empty($arProp['VALUE'])){
                      $characteristics = true;
                      break;
                    }
                }
                if($characteristics):?>
                    <h2><?=Loc::getMessage('PROPERTIES_DETAIL')?></h2>
                <?php endif;?>
				
                <?php		
				$arGroup = array();
				foreach($arResult['DISPLAY_PROPERTIES'] as $key2=>$sPropCode) {
					if(!in_array($key2, $arResult['NOT_FOR_GROUPPER']))
						$arGroup[] = $sPropCode;
				}

				$APPLICATION->IncludeComponent(
					"redsign:grupper.list",
					"characteristics",
					array(
						'DISPLAY_PROPERTIES' => $arGroup,
						'CACHE_TIME' => 36000,
					),
					$component,
					array('HIDE_ICONS'=>'Y')
				);
                ?>

		</div><!--/characteristics-->

		<?/*?><a class="g-switcher detail-switcher" href="javascript:;"><?
			?><span class="detail-switcher__label detail-switcher__label_open"><?=Loc::getMessage('PROPERTIES_DETAIL_MORE')?></span><?
		?></a><?*/
	endif;


	if ($arParams['USE_MODIFICATION'] == 'Y' && count($arResult['ID_OFFERS']) > 0):
        $this->SetViewTarget('MODS_ELEMENT');
        global $filterMod;
        $filterMod = array(
            'ID' => $arResult['ID_OFFERS'],
        );

        $offerIBlock = CIBlockPriceTools::GetOffersIBlock($arParams['IBLOCK_ID']);
            ?><div id="mod"><?
                ?><h2><?=$arParams['MODIFICATION_BLOCK_NAME']?></h2><?
                $APPLICATION->IncludeComponent(
                'bitrix:catalog.section',
                'catalog',
                array(
                  'IBLOCK_TYPE' => '',
                  'IBLOCK_ID' => $offerIBlock['OFFERS_IBLOCK_ID'],
                  'ELEMENT_SORT_FIELD' => $arParams['ELEMENT_SORT_FIELD'],
                  'ELEMENT_SORT_ORDER' => $arParams['ELEMENT_SORT_ORDER'],
                  'ELEMENT_SORT_FIELD2' => $arParams['ELEMENT_SORT_FIELD2'],
                  'ELEMENT_SORT_ORDER2' => $arParams['ELEMENT_SORT_ORDER2'],
                  'PROPERTY_CODE' => $arParams['LIST_PROPERTY_CODE'],
                  'META_KEYWORDS' => $arParams['LIST_META_KEYWORDS'],
                  'META_DESCRIPTION' => $arParams['LIST_META_DESCRIPTION'],
                  'BROWSER_TITLE' => $arParams['LIST_BROWSER_TITLE'],
                  'INCLUDE_SUBSECTIONS' => $arParams['INCLUDE_SUBSECTIONS'],
                  'BASKET_URL' => $arParams['BASKET_URL'],
                  'ACTION_VARIABLE' => $arParams['ACTION_VARIABLE'],
                  'PRODUCT_ID_VARIABLE' => $arParams['PRODUCT_ID_VARIABLE'],
                  'SECTION_ID_VARIABLE' => $arParams['SECTION_ID_VARIABLE'],
                  'PRODUCT_QUANTITY_VARIABLE' => $arParams['PRODUCT_QUANTITY_VARIABLE'],
                  'PRODUCT_PROPS_VARIABLE' => $arParams['PRODUCT_PROPS_VARIABLE'],
                  'FILTER_NAME' => 'filterMod',
                  'CACHE_TYPE' => $arParams['CACHE_TYPE'],
                  'CACHE_TIME' => $arParams['CACHE_TIME'],
                  'CACHE_FILTER' => $arParams['CACHE_FILTER'],
                  'CACHE_GROUPS' => $arParams['CACHE_GROUPS'],
                  'SET_TITLE' => $arParams['SET_TITLE'],
                  'SET_STATUS_404' => $arParams['SET_STATUS_404'],
                  'DISPLAY_COMPARE' => $arParams['USE_COMPARE'],
                  'PAGE_ELEMENT_COUNT' => $arParams['PAGE_ELEMENT_COUNT'],
                  'LINE_ELEMENT_COUNT' => $arParams['LINE_ELEMENT_COUNT'],
                  'PRICE_CODE' => $arParams['PRICE_CODE'],
                  'USE_PRICE_COUNT' => $arParams['USE_PRICE_COUNT'],
                  'SHOW_PRICE_COUNT' => $arParams['SHOW_PRICE_COUNT'],

                  'PRICE_VAT_INCLUDE' => $arParams['PRICE_VAT_INCLUDE'],
                  'USE_PRODUCT_QUANTITY' => $arParams['USE_PRODUCT_QUANTITY'],
                  'ADD_PROPERTIES_TO_BASKET' => (isset($arParams['ADD_PROPERTIES_TO_BASKET']) ? $arParams['ADD_PROPERTIES_TO_BASKET'] : ''),
                  'PARTIAL_PRODUCT_PROPERTIES' => (isset($arParams['PARTIAL_PRODUCT_PROPERTIES']) ? $arParams['PARTIAL_PRODUCT_PROPERTIES'] : ''),
                  'PRODUCT_PROPERTIES' => $arParams['PRODUCT_PROPERTIES'],

                  'DISPLAY_TOP_PAGER' => $arParams['DISPLAY_TOP_PAGER'],
                  'DISPLAY_BOTTOM_PAGER' => $arParams['DISPLAY_BOTTOM_PAGER'],
                  'PAGER_TITLE' => $arParams['PAGER_TITLE'],
                  'PAGER_SHOW_ALWAYS' => $arParams['PAGER_SHOW_ALWAYS'],
                  'PAGER_TEMPLATE' => $arParams['PAGER_TEMPLATE'],
                  'PAGER_DESC_NUMBERING' => $arParams['PAGER_DESC_NUMBERING'],
                  'PAGER_DESC_NUMBERING_CACHE_TIME' => $arParams['PAGER_DESC_NUMBERING_CACHE_TIME'],
                  'PAGER_SHOW_ALL' => $arParams['PAGER_SHOW_ALL'],

                  'SECTION_ID' => $arResult['VARIABLES']['SECTION_ID'],
                  'SECTION_CODE' => $arResult['VARIABLES']['SECTION_CODE'],
                  'SECTION_URL' => $arResult['FOLDER'].$arResult['URL_TEMPLATES']['section'],
                  'DETAIL_URL' => $arResult['FOLDER'].$arResult['URL_TEMPLATES']['element'],
                  'CONVERT_CURRENCY' => $arParams['CONVERT_CURRENCY'],
                  'CURRENCY_ID' => $arParams['CURRENCY_ID'],
                  'HIDE_NOT_AVAILABLE' => $arParams['HIDE_NOT_AVAILABLE'],

                  'USE_FAVORITE' => $arParams['USE_FAVORITE'],
                  'USE_SHARE' => $arParams['USE_SHARE'],
                  'SHOW_ERROR_EMPTY_ITEMS' => $arParams['SHOW_ERROR_EMPTY_ITEMS'],
                  'PROP_SKU_MORE_PHOTO' => $arParams['PROP_SKU_MORE_PHOTO'],
                  'PROP_ARTICLE' => $arParams['PROP_SKU_ARTICLE'],
                  'PROPS_ATTRIBUTES' => $arParams['PROPS_ATTRIBUTES'],
                  // store
                  'USE_STORE' => $arParams['USE_STORE'],
                  'USE_MIN_AMOUNT' => $arParams['USE_MIN_AMOUNT'],
                  'MIN_AMOUNT' => $arParams['MIN_AMOUNT'],
                  'MAIN_TITLE' => $arParams['MAIN_TITLE'],
                  'LINK_IBLOCK_ID' => $arParams['LINK_IBLOCK_ID'],
                  // some...
                  'BY_LINK' => 'Y',
                  // seo
                  "ADD_SECTIONS_CHAIN" => "N",
                  "SET_BROWSER_TITLE" => "N",
                  "SET_META_KEYWORDS" => "N",
                  "SET_META_DESCRIPTION" => "N",
                  "ADD_ELEMENT_CHAIN" => "N",
                  "VIEW" => "table",
                  "MODIFICATION" => "Y",
                ),
                $component,
                array('HIDE_ICONS'=>'Y')
                );?>
            </div>
        <?php $this->EndViewTarget(); ?>
    <?php endif;?>
</div><!--/product-->
<script>
	BX.message({
		ReDigital_PROD_ID: '<?=GetMessageJS('ReDigital_PROD_ID')?>',
		ReDigital_PROD_NAME: '<?=GetMessageJS('ReDigital_PROD_NAME')?>',
		ReDigital_PROD_LINK: '<?=GetMessageJS('ReDigital_PROD_LINK')?>',
	});
  REDG_PRODUCTS['<?=$arResult['ID']?>'] = {'IMAGES':<?=CUtil::PhpToJSObject($arImgs)?>};
</script><?