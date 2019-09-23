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
        (data.project_startdate[2] < 10 ? ('0' + data.project_startdate[2]) : data.project_startdate[2]) + 'T' +
        (data.project_startdate[3] < 10 ? ('0' + data.project_startdate[3]) : data.project_startdate[3]) + ':' +
        (data.project_startdate[4] < 10 ? ('0' + data.project_startdate[4]) : data.project_startdate[4]);
    let endDate = data.project_enddate[0] + '-' +
        (data.project_enddate[1] < 10 ? ('0' + data.project_enddate[1]) : data.project_enddate[1]) + '-' +
        (data.project_enddate[2] < 10 ? ('0' + data.project_enddate[2]) : data.project_enddate[2]) + 'T' +
        (data.project_enddate[3] < 10 ? ('0' + data.project_enddate[3]) : data.project_enddate[3]) + ':' +
        (data.project_enddate[4] < 10 ? ('0' + data.project_enddate[4]) : data.project_enddate[4]);

    $('#' + project_id).remove();

    if (data.status == 0) {
        $('#' + addProjectBlock).before('<div class="card" name="delete-tub" id="' + project_id +
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

function UpdateProject() {
    $('#project_id').attr('disabled', true);
    $('#project_password').attr('disabled', true);
    $('#project_name').attr('disabled', true);
    $('#project_startdate').attr('disabled', true);
    $('#project_enddate').attr('disabled', true);
    $('#closeSetting').attr('disabled', true);
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
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            console.log('error: \n' + data.error)
        }
    })
}

function LeaveProject(projectId) {
    $.ajax({
        method: 'POST',
        url: "content/leaveProject",
        data: {
            project_id: projectId
        },
        success: function (data) {
            
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            console.log('error: \n' + data.error)
        }
    })
}