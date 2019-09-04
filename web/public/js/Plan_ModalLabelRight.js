$(document).ready(function () {
    var isTrue = true;
    var isTrue2 = true;
    var isTrue3 = true;
    var isTrue4 = true;
    var isTrue5 = true;
    var isTrue6 = true;
    $("#edit-right-dropdown-1").on('click', function (e) {
        $("#dropdown-content-right-1").css({ 'display': 'block' });
        $('#add-label-edit-btn-right-1').on('click', function(){
            change_input_value = $('#label-edit-input-search-right-1').val();
            $('#label-color-green-a-right').replaceWith("<a href='#' class='label-color-green-a' id= 'label-color-green-a-right' onmousemove='removeClassType(this)'" + ">" + change_input_value + "</a>");
        })
        if (isTrue) {
            $('#dropdown-content-right-1').css({ 'display': 'block' });
            isTrue = false;
        }
        else {
            $('#dropdown-content-right-1').css({ 'display': 'none' });
            isTrue = true;
        }
        $(document).on("click", function () {
            $('#dropdown-content-right-1').css({ 'display': 'none' });
            isTrue = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-right-1').css({ 'display': 'none' });
            isTrue = true;
        })
    })
    $("#edit-right-dropdown-2").on('click', function (e) {
        $("#dropdown-content-right-2").css({ 'display': 'block' });
        $('#add-label-edit-btn-right-2').on('click', function(){
            change_input_value2 = $('#label-edit-input-search-right-2').val();
            $('#label-color-yellow-a-right').replaceWith("<a href='#' class='label-color-yellow-a' id= 'label-color-yellow-a-right' onmousemove='removeClassType(this)'" + ">" + change_input_value2 + "</a>");
        })
        if (isTrue2) {
            $('#dropdown-content-right-2').css({ 'display': 'block' });
            isTrue2 = false;
        }
        else {
            $('#dropdown-content-right-2').css({ 'display': 'none' });
            isTrue2 = true;
        }
        $(document).on("click", function () {
            $('#dropdown-content-right-2').css({ 'display': 'none' });
            isTrue2 = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-right-2').css({ 'display': 'none' });
            isTrue2 = true;
        })
    })
    $("#edit-right-dropdown-3").on('click', function (e) {
        $("#dropdown-content-right-3").css({ 'display': 'block' });
        $('#add-label-edit-btn-right-3').on('click', function(){
            change_input_value3 = $('#label-edit-input-search-right-3').val();
            $('#label-color-orange-a-right').replaceWith("<a href='#' class='label-color-orange-a' id= 'label-color-orange-a-right' onmousemove='removeClassType(this)'" + ">" + change_input_value3 + "</a>");
        })
        if (isTrue3) {
            $('#dropdown-content-right-3').css({ 'display': 'block' });
            isTrue3 = false;
        }
        else {
            $('#dropdown-content-right-3').css({ 'display': 'none' });
            isTrue3 = true;
        }
        $(document).on("click", function () {
            $('#dropdown-content-right-3').css({ 'display': 'none' });
            isTrue3 = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-right-3').css({ 'display': 'none' });
            isTrue3 = true;
        })
    })
    $("#edit-right-dropdown-4").on('click', function (e) {
        $("#dropdown-content-right-4").css({ 'display': 'block' });
        $('#add-label-edit-btn-right-4').on('click', function(){
            change_input_value4 = $('#label-edit-input-search-right-4').val();
            $('#label-color-red-a-right').replaceWith("<a href='#' class='label-color-red-a' id= 'label-color-red-a-right' onmousemove='removeClassType(this)'" + ">" + change_input_value4 + "</a>");
        })
        if (isTrue4) {
            $('#dropdown-content-right-4').css({ 'display': 'block' });
            isTrue4 = false;
        }
        else {
            $('#dropdown-content-right-4').css({ 'display': 'none' });
            isTrue4 = true;
        }
        $(document).on("click", function () {
            $('#dropdown-content-right-4').css({ 'display': 'none' });
            isTrue4 = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-right-4').css({ 'display': 'none' });
            isTrue4 = true;
        })
    })
    $("#edit-right-dropdown-5").on('click', function (e) {
        $("#dropdown-content-right-5").css({ 'display': 'block' });
        $('#add-label-edit-btn-right-5').on('click', function(){
            change_input_value5 = $('#label-edit-input-search-right-5').val();
            $('#label-color-purple-a-right').replaceWith("<a href='#' class='label-color-purple-a' id= 'label-color-purple-a-right' onmousemove='removeClassType(this)'" + ">" + change_input_value5 + "</a>");
        })
        if (isTrue5) {
            $('#dropdown-content-right-5').css({ 'display': 'block' });
            isTrue5 = false;
        }
        else {
            $('#dropdown-content-right-5').css({ 'display': 'none' });
            isTrue5 = true;
        }
        $(document).on("click", function () {
            $('#dropdown-content-right-5').css({ 'display': 'none' });
            isTrue5 = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-right-5').css({ 'display': 'none' });
            isTrue5 = true;
        })
    })
    $("#edit-right-dropdown-6").on('click', function (e) {
        $("#dropdown-content-right-6").css({ 'display': 'block' });
        $('#add-label-edit-btn-right-6').on('click', function(){
            change_input_value6 = $('#label-edit-input-search-right-6').val();
            $('#label-color-blue-a-right').replaceWith("<a href='#' class='label-color-blue-a' id= 'label-color-blue-a-right' onmousemove='removeClassType(this)'" + ">" + change_input_value6 + "</a>");
        })
        if (isTrue6) {
            $('#dropdown-content-right-6').css({ 'display': 'block' });
            isTrue6 = false;
        }
        else {
            $('#dropdown-content-right-6').css({ 'display': 'none' });
            isTrue6 = true;
        }
        $(document).on("click", function () {
            $('#dropdown-content-right-5').css({ 'display': 'none' });
            isTrue5 = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-right-6').css({ 'display': 'none' });
            isTrue6 = true;
        })
    })
});