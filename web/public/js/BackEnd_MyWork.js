function UpdateProjectLinebotPush(project_id, value) {
    if ($('#projecthint').is(":checked")) {
        value = true;
    } else {
        value = false;
    }

    $.ajax({
        type: 'POST',
        url: 'mywork/updateProjectLinebotPush',
        data: { project_id: project_id, project_hint: value }
    });
}

function UpdateWorkLinebotPush(work_id, value) {
    if ($('#workhint').is(":checked")) {
        value = true;
    } else {
        value = false;
    }

    $.ajax({
        type: 'POST',
        url: 'mywork/updateWorkLinebotPush',
        data: { work_id: work_id, work_hint: value }
    });
}

function Upload(input, work) {
    if (input.files[0] != undefined) {
        let fileType;

        fileType = input.files[0].type.split('/')[1]

        console.log(fileType);
        if (fileType == 'x-zip-compressed' || fileType == 'x-gzip' || fileType == 'x-tar') {
            var reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function (file) {
                return function (e) {
                    var base64Data = e.target.result;
                    work.file = base64Data;
                    if (base64Data >= 734000) {
                        alert('檔案過大。僅傳送512K以下之檔案。');
                        return;
                    }
                    work.file_name = input.files[0].name;

                    ajaxing++;
                    $.ajax({
                        type: 'POST',
                        url: 'mywork/updateFile',
                        datatype: 'json',
                        data: { "work_id": work.work_id, "file": work.file, "file_name": work.file_name },
                        success: function (data) {
                            console.log(data);
                            ajaxing--;
                            // location.reload();
                        },
                        error: function (data) {
                            alert('連接伺服器出現問題，請重試。');
                            console.log('error: \n' + data.error);
                        }
                    });
                };
            })(input.files[0]);
            reader.readAsDataURL(input.files[0]);
        } else {
            alert('僅支援以下壓縮檔格式。（ .zip .tar .gz ）');
            return;
        }
    }
}

function SetListInfo(options, listwork_serno, listName) {
    var left = $('#slider-left').css("left");

    $('#options').empty();
    for (var i = 0; i < options.length; i++) {
        if (options[i].list_name != listName) {
            $('#options').append("<option id='" + options[i].list_id + "' value='" + listwork_serno + "'>" + options[i].list_name + "</option>");
        }
    }
    if ($('#options option').length == 0) {
        $('#options').append("<option value=''>無其他列表選項</option>");
    }
    $('#list_name').text(listName);
}

function UpdateListWork() {
    var canSubmit = true;
    var s = document.getElementById('options');
    var listwork_serno = s.options[s.selectedIndex].value;
    var list_id = s.options[s.selectedIndex].id;

    if (listwork_serno == "" && list_id == "") {
        alert("無其他列表選項無法移動工作!");
        canSubmit = false;
    }
    ajaxing++;

    if (canSubmit) {
        $.ajax({
            type: 'POST',
            url: 'mywork/updateListWork',
            data: { listwork_serno: listwork_serno, list_id: list_id },
            success: function (data) {
                ajaxing--;
                location.reload();
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。');
                console.log('error: \n' + data.error);
            }
        });
    }
}

function SetWorkInfo(projectId, list_name, workId, workTitle, workContent, deadline, tags, file_name, file, first_principal, second_principal, principal_photo1, principal_photo2) {
    $('#workInList').text(list_name);
    $('#work_id').text(workId);
    $('#work_title').text(workTitle);
    $('#work_content').text(workContent);
    $('.btn-edit').val(projectId);

    $('.modal-label').empty();
    if (tags.length > 0) {
        for (var i = 0; i < tags.length; i++) {
            $('.modal-label').append('<span class="modal-label-1" id="tag' + i + '"><span class="label-text" onmousemove="removeClassType(this)"></span></span>');
            $('#tag' + i).text(tags[0][1]);
            $('#tag' + i).css("background", tags[0][2]);
        }
    } else {
        $('.modal-label-left').remove();
    }

    if (deadline != "null") {
        $('#deadline').text(deadline);
    } else {
        $('.modal-timeout').remove();
    }

    if (file.length > 0) {
        $('#file_name').text(file_name);
        $('#file_name').attr("download", file_name);
        $('#file_name').attr("href", file);
        $('#file').attr("download", file_name);
        $('#file').attr("href", file);
        $('.box-rar-text').text(file_name.split('.')[file_name.split('.').length - 1]);
    } else {
        $('.modal-file').remove();
    }

    $('#principal').empty();
    if (first_principal != "null") {
        if (principal_photo1 == "null") {
            $('#principal').append("<img src='imgs/defaultPhoto.png' class='modal-member-photo'>");
        } else {
            $('#principal').append("<img src='data:image/png;base64," + principal_photo1 + "' class='modal-member-photo'>");
        }
    }

    if (second_principal != "null") {
        if (principal_photo2 == "null") {
            $('#principal').append("<img src='imgs/defaultPhoto.png' class='modal-member-photo'>");
        } else {
            $('#principal').append("<img src='data:image/png;base64," + principal_photo2 + "' class='modal-member-photo'>");
        }
    }
}

function gotoPlan(project_id) {
    document.cookie = 'projectid=' + project_id;
    window.location.href = window.location.origin + '/content/plan'
}