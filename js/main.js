$(document).ready(function() {
    let banner = {
        padre: $('#banner'),
        numeroSlides: $('#banner').children('.slide').length,
        posicion: 1
    }
    // console.log('banner ', banner.numeroSlides);
    banner.padre.children('.slide').first().css({
        'left': 0
    });

    let altoBanner = function() {
        let alto = banner.padre.children('.slide').outerHeight();
        banner.padre.css({
            'height': alto + 'px'
        });
        console.log('alto ', alto);
    }
    altoBanner();

    $(window).resize(function() {
        altoBanner();
    });

    /* ------------------------------- */
    /* ----------- Banner  ----------- */
    /* ------------------------------- */

    // Boton siguiente
    $('#banner-next').on('click', function(e) {
        e.preventDefault();
    });

});

