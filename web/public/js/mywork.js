$(document).ready(function () {
    var is_check = true;
    $('.rd-move').on('click', function () {
        if (is_check) {
            $('.card').animate({ left: "100%"}, 500);
            $('.label-move').css({"background":"#bebebe"});
            is_check = false;
        } else {
            $('.card').animate({ left: "-100%"}, 500);
            $('.label-move').css({"background":"#ffffff"});
            is_check = true;
        }
    })
});