$(document).ready(function () {
    var is_check = true;
    $('#return').on('click', function () {
        var w = $(window).width();
        if (w < 450) {
            if (is_check) {
                $('.content').animate({marginLeft: '0px'});
                $(".slider-left").animate({ left: "100%" }, 500);
                is_check = false;
            } else {
                $('.content').animate({marginLeft: '0px'});
                $('.slider-left').animate({ left: "0" }, 500);
                is_check = true;
            }
        }
        else {
            if(is_check==false) {
                $('.content').animate({marginLeft: '0'},300);
                $('.content').animate({paddingRight: '0px'});
                $(".slider-left").animate({ left: "0" }, 500);
                is_check = true;
            }
        }
    })
    $("button[name='left-show']").on('click', function () {
        var w = $(window).width();
        if (w < 450) {
            if (is_check) {
                $('.content').animate({marginLeft: '0px'});
                $(".slider-left").animate({ left: "100%" }, 500);
                is_check = false;
            } else {
                $('.content').animate({marginLeft: '0px'});
                $('.slider-left').animate({ left: "0" }, 500);
                is_check = true;
            }
        }
        else {
            if (is_check) {
                $('.content').animate({marginLeft: '300px'},300);
                $('.content').animate({paddingRight: '300px'});
                $(".slider-left").animate({ left: "100%" }, 500);
                is_check = false;
            } else {
                $('.content').animate({marginLeft: '0px'},300);
                $('.content').animate({paddingRight: '0px'});
                $(".slider-left").animate({ left: "0" }, 500);
                is_check = true;
            }
        }
    })
});
