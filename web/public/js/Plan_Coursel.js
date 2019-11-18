function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        $("body").css({"background":"url(../imgs/background-2.jpg) no-repeat center center fixed","-webkit-background-size":"cover",
        "-moz-background-size":"cover","-o-background-size":"cover"});
        $("#carousel-4").attr('src',"/imgs/photo-4.png");
        $("#carousel-5").attr('src',"/imgs/photo-5.png");
        $("#carousel-6").attr('src',"/imgs/photo-6.png");
        $("#carousel-7").attr('src',"/imgs/photo-7.png");
        $("#carousel-8").attr('src',"/imgs/photo-8.png");
        $(document).ready(function () {
            var isTrue=true;
            $('#show-carousel').on("click", function () {
                if (isTrue) {
                    $('#PlanCarousel').show();
                    $('.body').css({ 'overflow-y': 'auto' })
                    $('.deck').css({ 
                        'top': '90%',
                        'bottom':"auto",
                })
                isTrue=false;
                }
                else{
                    $('#PlanCarousel').hide();
                    $('.body').css({ 'overflow-y': 'hidden' })
                    $('.deck').css({ 'top': '6em' })
                    $('.deck').css({ 'bottom': '0' })
                    isTrue=true;
                }
            })
        })
    }
    else{
        $(document).ready(function () {
            var isTrue=true;
            $('#show-carousel').on("click", function () {
                if (isTrue) {
                    $('#PlanCarousel').show();
                    $('.body').css({ 'overflow-y': 'auto' })
                    $('.deck').css({ 
                        'top': '62%',
                        'bottom':"auto",
                })
                isTrue=false;
                }
                else{
                    $('#PlanCarousel').hide();
                    $('.body').css({ 'overflow-y': 'hidden' })
                    $('.deck').css({ 'top': '6em' })
                    $('.deck').css({ 'bottom': '0' })
                    isTrue=true;
                }
            })
        })
    }
}

browserRedirect();

