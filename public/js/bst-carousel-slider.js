class Bst_carousel_slider {
    constructor(carousel, images, interval_slider) {
        this.carousel = carousel;
        this.images = images;
        this.interval_slider = interval_slider || 3000;
        this.prev = $('<div>').addClass('prev').on('click', () => {
            this.prev_slide();
        });
        this.next = $('<div>').addClass('next').on('click', () => {
            this.next_slide();
        });
        this.timer_autoSlide = null;
        this.carousel_height = 0;
        this.i = 0;
    }

    create() {
        // Identifica primele 3 imagini
        var center_img = this.images[this.i];
        var left_img = this.images[this.images.length - 1];
        var right_img = this.images[this.i + 1];

        // Calculeaza si seteaza inaltimea caruselului
        this.setCarouselHeight(this.i);

        // Afiseaza primele 3 imagini
        $(center_img).addClass('center').addClass('shadow').css('z-index', '30');
        $(left_img).addClass('left').toggleClass('shadow').css('z-index', '10');
        $(right_img).addClass('right').toggleClass('shadow').css('z-index', '20');

        // Muta toate imaginile ramase in dreapta
        for (var j = 2; j <= this.images.length - 2; j++) {
            $(this.images).eq(j).addClass('right');
        }

        // Creaza butoanele de navigare
        this.createSlideButtons();

        // Porneste auto-derularea
        this.startAutoSlide();
    }

    createSlideButtons() {
        this.carousel
            .append(this.prev)
            .append(this.next);
    }

    startAutoSlide() {
        this.timer_autoSlide = setInterval(() => {
            this.next_slide();
        }, this.interval_slider);
    }

    unsetSlideButons() {
        $(this.prev).off('click');
        $(this.next).off('click');
    }

    setSlideButons() {
        $(this.prev).on('click', () => {
            this.prev_slide();
        });

        $(this.next).on('click', () => {
            this.next_slide();
        });
    }

    test() {
        alert(this.images.length);
    }

    freezeSlideButtons() {
        this.unsetSlideButons();
        setTimeout(() => {
            this.setSlideButons();
        }, 1000);
    }

    setCarouselHeight(image_index) {
        // Calculeaza si seteaza inaltimea caruselului
        this.carousel_height = Math.round((this.carousel.width() * 0.7) / (this.images.eq(image_index).prop('naturalWidth') / this.images.eq(this.i).prop('naturalHeight')));
        this.carousel.css('height', this.carousel_height);
    }

    prev_slide() {
        // Identifica imaginile curente
        var center_img = this.images[this.i];

        // Opreste intervalul auto-derularii
        clearInterval(this.timer_autoSlide);

        // Ingheata navigarea pentru prevenirea blocajelor cu animatia
        this.freezeSlideButtons();

        // Muta toate imaginile din dreapta spre stinga
        $(center_img).siblings('.right').removeClass('right').addClass('left').css('z-index', '0').removeClass('shadow');

        setTimeout(() => {
            // Pregateste imaginea care va aprea in stinga
            this.images.eq((this.i - 1) < 0 ? (this.images.length - 1) : (this.i - 1)).css('z-index', '10').addClass('shadow');

            // Muta imaginea din centru in dreapta
            $(center_img).removeClass('center').addClass('right').css('z-index', '20');
        }, 250);

        // Alege urmatoarea imaginea
        this.i--;
        if (this.i < 0) {
            this.i = this.images.length - 1;
        }

        // Calculeaza si seteaza inaltimea caruselului
        this.setCarouselHeight(this.i);

        setTimeout(() => {
            // Seteaza z-index pentru imaginea care va aparea in centru
            this.images.eq(this.i).css('z-index', '30');
        }, 500);

        setTimeout(() => {
            // Muta imaginea urmatoare din stinga in centru
            this.images.eq(this.i).removeClass('left').addClass('center');
        }, 750);

        // Porneste auto-derularea
        this.startAutoSlide();
    }

    next_slide() {
        // Identifica imaginile curente
        var center_img = this.images[this.i];

        // Opreste intervalul auto-derularii
        clearInterval(this.timer_autoSlide);

        // Ingheata navigarea pentru prevenirea blocajelor cu animatia
        this.freezeSlideButtons();

        // Muta toate imaginile din stinga in dreapta
        $(center_img).siblings('.left').removeClass('left').addClass('right').css('z-index', '0').removeClass('shadow');

        setTimeout(() => {
            // Muta imaginea din centru in stinga
            $(center_img).removeClass('center').addClass('left').css('z-index', '20');
        }, 250);

        // Alege urmatoarea imagine
        this.i++;
        if (this.i >= this.images.length) {
            this.i = 0;
        }

        // Calculeaza si seteaza inaltimea caruselului
        this.setCarouselHeight(this.i);

        setTimeout(() => {
            // Seteaza z-index pentru imaginea care va aparea in centru
            this.images.eq(this.i).css('z-index', '30');
        }, 500);

        setTimeout(() => {
            // Pregateste imaginea care va aprea in dreapta
            this.images.eq((this.i + 1) > (this.images.length - 1) ? 0 : (this.i + 1)).css('z-index', '20').addClass('shadow');

            // Muta imaginea urmatoare din dreapta in centru
            this.images.eq(this.i).removeClass('right').addClass('center');
        }, 750);

        // Porneste auto-derularea
        this.startAutoSlide();
    }
}


function init_bst_carousel_slider() {
    var $carousel = $('.bst-carousel');
    for (var i = 0; i < $carousel.length; i++) {
        var $this_carousel = $carousel.eq(i);
        var $images = $this_carousel.find('img');
        var $interval_slider = $this_carousel.data('interval');
        var bst_carousel_slider = new Bst_carousel_slider($this_carousel, $images, $interval_slider);
        bst_carousel_slider.create();
    }
}


init_bst_carousel_slider();