$(document).ready(function () {
    $('#GetInputValue').on('click', function () {
        value = $('#GetInputValue').attr('placeholder')
        $('#GetInputValue').val(value)
    })
})

