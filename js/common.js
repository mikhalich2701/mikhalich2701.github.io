$( document ).ready(function() {

    $('.pageProofs__resurse-row').slick({             // настройка слайдера
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: true,
  		autoplaySpeed: 2000,
        nextArrow: '.pageProofs__resurse-button-next',
        prevArrow: '.pageProofs__resurse-button-prev',
        responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('a[href^="#"]').click(function () {                 //плавный скролл к метке
        elementClick = $(this).attr("href");
        destination = $(elementClick).offset().top;
        $('html').animate( { scrollTop: destination }, 1100 );
    	return false;
    });

    $('.header__down-navicon').click(function () {        //анимация кнопки меню при клике
        if ($(this).attr('class') == 'header__down-navicon change') {
            $(this).removeClass('change');
        } else {
            $(this).addClass('change');
        }
    });

    $('.header__down-navicon').click(function(){          //анимация выпадающего меню
        $('.header__down-nav').slideToggle();
    });

    $(window).resize(function() {                         //появление пунктов навигации при увеличении экрана
        if ($(window).width() > 992) {
            $('.header__down-nav').removeAttr('style');
        }
    });

    $(window).scroll(function () {
        var interval = $('.header__up').height();
    	var scrollBar = $('.skills').height();        
		if ($(this).scrollTop() > interval) {
			$('.header__up-scrollBtn').css("display", "block");  // появление кнопки скролла
			$('.header__down').addClass('fixed');                //прилипание блоканавигации к верхней части экрана
		} else {
			$('.header__up-scrollBtn').css("display", "none");   
			$('.header__down').removeClass('fixed');
		}
        if ($(this).scrollTop() > scrollBar) {                  // анимация прогрессбара
            pogressBar('.html');
            pogressBar('.javascript');
            pogressBar('.jquery');
            pogressBar('.photoshop');
            pogressBar('.avocode');
            pogressBar('.gulp');
            pogressBar('.bootstrap');
            pogressBar('.less');
            pogressBar('.pixel');
        } else {

        }
	});

    function pogressBar(str1) { 
        var str2 = '.skills__elem-status'
        var persent = parseInt($(str1 + ' ' + str2).text());
        var move = 180 / 50 * persent;
        var move2 = 180 / 50 * (persent - 50);
        if (persent <= 50) {
            $(str1 + ' .skills__elem-rowOne-shadow').animate({  textIndent: move }, {
                step: function(now,fx) {
                  $(str1 + ' .skills__elem-rowOne-shadow').css('-webkit-transform','rotate('+now+'deg)'); 
                },
                duration: 1000 / 180 * move
            });
        } else {
            $(str1 + ' .skills__elem-rowOne-shadow').animate({  textIndent: 180 }, {
                step: function(now,fx) {
                      $(this).css('transform','rotate(' + now + 'deg)');  
                    }, duration: 1000,
                    complete: function(){
                           $(str1 + ' .skills__elem-rowTwo-shadow').animate(
                        {  textIndent: move2 },
                        {
                        step: function(now,fx) {
                          $(str1 + ' .skills__elem-rowTwo-shadow').css('-webkit-transform','rotate('+ now+'deg)'); 
                        },
                        duration: 1000 / 180 * move2
                        });
                    }
                });
        }
    }

	$('.header__up-scrollBtn').click(function() {         //скролл к началу страницы
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

    $('.works__nav-elem').click(function (){              // фильтр сайтов
        filterSite($(this).attr('rel'));
    });
    function filterSite(mark) {
        var elemYes = $('.works__block > *').filter('.' + mark);
        var elemNot = $('.works__block > *').filter(':not(.' + mark + ')');
        if (mark == 'all') {
            $('.works__block-elem').stop().fadeTo(400, 1);
            $('.works__block-elem').css({'transform': 'translate(0px, 0px)'});
        } else {
            elemNot.stop().fadeTo(400, 0);
            elemYes.each(function (i, elem){
                var leftElem = $(elem).position().left;
                var topElem = $(elem).position().top;
                if ($('.works__block').width() > (elemYes.width() * 2)) {
                    filterDesctop(4, i.toString(), leftElem, topElem, $(elem));
                } else if ($('.works__block').width() <= (elemYes.width() * 2) && $('.works__block').width() > elemYes.width()){
                    filterDesctop(2, i.toString(), leftElem, topElem, $(elem));
                } else {
                    filterDesctop(1, i.toString(), leftElem, topElem, $(elem));
                }
            });
            function filterDesctop(coif, index, leftElem, topElem, elem){
                $(elem).stop().fadeTo(400, 1, function(){
                    var factorX = index % coif;
                    var deltaX = elem.width() * factorX;
                    var transX = ( - leftElem) + deltaX;
                    elemNot.css({'transform': 'translate(0px, 0px)'});
                    if (topElem > 0 && elemYes.length > coif && index > coif - 1) {
                        if (factorX == 0) {
                            var transY = - elem.height() * ((topElem / elem.height()) - (index / coif));
                        } else {
                            var transY = - elem.height() * ((topElem / elem.height()) - 1);
                        }
                    } else if (topElem > 0) {
                        var transY = - topElem;
                    } else {
                        var transY = 0;
                    }
                    elem.css({'transform': 'translate(' +  transX + 'px, ' + transY + 'px)'});
                    console.log('Индеск: ' + index + ' ' + 'Расстояние до верха: ' + topElem + 'Высота элемента: ' + elem.height());
                });
            }
        }
    }
});