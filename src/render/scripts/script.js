$(function() {

  // animate elements
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

      // check to see if this current container is within viewport
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

  $window.on('ready', write_animated_element_position);
  $window.on('scroll resize', check_if_in_view);

  $window.trigger('ready');
  $window.trigger('scroll');

  // smooth scroll
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('.body-content').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });

  // feature points block
  $('.features__point').click(function(){
    $('.features__point').each(function(){
      $(this).removeClass('active');
    });

    $(this).addClass('active');
  });

  // screens block
  $('#zoom').click(function(event){
    event.preventDefault();
    $(this).toggleClass('zoomed');
  });

  // option points block carousel
  var options = document.getElementById("options__points");
  var optionsPoints = document.getElementsByClassName("options__point");
  var optionsPointsLength = optionsPoints.length - 1;

  options.addEventListener('click', function(e) {
    e.stopPropagation();
    var target = e.target;

    if (target.tagName === "A") {
        var parent = target.parentElement;
        var typeScroll = 0;
        if (parent.classList.contains('scroll--next')) {
          typeScroll = 1;
        }

        var activePoint = document.getElementsByClassName("options__point active")[0];
        activePoint.classList.remove('active');

        if (typeScroll) {
          if (activePoint.nextElementSibling.classList.contains('options__point')) {
            activePoint.nextElementSibling.classList.add('active');
          } else {
            optionsPoints[0].classList.add('active');
          }
        } else {
          if (activePoint.previousElementSibling) {
            activePoint.previousElementSibling.classList.add('active');
          } else {
            optionsPoints[optionsPointsLength].classList.add('active');
          }
        }
    }
  }, false);

  // videos block carousel
  var videoPlayers = document.getElementById("videoPlayers");
  var playerContainers = document.getElementsByClassName("player__container");
  var playerContainersLength = playerContainers.length - 1;

  videoPlayers.addEventListener('click', function(e) {
    e.stopPropagation();
    var target = e.target;

    if (target.tagName === "A") {
        var parent = target.parentElement;
        var typeScroll = 0;
        if (parent.classList.contains('scroll--next')) {
          typeScroll = 1;
        }

        var activePoint = document.getElementsByClassName("player__container active")[0];
        activePoint.classList.remove('active');

        if (typeScroll) {
          if (activePoint.nextElementSibling) {
            activePoint.nextElementSibling.classList.add('active');
          } else {
            playerContainers[0].classList.add('active');
          }
        } else {
          if (activePoint.previousElementSibling.classList.contains('player__container')) {
            activePoint.previousElementSibling.classList.add('active');
          } else {
            playerContainers[playerContainersLength].classList.add('active');
          }
        }
    }
  }, false);

  // video block playing state
  var players = document.getElementsByClassName("player");

  for (var i = 0; i < players.length; i++) {
    player = players[i];
    var video = player.getElementsByClassName('video-content')[0];

    player.addEventListener('click', function(event) {
      event.preventDefault();
      elem = this;
      var video = elem.getElementsByClassName('video-content')[0];

      if (!elem.classList.contains("played")) {
        elem.classList.add("played");
        video.controls = true;
      }

      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }, false);

    video.addEventListener('ended', function() {
      video = this;
      var player = video.parentElement;

      player.classList.remove("played");
      video.controls = false;
      video.load();
    }, false);
  }

  // sticky navigation
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
