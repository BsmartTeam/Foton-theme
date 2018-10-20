class PieChartCircle {
    constructor(piechart_circle, percent, size, bar_color, animated, transition) {
        // Date
        this.piechart_circle = piechart_circle;
        this.percent = percent;
        this.size = size;
        this.circle_radius = this.size / 2;
        this.bar_color = bar_color || this.primary_color;
        this.animated = animated;

        // Variabile
        this.primary_color = '#5580ff';
        this.color_circle = '#f7f7f7'; // '#eaebfe'
        this.line_width_circle = 10;
        this.line_width_progress = 10;
        this.progress_start = 0;
        this.curent_loop = 0;
        this.transition = transition || 1000;
        this.rate = 1000 / 60;
        this.stop_loop = this.transition / this.rate;
        this.rendered = false;
        this.triggerDistance = 100;

        // Elemente
        this.progress_counter = $('<span>').addClass('bst-pc-percent');
        this.canvas = $('<canvas>').attr('width', '190').attr('height', '190');
    }

    render() {
        // Initializare
        $(this.piechart_circle)
            .css('width', this.circle_radius * 2)
            .css('height', this.circle_radius * 2)
            .css('line-height', this.circle_radius * 2 + 'px')
            .append(this.progress_counter)
            .append(this.canvas);

        this.ctx = this.canvas.get(0).getContext('2d');

        // Deseneaza cercul de fundal
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.color_circle;
        this.ctx.lineWidth = this.line_width_circle;
        this.ctx.arc(this.circle_radius, this.circle_radius, (this.circle_radius - (this.line_width_progress / 2)), 2 * Math.PI, false);
        this.ctx.closePath();
        this.ctx.stroke();

        // Adauga procentajul in span
        this.progress_counter.text(this.percent);

        if (this.animated) {
            var self = this;
            // https://medium.com/talk-like/detecting-if-an-element-is-in-the-viewport-jquery-a6a4405a3ea2
            // http://stackoverflow.com/a/33979503/4374566
            // https://codepen.io/BoyWithSilverWings/pen/MJgQqR
            // Verifica daca elementul este in viewport si initializeaza functia de desenare
            $(window).scroll(function () {
                var top_of_element = $(self.piechart_circle).offset().top;
                var bottom_of_element = $(self.piechart_circle).offset().top + $(self.piechart_circle).outerHeight();
                var top_of_screen = $(window).scrollTop();
                var bottom_of_screen = $(window).scrollTop() + window.innerHeight;

                if ((bottom_of_screen > (top_of_element + self.triggerDistance)) && (top_of_screen < (bottom_of_element - self.triggerDistance))) {
                    // Executa cand elementul apare in vieport
                    if (!self.rendered) {
                        self.drawAnimated();
                    }
                    self.rendered = true;
                } else {
                    // Executa daca elementul nu este vizibil
                }
            });

            // La incarcarea documentului verifica daca elementul se afla in viewport
            $(window).ready(function () {
                var top_of_element = $(self.piechart_circle).offset().top;
                var bottom_of_element = $(self.piechart_circle).offset().top + $(self.piechart_circle).outerHeight();
                var top_of_screen = $(window).scrollTop();
                var bottom_of_screen = $(window).scrollTop() + window.innerHeight;

                if ((bottom_of_screen > (top_of_element + self.triggerDistance)) && (top_of_screen < (bottom_of_element - self.triggerDistance))) {
                    // Executa cand elementul apare in vieport
                    if (!self.rendered) {
                        self.drawAnimated();
                    }
                    self.rendered = true;
                } else {
                    // Executa daca elementul nu este vizibil
                }
            });

        } else {
            this.drawStatic();
        }
    }

    drawAnimated() {
        // Animated Progress Arc
        var self = this;
        self.timer_rate = Math.floor(self.transition / self.percent);
        self.percent_count = 0;
        self.timer = setInterval(function () {
            self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);
            self.ctx.beginPath();
            self.ctx.strokeStyle = self.color_circle;
            self.ctx.lineWidth = self.line_width_circle;
            self.ctx.arc(self.circle_radius, self.circle_radius, (self.circle_radius - (self.line_width_progress / 2)), 2 * Math.PI, false);
            self.ctx.closePath();
            self.ctx.stroke();
            self.ctx.beginPath();
            self.ctx.strokeStyle = self.bar_color;
            self.ctx.lineWidth = self.line_width_progress;
            self.ctx.lineCap = 'round';
            self.ctx.arc(self.circle_radius, self.circle_radius, (self.circle_radius - (self.line_width_progress / 2)), 1.5 * Math.PI, (-1.5 + (self.progress_start * 0.02) * Math.PI));
            self.ctx.stroke();

            self.progress_start++;
            self.percent_count++;

            self.progress_counter.text(self.percent_count);

            if (self.progress_start >= self.percent) {
                clearInterval(self.timer);
            }
        }, this.timer_rate);
    }

    drawStatic() {
        // Static Progress Arc
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.bar_color;
        this.ctx.lineWidth = this.line_width_progress;
        this.ctx.lineCap = 'round';
        this.ctx.arc(this.circle_radius, this.circle_radius, (this.circle_radius - (this.line_width_progress / 2)), 1.5 * Math.PI, (1.5 + (this.percent * 0.02)) * Math.PI);
        this.ctx.stroke();

        this.progress_counter.text(this.percent);
    }
}


function init_bst_circle_piechart() {
    var $piechart_circle = $('.bst-piechart-circle');
    for (var i = 0; i < $piechart_circle.length; i++) {
        var $this_piechart_circle = $piechart_circle.eq(i);
        var $percent = $this_piechart_circle.data('percent');
        var $size = $this_piechart_circle.data('size');
        var $bar_color = $this_piechart_circle.data('bar-color');
        var $animated = $this_piechart_circle.data('animated');
        var $transition = $this_piechart_circle.data('transition');

        var pieChartCircle = new PieChartCircle($this_piechart_circle, $percent, $size, $bar_color, $animated, $transition);

        pieChartCircle.render();
    }
}


init_bst_circle_piechart();