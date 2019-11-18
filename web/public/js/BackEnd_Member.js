function SubmitData() {
    var canSubmit = true;
    if ($('#member_name').val().trim() == "") {
        $('#member_name').val("");
        $('#member_name').css({
            border: "1px solid red"
        });
        $('#member_name').attr('placeholder', "請輸入您的姓名。");
        canSubmit = false;
    } else {
        $('#member_name').css({
            border: "none"
        });
    }
    if ($('#email').val().trim() == "") {
        $('#email').val().trim("");
        $('#email').css({
            border: "1px solid red"
        });
        $('#email').attr('placeholder', "請輸入您的電子信箱。");
        canSubmit = false;
    } else {
        var re = /\S+@\S+\.\S+/;
        if (re.test($('#email').val().trim())) {
            $('#email').css({
                border: "none"
            });
        } else {
            $('#email').css({
                border: "1px solid red"
            });
            canSubmit = false;
        }
    }

    if (canSubmit) {
        ajaxing ++;
        $('#member_name').attr('disabled', true);
        $('#email').attr('disabled', true);
        $('#member_name').attr('style', 'background: rgba(190, 190, 190, 0.9)');
        $('#email').attr('style', 'background: rgba(190, 190, 190, 0.9)');
        $.ajax({
            type: 'POST',
            url: '/member/update',
            data: {
                email: $('#email').val().trim(),
                member_name: $('#member_name').val().trim()
            },
            success: function (data) {
                $('#member_name').attr('disabled', false);
                $('#email').attr('disabled', false);
                $('#member_name').attr('style', 'background: rgba(235, 235, 235, 0.9);');
                $('#email').attr('style', 'background: rgba(235, 235, 235, 0.9);');
                ajaxing --;
            }
        });
    }
}
// Check for the File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById('upload_input').addEventListener('change', handleFileSelect, false);
} else {
    alert('The File APIs are not fully supported in this browser.');
}

function handleFileSelect(evt) {
    var f = evt.target.files[0]; // FileList object
    var type;
    var reader = new FileReader();
    if (f.type == 'image/jpeg') {
        type = '.jpg';
    } else if (f.type == 'image/png') {
        type = '.png';
    } else {
        return;
    }
    if (f.size > 69632) {
        return;
    }

    // Closure to capture the file information.
    reader.onload = (function (theFile) {
        return function (e) {
            var binaryData = e.target.result;
            //Converting Binary Data to base 64
            var base64String = window.btoa(binaryData);
            //showing file converted to base64
            ajaxing ++;
            $.ajax({
                type: 'POST',
                url: 'member/photo',
                data: {
                    "photoContent": base64String,
                    "photoType": type
                }, 
                success: function() {
                    ajaxing --;
                }
            });
        };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);

}

function ChangeLineBotPush(value) {
    ajaxing ++;
    $.ajax({
        type: 'POST',
        url: '/member/linebotPush',
        data: {
            "linebotPush": !value
        },
        success: function (data) {
            ajaxing --;
        }
    });
}

function DeleteAcount() {
    ajaxing ++;
    $.ajax({
        type: 'POST',
        url: '/member/delete',
        success: function () {
            ajaxing --;
        }
    });
}

function readURL(input) {
    if (input.files[0].type == 'image/jpeg') {
        type = '.jpg';
    } else if (input.files[0].type == 'image/png') {
        type = '.png';
    } else {
        alert("無法支援此格式。僅支援jpg、png");
        return;
    }
    if (input.files[0].size > 69632) {
        alert("僅接受68KB以下大小的jpg、png檔");
        return;
    }
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.photo').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}