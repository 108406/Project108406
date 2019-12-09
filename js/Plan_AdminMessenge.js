$(document).ready(function () {
    var isTrue=true;
    $(".clickShow").each(function (index) {
        if (index > 2) {
            $(this).hide();
        }
    });
    $('#admin-text-show').on('click', function () {
        if (isTrue) {
            $(".clickShow").each(function (index) {
                if (index >= 0) {
                    $(this).show();
                }
            });
            isTrue = false;
        }
        else{
            $(".clickShow").each(function (index) {
                if (index > 2) {
                    $(this).hide();
                }
            });
            isTrue = true;
        }
    });
})
