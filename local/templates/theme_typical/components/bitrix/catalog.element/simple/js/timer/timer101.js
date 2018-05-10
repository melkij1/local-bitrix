//Версия 1.0.1

(function( $ ) {
  'use strict';

  $.fn.timer = function(options) {

    options = $.extend({
      days:".days", //класс куда будут вставлены дни
      hours:".hours", //часы
      minute:".minute", //минуты
      second:".second", //секунды
      blockTime:".timer__item", //блок в котором время + надпись (например 10 дн)
      linePercent:".progress_bar", //Шкала с процентами
      textLinePercent:".progress_text", //блок в который будут всталяться проценты
      reInit: false
    }, options);

    var copyOptions = options;
    console.log(this.length);
    var timers = this;
    if($(this).length < 1){
      return false;
    }

    $(timers).each(function () {
      if (!$(this).hasClass('runTimer')) {
        $(this).addClass('runTimer');
      }
    });

    var sec = 1,
      dateDateNow = Date.parse(new Date()) / 1000,
      dateNow = BX.message('SERVER_TIME'),
      blockStyle = $(options.minute).closest(options.blockTime).css('display');

    var timer = function () {
      dateNow = parseInt(dateNow) + sec;
      $(timers).each(function () {
        var timerHtml = $(this),
          dataTimer = $(this).data('timer'),
          limit = dataTimer.DATE_TO - dataTimer.DATE_FROM,
          gone = dataTimer.DATE_TO - dateNow;

        if (gone < 1 && dataTimer.AUTO_RENEWAL == 'Y') {
          for (var lim = 0; lim < 200; lim++) {
            var newdateTo = (lim * limit + dataTimer.DATE_TO) - dateNow;
            if (newdateTo > 0) {
              gone = newdateTo;
              break;
            }
          }
        }

        if (gone > 0) {

          var days = parseInt((gone / (60 * 60 )) / 24);
          if (days < 10) {
            days = '0' + days;
          }
          days = days.toString();
          var hourse = parseInt(gone / (60 * 60 )),
            hours = parseInt((gone / (60 * 60 )) % 24);
          if (hours < 10) {
            hours = '0' + hours;
          }
          hours = hours.toString();

          var minutes = parseInt(gone / (60)) % 60;
          if (minutes < 10) {
            minutes = '0' + minutes;
          }
          minutes = minutes.toString();

          var seconds = parseInt(gone) % 60;
          if (seconds < 10) {
            seconds = '0' + seconds;
          }
          seconds = seconds.toString();


          //Расчет процентов
          var widthTimerPerc = false;

          if (!!dataTimer.DINAMICA_DATA) {
            if (dataTimer.DINAMICA_DATA == 'evenly') {
              widthTimerPerc = Math.floor(100 - ((gone / limit) * 100));

              timerHtml.find(options.linePercent).css('width', widthTimerPerc + '%');
              timerHtml.find(options.textLinePercent).text(widthTimerPerc);
            }
            else {
              var prevPerc = false,
                firstPerc = false;

              for (var timePerc in dataTimer.DINAMICA_DATA) {
                if (!prevPerc) {
                  prevPerc = timePerc;
                  firstPerc = timePerc;
                }
                if (prevPerc < hourse && hourse < timePerc) {
                  widthTimerPerc = dataTimer.DINAMICA_DATA[timePerc];
                  break;
                }
                prevPerc = timePerc;
              }

              if (!widthTimerPerc) {
                if (hourse > prevPerc) {
                  widthTimerPerc = dataTimer.DINAMICA_DATA[prevPerc];
                }
                else if (hourse < prevPerc) {
                  widthTimerPerc = dataTimer.DINAMICA_DATA[firstPerc];
                }
              }

              if (widthTimerPerc) {
                timerHtml.find(options.linePercent).css('width', widthTimerPerc + '%');
                timerHtml.find(options.textLinePercent).text(widthTimerPerc);
              }
            }
          }
          else {
            widthTimerPerc = Math.floor((gone / limit) * 100);
            timerHtml.find(options.linePercent).css('width', widthTimerPerc + '%');
            timerHtml.find(options.textLinePercent).text(widthTimerPerc);
          }

          // Прячем дни или секунды в зависимости от оставшегося времени
          if (days < 1) {
            timerHtml.find(options.days).closest(options.blockTime).css('display', 'none');
            timerHtml.find(options.second).closest(options.blockTime).css('display', blockStyle);
          }
          else if (days > 0) {
            timerHtml.find(options.days).closest(options.blockTime).css('display', blockStyle);
            timerHtml.find(options.second).closest(options.blockTime).css('display', 'none');
          }

          //Вставляем время в блоки
          timerHtml.find(options.second).text(seconds);
          timerHtml.find(options.minute).text(minutes);
          timerHtml.find(options.hours).text(hours);
          timerHtml.find(options.days).text(days);

        }
        else {
          timerCanDelete(timerHtml);
        }
      })
    };

    var initTimerSet;
    return initTimerSet = setInterval(function(){ timer();},1000);
  }

})(jQuery);