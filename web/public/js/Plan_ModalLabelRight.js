$(document).ready(function () {
    $(".label-color-edit-btn").each(function (index) {
        $(this).on('click', function () {
            ShowChangeLabelName(index)
        })
        $(document).on('click', function () {
            $('#dropdown-content-right-' + [index - 5]).removeAttr('style');
        })
    });
    function ShowChangeLabelName(index) {
        for (var j = 1; j <= 6; j++) {
            $('#dropdown-content-right-' + [j]).removeAttr('style');
        }
        if ($('#dropdown-content-right-' + [index - 5]).attr('style') == undefined) {
            $('#dropdown-content-right-' + [index - 5]).attr('style', 'display:block');
        }
    }
    $("[name='label-edit-off']").on('click', function () {
        for (var i = 1; i <= 6; i++) {
            $('#dropdown-content-right-' + [i]).removeAttr('style');
        }
    })
})