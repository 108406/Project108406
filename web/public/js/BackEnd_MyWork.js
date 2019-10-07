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
    if (input.files && input.files[0]) {
        if (input.files[0].type != "application/x-zip-compressed") {
            alert("只能上傳zip檔");
        } else {
            console.log(input.files[0]);
            var type = input.files[0].type;
            var reader = new FileReader();

            // Closure to capture the file information.
            reader.onload = (function (file) {
                return function (e) {
                    var base64Data = e.target.result;
                    work.file = base64Data;
                    work.file_name = input.files[0].name;
                    $.ajax({
                        type: 'POST',
                        url: 'mywork/updateFile',
                        // data: { "workUpdate": work }  //整包沒有成功
                        data: { "work_id": work.work_id, "file": work.file, "file_name": work.file_name }
                    });
                };
            })(input.files[0]);
            // Read in the file as a data URL.
            reader.readAsDataURL(input.files[0]);
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

    if (canSubmit) {
        $.ajax({
            type: 'POST',
            url: 'mywork/updateListWork',
            data: { listwork_serno: listwork_serno, list_id: list_id }
        });
    }
}

function SetWorkInfo(projectId, workId, workTitle, workContent, deadline, tags, file_name, file, principal_photo1, principal_photo2) {
    $('#work_id').text(workId);
    $('#work_title').text(workTitle);
    $('#work_content').text(workContent);
    $('#deadline').text(deadline);
    $('#file_name').text(file_name);
    $('#file_name').attr("download", file_name);
    $('#file_name').attr("href", file);
    $('#file').attr("download", file_name);
    $('#file').attr("href", file);
    $('.btn-edit').val(projectId);

    $('.modal-label').empty();
    for (var i = 0; i < tags.length; i++) {
        $('.modal-label').append('<span class="modal-label-1" id="tag' + i + '"><span class="label-text" onmousemove="removeClassType(this)"></span></span>');
        $('#tag' + i).text(tags[0][1]);
        $('#tag' + i).css("background", tags[0][2]);
    }

    if (principal_photo1 != "null") {
        $('#first_principal').attr("src", 'data:image/png;base64,' + principal_photo1);
    } else {
        $('#first_principal').attr("src", 'imgs/people.png');
    }

    if (principal_photo2 != "null") {
        $('#second_principal').attr("src", 'data:image/png;base64,' + principal_photo2);
    } else {
        $('#second_principal').attr("src", 'imgs/people.png');
    }
}

function gotoPlan(project_id) {
    document.cookie = 'projectid=' + project_id;
    window.location.href = window.location.origin + '/content/plan'
}