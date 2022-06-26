function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {

    //Slider 

    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        total = document.querySelector(totalCounter),
        current = document.querySelector(currentCounter),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        widthSliceNumber = +width.replace(/\D/g, '');

    let slideIndex = 1;
    let offset = 0;
    // Вариант слайдера №1

    if (slides.length < 10) {
        total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
    } else {
        total.textContent = slides.length;
        current.textContent = slideIndex;
    }

    function currentSlideIndexAfterClick(sIndex) {
        if (slides.length < 10) {
            current.textContent = `0${sIndex}`;
        } else {
            current.textContent = sIndex;
        }
    }

    slidesField.style.width = 100 * slides.length + `%`;
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWrapper.style.overflow = 'hidden';

    slides.forEach(slide => {
        slide.style.width = width;
    });

    slider.style.position = 'relative';

    const indicators = document.createElement('ol'),
        dots = [];
    indicators.classList.add('carousel-indicator');
    slider.append(indicators);

    function dotsSlideOpacityActivity(sIndex) {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[sIndex - 1].style.opacity = 1;
    }

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        if (i == 0) {
            dot.style.opacity = 1;
        }
        indicators.append(dot);
        dots.push(dot);
    }

    next.addEventListener('click', () => {
        if (offset == widthSliceNumber * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += widthSliceNumber;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }
        currentSlideIndexAfterClick(slideIndex);
        dotsSlideOpacityActivity(slideIndex);
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = widthSliceNumber * (slides.length - 1);
        } else {
            offset -= widthSliceNumber;
        }

        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }
        currentSlideIndexAfterClick(slideIndex);
        dotsSlideOpacityActivity(slideIndex);
    });

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideTo = e.target.getAttribute('data-slide-to');

            slideIndex = slideTo;
            offset = widthSliceNumber * (slideTo - 1);

            slidesField.style.transform = `translateX(-${offset}px)`;

            currentSlideIndexAfterClick(slideIndex);
            dotsSlideOpacityActivity(slideIndex);
        });
    });

    // Вариант слайдера №2
    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach(item => item.style.display = 'none');
    //     slides[slideIndex - 1].style.display = 'block';

    //     if (slides.length < 10) {
    //         current.textContent = `0${slideIndex}`;
    //     } else {
    //         current.textContent = slideIndex;

    //     }
    // }


    // function plusSlides (n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', () => {
    //     plusSlides (-1);
    // });
    // next.addEventListener('click', () => {
    //     plusSlides (+1);
    // });

}

export default slider;