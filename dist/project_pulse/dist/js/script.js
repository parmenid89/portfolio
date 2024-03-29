//carusel

const slider = tns({
	container: '.carousel__inner',
	items: 1,
	slideBy: 'page',
	autoplay: false,
	controls: false,
	mouseDrag: true,
	nav: true,
	navPosition: 'bottom',
	responsive: {
		320: {
			edgePadding: 20,
			gutter: 20,
			items: 1
		},
		576: {
			nav: false,
		},
		768: {
			gutter: 400
		},
		992: {
			items: 1
		}
	  }
}); 

document.querySelector('.prev').addEventListener('click', function () {
	slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
	slider.goTo('next');
});

//tabs

$(document).ready(function(){
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
		  .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
		  .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		}); 
	};

	toggleSlide ('.catalog-item__link');
	toggleSlide ('.catalog-item__back');

	// Modal

	$('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('fast');
    });
    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #thanks, #order').fadeOut('fast');
    });

    $('.button_mini').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('fast');
        })
    });

	// Validate jQuery

	function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    };

    validateForms('#consultation-form');
    validateForms('#consultation form');
    validateForms('#order form');

	//mask phone

	$('input[name=phone]').mask("+3 (099) 999-9999")

	//script for sending email

	$('form').submit(function(e) {
		e.preventDefault(); 

		if(!$(this).valid()) {
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut('fast');
			$('.overlay, #thanks').fadeIn('fast');

			$('form').trigger('reset');
		});
		return false;
	});

	//smooth scroll and pageup

	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else $('.pageup').fadeOut();
	});

	$("a[href=#]").click(function() {
		const _href = $(this).attr("href");
		$('html,body').animate({scrollTop: $(_href).offset().top+"px"});
		return false;
	});

	//plagin wow

	new WOW().init();

});
