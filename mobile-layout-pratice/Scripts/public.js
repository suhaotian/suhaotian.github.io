  $(function(){
	  $('.header div:eq(2) img').click(function(){
		  var s = $('.nav_s');

		  if (s.is(':hidden')) {
		  	s.show();
		  } else {
		  	s.hide();
		  }
		})
	 })