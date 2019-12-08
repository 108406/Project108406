function RedefineProject(data) {
    className = [];
    className[0] = 'card-color-body'
    className[1] = 'card-color-body-ing'
    className[2] = 'card-color-body-end'

    let project_id = $('#project_id').val();
    let project_name = $('#project_name').val();
    let project_password = $('#project_password').val();
    let startDate = data.project_startdate[0] + '-' +
        (data.project_startdate[1] < 10 ? ('0' + data.project_startdate[1]) : data.project_startdate[1]) + '-' +
        (data.project_startdate[2] < 10 ? ('0' + data.project_startdate[2]) : data.project_startdate[2]) + ' ' +
        (data.project_startdate[3] < 10 ? ('0' + data.project_startdate[3]) : data.project_startdate[3]) + ':' +
        (data.project_startdate[4] < 10 ? ('0' + data.project_startdate[4]) : data.project_startdate[4]);
    let endDate = data.project_enddate[0] + '-' +
        (data.project_enddate[1] < 10 ? ('0' + data.project_enddate[1]) : data.project_enddate[1]) + '-' +
        (data.project_enddate[2] < 10 ? ('0' + data.project_enddate[2]) : data.project_enddate[2]) + ' ' +
        (data.project_enddate[3] < 10 ? ('0' + data.project_enddate[3]) : data.project_enddate[3]) + ':' +
        (data.project_enddate[4] < 10 ? ('0' + data.project_enddate[4]) : data.project_enddate[4]);

    $('#' + project_id).remove();

    if (data.status == 0) {
        $('#addProjectBlock').before('<div class="card" name="delete-tub" id="' + project_id +
            '"><div class="' + className[data.status] +
            '"><a class="card-link" onclick="IntoProject(' + project_id + ')"><h5 class="card-title" onmousemove="removeClassType(this)">' +
            project_name +
            '</h5><div class="block-card"></div></a></div><div class="block-setting"><a class="card-setting" href="#" data-toggle="modal" data-target="#projectset" onclick="javascript:SetProjectInfo(`' +
            project_id + '`, `' + project_password + '`, `' + project_name + '`, `' + startDate + '`, `' +
            endDate +
            '`)"><img src="./imgs/cog-3x.png"></a></div></div>');
    } else {
        $($('.card-deck')[data.status]).append('<div class="card" name="delete-tub" id="' + project_id +
            '"><div class="' + className[data.status] +
            '"><a class="card-link" onclick="IntoProject(' + project_id + ')"><h5 class="card-title" onmousemove="removeClassType(this)">' +
            project_name +
            '</h5><div class="block-card"></div></a></div><div class="block-setting"><a class="card-setting" href="#" data-toggle="modal" data-target="#projectset" onclick="javascript:SetProjectInfo(`' +
            project_id + '`, `' + project_password + '`, `' + project_name + '`, `' + startDate + '`, `' +
            endDate +
            '`)"><img src="./imgs/cog-3x.png"></a></div></div>')
    }
}
//document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";

function SetProjectInfo(projectId, projectPassword, projectName, projectStartdate, projectEnddate) {
    $('#project_id').val(projectId);
    $('#project_password').val(projectPassword);
    $('#project_name').val(projectName);
    $('#project_startdate').val(projectStartdate);
    $('#project_enddate').val(projectEnddate);
}

function IntoProject(project_id) {
    document.cookie = 'projectid=' + project_id;
    window.location.href = window.location.origin + '/content/plan'
}

$(document).ready(function () {
    $('#AddProjectName').on('blur', function () {
        if ($('#AddProjectName').val().trim() == '') {
            $('#AddProjectName').attr('style', 'background: #FFCCCC');
            $('#AddProjectName').attr('placeholder', '專案標題不得空白');
        } else {
            $('#AddProjectName').attr('style', 'background: #FFF');
            $('#AddProjectName').attr('placeholder', '');
        }
    });
    $('#AddProjectPassword').on('blur', function () {
        if ($('#AddProjectPassword').val().trim() == '') {
            $('#AddProjectPassword').attr('style', 'background: #FFCCCC');
            $('#AddProjectPassword').attr('placeholder', '專案密碼不得空白');
        } else {
            $('#AddProjectPassword').attr('style', 'background: #FFF');
            $('#AddProjectPassword').attr('placeholder', '');
        }
    });
    $('#AddStartTime').on('change', AddProject_CheckDate);
    $('#AddEndTime').on('change', AddProject_CheckDate);
    $('#closeAddProject').on('click', function () {
        $('#AddProjectName').attr('style', 'background: #FFF');
        $('#AddProjectName').attr('placeholder', '');
        $('#AddProjectPassword').attr('style', 'background: #FFF');
        $('#AddProjectPassword').attr('placeholder', '');
        $('#AddStartTime').attr('style', 'background: #FFF');
        $('#AddEndTime').attr('style', 'background: #FFF');
        $('.warning').text('');
    })

    $('#project_name').on('blur', function () {
        if ($('#project_name').val().trim() == '') {
            $('#project_name').attr('style', 'background: #FFCCCC');
            $('#project_name').attr('placeholder', '專案標題不得空白');
        } else {
            $('#project_name').attr('style', 'background: #FFF');
            $('#project_name').attr('placeholder', '');
        }
    });
    $('#project_password').on('blur', function () {
        if ($('#project_password').val().trim() == '') {
            $('#project_password').attr('style', 'background: #FFCCCC');
            $('#project_password').attr('placeholder', '專案密碼不得空白');
        } else {
            $('#project_password').attr('style', 'background: #FFF');
            $('#project_password').attr('placeholder', '');
        }
    });
    $('#project_id').on('blur', function () {
        if ($('#project_id').val().trim() == '') {
            $('#project_id').attr('style', 'background: #FFCCCC');
            $('#project_id').attr('placeholder', '專案代碼不得空白');
        } else {
            $('#project_id').attr('style', 'background: #FFF');
            $('#project_id').attr('placeholder', '');
        }
    });
    $('#project_startdate').on('change', UpdateProject_CheckDate);
    $('#project_enddate').on('change', UpdateProject_CheckDate);
    $('#closeSetting').on('click', function () {
        $('#project_name').attr('style', 'background: #FFF');
        $('#project_name').attr('placeholder', '');
        $('#project_password').attr('style', 'background: #FFF');
        $('#project_password').attr('placeholder', '');
        $('#project_id').attr('style', 'background: #FFF');
        $('#project_id').attr('placeholder', '');
        $('#project_startdate').attr('style', 'background: #FFF');
        $('#project_enddate').attr('style', 'background: #FFF');
        $('.warning').text('');
    })
})

function UpdateProject() {
    let canSubmit = true;
    if ($('#project_name').val().trim() == '') {
        $('#project_name').attr('style', 'background: #FFCCCC');
        $('#project_name').attr('placeholder', '專案標題不得空白');
        canSubmit = false;
    }
    if ($('#project_password').val().trim() == '') {
        $('#project_password').attr('style', 'background: #FFCCCC');
        $('#project_password').attr('placeholder', '專案密碼不得空白');
        canSubmit = false;
    }
    if ($('#project_id').val().trim() == '') {
        $('#project_id').attr('style', 'background: #FFCCCC');
        $('#project_id').attr('placeholder', '專案代碼不得空白');
        canSubmit = false;
    }

    if (!UpdateProject_CheckDate()) {
        canSubmit = false;
    }
    if (canSubmit) {
        $('#project_id').attr('disabled', true);
        $('#project_password').attr('disabled', true);
        $('#project_name').attr('disabled', true);
        $('#project_startdate').attr('disabled', true);
        $('#project_enddate').attr('disabled', true);
        $('#closeSetting').attr('disabled', true);
        ajaxing++;
        $.ajax({
            method: 'POST',
            url: "content/updateProjectName",
            data: {
                project_id: $('#project_id').val(),
                project_name: $('#project_name').val(),
                project_password: $('#project_password').val(),
                project_startdate: $('#project_startdate').val(),
                project_enddate: $('#project_enddate').val()
            },
            success: function (data) {
                if (data.status == 'success!') {
                    $('#project_id').attr('disabled', false);
                    $('#project_password').attr('disabled', false);
                    $('#project_name').attr('disabled', false);
                    $('#project_startdate').attr('disabled', false);
                    $('#project_enddate').attr('disabled', false);
                    $('#closeSetting').attr('disabled', false);

                    $('#projectset').modal('hide');

                    value = {
                        status: data.projectStatus,
                        project_startdate: data.project_startdate,
                        project_enddate: data.project_enddate
                    }
                    setTimeout(RedefineProject(value), 1000)
                } else {
                    alert('寫入資料庫時發生錯誤。')
                }
                ajaxing--;
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                console.log('error: \n' + data.error)
            }
        })
    }
}

function AddProject_Content() {
    let canSubmit = true;
    if ($('#AddProjectName').val().trim() == '') {
        $('#AddProjectName').attr('style', 'background: #FFCCCC');
        $('#AddProjectName').attr('placeholder', '專案標題不得空白');
        canSubmit = false;
    }
    if ($('#AddProjectPassword').val().trim() == '') {
        $('#AddProjectPassword').attr('style', 'background: #FFCCCC');
        $('#AddProjectPassword').attr('placeholder', '專案密碼不得空白');
        canSubmit = false;
    }

    if (!AddProject_CheckDate()) {
        canSubmit = false;
    }

    if (canSubmit) {
        $('#AddProjectName').attr('disabled', true);
        $('#AddProjectPassword').attr('disabled', true);
        $('#AddStartTime').attr('disabled', true);
        $('#AddEndTime').attr('disabled', true);
        $('#closeAddProject').attr('disabled', true);
        ajaxing++;
        $.ajax({
            method: 'POST',
            url: "content/addProject",
            data: {
                project_name: $('#AddProjectName').val(),
                project_password: $('#AddProjectPassword').val(),
                project_startdate: $('#AddStartTime').val(),
                project_enddate: $('#AddEndTime').val()
            },
            success: function (data) {
                ajaxing--;
                location.reload();
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                console.log('error: \n' + data.error)
            }
        })
    }
}

function LeaveProject(projectId) {
    ajaxing++;
    $.ajax({
        method: 'POST',
        url: "content/checkprincipal",
        data: {
            project_id: projectId
        },
        success: function (data) {
            ajaxing--;
            if (data.status == 0) {
                ajaxing++;
                $.ajax({
                    method: 'POST',
                    url: "content/leaveProject",
                    data: {
                        project_id: projectId
                    },
                    success: function (data) {
                        ajaxing--;
                    },
                    error: function (data) {
                        alert('連接伺服器出現問題，請重試。')
                        console.log('error: \n' + data.error)
                    }
                })
            } else {
                alert('您在該專案還有負責的工作，請確認沒有負責的工作後再重試。')
                location.reload();
            }
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            console.log('error: \n' + data.error)
        }
    })

}

function AddProject_CheckDate() {
    let isValid = false;

    let startTime = $('#AddStartTime').val()
        .replace(/-/g, ",")
        .replace(/:/g, ",")
        .replace(/ /g, ",")
        .split(',');

    let endTime = $('#AddEndTime').val()
        .replace(/-/g, ",")
        .replace(/:/g, ",")
        .replace(/ /g, ",")
        .split(',');

    let invalid = false;
    for (let a = 0; a < 5; a++) {
        if (a < 4 && +endTime[a] != +startTime[a]) {
            if (+endTime[a] < +startTime[a]) {
                invalid = true;
                break;
            } else {
                break;
            }
        } else {
            if (a == 4 && +endTime[a] <= +startTime[a]) {
                invalid = true;
                break;
            }
        }
    }

    if (invalid) {
        $('#AddStartTime').attr('style', 'background: #FFCCCC');
        $('#AddEndTime').attr('style', 'background: #FFCCCC');
        $('.warning').text('結束日期不得在開始日期之前');
    } else {
        $('#AddStartTime').attr('style', 'background: #FFF');
        $('#AddEndTime').attr('style', 'background: #FFF');
        $('.warning').text('');
        isValid = true;
    }

    return isValid;
}

function UpdateProject_CheckDate() {
    let isValid = false;

    let startTime = $('#project_startdate').val()
        .replace(/-/g, ",")
        .replace(/:/g, ",")
        .replace(/ /g, ",")
        .split(',');

    let endTime = $('#project_enddate').val()
        .replace(/-/g, ",")
        .replace(/:/g, ",")
        .replace(/ /g, ",")
        .split(',');

    let invalid = false;
    for (let a = 0; a < 5; a++) {
        if (a < 4 && +endTime[a] != +startTime[a]) {
            if (+endTime[a] < +startTime[a]) {
                invalid = true;
                break;
            } else {
                break;
            }
        } else {
            if (a == 4 && +endTime[a] <= +startTime[a]) {
                invalid = true;
                break;
            }
        }
    }

    if (invalid) {
        $('#project_startdate').attr('style', 'background: #FFCCCC');
        $('#project_enddate').attr('style', 'background: #FFCCCC');
        $('.warning').text('結束日期不得在開始日期之前');
    } else {
        $('#project_startdate').attr('style', 'background: #FFF');
        $('#project_enddate').attr('style', 'background: #FFF');
        $('.warning').text('');
        isValid = true;
    }

    return isValid;
}