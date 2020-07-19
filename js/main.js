$(document).ready(function() {
    let banner = {
        padre: $('#banner'),
        numeroSlides: $('#banner').children('.slide').length,
        posicion: 1
    }
    let info = {
        padre: $('#info'),
        numeroSlides: $('#info').children('.slide').length,
        posicion: 1
    }
    
    banner.padre.children('.slide').first().css({
        'left': 0
    });
    info.padre.children('.slide').first().css({
        'left': 0
    });

    let altoBanner = function() {
        let alto = banner.padre.children('.slide').outerHeight();
        banner.padre.animate({
            'height': alto + 'px'
        });
        console.log('altoBanner ', alto);
    }
    let altoInfo = function() {
        let alto = info.padre.children('.active').outerHeight();
        info.padre.animate({
            'height': alto + 'px'
        });
    }
    let altoContenedor = function() {
        let altoVentana = $(window).height();
        if (altoVentana <= $('#contenedor').outerHeight() + 200) {
            $('#contenedor').css({
                'height': ''
            });
        } else {
            $('#contenedor').css({
                'height': altoVentana + 'px'
            });
        }
    }

    altoBanner();
    altoInfo();
    altoContenedor();

    $(window).resize(function() {
        altoBanner();
        altoInfo();
        altoContenedor();
    });

    $('#info').children('.slide').each(function() {
        $('#botones').append('<span>');
    });
    $('#botones').children('span').first().addClass('active');

    // Boton siguiente
    let botonSiguiente = function(boton, active, content, resize) {
        $(boton).on('click', function(e) {
            e.preventDefault();
    
            if (content.posicion < content.numeroSlides) {
                content.padre.children().not('active').css({
                    'left': '100%'
                });
                $(active).removeClass('active').next().addClass('active').animate({
                    'left': '0'
                });
                $(active).prev().animate({
                    'left': '-100%'
                });

                if (content == info) {
                    $('#botones').children('.active').removeClass('active').next().addClass('active');
                }
                content.posicion += 1;
            } else {
                $(active).animate({
                    'left': '-100%'
                });
                content.padre.children().not('active').css({
                    'left': '100%'
                });
                $(active).removeClass('active');
                content.padre.children('.slide').first().addClass('active').animate({
                    'left': 0
                });

                if (content == info) {
                    $('#botones').children('.active').removeClass('active');
                    $('#botones').children('span').first().addClass('active');
                }
                content.posicion = 1;
            }
            resize();
        });
    }

    // Boton anterior
    let botonAnterior = function(boton, active, content, resize) {
        $(boton).on('click', function(e) {
            e.preventDefault();
    
            if (content.posicion > 1) {
                content.padre.children().not('active').css({
                    'left': '-100%'
                });
                $(active).animate({
                    'left': '100%'
                });
                $(active).removeClass('active').prev().addClass('active').animate({
                    'left': 0
                });
                if (content == info) {
                    $('#botones').children('.active').removeClass('active').prev().addClass('active');
                }
                content.posicion -= 1;
            } else {
                content.padre.children().not('active').css({
                    'left': '-100%'
                });
                $(active).animate({
                    'left': '100%'
                });
                $(active).removeClass('active');
                content.padre.children().last().addClass('active').animate({
                    'left': 0
                });
                if (content == info) {
                    $('#botones').children('.active').removeClass('active');
                    $('#botones').children('span').last().addClass('active');
                }
                content.posicion = content.numeroSlides;
            }
            resize();
        });
    }

    /* ------------------------------- */
    /* ----------- Banner  ----------- */
    /* ------------------------------- */
    botonSiguiente('#banner-next', '#banner .active', banner, altoBanner);
    botonAnterior('#banner-prev', '#banner .active', banner, altoBanner);

    /* ------------------------------- */
    /* ------------ Info  ------------ */
    /* ------------------------------- */
    botonSiguiente('#info-next', '#info .active', info, altoInfo);
    botonAnterior('#info-prev', '#info .active', info, altoInfo);

});

