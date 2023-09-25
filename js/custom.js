
	jQuery(window).on('load', function() {
		jQuery("#status").fadeOut(2000);
		jQuery("#preloader").delay(1800).fadeOut("slow");
	});

	var counter = 0;
	$('.mh_menu_btn').click(function(){
		if( counter == '0') {
			$('.mh_navigation_menu').addClass('mh_main_menu_hide');
			$(this).children().removeAttr('class');
			$(this).children().attr('class','fa fa-close');
			counter++;
		}
		else {
			$('.mh_navigation_menu').removeClass('mh_main_menu_hide');
			$(this).children().removeAttr('class');
			$(this).children().attr('class','fa fa-bars');
			counter--;
		}
	
	});

    $(window).scroll(function(){
      var window_top = $(window).scrollTop() + 1; 
        if (window_top > 300) {
          $('.mh_navigation').addClass('menu_fixed animated fadeInDown');
        } else {
          $('.mh_navigation').removeClass('menu_fixed animated fadeInDown');
        }
    });

	var pluginName = 'ScrollIt',
		pluginVersion = '1.0.3';

	var defaults = {
		upKey: 38,
		downKey: 40,
		easing: 'linear',
		scrollTime: 600,
		activeClass: 'active',
		onPageChange: null,
		topOffset : -70
	};

	$.scrollIt = function(options) {

		var settings = $.extend(defaults, options),
			active = 0,
			lastIndex = $('[data-scroll-index]:last').attr('data-scroll-index');

		var navigate = function(ndx) {
			if(ndx < 0 || ndx > lastIndex){ return; }

			var targetTop = $('[data-scroll-index=' + ndx + ']').offset().top + settings.topOffset + 1;
			$('html,body').animate({
				scrollTop: targetTop,
				easing: settings.easing
			}, settings.scrollTime);
		};

		var doScroll = function (e) {
			var target = $(e.target).closest("[href]").attr('href') ||
			$(e.target).closest("[data-scroll-goto]").attr('data-scroll-goto');
			navigate(parseInt(target,10));
		};

		var keyNavigation = function (e) {
			var key = e.which;
			if($('html,body').is(':animated') && (key == settings.upKey || key == settings.downKey)) {
				return false;
			}
			if(key == settings.upKey && active > 0) {
				navigate(parseInt(active,10) - 1);
				return false;
			} else if(key == settings.downKey && active < lastIndex) {
				navigate(parseInt(active,10) + 1);
				return false;
			}
			return true;
		};

		var updateActive = function(ndx) {
			if(settings.onPageChange && ndx && (active != ndx)) {settings.onPageChange(ndx); }

			active = ndx;
			$('[href]').removeClass(settings.activeClass);
			$('[href=' + ndx + ']').addClass(settings.activeClass);
		};

		var watchActive = function() {
			var winTop = $(window).scrollTop();

			var visible = $('[data-scroll-index]').filter(function(ndx, div) {
				return winTop >= $(div).offset().top + settings.topOffset &&
				winTop < $(div).offset().top + (settings.topOffset) + $(div).outerHeight();
			});
			var newActive = visible.first().attr('data-scroll-index');
			updateActive(newActive);
		};


		$(window).on('scroll',watchActive).scroll();

		$(window).on('keydown', keyNavigation);

		$('.mh_single_page_menu').on('click','[href], [data-scroll-goto]', function(e){
			e.preventDefault();
			doScroll(e);
		});

	};
	//ajax
     $("#submit").click(function(){
      var name = $('#name').val();
      var phone = $('#phone').val();
	  var email = $('#email').val();
      var message = $('#message').val();
      var letters = /^[a-zA-Zа-яёА-ЯЁ]+$/u; 
      var number = /^(\+)?(\(\d{2,3}\) ?\d|\d)(([ \-]?\d)|( ?\(\d{2,3}\) ?)){5,12}\d$/;
	  var mail_letters = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    
      if (name != "" && phone != "" && message != "" && email != "") {
          if(name.match(letters)) { 
              if(phone != "") {
				if(email.match(mail_letters)){
                      $.ajax({
                      method : 'post',
                      url : 'ajax.php',
                      data :  {'first_name' : name ,
                                'phone_number' : phone,                                
                                'message' : message,
                                'email' : email,
                                },
                     }).done(function(resp){
                         if( resp == 1){
                              document.getElementById("error").style.color = "green";
                             document.getElementById("error").innerHTML = "Mail has been successfully sent";
                              $('#name').val('');
                             $('#phone').val('');                             
                             $('#email').val('');
                             $('#message').val('');
                         }else{
                              document.getElementById("error").style.color = "red";
                              document.getElementById("error").innerHTML = "No mail is being sent";
                         }
                     console.log(resp); });                
                 
				}else{
                      document.getElementById("error").style.color = "red";
                      document.getElementById("error").innerHTML = "Please fill the mail correctly";
                  }
              }else{
                  document.getElementById("error").style.color = "red";
                  document.getElementById("error").innerHTML = "Please fill in the number correctly";
              }
          }else
          {   document.getElementById("error").style.color = "red";
              document.getElementById("error").innerHTML = "Please fill in the name correctly";
          }   
      }else{
          document.getElementById("error").style.color = "red";
          document.getElementById("error").innerHTML = "Please fill in all the details";
      }
  });