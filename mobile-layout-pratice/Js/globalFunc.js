		// 加减
		function inputNumber() {

			var $me = $('.input-number');

			
			var $jia = $me.find('.input-jia');
			var $jian = $me.find('.input-jian');

			$jia.off('click');
			$jian.off('click');

			$jia.click(function(){
				var $this = $(this);
				var $parent = $this.parent();
				var $i =  $parent.find('input');
				$i.val(parseInt($i.val())+1);
			});

			$jian.click(function(){
				var $this = $(this);
				var $parent = $this.parent();
				var $i =  $parent.find('input');
				if(parseInt($i.val())<=0) return;
				$i.val(parseInt($i.val())-1)
			});
		}


    function jsHeart() {
	    // 点击红心效果
	    $('.js-heart').off('click');
	    $('.js-heart').click(function(){
	    	var $i = $(this).find('i');
	    	if($i.hasClass('icon-heart')) {
	    		$i.removeClass('icon-heart')
	    		  .addClass('icon-heart1');
	    	} else{
	    		$i.addClass('icon-heart')
	    		  .removeClass('icon-heart1');
	    	}
	    });
    }

    // 模拟的弹窗

		function confirmFunc() {
			var s = confirm("确认删除？");
			if(s) {
				alert("已删除");
			} else {
				alert("已取消");
			}
		}


// 选择辅助函数
function selectFunc() {
	var $select = $('.js-select select');
			
	$select.change(function(){
		var $me = $(this),
				$w = $me.parent(),
				$show = $w.find('.select-show');

		var val = $me.find('option:selected').text();
		$show.find('span').html(val);

	});

	// input change
	var $input = $('.js-select input');
	var tag = true;
	$input.blur(function(){
		var $me = $(this),
				$w = $me.parent(),
				$show = $w.find('.select-show');

		var val = $me.val();
		$show.find('span').html(val);

	});



}

// 倒计时跳转页面
// 
function timerFunc(ms, url, callback) {
	var i = setInterval(function(){
		ms--;
		callback(ms);
		if(!ms) {
			clearInterval(i);
			window.location.href = url;
		}
		

	}, 1000)
}


// 弹窗插件
function　modalPop(options){

	var $el = $(options.el),
			sureFunc = options.sureFunc || function(){},
			cancelFunc = options.cancelFunc || function(){},
			closeFunc = options.closeFunc || function(){};

	// 注册的回调函数
	var callback = options.callback || function(){};


	var $close = $el.find('.js-model-close'),
	    $sure = $el.find('.js-model-sure'),
	    $cancel = $el.find('.js-model-cancel');

	var clearFunc = function(){
			$close.off('click');
			$sure.off('click');
			$cancel.off('click');
			$el.hide();
	}	

	// 执行回调
	callback($el);

	$close.click(function(){
		closeFunc();
		clearFunc();
	});

	$sure.click(function(){
		sureFunc();
		clearFunc();
	});


	$cancel.click(function(){
		cancelFunc();
		clearFunc();
	});

}