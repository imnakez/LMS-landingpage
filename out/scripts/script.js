$(function() {

  var $window = $('.body-content');
  var $animation_elements = $('.animation');

  function write_animated_element_position() {
    $.each($animation_elements, function() {
      var $element = $(this);
      var element_height = $element.outerHeight();
      var element_top_position = $element.offset().top;
      var element_bottom_position = (element_top_position + element_height);
      $element.data( 'topPosition', element_top_position );
      $element.data( 'bottomPosition', element_bottom_position );
    });
  }

  function check_if_in_view() {
    var window_height = $window.height();
    var window_top_position = $window.scrollTop();
    var window_bottom_position = (window_top_position + window_height);

    $.each($animation_elements, function() {
      var $element = $(this);
      var element_data = $element.data();
      var element_top_position = element_data.topPosition;
      var element_bottom_position = element_data.bottomPosition;
      var animation = element_data.animation;

      //check to see if this current container is within viewport
      if ((element_bottom_position >= (window_top_position + 100)) &&
          (element_top_position <= (window_bottom_position - 100))) {
      // if ((element_top_position >= window_top_position) &&
      //     (element_bottom_position <= window_bottom_position)) {
        $element.addClass('in-view animated ' + animation);
      } else {
        $element.removeClass('in-view animated ' + animation);
      }
    });
  }

  $window.on('scroll resize', check_if_in_view);

  $window.on('ready', write_animated_element_position);

  $window.trigger('ready');
  $window.trigger('scroll');


  $('.features__point').click(function(){
    $('.features__point').each(function(){
      $(this).removeClass('active');
    });

    $(this).addClass('active');
  });

  $('#zoom').click(function(event){
    event.preventDefault();
    $(this).toggleClass('zoomed');
  });

  $(function(){
		var lastScrollTop = 0, delta = 5;
		$('html, body, .body-content').scroll(function(event){
			var st = $(this).scrollTop();

			if (Math.abs(lastScrollTop - st) <= delta) {
				return;
      }

      if (st <= delta) {
        // resetNavHeight();
        $(".sticky-nav").removeClass("is-sticky");
      }
      else {
        $(".sticky-nav").addClass("is-sticky");
      }

			if (st > lastScrollTop){
				// downscroll code
				$(".sticky-nav.is-sticky").removeClass("scrolltop").addClass("scrolldown");
				$(".body-content").removeClass("scrolltop");
			} else {
				// upscroll code
				$(".sticky-nav.is-sticky").removeClass("scrolldown").addClass("scrolltop");
				$(".body-content").addClass("scrolltop");
			}
			lastScrollTop = st;
		});
	});

});
