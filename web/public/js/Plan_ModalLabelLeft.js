$(document).ready(function () {
    var isTrue = true;
    var isTrue2 = true;
    var isTrue3 = true;
    var isTrue4 = true;
    var isTrue5 = true;
    var isTrue6 = true;
    $("#edit-label-dropdown-1").on('click', function (e) {
        $("#dropdown-content-1").css({ 'display': 'block' });
        $('#add-label-edit-btn-1').on('click', function(){
            change_input_value = $('#label-edit-input-search-1').val();
            $('#label-color-green-a').replaceWith("<a href='#' class='label-color-green-a' id= 'label-color-green-a' onmousemove='removeClassType(this)'" + ">" + change_input_value + "</a>");
        })
        if (isTrue) {
            $('#dropdown-content-1').css({ 'display': 'block' });
            isTrue = false;
        }
        else {
            $('#dropdown-content-1').css({ 'display': 'none' });
            isTrue = true;
        }
        $(document).on("click", function () {
            $('#dropdown-content-1').css({ 'display': 'none' });
            isTrue = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-1').css({ 'display': 'none' });
            isTrue = true;
        })
    })
    $("#edit-label-dropdown-2").on('click', function (e) {
        $("#dropdown-content-2").css({ 'display': 'block' });
        $('#add-label-edit-btn-2').on('click', function(){
            change_input_value2 = $('#label-edit-input-search-2').val();
            $('#label-color-yellow-a').replaceWith("<a href='#' class='label-color-yellow-a' id= 'label-color-yellow-a' " + ">" + " <span class=label-color-name> " + change_input_value2 + "</span>" + "</a>");
        })
        if (isTrue2) {
            $('#dropdown-content-2').css({ 'display': 'block' });
            isTrue2 = false;
        }
        else {
            $('#dropdown-content-2').css({ 'display': 'none' });
            isTrue2 = true;
        }
        $(document).on("click", function () {
            $('div.dropdown-content').css({ 'display': 'none' });
            isTrue2 = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-2').css({ 'display': 'none' });
            isTrue2 = true;
        })
    })
    $("#edit-label-dropdown-3").on('click', function (e) {
        $("#dropdown-content-3").css({ 'display': 'block' });
        $('#add-label-edit-btn-3').on('click', function(){
            change_input_value3 = $('#label-edit-input-search-3').val();
            $('#label-color-orange-a').replaceWith("<a href='#' class='label-color-orange-a' id= 'label-color-orange-a' " + ">" + " <span class=label-color-name> " + change_input_value3 + "</span>" + "</a>");
        })
        if (isTrue3) {
            $('#dropdown-content-3').css({ 'display': 'block' });
            isTrue3 = false;
        }
        else {
            $('#dropdown-content-3').css({ 'display': 'none' });
            isTrue3 = true;
        }
        $(document).on("click", function () {
            $('div.dropdown-content').css({ 'display': 'none' });
            isTrue3 = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-3').css({ 'display': 'none' });
            isTrue3 = true;
        })
    })
    $("#edit-label-dropdown-4").on('click', function (e) {
        $("#dropdown-content-4").css({ 'display': 'block' });
        $('#add-label-edit-btn-4').on('click', function(){
            change_input_value4 = $('#label-edit-input-search-4').val();
            $('#label-color-red-a').replaceWith("<a href='#' class='label-color-red-a' id= 'label-color-red-a' " + ">" + " <span class=label-color-name> " + change_input_value4 + "</span>" + "</a>");
        })
        if (isTrue4) {
            $('#dropdown-content-4').css({ 'display': 'block' });
            isTrue4 = false;
        }
        else {
            $('#dropdown-content-4').css({ 'display': 'none' });
            isTrue4 = true;
        }
        $(document).on("click", function () {
            $('div.dropdown-content').css({ 'display': 'none' });
            isTrue4 = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-4').css({ 'display': 'none' });
            isTrue4 = true;
        })
    })
    $("#edit-label-dropdown-5").on('click', function (e) {
        $("#dropdown-content-5").css({ 'display': 'block' });
        $('#add-label-edit-btn-5').on('click', function(){
            change_input_value5 = $('#label-edit-input-search-5').val();
            $('#label-color-purple-a').replaceWith("<a href='#' class='label-color-purple-a' id= 'label-color-purple-a' " + ">" + " <span class=label-color-name> " + change_input_value5 + "</span>" + "</a>");
        })
        if (isTrue5) {
            $('#dropdown-content-5').css({ 'display': 'block' });
            isTrue5 = false;
        }
        else {
            $('#dropdown-content-5').css({ 'display': 'none' });
            isTrue5 = true;
        }
        $(document).on("click", function () {
            $('div.dropdown-content').css({ 'display': 'none' });
            isTrue5 = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-5').css({ 'display': 'none' });
            isTrue5 = true;
        })
    })
    $("#edit-label-dropdown-6").on('click', function (e) {
        $("#dropdown-content-6").css({ 'display': 'block' });
        $('#add-label-edit-btn-6').on('click', function(){
            change_input_value6 = $('#label-edit-input-search-6').val();
            $('#label-color-blue-a').replaceWith("<a href='#' class='label-color-blue-a' id= 'label-color-blue-a' " + ">" + " <span class=label-color-name> " + change_input_value6 + "</span>" + "</a>");
        })
        if (isTrue6) {
            $('#dropdown-content-6').css({ 'display': 'block' });
            isTrue6 = false;
        }
        else {
            $('#dropdown-content-6').css({ 'display': 'none' });
            isTrue6 = true;
        }
        $(document).on("click", function () {
            $('div.dropdown-content').css({ 'display': 'none' });
            isTrue6 = true;
        })
        e.stopPropagation();
        $("[name='label-edit-off']").on('click', function (e) {
            $('#dropdown-content-6').css({ 'display': 'none' });
            isTrue6 = true;
        })
    })
});