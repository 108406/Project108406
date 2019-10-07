$(document).ready(function () {
    $(document).ready(function () {
        $(".label-color-edit-btn").each(function (index) {
            $(this).on('click', function () {
                ShowChangeLabelName(index)
            })
            $(document).on('click', function () {
                $('#dropdown-content-' + [index+1]).removeAttr('style');
            })
        });
        function ShowChangeLabelName(index) {
            for (var j = 1; j <= 6; j++) {
                $('#dropdown-content-' + [j]).removeAttr('style');
            }
            if ($('#dropdown-content-' + [index+1]).attr('style') == undefined) {
                $('#dropdown-content-' + [index+1]).attr('style', 'display:block');
            }
        }
        $("[name='label-edit-off']").on('click', function () {
            for (var i = 1; i <= 6; i++) {
                $('#dropdown-content-' + [i]).removeAttr('style');
            }
        })
    })
});