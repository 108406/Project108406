$(document).ready(function () {
    var isTrue = true;

    $('.work-card-header').click(function () {
        if (isTrue) {
            $('.card-label-1').animate({ height: '20px' });
            $('.card-label-1').animate({ lineHeight: '20px' });
            $('.card-label-2').animate({ height: '20px' });
            $('.card-label-2').animate({ lineHeight: '20px' });
            $('.card-label-3').animate({ height: '20px' });
            $('.card-label-3').animate({ lineHeight: '20px' });
            $(".card-label-1").css("max-width","100%");
            $(".card-label-2").css("max-width","100%");
            $(".card-label-3").css("max-width","100%");
            isTrue=false;
        }
        else{
            $('.card-label-1').animate({ height: '8px' });
            $('.card-label-1').animate({ lineHeight: '100px' });
            $('.card-label-2').animate({ height: '8px' });
            $('.card-label-2').animate({ lineHeight: '100px' });
            $('.card-label-3').animate({ height: '8px' });
            $('.card-label-3').animate({ lineHeight: '100px' });
            $(".card-label-1").css("max-width","45px");
            $(".card-label-2").css("max-width","45px");
            $(".card-label-3").css("max-width","45px");
            isTrue=true;
        }
    });

});