$(document).ready(function () {
    var i = 0;
    $("#add-new-right-label").on('click', function (e) {
        $('.dropdown-content-add-right-label').css({ 'display': 'block' });
        $(document).on("click", function () {
            $('.dropdown-content-add-right-label').css({ 'display': 'none' });
            $('.dropdown-content-right').css({ 'display': 'none' });
        })
        e.stopPropagation();
    })
    $("#add-label-right-off").on('click', function (e) {
        $('.dropdown-content-add-right-label').css({ 'display': 'none' });
    })

    $("[name='green']").on('click', function () {
        getcolor = 'label-color-green-a';
        modal_left_get_color = 'rgb(97,189,79)';
        $("[name='green-check']").css({ 'display': 'block' });
        $("[name='yellow-check']").css({ 'display': 'none' });
        $("[name='orange-check']").css({ 'display': 'none' });
        $("[name='red-check']").css({ 'display': 'none' });
        $("[name='purple-check']").css({ 'display': 'none' });
        $("[name='blue-check']").css({ 'display': 'none' });
        $("[name='sky-check']").css({ 'display': 'none' });
        $("[name='lime-check']").css({ 'display': 'none' });
        $("[name='pink-check']").css({ 'display': 'none' });
        $("[name='black-check']").css({ 'display': 'none' });
    })

    $("[name='yellow']").on('click', function () {
        getcolor = 'label-color-yellow-a';
        modal_left_get_color = 'rgb(242,214,0)';
        $("[name='green-check']").css({ 'display': 'none' });
        $("[name='yellow-check']").css({ 'display': 'block' });
        $("[name='orange-check']").css({ 'display': 'none' });
        $("[name='red-check']").css({ 'display': 'none' });
        $("[name='purple-check']").css({ 'display': 'none' });
        $("[name='blue-check']").css({ 'display': 'none' });
        $("[name='sky-check']").css({ 'display': 'none' });
        $("[name='lime-check']").css({ 'display': 'none' });
        $("[name='pink-check']").css({ 'display': 'none' });
        $("[name='black-check']").css({ 'display': 'none' });
    })

    $("[name='orange']").on('click', function () {
        getcolor = 'label-color-orange-a';
        modal_left_get_color = 'rgb(255,159,26)';
        $("[name='green-check']").css({ 'display': 'none' });
        $("[name='yellow-check']").css({ 'display': 'none' });
        $("[name='orange-check']").css({ 'display': 'block' });
        $("[name='red-check']").css({ 'display': 'none' });
        $("[name='purple-check']").css({ 'display': 'none' });
        $("[name='blue-check']").css({ 'display': 'none' });
        $("[name='sky-check']").css({ 'display': 'none' });
        $("[name='lime-check']").css({ 'display': 'none' });
        $("[name='pink-check']").css({ 'display': 'none' });
        $("[name='black-check']").css({ 'display': 'none' });
    })

    $("[name='red']").on('click', function () {
        getcolor = 'label-color-red-a';
        modal_left_get_color = 'rgb(235,90,70)';
        $("[name='green-check']").css({ 'display': 'none' });
        $("[name='yellow-check']").css({ 'display': 'none' });
        $("[name='orange-check']").css({ 'display': 'none' });
        $("[name='red-check']").css({ 'display': 'block' });
        $("[name='purple-check']").css({ 'display': 'none' });
        $("[name='blue-check']").css({ 'display': 'none' });
        $("[name='sky-check']").css({ 'display': 'none' });
        $("[name='lime-check']").css({ 'display': 'none' });
        $("[name='pink-check']").css({ 'display': 'none' });
        $("[name='black-check']").css({ 'display': 'none' });
    })

    $("[name='purple']").on('click', function () {
        getcolor = 'label-color-purple-a';
        modal_left_get_color = 'rgb(195,119,224)';
        $("[name='green-check']").css({ 'display': 'none' });
        $("[name='yellow-check']").css({ 'display': 'none' });
        $("[name='orange-check']").css({ 'display': 'none' });
        $("[name='red-check']").css({ 'display': 'none' });
        $("[name='purple-check']").css({ 'display': 'block' });
        $("[name='blue-check']").css({ 'display': 'none' });
        $("[name='sky-check']").css({ 'display': 'none' });
        $("[name='lime-check']").css({ 'display': 'none' });
        $("[name='pink-check']").css({ 'display': 'none' });
        $("[name='black-check']").css({ 'display': 'none' });
    })

    $("[name='blue']").on('click', function () {
        getcolor = 'label-color-blue-a';
        modal_left_get_color = 'rgb(0,121,191)';
        $("[name='green-check']").css({ 'display': 'none' });
        $("[name='yellow-check']").css({ 'display': 'none' });
        $("[name='orange-check']").css({ 'display': 'none' });
        $("[name='red-check']").css({ 'display': 'none' });
        $("[name='purple-check']").css({ 'display': 'none' });
        $("[name='blue-check']").css({ 'display': 'block' });
        $("[name='sky-check']").css({ 'display': 'none' });
        $("[name='lime-check']").css({ 'display': 'none' });
        $("[name='pink-check']").css({ 'display': 'none' });
        $("[name='black-check']").css({ 'display': 'none' });
    })

    $("[name='sky']").on('click', function () {
        getcolor = 'label-color-sky-a';
        modal_left_get_color = 'rgb(0,194,224)';
        $("[name='green-check']").css({ 'display': 'none' });
        $("[name='yellow-check']").css({ 'display': 'none' });
        $("[name='orange-check']").css({ 'display': 'none' });
        $("[name='red-check']").css({ 'display': 'none' });
        $("[name='purple-check']").css({ 'display': 'none' });
        $("[name='blue-check']").css({ 'display': 'none' });
        $("[name='sky-check']").css({ 'display': 'block' });
        $("[name='lime-check']").css({ 'display': 'none' });
        $("[name='pink-check']").css({ 'display': 'none' });
        $("[name='black-check']").css({ 'display': 'none' });
    })

    $("[name='lime']").on('click', function () {
        getcolor = 'label-color-lime-a';
        modal_left_get_color = 'rgb(81,232,152)';
        $("[name='green-check']").css({ 'display': 'none' });
        $("[name='yellow-check']").css({ 'display': 'none' });
        $("[name='orange-check']").css({ 'display': 'none' });
        $("[name='red-check']").css({ 'display': 'none' });
        $("[name='purple-check']").css({ 'display': 'none' });
        $("[name='blue-check']").css({ 'display': 'none' });
        $("[name='sky-check']").css({ 'display': 'none' });
        $("[name='lime-check']").css({ 'display': 'block' });
        $("[name='pink-check']").css({ 'display': 'none' });
        $("[name='black-check']").css({ 'display': 'none' });
    })

    $("[name='pink']").on('click', function () {
        getcolor = 'label-color-pink-a';
        modal_left_get_color = 'rgb(255,120,203)';
        $("[name='green-check']").css({ 'display': 'none' });
        $("[name='yellow-check']").css({ 'display': 'none' });
        $("[name='orange-check']").css({ 'display': 'none' });
        $("[name='red-check']").css({ 'display': 'none' });
        $("[name='purple-check']").css({ 'display': 'none' });
        $("[name='blue-check']").css({ 'display': 'none' });
        $("[name='sky-check']").css({ 'display': 'none' });
        $("[name='lime-check']").css({ 'display': 'none' });
        $("[name='pink-check']").css({ 'display': 'block' });
        $("[name='black-check']").css({ 'display': 'none' });
    })

    $("[name='black']").on('click', function () {
        getcolor = 'label-color-black-a';
        modal_left_get_color = 'rgb(52,69,99)';
        $("[name='green-check']").css({ 'display': 'none' });
        $("[name='yellow-check']").css({ 'display': 'none' });
        $("[name='orange-check']").css({ 'display': 'none' });
        $("[name='red-check']").css({ 'display': 'none' });
        $("[name='purple-check']").css({ 'display': 'none' });
        $("[name='blue-check']").css({ 'display': 'none' });
        $("[name='sky-check']").css({ 'display': 'none' });
        $("[name='lime-check']").css({ 'display': 'none' });
        $("[name='pink-check']").css({ 'display': 'none' });
        $("[name='black-check']").css({ 'display': 'block' });
    })

    $('#add-label-btn').on('click', function () {
        input_value = $('#get-add-input').val();
        i++;
        $('#get-add-input').val("");
        //右側顯示
        $('.dropdown-content-add-right-label').css({ 'display': 'none' });
        $("[name='label-color-all-right']").append(function () {
            return "<div class='label-total' id=label-total" + i + ">" + "<a href='#' class=" + getcolor + " id=label-color" + i + ">" + input_value + "</a>" +
                "<div class='dropdown-edit'><button class='label-color-edit-btn' id=label-edit-btn" + i + "><i class='fas fa-pen'></i ></button>" +
                "<div class='dropdown-content-right' data-stopPropagation='true' id=dropdown-content-show" + i + "><span class='dropdown-label-header-title'>改變標籤<a href='#' class='add-label-icon-a' id=label-edit-right-off" + i + "><i class='fas fa-times change-label-icon'></i></a></span>" +
                "<div class='label-color-total'><label class='label-name'>名字</label><input class='label-edit-input-search'type='text' id=edit-label-input" + i + "><label class='label-name'>選一個顏色</label>" +
                "<div class='color-choice'><a href='#' name='green'><span class='card-label card-label-green' data-color='green'><i class='fas fa-check' name='green-check'></i></span></a>" +
                "<a href='#' name='yellow'><span class='card-label card-label-yellow' data-color='yellow'><i class='fas fa-check'name='yellow-check'></i></span></a>" +
                "<a href='#' name='orange'><span class='card-label card-label-orange' data-color='orange'><i class='fas fa-check'name='orange-check'></i></span></a>" +
                "<a href='#' name='red'><span class='card-label card-label-red' data-color='red'><i class='fas fa-check'name='red-check'></i></span></a>" +
                "<a href='#' name='purple'><span class='card-label card-label-purple' data-color='purple'><i class='fas fa-check'name='purple-check'></i></span></a>" +
                "<a href='#' name='blue'><span class='card-label card-label-blue' data-color='blue'><i class='fas fa-check'name='blue-check'></i></span></a>" +
                "<a href='#' name='sky'><span class='card-label card-label-sky' data-color='sky'><i class='fas fa-check'name='sky-check'></i></span></a>" +
                "<a href='#' name='lime'><span class='card-label card-label-lime' data-color='lime'><i class='fas fa-check'name='lime-check'></i></span></a>" +
                "<a href='#' name='pink'><span class='card-label card-label-pink' data-color='pink'><i class='fas fa-check'name='pink-check'></i></span></a>" +
                "<a href='#' name='black'><span class='card-label card-label-black' data-color='black'><i class='fas fa-check'name='black-check'></i></span></a>" +
                "<div class='label-edit-btn-set'><button class='btn-save' id=add-label-edit-btn" + i + ">儲存</button><button class='btn-cancel'id=cancel-label-edit-btn" + i + ">刪除</button></div>" +
                "</div></div></div></div>" +
                "</div>";
        });
        //modal左側顯示
        $("[name='modal-label-show']").prepend(function () {
            return "<span class='modal-label-1' style=background:" + modal_left_get_color + " id=modal-left-label" + i + "><span class='label-text'onmousemove='removeClassType(this)'>" + input_value + "</span></span>"
        });
        //編輯按鈕
        $('#label-edit-btn' + i).on('click', function (e) {
            $("#dropdown-content-show" + i).css({ 'display': 'block' });
            $("[name='green']").on('click', function () {
                getcolor2 = 'label-color-green-a';
                modal_left_get_color2 = 'rgb(97,189,79)';
                $("[name='green-check']").css({ 'display': 'block' });
                $("[name='yellow-check']").css({ 'display': 'none' });
                $("[name='orange-check']").css({ 'display': 'none' });
                $("[name='red-check']").css({ 'display': 'none' });
                $("[name='purple-check']").css({ 'display': 'none' });
                $("[name='blue-check']").css({ 'display': 'none' });
                $("[name='sky-check']").css({ 'display': 'none' });
                $("[name='lime-check']").css({ 'display': 'none' });
                $("[name='pink-check']").css({ 'display': 'none' });
                $("[name='black-check']").css({ 'display': 'none' });
            })

            $("[name='yellow']").on('click', function () {
                getcolor2 = 'label-color-yellow-a';
                modal_left_get_color2 = 'rgb(242,214,0)';
                $("[name='green-check']").css({ 'display': 'none' });
                $("[name='yellow-check']").css({ 'display': 'block' });
                $("[name='orange-check']").css({ 'display': 'none' });
                $("[name='red-check']").css({ 'display': 'none' });
                $("[name='purple-check']").css({ 'display': 'none' });
                $("[name='blue-check']").css({ 'display': 'none' });
                $("[name='sky-check']").css({ 'display': 'none' });
                $("[name='lime-check']").css({ 'display': 'none' });
                $("[name='pink-check']").css({ 'display': 'none' });
                $("[name='black-check']").css({ 'display': 'none' });
            })

            $("[name='orange']").on('click', function () {
                getcolor2 = 'label-color-orange-a';
                modal_left_get_color2 = 'rgb(255,159,26)';
                $("[name='green-check']").css({ 'display': 'none' });
                $("[name='yellow-check']").css({ 'display': 'none' });
                $("[name='orange-check']").css({ 'display': 'block' });
                $("[name='red-check']").css({ 'display': 'none' });
                $("[name='purple-check']").css({ 'display': 'none' });
                $("[name='blue-check']").css({ 'display': 'none' });
                $("[name='sky-check']").css({ 'display': 'none' });
                $("[name='lime-check']").css({ 'display': 'none' });
                $("[name='pink-check']").css({ 'display': 'none' });
                $("[name='black-check']").css({ 'display': 'none' });
            })

            $("[name='red']").on('click', function () {
                getcolor2 = 'label-color-red-a';
                modal_left_get_color2 = 'rgb(235,90,70)';
                $("[name='green-check']").css({ 'display': 'none' });
                $("[name='yellow-check']").css({ 'display': 'none' });
                $("[name='orange-check']").css({ 'display': 'none' });
                $("[name='red-check']").css({ 'display': 'block' });
                $("[name='purple-check']").css({ 'display': 'none' });
                $("[name='blue-check']").css({ 'display': 'none' });
                $("[name='sky-check']").css({ 'display': 'none' });
                $("[name='lime-check']").css({ 'display': 'none' });
                $("[name='pink-check']").css({ 'display': 'none' });
                $("[name='black-check']").css({ 'display': 'none' });
            })

            $("[name='purple']").on('click', function () {
                getcolor2 = 'label-color-purple-a';
                modal_left_get_color2 = 'rgb(195,119,224)';
                $("[name='green-check']").css({ 'display': 'none' });
                $("[name='yellow-check']").css({ 'display': 'none' });
                $("[name='orange-check']").css({ 'display': 'none' });
                $("[name='red-check']").css({ 'display': 'none' });
                $("[name='purple-check']").css({ 'display': 'block' });
                $("[name='blue-check']").css({ 'display': 'none' });
                $("[name='sky-check']").css({ 'display': 'none' });
                $("[name='lime-check']").css({ 'display': 'none' });
                $("[name='pink-check']").css({ 'display': 'none' });
                $("[name='black-check']").css({ 'display': 'none' });
            })

            $("[name='blue']").on('click', function () {
                getcolor2 = 'label-color-blue-a';
                modal_left_get_color2 = 'rgb(0,121,191)';
                $("[name='green-check']").css({ 'display': 'none' });
                $("[name='yellow-check']").css({ 'display': 'none' });
                $("[name='orange-check']").css({ 'display': 'none' });
                $("[name='red-check']").css({ 'display': 'none' });
                $("[name='purple-check']").css({ 'display': 'none' });
                $("[name='blue-check']").css({ 'display': 'block' });
                $("[name='sky-check']").css({ 'display': 'none' });
                $("[name='lime-check']").css({ 'display': 'none' });
                $("[name='pink-check']").css({ 'display': 'none' });
                $("[name='black-check']").css({ 'display': 'none' });
            })

            $("[name='sky']").on('click', function () {
                getcolor2 = 'label-color-sky-a';
                modal_left_get_color2 = 'rgb(0,194,224)';
                $("[name='green-check']").css({ 'display': 'none' });
                $("[name='yellow-check']").css({ 'display': 'none' });
                $("[name='orange-check']").css({ 'display': 'none' });
                $("[name='red-check']").css({ 'display': 'none' });
                $("[name='purple-check']").css({ 'display': 'none' });
                $("[name='blue-check']").css({ 'display': 'none' });
                $("[name='sky-check']").css({ 'display': 'block' });
                $("[name='lime-check']").css({ 'display': 'none' });
                $("[name='pink-check']").css({ 'display': 'none' });
                $("[name='black-check']").css({ 'display': 'none' });
            })

            $("[name='lime']").on('click', function () {
                getcolor2 = 'label-color-lime-a';
                modal_left_get_color2 = 'rgb(81,232,152)';
                $("[name='green-check']").css({ 'display': 'none' });
                $("[name='yellow-check']").css({ 'display': 'none' });
                $("[name='orange-check']").css({ 'display': 'none' });
                $("[name='red-check']").css({ 'display': 'none' });
                $("[name='purple-check']").css({ 'display': 'none' });
                $("[name='blue-check']").css({ 'display': 'none' });
                $("[name='sky-check']").css({ 'display': 'none' });
                $("[name='lime-check']").css({ 'display': 'block' });
                $("[name='pink-check']").css({ 'display': 'none' });
                $("[name='black-check']").css({ 'display': 'none' });
            })

            $("[name='pink']").on('click', function () {
                getcolor2 = 'label-color-pink-a';
                modal_left_get_color2 = 'rgb(255,120,203)';
                $("[name='green-check']").css({ 'display': 'none' });
                $("[name='yellow-check']").css({ 'display': 'none' });
                $("[name='orange-check']").css({ 'display': 'none' });
                $("[name='red-check']").css({ 'display': 'none' });
                $("[name='purple-check']").css({ 'display': 'none' });
                $("[name='blue-check']").css({ 'display': 'none' });
                $("[name='sky-check']").css({ 'display': 'none' });
                $("[name='lime-check']").css({ 'display': 'none' });
                $("[name='pink-check']").css({ 'display': 'block' });
                $("[name='black-check']").css({ 'display': 'none' });
            })

            $("[name='black']").on('click', function () {
                getcolor2 = 'label-color-black-a';
                modal_left_get_color2 = 'rgb(52,69,99)';
                $("[name='green-check']").css({ 'display': 'none' });
                $("[name='yellow-check']").css({ 'display': 'none' });
                $("[name='orange-check']").css({ 'display': 'none' });
                $("[name='red-check']").css({ 'display': 'none' });
                $("[name='purple-check']").css({ 'display': 'none' });
                $("[name='blue-check']").css({ 'display': 'none' });
                $("[name='sky-check']").css({ 'display': 'none' });
                $("[name='lime-check']").css({ 'display': 'none' });
                $("[name='pink-check']").css({ 'display': 'none' });
                $("[name='black-check']").css({ 'display': 'block' });
            })
            //右上角關閉
            $('#label-edit-right-off' + i).on('click', function () {
                $('.dropdown-content-right').css({ 'display': 'none' });
            });
            //變更按鈕
            $('#add-label-edit-btn' + i).on('click', function () {
                change_input_value = $('#edit-label-input' + i).val();
                $('#label-color' + i).replaceWith("<a href='#' class=" + getcolor2 + " id=label-color" + i + ">" + change_input_value + "</a>");
                $('#modal-left-label' + i).replaceWith("<span class='modal-label-1' style=background:" + modal_left_get_color2 + " id=modal-left-label" + i + "><span class='label-text'onmousemove='removeClassType(this)'>" + change_input_value + "</span></span>");
                $('.dropdown-content-right').css({ 'display': 'none' });
            })
            //刪除
            $('#cancel-label-edit-btn' + i).on('click', function () {
                $("#label-total" + i).remove();
                $('#modal-left-label' + i).remove();
                $('.dropdown-content-right').css({ 'display': 'none' });
            })
        })
    })

});

