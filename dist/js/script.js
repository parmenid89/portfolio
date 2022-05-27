const hamburger = document.querySelector('.hamburger'),
	  menu = document.querySelector('.menu'),
	  closeElem = document.querySelector('.menu_close');

hamburger.addEventListener('click', () => {
	menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
	menu.classList.remove('active');
});

const counters = document.querySelectorAll('.methods__item-percent-text'),
	  lines = document.querySelectorAll('.methods__item-percent-scale_main span');

counters.forEach( (item, i) => {
	lines[i].style.width = item.innerHTML;
});

//pageup

$(document).ready(function(){
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else $('.pageup').fadeOut();
	});
});


