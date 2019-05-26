$(document).ready(function () {
    var is_check = true;
    // $('').each(function (index) {
        $('.move-button').on('click', function (e) {
            /*  Prevents default behaviour  */
            e.preventDefault();
        
            /*  Prevents event bubbling  */
            e.stopPropagation();
            if (is_check) {
                $('.card').animate({ left: "100%" }, 500);
                $(this).children('.label-move').css({ "background": "#bebebe" });
                is_check = false;
            } else {
                $('.card').animate({ left: "-100%" }, 500);
                $(this).children('.label-move').css({ "background": "#ffffff" });
                is_check = true;
            }
        })
    // })
});