$('div.add-list-submit').hide();

$(document).ready(function () {
    $('#add-list').on("click", function (e) {
        $('div.add-list-submit').show();
        $(document).on("click", function () {
            $('#add-list-input').val('');
            $('div.add-list-submit').hide();
        });
        $('#add-list-input').bind('keypress', function(event) {
            if (event.key == "Enter") {
                AddList();
                $('.add-card').hide();
            }
        })

        e.stopPropagation();

    });


});

