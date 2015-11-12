
      function clear() {
        var prevP = $($('.popup22')[0]);
        var overlay = prevP.next();
        prevP.remove();overlay.remove();
      }

    function pop(sureFunc, closeFunc, cancelFunc, str) {

      var sureFunc = sureFunc || function() {

      };
      var closeFunc = closeFunc || function() {

      };
      var cancelFunc = cancelFunc || function() {

      };


      var str = '  <div class="popup22">' +
                '    <div class="w-popup">' +
                '      <div class="close js-close">x</div>' + str +
                '    </div>' +
                '  </div>' +
                '  <div class="overlay"></div>';
      
      var $elm, $sure, $close, $cancel;
                
      $elm = $(str);

      $('body').append($elm);

      $elm = $('body').find('.popup22');

      $sure = $elm.find('.js-sure');
      $close = $elm.find('.js-close');
      $cancel = $elm.find('.js-cancel');


      $sure.click(function() {
        sureFunc();
        clear();
      });

      $close.click(function(){
        closeFunc();
        clear();
      });
      $cancel.click(function(){
        cancelFunc();
        clear();
      });
    }