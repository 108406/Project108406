let nowWorkTitle = '';
document.getElementById('listPermission').addEventListener('click', updatePermission);
document.getElementById('addWorkPermission').addEventListener('click', updatePermission);
document.getElementById('editWorkPermission').addEventListener('click', updatePermission);
document.getElementById('deleteWorkPermission').addEventListener('click', updatePermission);
document.getElementById('work_title').addEventListener('blur', UpdateWorkTitle)
document.getElementById('work_title').addEventListener('focus', function (event) {
    nowWorkTitle = event.target.innerText.trim();
})
document.cookie = 'isAdmin=' + $('#isAdmin').val();
var nowWorkData;

$(document).ready(function () {
    $('.listname').each(function () {
        $(this).get(0).addEventListener('blur', UpdateListname)
        $(this).get(0).addEventListener('focus', WriteListname)
        $(this).get(0).addEventListener('keydown', UpdateListnameK)
    })
    $('.listname')[0].addEventListener('focus', function () {
        $($('.listname')[0]).val($($('.listname')[0]).attr('placeholder'))
    })
    $('.card-textarea').each(function () {
        $(this).get(0).addEventListener('keydown', AddCardK)
    })

    $('.label-edit-input-search').keydown(function (event) {
        if (event.key == 'Enter') {
            $($(event.target).next().children()[0]).click();
        }
    })
})

function UpdateWorkTitle(event) {
    if (nowWorkTitle != event.target.innerText.trim()) {
        let allWorks = JSON.parse($('#works').val());
        let newWorks = allWorks.slice();
        let newWorkData = nowWorkData.workData.slice();
        let workIndex = -1;
        let indexInWorks = -1;
        for (let b = 0; b < $('.card.work-card').length; b++) {
            if ($($($($('.card.work-card')[b]).children()[1]).children()[0]).text().trim() == newWorkData[
                    1]) {
                workIndex = b;
            }
        }

        for (let a = 0; a < allWorks.length; a++) {
            if (allWorks[a][1] == nowWorkTitle) {
                indexInWorks = a;
            }
        }
        newWorks[indexInWorks][1] = event.target.innerText.trim();
        newWorkData[1] = event.target.innerText.trim();
        $('#works').val(JSON.stringify(newWorks));
        $($('#card-' + workIndex).children()[1]).children()[0].innerText = newWorkData[1];
        let deadline;
        if (newWorkData[3].length != 6) {
            deadline = null;
        } else {
            deadline = newWorkData[3][0] + '-' +
                (newWorkData[3][1] < 10 ? ('0' + newWorkData[3][1]) : newWorkData[3][1]) + '-' +
                (newWorkData[3][2] < 10 ? ('0' + newWorkData[3][2]) : newWorkData[3][2]) + ' ' +
                (newWorkData[3][3] < 10 ? ('0' + newWorkData[3][3]) : newWorkData[3][3]) + ':' +
                (newWorkData[3][4] < 10 ? ('0' + newWorkData[3][4]) : newWorkData[3][4]) + ':' +
                (newWorkData[3][5] < 10 ? ('0' + newWorkData[3][5]) : newWorkData[3][5]);
        }
        let newWorkCard = {
            listname: nowWorkData.listname,
            tags: JSON.parse($('#tags').val()),
            teammember: JSON.parse($('#teammember').val()),
            workData: newWorkData
        }
        $($('#card-' + workIndex).children()[1]).attr('onclick', `javascript:SetWorkCard(` + JSON.stringify(
            newWorkCard) + `, ` + workIndex + `)`)

        nowWorkData = newWorkCard;
        ajaxing++;
        $.ajax({
            method: 'POST',
            url: '/content/plan/updateWork',
            datatype: "json",
            data: {
                work_id: +newWorkData[0],
                work_title: newWorkData[1],
                work_content: newWorkData[2],
                deadline: deadline,
                tag_id1: +newWorkData[4],
                tag_id2: +newWorkData[5],
                tag_id3: +newWorkData[6],
                tag_id4: +newWorkData[7],
                tag_id5: +newWorkData[8],
                tag_id6: +newWorkData[9],
                file: newWorkData[10],
                file_name: newWorkData[11],
                first_principal: newWorkData[12],
                second_principal: newWorkData[13]
            },
            success: function (data) {

                ajaxing--;
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                location.reload();
            }
        })
    }
}

function updatePermission() {
    permission_serno = $('#permission_serno').val();
    listPermission = $('#listPermission').get(0).checked;
    addWorkPermission = $('#addWorkPermission').get(0).checked;
    editWorkPermission = $('#editWorkPermission').get(0).checked;
    deleteWorkPermission = $('#deleteWorkPermission').get(0).checked;
    let newProjectPermission = $('#projectPermission').val().split(',');
    newProjectPermission[0] = listPermission
    newProjectPermission[1] = addWorkPermission
    newProjectPermission[2] = editWorkPermission
    newProjectPermission[3] = deleteWorkPermission
    newProjectPermission[4] = permission_serno
    $('#projectPermission').val(newProjectPermission)
    ajaxing++;
    $.ajax({
        method: 'POST',
        url: '/content/plan/updatePermission',
        datatype: "json",
        data: {
            permission_serno: permission_serno,
            listPermission: listPermission,
            addWorkPermission: addWorkPermission,
            editWorkPermission: editWorkPermission,
            deleteWorkPermission: deleteWorkPermission
        },
        success: function (data) {

            ajaxing--;
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            location.reload();
        }
    })
}

function UpdateListnameK(event) {
    if (event.key == 'Enter') {
        $(event.target).blur();
    }
}

function UpdateListname(event) {
    let lists = JSON.parse($('#lists').val());
    let listIndex;
    let list_id;
    let list_name = event.target.value;
    for (let a = 0; a < lists.length; a++) {
        if (lists[a][1] == event.target.placeholder) {
            listIndex = a;
        }
    }
    list_id = lists[listIndex][0];
    if (event.target.value != '' && event.target.placeholder != event.target.value) {
        lists[listIndex][1] = event.target.value;
        $('#lists').val(JSON.stringify(lists))
        event.target.placeholder = event.target.value;
        event.target.value = '';
        ajaxing++;
        $.ajax({
            method: 'POST',
            url: '/content/plan/updateList',
            datatype: "json",
            data: {
                list_id: list_id,
                list_name: list_name
            },
            success: function (data) {

                ajaxing--;
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                location.reload();
            }
        })
    }
}

function WriteListname(event) {
    event.target.value = event.target.placeholder;
}

function AddAdminpush() {

    // content/plan/addAdminpush
    // adminpushEndDate
    // adminpushContent
    let adminpushContent = $('#adminpushContent').val();
    let adminpushEndDate = $('#adminpushEndDate').val();
    adminpushContent = adminpushContent.replace(/　/g, ' ');
    adminpushContent = adminpushContent.trim();
    if (adminpushContent != '') {
        $('#admin-text').modal('hide');
        ajaxing++;
        $.ajax({
            method: 'POST',
            url: '/content/plan/addAdminpush',
            datatype: "json",
            data: {
                adminpushContent: adminpushContent,
                adminpushEndDate: adminpushEndDate
            },
            success: function (data) {
                let startData = data.nowDate.replace(/-/g, ',');
                startData = startData.replace(/:/g, ',');
                startData = startData.replace(/T/g, ',');
                startData = startData.split(',');
                let startDataText = +startData[0] + '/' +
                    (+startData[1] < 10 ? ('0' + +startData[1]) : +startData[1]) + '/' +
                    (+startData[2] < 10 ? ('0' + +startData[2]) : +startData[2]) + ' ' +
                    (+startData[3] >= 12 ? ('下午' + (+startData[3] - 12)) : ('上午' + +startData[
                        3])) + ':' +
                    (+startData[4] < 10 ? ('0' + +startData[4]) : +startData[4])
                $('#adminpushBody').append(
                    '<div class="show-messenge clickShow"><div class="messenge"><div class="messenge-text">' +
                    adminpushContent + '</div><div class="time-show">' + startDataText +
                    '</div></div><hr class="hr-admin"></div>')

                ajaxing--;
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                location.reload();
            }
        })
    } else {
        alert('請輸入推播訊息')
    }
}

function AddList() {
    if ($('#add-list-input').val().trim() != '') {
        listIndex = $('.work-total').length;
        list_name = $('#add-list-input').val().trim()
        $('#add-list').parent().parent().before(
            '<div class="work-total"><div class="work-header"><input type="text" class="form-control input-style" placeholder="' +
            list_name +
            '"><div class="drpdown"><button class="btn btn-link btn-header" type="button" id="dropdownMenuLink" data-toggle="dropdown"\n\
                aria-haspopup="true" aria-expanded="false"><i class="fas fa-ellipsis-h"></i></button><div class="dropdown-menu" \n\
                style="min-width: 12em !important;" aria-labelledby="dropdownMenuLink"><div class="drop-right-header-title"><span \n\
                class="drop-right-title">列表動作</span></div><div class="dropdown-right-content"><div><div><ul\n\
                class="dropdown-right-list"><li><a href="#">新增卡片</a></li><li><a href="#">刪除所有卡片</a></li><li><a\n\
                href="#">刪除列表</a></li></ul></div></div></div></div></div></div><div class="work-body"\n\
                id="work-body-move-' + (listIndex + 1) + '"><div class="card add-card"><textarea class="card-add-text card-textarea"\n\
                placeholder="為這張卡片輸入標題..."></textarea></div></div><div class="card-footer"><a href="#"\n\
                class="a-footer add-card-textarea"><div class="footer-name"><i class="fas fa-plus">\n\
                </i>新增另外一張卡片</div></a></div>'
        );
        $('#list-value').append('<option>' + list_name + '</option>')
        browserRedirect();
        ajaxing++;
        $.ajax({
            method: 'POST',
            url: '/content/plan/addList',
            datatype: "json",
            data: {
                list_name: list_name
            },
            success: function (data) {
                $($('#add-list').parent().parent().prev().find('.dropdown-right-list a')[2])
                    .attr('onclick', `DeleteList('` + data.list_id + `', ` + listIndex + `)`);
                let newList = ["" + data.list_id, list_name];
                let allLists = JSON.parse($('#lists').val());
                allLists.push(newList);
                $('#lists').val(JSON.stringify(allLists))
                ajaxing--;
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                location.reload();
            }
        })
        $('#add-list-input').val('');
    }
}

function DeleteList(list_id, index) {
    let allLists = JSON.parse($('#lists').val());
    let newList = allLists.slice();
    let removeName;
    let optionIndex = -1;
    $($('.work-total')[index]).remove();
    for (let a = 0; a < allLists.length; a++) {
        if (allLists[a][0] == list_id) {
            removeName = allLists[a][1]
            newList.splice(a, 1);
        }
    }
    $('#lists').val(JSON.stringify(newList))
    let options = $('#list-value').children();
    for (let b = 0; b < options.length; b++) {
        if ($('#list-value').children()[b].text == removeName) {
            optionIndex = b;
        }
    }
    $($('#list-value').children()[optionIndex]).remove();
    ajaxing++;
    $.ajax({
        method: 'POST',
        url: '/content/plan/deleteList',
        datatype: "json",
        data: {
            list_id: list_id
        },
        success: function (data) {

            ajaxing--;
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            location.reload();
        }
    })
}

let notification_SetWorkCard = false;

function SetWorkCard(data, cardNo) {
    let allWorks = JSON.parse($('#works').val());
    if (data.workData[0] == '' || data.workData[0] == null) {
        for (let a = 0; a < allWorks.length; a++) {
            if (allWorks[a][1] == data.workData[1]) {
                data.workData[0] = allWorks[a][0]
            }
        }
    }
    if (data.workData[0] == '' || data.workData[0] == null) {
        if (!notification_SetWorkCard) {
            alert("系統忙碌中，請稍待片刻。");
        }
        notification_SetWorkCard = true;
        setTimeout(function () {
            SetWorkCard(data, cardNo)
        }, 3000)
    } else {
        if (notification_SetWorkCard) {
            notification_SetWorkCard = false;
            alert("工作資料已經更新完畢。")
        }
    }
    //addMemberToWork principal work_deadline workInList work_title
    nowWorkData = data;
    $('#work_title').text(data.workData[1]);
    $('#workInList').text(data.listname);
    if (data.workData[3] != '' && data.workData[3] != null) {
        deadlineText = data.workData[3][1] + '月' + data.workData[3][2] + '日 ' +
            (data.workData[3][3] > 12 ? ('下午' + (data.workData[3][3] - 12) + '點') : ('上午' + data.workData[3]
                [
                    3
                ] + '點')) +
            data.workData[3][4] + '分';
        if ($('.modal-timeout').length > 0) {
            $('#work_deadline').text(deadlineText);
        } else {
            $($('.modal-label-left')[0]).after(
                '<div class="modal-timeout"><div class="modal-timeout-header">\n\
            <i class="far fa-clock timeout-icon fa-lg"></i><div class="modal-timeout-name">到期日</div></div>\n\
            <div class="timeout"><span class="deadtime"><i class="far fa-clock"></i><span id="work_deadline">' +
                deadlineText + '\n\
            </span></span></div></div>')
        }
    } else {
        $('#work_deadline').parent().parent().parent().remove();
    }
    $('#principal').empty();
    $('#addMemberToWork').empty();
    $('#list-get').text(data.listname)
    $('#list-value').val(data.listname)
    if (data.workData[3] != '' && data.workData[3] != null) {
        $('input.timeout-date').val(
            +data.workData[3][0] + '-' +
            (+data.workData[3][1] < 10 ? ('0' + +data.workData[3][1]) : +data.workData[3][1]) + '-' +
            (+data.workData[3][2] < 10 ? ('0' + +data.workData[3][2]) : +data.workData[3][2]) + ' ' +
            (+data.workData[3][3] < 10 ? ('0' + +data.workData[3][3]) : +data.workData[3][3]) + ':' +
            (+data.workData[3][4] < 10 ? ('0' + +data.workData[3][4]) : +data.workData[3][4]) + ':' +
            (+data.workData[3][5] < 10 ? ('0' + +data.workData[3][5]) : +data.workData[3][5])
        )
    } else {
        $('input.timeout-date').val('')
    }
    if (data.workData[10] != '' && data.workData[10] != null && data.workData[10] != undefined) {
        let MIMEType = data.workData[11].split('.')[data.workData[11].split('.').length - 1] == 'zip' ?
            'application/x-zip-compressed' :
            data.workData[11].split('.')[data.workData[11].split('.').length - 1] == 'tar' ?
            'application/x-tar' :
            data.workData[11].split('.')[data.workData[11].split('.').length - 1] == 'gz' ?
            'application/x-gzip' : '';

        let fileDataUrl = 'data:' + MIMEType + ';base64,' + data.workData[10];
        if ($('.modal-file').length > 0) {
            $('#downloadFileBlock').attr('href', fileDataUrl)
            $('#downloadFileBlock').attr('download', data.workData[11])
            $('#downloadFileText').attr('download', data.workData[11]);
        } else {
            $('.col-md-8').append('<div class="modal-file"><div class="modal-file-header"><i class="far fa-file icon-file fa-lg"></i><div \n\
            class="modal-file-name">下載附件</div></div><div class="file-set"><a id="downloadFileBlock" class="box-rar" \n\
            download="' + data.workData[11] + '" href="' + fileDataUrl +
                '"><span class="box-rar-text">' +
                data.workData[11].split('.')[data.workData[11].split('.').length - 1] + '</span></a><p \n\
            class="file-set-show"><a id="downloadFileText" download="' + data.workData[11] + '" href="' +
                fileDataUrl + '" \n\
            class="file-name"></a></p></div></div>')
        }
        $('#downloadFileText').text(data.workData[11]);
        $('#downloadFileText').attr('href', fileDataUrl)
        $('#downloadFileBlock').children()[0].innerHTML = data.workData[11].split('.')[data.workData[11]
            .split('.').length - 1]
    } else {
        $('.modal-file').remove();
    }

    // console.log(data.teammember[0])
    for (var a = 0; a < data.teammember.length; a++) {
        var addMemberToWorkData = {
            teammember: data.teammember[a],
            workData: data.workData
        }
        $('#addMemberToWork').append(
            `<a id="addMemberButton_` + data.teammember[a][0] +
            `" class="dropdown-img-member-set" onclick='AddMemberToWork(` + JSON.stringify(
                addMemberToWorkData) + `, ` + cardNo + `)'><img src="data:image/png;base64,` + data
            .teammember[a][2] +
            '" class="dropdown-member-img"><div class="member-name">' + data.teammember[a][1] +
            '</div></a>'
        )
        if (data.teammember[a][0] == data.workData[12] || data.teammember[a][0] == data.workData[13]) {
            $('#principal').append('<img id="principal_' + data.teammember[a][0] +
                '" src="data:image/png;base64,' + data.teammember[a][2] +
                '" class="modal-member-photo">');
        }
    }
    $('#fixedTags').empty();
    for (var i = 0; i < data.tags.length; i++) {
        for (var a = 4; a < 10; a++) {
            if (data.workData[a] == data.tags[i][0]) {
                if (data.tags[i][2] == '#61BD4F') {
                    $('#fixedTags').append(
                        '<span class="modal-label-1"><span class="label-text" onmousemove="removeClassType(this)">' +
                        data.tags[i][1] + '</span></span>'
                    )
                } else
                if (data.tags[i][2] == '#F2D600') {
                    $('#fixedTags').append(
                        '<span class="modal-label-2"><span class="label-text" onmousemove="removeClassType(this)">' +
                        data.tags[i][1] + '</span></span>'
                    )
                } else if (data.tags[i][2] == '#FF9F1A') {
                    $('#fixedTags').append(
                        '<span class="modal-label-3"><span class="label-text" onmousemove="removeClassType(this)">' +
                        data.tags[i][1] + '</span></span>'
                    )
                } else if (data.tags[i][2] == '#EB5A46') {
                    $('#fixedTags').append(
                        '<span class="modal-label-4"><span class="label-text" onmousemove="removeClassType(this)">' +
                        data.tags[i][1] + '</span></span>'
                    )
                } else if (data.tags[i][2] == '#C377E0') {
                    $('#fixedTags').append(
                        '<span class="modal-label-5"><span class="label-text" onmousemove="removeClassType(this)">' +
                        data.tags[i][1] + '</span></span>'
                    )
                } else if (data.tags[i][2] == '#0079BF') {
                    $('#fixedTags').append(
                        '<span class="modal-label-6"><span class="label-text" onmousemove="removeClassType(this)">' +
                        data.tags[i][1] + '</span></span>'
                    )
                }
            }
        }
    }

    $('#MoveWorkToList').attr('onclick', 'MoveWorkToList(' + JSON.stringify(data) + ', ' + cardNo + ')')

    $('#deleteWork').attr('onclick', 'DeleteWork("' + data.workData[0] + '", "' + data.workData[1] + '", ' +
        cardNo + ')')
}

function AddMemberToWork(data, cardNo) {
    let allteammember = JSON.parse($('#teammember').val());
    let newWorkData = data.workData;
    let dontAppend = false;
    if (data.workData[12] == data.teammember[0] || data.workData[13] == data.teammember[0]) {
        if (data.workData[12] == data.teammember[0]) {
            newWorkData[12] = null;
            $('#principal_' + data.teammember[0]).remove();
            for (let h = 0; h < $('#card-' + cardNo + ' div.work-img').children().length; h++) {
                let workPrincipalAlt = $('#card-' + cardNo + ' div.work-img').children()[h].getAttribute(
                    'alt');
                if (workPrincipalAlt.substr(14, workPrincipalAlt.length) == data.teammember[0]) {
                    $($('#card-' + cardNo + ' div.work-img').children()[h]).remove();
                }
            }
        } else if (data.workData[13] == data.teammember[0]) {
            newWorkData[13] = null;
            $('#principal_' + data.teammember[0]).remove();
            for (let h = 0; h < $('#card-' + cardNo + ' div.work-img').children().length; h++) {
                let workPrincipalAlt = $('#card-' + cardNo + ' div.work-img').children()[h].getAttribute(
                    'alt');
                if (workPrincipalAlt.substr(14, workPrincipalAlt.length) == data.teammember[0]) {
                    $($('#card-' + cardNo + ' div.work-img').children()[h]).remove();
                }
            }
        }
        dontAppend = true;
    } else {
        if (data.workData[12] == null || data.workData[12] == '') {
            newWorkData[12] = data.teammember[0];
        } else if (data.workData[13] == null || data.workData[13] == '') {
            newWorkData[13] = data.teammember[0];
        } else {
            console.log("一個工作最多只能分配兩個負責人。");
            return;
        }
    }
    if (!dontAppend) {
        $('#card-' + cardNo + ' div.work-img').append('<img alt="workPrincipal_' + data.teammember[0] +
            '" src="data:image/png;base64,' + data.teammember[
                2] +
            '" class="work-img-photo">')

        $('#principal').append('<img id="principal_' + data.teammember[0] +
            '" src="data:image/png;base64,' + data.teammember[2] +
            '" class="modal-member-photo">');
    }
    let deadline;
    if (newWorkData[3].length != 6) {
        deadline = null;
    } else {
        deadline = newWorkData[3][0] + '-' +
            (newWorkData[3][1] < 10 ? ('0' + newWorkData[3][1]) : newWorkData[3][1]) + '-' +
            (newWorkData[3][2] < 10 ? ('0' + newWorkData[3][2]) : newWorkData[3][2]) + ' ' +
            (newWorkData[3][3] < 10 ? ('0' + newWorkData[3][3]) : newWorkData[3][3]) + ':' +
            (newWorkData[3][4] < 10 ? ('0' + newWorkData[3][4]) : newWorkData[3][4]) + ':' +
            (newWorkData[3][5] < 10 ? ('0' + newWorkData[3][5]) : newWorkData[3][5]);
    }

    let newWorkCard = {
        listname: nowWorkData.listname,
        tags: JSON.parse($('#tags').val()),
        teammember: allteammember,
        workData: newWorkData
    }

    $('.dropdown-img-member-set').each(function (index) {
        var addMemberToWorkData = {
            teammember: allteammember[index],
            workData: newWorkData
        }
        let thisElemntId = $(this).attr('id');
        let thisUserId = thisElemntId.substr(16, thisElemntId.length)
        $(this).attr('onclick', `AddMemberToWork(` + JSON.stringify(
            addMemberToWorkData) + `, ` + cardNo + `)`)
    })

    $($('#card-' + cardNo).children()[1]).attr('onclick', `javascript:SetWorkCard(` + JSON.stringify(
        newWorkCard) + `, ` + cardNo + `)`)

    nowWorkData = newWorkCard;
    ajaxing++;
    $.ajax({
        method: 'POST',
        url: '/content/plan/updateWork',
        datatype: "json",
        data: {
            work_id: +newWorkData[0],
            work_title: newWorkData[1],
            work_content: newWorkData[2],
            deadline: deadline,
            tag_id1: +newWorkData[4],
            tag_id2: +newWorkData[5],
            tag_id3: +newWorkData[6],
            tag_id4: +newWorkData[7],
            tag_id5: +newWorkData[8],
            tag_id6: +newWorkData[9],
            file: newWorkData[10],
            file_name: newWorkData[11],
            first_principal: newWorkData[12],
            second_principal: newWorkData[13]
        },
        success: function (data2) {
            ajaxing--;
            if (!dontAppend) {
                ajaxing++;
                $.ajax({
                    method: 'POST',
                    url: '/content/plan/addWorkHint',
                    datatype: "json",
                    data: {
                        work_id: +newWorkData[0],
                        user_id: data.teammember[0]
                    },
                    success: function (data) {
                        ajaxing--;
                        return;
                    },
                    error: function (data) {
                        alert('連接伺服器出現問題，請重試。')
                        location.reload();
                    }
                })
            } else {
                ajaxing++;
                $.ajax({
                    method: 'POST',
                    url: '/content/plan/deleteWorkHint',
                    datatype: "json",
                    data: {
                        work_id: +newWorkData[0],
                        user_id: data.teammember[0]
                    },
                    success: function (data) {
                        ajaxing--;
                        return;
                    },
                    error: function (data) {
                        alert('連接伺服器出現問題，請重試。')
                        location.reload();
                    }
                })
            }
            return;
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            location.reload();
        }
    })
}

function ChangeTagName(isLeft, index, tag_id) {
    let newValue;
    if (isLeft) {
        newValue = $('#label-edit-input-search-' + index).val();
        $('#label-edit-input-search-right-' + index).val(newValue);
    } else {
        newValue = $('#label-edit-input-search-right-' + index).val();
        $('#label-edit-input-search-' + index).val(newValue);
    }
    $('.modal-label-' + index).children().text(newValue);
    $('.modal-label-' + index).children().attr('title', newValue);
    $('.card-label-' + index).children().text(newValue);
    $('.card-label-' + index).children().attr('title', newValue);
    $($($('.label-total')[index - 1]).children()[0]).text(newValue);
    $($($('.label-total')[index - 1]).children()[0]).attr('title', newValue);
    $($($('.label-total')[index + 5]).children()[0]).text(newValue);
    $($($('.label-total')[index + 5]).children()[0]).attr('title', newValue);
    if (isLeft) {
        $('#dropdown-content-' + index).hide();
    } else {
        $('#dropdown-content-right-' + index).hide();
    }
    let color;
    switch (index) {
        case 1:
            color = '#61BD4F';
            break;
        case 2:
            color = '#F2D600';
            break;
        case 3:
            color = '#FF9F1A';
            break;
        case 4:
            color = '#EB5A46';
            break;
        case 5:
            color = '#C377E0';
            break;
        case 6:
            color = '#0079BF';
            break;
        default:
            alert('標籤索引值出錯');
            break;
    }
    let newTags = JSON.parse($('#tags').val());
    for (let g = 0; g < newTags.length; g++) {
        if (newTags[g].color == color) {
            newTags[g].tagname = newValue;
        }
    }
    $('#tags').val(JSON.stringify(newTags))
    if (tag_id != undefined) {
        ajaxing++;
        $.ajax({
            method: 'POST',
            url: '/content/plan/updateTag',
            datatype: "json",
            data: {
                tag_id: tag_id,
                tagname: newValue
            },
            success: function (data) {

                ajaxing--;
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                location.reload();
            }
        })
    } else {

        ajaxing++;
        $.ajax({
            method: 'POST',
            url: '/content/plan/addTag',
            datatype: "json",
            data: {
                tagname: newValue,
                color: color
            },
            success: function (data) {

                ajaxing--;
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                location.reload();
            }
        })
    }
}

function ChangeTag(id, color) {
    let allTags = JSON.parse($('#tags').val());
    let status = 0;
    let removeIndex = -1;
    if (id.indexOf('green') != -1) {
        status = 1;
    } else if (id.indexOf('yellow') != -1) {
        status = 2;
    } else if (id.indexOf('orange') != -1) {
        status = 3;
    } else if (id.indexOf('red') != -1) {
        status = 4;
    } else if (id.indexOf('purple') != -1) {
        status = 5;
    } else if (id.indexOf('blue') != -1) {
        status = 6;
    } else {
        status = 7;
    }
    if (status > 0 && status < 7) {
        for (let a = 0; a < $('#fixedTags').children().length; a++) {
            let className = $('#fixedTags').children()[a].className;
            if (className == 'modal-label-' + status) {
                removeIndex = status;
            }
        }
    } else {
        alert("標籤取得發生錯誤")
        console.log("標籤取得發生錯誤");
        return;
    }

    if (removeIndex == -1) {
        let textValue = $('#' + id).text();
        if ($('#fixedTags').children().length > 0) {
            let tagsInFixedTags = $('#fixedTags').children();
            let beforeIndex = -1;
            let tagsIndexArray = [];
            for (let x = 0; x < $(tagsInFixedTags).length; x++) {
                tagsIndexArray.push(+$(tagsInFixedTags)[x].className.substr($(tagsInFixedTags)[x]
                    .className.indexOf('modal-label-') + 12, 1));
            }
            tagsIndexArray.sort();

            for (let y = 0; y < tagsIndexArray.length; y++) {
                if (tagsIndexArray[y] > status) {
                    beforeIndex = tagsIndexArray[y];
                    break;
                }
            }
            if (beforeIndex != -1) {
                $('#fixedTags').children().closest('.modal-label-' + beforeIndex).before(
                    '<span class="modal-label-' + status +
                    '"><span class="label-text" onmousemove="removeClassType(this)">' + textValue +
                    '</span></span>')
            } else {
                $('#fixedTags').append('<span class="modal-label-' + status +
                    '"><span class="label-text" onmousemove="removeClassType(this)">' + textValue +
                    '</span></span>')
            }
        } else {
            $('#fixedTags').append('<span class="modal-label-' + status +
                '"><span class="label-text" onmousemove="removeClassType(this)">' + textValue +
                '</span></span>')
        }
        let workIndex = -1;
        for (let i = 0; i < $('.work-name').length; i++) {
            if ($($('.work-name')[i]).text().trim() == $('#work_title').text()) {
                workIndex = i;
            }
        }
        if ($('#card-' + workIndex).children().length > 0) {
            let tagsInFixedTags = $($('#card-' + workIndex).children()[0]).children();
            let beforeIndex = -1;
            let tagsIndexArray = [];
            for (let x = 0; x < $(tagsInFixedTags).length; x++) {
                tagsIndexArray.push(+$(tagsInFixedTags)[x].className.substr($(tagsInFixedTags)[x]
                    .className.indexOf('card-label-') + 11, 1));
            }
            tagsIndexArray.sort();
            for (let y = 0; y < tagsIndexArray.length; y++) {
                if (tagsIndexArray[y] > status) {
                    beforeIndex = tagsIndexArray[y];
                    break;
                }
            }

            if (beforeIndex != -1) {
                $($('#card-' + workIndex).children()[0]).children().closest('.card-label-' + beforeIndex)
                    .before(
                        '<span class="card-label-' + status +
                        '"><span class="label-text" onmousemove="removeClassType(this)">' + textValue +
                        '</span></span>')
            } else {
                $($('#card-' + workIndex).children()[0]).append('<span class="card-label-' + status +
                    '"><span class="label-text" onmousemove="removeClassType(this)">' + textValue +
                    '</span></span>');
            }

        } else {
            $($('#card-' + workIndex).children()[0]).append('<span class="card-label-' + status +
                '"><span class="label-text" onmousemove="removeClassType(this)">' + textValue +
                '</span></span>');
        }
        let newTagArray = [];
        for (let s = 1; s < 7; s++) {
            if (s == status) {
                let newTagIndex = -1;
                for (var t = 0; t < allTags.length; t++) {
                    if ((status == 1 && allTags[t].color == '#61BD4F') ||
                        (status == 2 && allTags[t].color == '#F2D600') ||
                        (status == 3 && allTags[t].color == '#FF9F1A') ||
                        (status == 4 && allTags[t].color == '#EB5A46') ||
                        (status == 5 && allTags[t].color == '#C377E0') ||
                        (status == 6 && allTags[t].color == '#0079BF')) {
                        newTagIndex = t;
                    }
                }
                newTagArray.push(allTags[newTagIndex].tag_id)
            } else {
                newTagArray.push(+nowWorkData.workData[s + 3])
            }
        }
        let deadline;
        if (nowWorkData.workData[3].length != 6) {
            deadline = null;
        } else {
            deadline = nowWorkData.workData[3][0] + '-' +
                (nowWorkData.workData[3][1] < 10 ? ('0' + nowWorkData.workData[3][1]) : nowWorkData
                    .workData[3][
                        1
                    ]) + '-' +
                (nowWorkData.workData[3][2] < 10 ? ('0' + nowWorkData.workData[3][2]) : nowWorkData
                    .workData[3][
                        2
                    ]) + ' ' +
                (nowWorkData.workData[3][3] < 10 ? ('0' + nowWorkData.workData[3][3]) : nowWorkData
                    .workData[3][
                        3
                    ]) + ':' +
                (nowWorkData.workData[3][4] < 10 ? ('0' + nowWorkData.workData[3][4]) : nowWorkData
                    .workData[3][
                        4
                    ]) + ':' +
                (nowWorkData.workData[3][5] < 10 ? ('0' + nowWorkData.workData[3][5]) : nowWorkData
                    .workData[3][
                        5
                    ]);
        }

        // Reset SetWorkCard
        let tagsInFixedTags = $($('#card-' + workIndex).children()[0]).children();
        let tagsIndexArray = [];
        let newTagsData = [];
        let thisWorkData = nowWorkData.workData;

        for (let x = 0; x < $(tagsInFixedTags).length; x++) {
            tagsIndexArray.push(+$(tagsInFixedTags)[x].className.substr($(tagsInFixedTags)[x]
                .className.indexOf('modal-label-') + 12, 1));
        }
        for (let y = 0; y < tagsIndexArray.length; y++) {
            let pushIndex;
            let newTag = [];
            for (let z = 0; z < allTags.length; z++) {
                if ((tagsIndexArray[y] == 1 && allTags[z].color == '#61BD4F') ||
                    (tagsIndexArray[y] == 2 && allTags[z].color == '#F2D600') ||
                    (tagsIndexArray[y] == 3 && allTags[z].color == '#FF9F1A') ||
                    (tagsIndexArray[y] == 4 && allTags[z].color == '#EB5A46') ||
                    (tagsIndexArray[y] == 5 && allTags[z].color == '#C377E0') ||
                    (tagsIndexArray[y] == 6 && allTags[z].color == '#0079BF')) {
                    pushIndex = z;
                    thisWorkData[tagsIndexArray[y] + 3] = allTags[z].tag_id;
                    newTag.push(allTags[z].tag_id)
                    newTag.push(allTags[z].tagname)
                    newTag.push(allTags[z].color)
                }
            }
            newTagsData.push(newTag)
        }
        let newWorkCard = {
            listname: nowWorkData.listname,
            tags: newTagsData,
            teammember: JSON.parse($('#teammember').val()),
            workData: thisWorkData
        }
        $($('#card-' + workIndex).children()[1]).attr('onclick', `javascript:SetWorkCard(` + JSON.stringify(
            newWorkCard) + `, ` + workIndex + `)`)

        nowWorkData = newWorkCard;
        ajaxing++;
        $.ajax({
            method: 'POST',
            url: '/content/plan/updateWork',
            datatype: "json",
            data: {
                work_id: +nowWorkData.workData[0],
                work_title: nowWorkData.workData[1],
                work_content: nowWorkData.workData[2],
                deadline: deadline,
                tag_id1: +nowWorkData.workData[4],
                tag_id2: +nowWorkData.workData[5],
                tag_id3: +nowWorkData.workData[6],
                tag_id4: +nowWorkData.workData[7],
                tag_id5: +nowWorkData.workData[8],
                tag_id6: +nowWorkData.workData[9],
                file: nowWorkData.workData[10],
                file_name: nowWorkData.workData[11],
                first_principal: nowWorkData.workData[12],
                second_principal: nowWorkData.workData[13]
            },
            success: function (data) {

                ajaxing--;
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                location.reload();
            }
        })
    } else {
        $('.modal-label-' + removeIndex).remove();
        let workIndex = -1;
        for (let i = 0; i < $('.work-name').length; i++) {
            if ($($('.work-name')[i]).text().trim() == $('#work_title').text()) {
                workIndex = i;
            }
        }
        $($('#card-' + workIndex).children()[0]).children().closest('.card-label-' + removeIndex).remove();

        let newTagArray = [];
        for (let s = 1; s < 7; s++) {
            newTagArray.push(+nowWorkData.workData[s + 3])
        }
        let setZeroIndex = -1;
        if (color == '#61BD4F') {
            setZeroIndex = 0;
        } else if (color == '#F2D600') {
            setZeroIndex = 1;
        } else if (color == '#FF9F1A') {
            setZeroIndex = 2;
        } else if (color == '#EB5A46') {
            setZeroIndex = 3;
        } else if (color == '#C377E0') {
            setZeroIndex = 4;
        } else if (color == '#0079BF') {
            setZeroIndex = 5;
        }
        newTagArray[setZeroIndex] = 0;
        let deadline;
        if (nowWorkData.workData[3].length != 6) {
            deadline = null;
        } else {
            deadline = nowWorkData.workData[3][0] + '-' +
                (nowWorkData.workData[3][1] < 10 ? ('0' + nowWorkData.workData[3][1]) : nowWorkData
                    .workData[3][
                        1
                    ]) + '-' +
                (nowWorkData.workData[3][2] < 10 ? ('0' + nowWorkData.workData[3][2]) : nowWorkData
                    .workData[3][
                        2
                    ]) + ' ' +
                (nowWorkData.workData[3][3] < 10 ? ('0' + nowWorkData.workData[3][3]) : nowWorkData
                    .workData[3][
                        3
                    ]) + ':' +
                (nowWorkData.workData[3][4] < 10 ? ('0' + nowWorkData.workData[3][4]) : nowWorkData
                    .workData[3][
                        4
                    ]) + ':' +
                (nowWorkData.workData[3][5] < 10 ? ('0' + nowWorkData.workData[3][5]) : nowWorkData
                    .workData[3][
                        5
                    ]);
        }

        // Reset SetWorkCard
        let tagsInFixedTags = $($('#card-' + workIndex).children()[0]).children();
        let tagsIndexArray = [];
        let newTagsData = [];
        let thisWorkData = nowWorkData.workData;
        for (let c = 0; c < 6; c++) {
            thisWorkData[c + 4] = newTagArray[c];
        }
        for (let x = 0; x < $(tagsInFixedTags).length; x++) {
            tagsIndexArray.push(+$(tagsInFixedTags)[x].className.substr($(tagsInFixedTags)[x]
                .className.indexOf('modal-label-') + 12, 1));
        }
        for (let y = 0; y < tagsIndexArray.length; y++) {
            let pushIndex;
            let newTag = [];
            for (let z = 0; z < allTags.length; z++) {
                if ((tagsIndexArray[y] == 1 && allTags[z].color == '#61BD4F') ||
                    (tagsIndexArray[y] == 2 && allTags[z].color == '#F2D600') ||
                    (tagsIndexArray[y] == 3 && allTags[z].color == '#FF9F1A') ||
                    (tagsIndexArray[y] == 4 && allTags[z].color == '#EB5A46') ||
                    (tagsIndexArray[y] == 5 && allTags[z].color == '#C377E0') ||
                    (tagsIndexArray[y] == 6 && allTags[z].color == '#0079BF')) {
                    pushIndex = z;
                    newTag.push(allTags[z].tag_id)
                    newTag.push(allTags[z].tagname)
                    newTag.push(allTags[z].color)
                }
            }
            newTagsData.push(newTag)
        }
        let newWorkCard = {
            listname: nowWorkData.listname,
            tags: newTagsData,
            teammember: JSON.parse($('#teammember').val()),
            workData: thisWorkData
        }
        $($('#card-' + workIndex).children()[1]).attr('onclick', `javascript:SetWorkCard(` + JSON.stringify(
            newWorkCard) + `, ` + workIndex + `)`)

        nowWorkData = newWorkCard;
        ajaxing++;
        $.ajax({
            method: 'POST',
            url: '/content/plan/updateWork',
            datatype: "json",
            data: {
                work_id: +nowWorkData.workData[0],
                work_title: nowWorkData.workData[1],
                work_content: nowWorkData.workData[2],
                deadline: deadline,
                tag_id1: +nowWorkData.workData[4],
                tag_id2: +nowWorkData.workData[5],
                tag_id3: +nowWorkData.workData[6],
                tag_id4: +nowWorkData.workData[7],
                tag_id5: +nowWorkData.workData[8],
                tag_id6: +nowWorkData.workData[9],
                file: nowWorkData.workData[10],
                file_name: nowWorkData.workData[11],
                first_principal: nowWorkData.workData[12],
                second_principal: nowWorkData.workData[13]
            },
            success: function (data) {

                ajaxing--;
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                location.reload();
            }
        })
    }

}

function SaveDeadline() {
    let thisWorkData = nowWorkData.workData;
    let newDeadline = $('input.timeout-date').val();
    let newDeadlineSplit = newDeadline.replace(/-/g, ',');
    newDeadlineSplit = newDeadlineSplit.replace(/:/g, ',');
    newDeadlineSplit = newDeadlineSplit.replace(/ /g, ',');
    let newDeadlineArray = newDeadlineSplit.split(',');

    deadlineText = +newDeadlineArray[1] + '月' + +newDeadlineArray[2] + '日 ' +
        (+newDeadlineArray[3] > 12 ? ('下午' + (+newDeadlineArray[3] - 12) + '點') : ('上午' + +newDeadlineArray[
                3] +
            '點')) + +newDeadlineArray[4] + '分';
    if ($('.modal-timeout').length > 0) {
        $('#work_deadline').text(deadlineText);
    } else {
        $($('.modal-label-left')[0]).after(
            '<div class="modal-timeout"><div class="modal-timeout-header">\n\
            <i class="far fa-clock timeout-icon fa-lg"></i><div class="modal-timeout-name">到期日</div></div>\n\
            <div class="timeout"><span class="deadtime"><i class="far fa-clock"></i><span id="work_deadline">' +
            deadlineText + '\n\
            </span></span></div></div>')
    }
    let workIndex = -1;
    for (let i = 0; i < $('.work-name').length; i++) {
        if ($($('.work-name')[i]).text().trim() == $('#work_title').text()) {
            workIndex = i;
        }
    }
    if ($($('.work-name')[workIndex]).next().find('span.deadtime').length > 0) {
        $($('.work-name')[workIndex]).next().find('span.deadtime').html('<i class="far fa-clock"></i>' + +
            newDeadlineArray[1] + '月' + +newDeadlineArray[2] + '日')
    } else {
        if ($($('.work-name')[workIndex]).next().find('div.work-img').length > 0) {
            $($('.work-name')[workIndex]).next().find('div.work-img').before(
                '<span class="deadtime"><i class="far fa-clock"></i>' + +newDeadlineArray[1] + '月' + +
                newDeadlineArray[2] + '日' + '</span>');
        } else {
            $($('.work-name')[workIndex]).next().append(
                '<span class="deadtime"><i class="far fa-clock"></i>' + +newDeadlineArray[1] + '月' + +
                newDeadlineArray[2] + '日' + '</span>');
        }
    }
    let updateDeadlineArray = newDeadlineArray.slice();
    updateDeadlineArray.push("0");
    thisWorkData[3] = updateDeadlineArray;
    let newWorkCard = {
        listname: nowWorkData.listname,
        tags: JSON.parse($('#tags').val()),
        teammember: JSON.parse($('#teammember').val()),
        workData: thisWorkData
    }
    $($('#card-' + workIndex).children()[1]).attr('onclick', `javascript:SetWorkCard(` + JSON.stringify(
        newWorkCard) + `, ` + workIndex + `)`)

    nowWorkData = newWorkCard;

    ajaxing++;
    $.ajax({
        method: 'POST',
        url: '/content/plan/updateWork',
        datatype: "json",
        data: {
            work_id: +nowWorkData.workData[0],
            work_title: nowWorkData.workData[1],
            work_content: nowWorkData.workData[2],
            deadline: newDeadline,
            tag_id1: +nowWorkData.workData[4],
            tag_id2: +nowWorkData.workData[5],
            tag_id3: +nowWorkData.workData[6],
            tag_id4: +nowWorkData.workData[7],
            tag_id5: +nowWorkData.workData[8],
            tag_id6: +nowWorkData.workData[9],
            file: nowWorkData.workData[10],
            file_name: nowWorkData.workData[11],
            first_principal: nowWorkData.workData[12],
            second_principal: nowWorkData.workData[13]
        },
        success: function (data) {

            ajaxing--;
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            location.reload();
        }
    })
}

function ClearDeadline() {
    let thisWorkData = nowWorkData.workData;
    $('input.timeout-date').val('');
    $('#work_deadline').parent().parent().parent().remove()
    let workIndex = -1;
    for (let i = 0; i < $('.work-name').length; i++) {
        if ($($('.work-name')[i]).text().trim() == $('#work_title').text()) {
            workIndex = i;
        }
    }
    if ($($('.work-name')[workIndex]).next().find('span.deadtime').length > 0) {
        $($('.work-name')[workIndex]).next().find('span.deadtime').remove();
    }
    thisWorkData[3] = null
    let newWorkCard = {
        listname: nowWorkData.listname,
        tags: JSON.parse($('#tags').val()),
        teammember: JSON.parse($('#teammember').val()),
        workData: thisWorkData
    }
    $($('#card-' + workIndex).children()[1]).attr('onclick', `javascript:SetWorkCard(` + JSON.stringify(
        newWorkCard) + `, ` + workIndex + `)`)

    nowWorkData = newWorkCard;

    ajaxing++;
    $.ajax({
        method: 'POST',
        url: '/content/plan/updateWork',
        datatype: "json",
        data: {
            work_id: +nowWorkData.workData[0],
            work_title: nowWorkData.workData[1],
            work_content: nowWorkData.workData[2],
            deadline: null,
            tag_id1: +nowWorkData.workData[4],
            tag_id2: +nowWorkData.workData[5],
            tag_id3: +nowWorkData.workData[6],
            tag_id4: +nowWorkData.workData[7],
            tag_id5: +nowWorkData.workData[8],
            tag_id6: +nowWorkData.workData[9],
            file: nowWorkData.workData[10],
            file_name: nowWorkData.workData[11],
            first_principal: nowWorkData.workData[12],
            second_principal: nowWorkData.workData[13]
        },
        success: function (data) {

            ajaxing--;
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            location.reload();
        }
    })
}

function uploadFile(file) {
    let thisWorkData = nowWorkData.workData;
    if (file.files[0] != undefined) {
        let fileType;
        let fileName = file.files[0].name;
        let isCompressedFile = false;
        if (file.files[0].type != '') {
            fileType = file.files[0].type.split('/')[1]
        } else {
            alert('僅支援以下壓縮檔格式。（ .zip .tar .gz ）');
            return;
        }

        if (fileType == 'x-zip-compressed' || fileType == 'x-gzip' || fileType == 'x-tar') {
            let reader = new FileReader();
            // Closure to capture the file information.
            reader.onload = (function (theFile) {
                return function (e) {
                    var binaryData = e.target.result;
                    //Converting Binary Data to base 64
                    //showing file converted to base64
                    let fileUrl = window.btoa(binaryData);

                    let fileDataUrl = 'data:' + theFile.type + ';base64,' + fileUrl;
                    if (fileUrl.length >= 734000) {
                        alert('檔案過大。僅傳送512K以下之檔案。')
                        return;
                    }

                    if ($('.modal-file').length > 0) {
                        $('#downloadFileBlock').attr('href', fileDataUrl)
                        $('#downloadFileBlock').attr('download', fileName)
                        $('#downloadFileText').attr('download', fileName);
                    } else {
                        $('.col-md-8').append('<div class="modal-file"><div class="modal-file-header"><i class="far fa-file icon-file fa-lg"></i><div \n\
                        class="modal-file-name">下載附件</div></div><div class="file-set"><a id="downloadFileBlock" class="box-rar" \n\
                        download="' + fileName + '" href="' + fileDataUrl +
                            '"><span class="box-rar-text">' +
                            fileName.split('.')[fileName.split('.').length - 1] + '</span></a><p class="file-set-show"><a \n\
                        id="downloadFileText" download="' + fileName + '" href="' + fileDataUrl + '" \n\
                        class="file-name"></a></p></div></div>')
                    }
                    $('#downloadFileText').text(fileName);
                    $('#downloadFileText').attr('href', fileDataUrl);
                    $('#downloadFileBlock').children()[0].innerHTML = fileName.split('.')[
                        fileName.split('.').length - 1];

                    let workIndex = -1;
                    for (let i = 0; i < $('.work-name').length; i++) {
                        if ($($('.work-name')[i]).text().trim() == $('#work_title').text()) {
                            workIndex = i;
                        }
                    }
                    thisWorkData[10] = fileUrl;
                    thisWorkData[11] = fileName;
                    let deadline;
                    if (nowWorkData.workData[3].length != 6) {
                        deadline = null;
                    } else {
                        deadline = nowWorkData.workData[3][0] + '-' +
                            (nowWorkData.workData[3][1] < 10 ? ('0' + nowWorkData.workData[3][
                                    1
                                ]) : nowWorkData
                                .workData[3][
                                    1
                                ]) + '-' +
                            (nowWorkData.workData[3][2] < 10 ? ('0' + nowWorkData.workData[3][
                                    2
                                ]) : nowWorkData
                                .workData[3][
                                    2
                                ]) + ' ' +
                            (nowWorkData.workData[3][3] < 10 ? ('0' + nowWorkData.workData[3][
                                    3
                                ]) : nowWorkData
                                .workData[3][
                                    3
                                ]) + ':' +
                            (nowWorkData.workData[3][4] < 10 ? ('0' + nowWorkData.workData[3][
                                    4
                                ]) : nowWorkData
                                .workData[3][
                                    4
                                ]) + ':' +
                            (nowWorkData.workData[3][5] < 10 ? ('0' + nowWorkData.workData[3][
                                    5
                                ]) : nowWorkData
                                .workData[3][
                                    5
                                ]);
                    }
                    let newWorkCard = {
                        listname: nowWorkData.listname,
                        tags: JSON.parse($('#tags').val()),
                        teammember: JSON.parse($('#teammember').val()),
                        workData: thisWorkData
                    }
                    $($('#card-' + workIndex).children()[1]).attr('onclick',
                        `javascript:SetWorkCard(` + JSON.stringify(
                            newWorkCard) + `, ` + workIndex + `)`)

                    nowWorkData = newWorkCard;
                    ajaxing++;
                    $.ajax({
                        method: 'POST',
                        url: '/content/plan/updateWork',
                        datatype: "json",
                        data: {
                            work_id: +nowWorkData.workData[0],
                            work_title: nowWorkData.workData[1],
                            work_content: nowWorkData.workData[2],
                            deadline: deadline,
                            tag_id1: +nowWorkData.workData[4],
                            tag_id2: +nowWorkData.workData[5],
                            tag_id3: +nowWorkData.workData[6],
                            tag_id4: +nowWorkData.workData[7],
                            tag_id5: +nowWorkData.workData[8],
                            tag_id6: +nowWorkData.workData[9],
                            file: fileUrl,
                            file_name: fileName,
                            first_principal: nowWorkData.workData[12],
                            second_principal: nowWorkData.workData[13]
                        },
                        success: function (data) {

                            ajaxing--;
                        },
                        error: function (data) {
                            alert('連接伺服器出現問題，請重試。')
                            location.reload();
                        }
                    })
                };
            })(file.files[0]);
            reader.readAsBinaryString(file.files[0]);

        } else {
            alert('僅支援以下壓縮檔格式。（ .zip .tar .gz ）');
            return;
        }
    }
}

let notification_MoveWorkToList = false;

function MoveWorkToList(data, cardNo) {
    let workData = data.workData;
    let allLists = JSON.parse($('#lists').val());
    let allWorks = JSON.parse($('#works').val());
    let list_id = $('#list-value').val();
    let listIndex = -1;
    let workIndex = -1;
    for (let a = 0; a < $('.work-header').length; a++) {
        if ($($($('.work-header')[a]).children()[0]).attr('placeholder') == list_id) {
            listIndex = a;
        }
    }
    for (let b = 0; b < $('.card.work-card').length; b++) {
        if ($($($($('.card.work-card')[b]).children()[1]).children()[0]).text().trim() == workData[1]) {
            workIndex = b;
        }
    }
    let cloneWork = $($('.card.work-card')[workIndex]).clone();
    let toListName = $($($('.card.add-card')[listIndex]).parent().prev().children()[0]).attr('placeholder');
    let fromListName = $($($('.card.work-card')[workIndex]).parent().prev().children()[0]).attr(
        'placeholder')
    let thisWorkName = $($($($('.card.work-card')[workIndex]).children()[1]).children()[0]).text().trim();
    $($('.card.work-card')[workIndex]).remove();
    $($('.card.add-card')[listIndex]).before(cloneWork);

    let toListId = '';
    let fromListId = '';
    let thisWorkId = '';
    for (let c = 0; c < allLists.length; c++) {
        if (allLists[c][1] == toListName) {
            toListId = allLists[c][0];
        }
        if (allLists[c][1] == fromListName) {
            fromListId = allLists[c][0];
        }
    }
    for (let c = 0; c < allWorks.length; c++) {
        if (allWorks[c][1] == thisWorkName) {
            thisWorkId = allWorks[c][0];
        }
    }

    if (toListId == '' || toListId == null || thisWorkId == '' || thisWorkId == null) {
        for (let a = 0; a < allWorks.length; a++) {
            if (allWorks[a][1] == thisWorkName) {
                thisWorkId = allWorks[a][0]
            }
        }
        for (let a = 0; a < allLists.length; a++) {
            if (allLists[a][1] == toListName) {
                toListId = allLists[a][0]
            }
        }
    }
    if (toListId == '' || toListId == null || thisWorkId == '' || thisWorkId == null) {
        if (!notification_MoveWorkToList) {
            alert("系統忙碌中，請稍待片刻。");
        }
        notification_MoveWorkToList = true;
        setTimeout(function () {
            MoveWorkToList(data, cardNo)
        }, 3000)
    } else {
        if (notification_MoveWorkToList) {
            notification_MoveWorkToList = false;
            alert("工作移動成功。")
        }

        let newWorkCard = {
            listname: toListName,
            tags: JSON.parse($('#tags').val()),
            teammember: nowWorkData.teammember,
            workData: nowWorkData.workData
        }
        $($('#card-' + cardNo).children()[1]).attr('onclick', `javascript:SetWorkCard(` + JSON.stringify(
            newWorkCard) + `, ` + cardNo + `)`)

        nowWorkData = newWorkCard;

        $('#show-modal').modal('hide');
        if (toListId != fromListId) {
            ajaxing++;
            $.ajax({
                method: 'POST',
                url: '/content/plan/updateListwork',
                datatype: "json",
                data: {
                    toListId: toListId,
                    fromListId: fromListId,
                    thisWorkId: thisWorkId
                },
                success: function (data) {

                    ajaxing--;
                },
                error: function (data) {
                    alert('連接伺服器出現問題，請重試。')
                    location.reload();
                }
            })
        }
    }

}

let notification_DragWorkToList = false;

function DragWorkToList(toListElement, fromListElement, workElement) {
    let allLists = JSON.parse($('#lists').val());
    let allWorks = JSON.parse($('#works').val());
    let toListName = $($(toListElement).prev().children()[0]).attr('placeholder');
    let fromListName = $($(fromListElement).prev().children()[0]).attr('placeholder');
    let thisWorkName = $($($(workElement).children()[1]).children()[0]).text().trim();
    let thisWorkData;
    let toListId;
    let fromListId;
    let thisWorkId;
    for (let c = 0; c < allLists.length; c++) {
        if (allLists[c][1] == toListName) {
            toListId = allLists[c][0];
        }
        if (allLists[c][1] == fromListName) {
            fromListId = allLists[c][0];
        }
    }
    for (let c = 0; c < allWorks.length; c++) {
        if (allWorks[c][1] == thisWorkName) {
            thisWorkId = allWorks[c][0];
            thisWorkData = allWorks[c];
        }
    }

    if (toListId == '' || toListId == null || thisWorkId == '' || thisWorkId == null) {
        for (let a = 0; a < allWorks.length; a++) {
            if (allWorks[a][1] == thisWorkName) {
                thisWorkId = allWorks[a][0]
            }
        }
        for (let a = 0; a < allLists.length; a++) {
            if (allLists[a][1] == toListName) {
                toListId = allLists[a][0]
            }
        }
    }
    if (toListId == '' || toListId == null || thisWorkId == '' || thisWorkId == null) {
        if (!notification_DragWorkToList) {
            alert("系統忙碌中，請稍待片刻。");
        }
        notification_DragWorkToList = true;
        setTimeout(function () {
            DragWorkToList(toListElement, fromListElement, workElement)
        }, 3000)
    } else {
        if (notification_DragWorkToList) {
            notification_DragWorkToList = false;
            alert("工作移動成功。")
        }
        let workIndex = -1;
        for (let i = 0; i < $('.work-name').length; i++) {
            if ($($('.work-name')[i]).text().trim() == $('#work_title').text()) {
                workIndex = i;
            }
        }
        let newWorkCard = {
            listname: toListName,
            tags: JSON.parse($('#tags').val()),
            teammember: JSON.parse($('#teammember').val()),
            workData: thisWorkData
        }
        $($('#card-' + workIndex).children()[1]).attr('onclick', `javascript:SetWorkCard(` + JSON.stringify(
            newWorkCard) + `, ` + workIndex + `)`)

        nowWorkData = newWorkCard;

        $('#show-modal').modal('hide');
        if (toListId != fromListId) {
            ajaxing++;
            $.ajax({
                method: 'POST',
                url: '/content/plan/updateListwork',
                datatype: "json",
                data: {
                    toListId: toListId,
                    fromListId: fromListId,
                    thisWorkId: thisWorkId
                },
                success: function (data) {

                    ajaxing--;
                },
                error: function (data) {
                    alert('連接伺服器出現問題，請重試。')
                    location.reload();
                }
            })
        }
    }
}

function AddCardK(event) {
    if (event.key == 'Enter'/* && !event.shiftKey */) {
        var somethingAdd = false;
        var addIndex = -1;
        var addTitle = '';
        $('.add-card').each(function (index) {
            $(this).hide();
            if ($($('.card-add-text')[index]).val() != '') {
                somethingAdd = true;
                addIndex = index;
                addTitle = $($('.card-add-text')[index]).val();
                $($('.card-add-text')[index]).val('')
            }
        });
        if (somethingAdd) {
            AddCard(addIndex, addTitle);
        }
    }
}

// 新增卡片用的function
function AddCard(index, title) {
    let checkAllWorks = JSON.parse($('#works').val());
    for (let a = 0; a < checkAllWorks.length; a++) {
        if (checkAllWorks[a][1] == title.replace(/(\r\n|\n|\r)/gm, " ")) {
            alert('已有相同的卡片名稱。');
            return;
        }
    }
    let allLists = JSON.parse($('#lists').val());
    let listname = $($($('.work-header')[index]).children()[0]).attr('placeholder')
    let listId;
    let workLength = $('.card.work-card').length;
    let workData = ["", title.replace(/(\r\n|\n|\r)/gm, " "), "", "", null, null, null, null, null, null, "", "", "",
        ""
    ]
    let newCardData = {
        listname: listname,
        tags: JSON.parse($('#tags').val()),
        teammember: JSON.parse($('#teammember').val()),
        workData: workData
    }
    $($('.card.add-card')[index]).before(`\n\
<div class="card work-card" id="card-` + workLength + `" style="position: relative; left: 0px; top: 0px;">\n\
<div class="work-card-header"></div><div onclick='javascript:SetWorkCard(` + JSON.stringify(newCardData) + `, ` +
        workLength + `)'>\n\
<div class="work-name" data-toggle="modal" data-target="#show-modal">` + title.replace(/(\r\n|\n|\r)/gm, " ") + `</div>\n\
<div class="work-card-bottom" data-toggle="modal" data-target="#show-modal"><div class="work-img">\n\
</div></div></div></div>`)
    for (let c = 0; c < allLists.length; c++) {
        if (allLists[c][1] == listname) {
            listId = allLists[c][0];
        }
    }
    ajaxing++;
    $.ajax({
        method: 'POST',
        url: '/content/plan/addWork',
        datatype: "json",
        data: {
            work_title: title.replace(/(\r\n|\n|\r)/gm, " "),
            list_id: listId
        },
        success: function (data) {
            let allWorks = JSON.parse($('#works').val());
            workData[0] = "" + data.work_id;
            workData[1] = workData[1].replace(/(\r\n|\n|\r)/gm, " ");
            allWorks.push(workData)
            newCardData = {
                listname: listname,
                tags: [],
                teammember: [],
                workData: workData
            }
            $($('#card-' + workLength).children()[1]).attr('onclick',
                `javascript:SetWorkCard(` + JSON.stringify(newCardData) + `, ` +
                workLength + `)`)
            $('#works').val(JSON.stringify(allWorks));
            ajaxing--;
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            location.reload();
        }
    })
}

function DeleteWork(work_id, work_title, workIndex) {
    let allWorks = JSON.parse($('#works').val());
    let newWorks = allWorks.slice();
    $('#card-' + workIndex).remove();
    $('#show-modal').modal('hide');
    ajaxing++;
    $.ajax({
        method: 'POST',
        url: '/content/plan/deleteWork',
        datatype: "json",
        data: {
            work_id: work_id,
        },
        success: function () {
            for (let a = 0; a < allWorks.length; a++) {
                if (allWorks[a][0] == work_id) {
                    newWorks.splice(a, 1)
                }
            }
            $('#works').val(JSON.stringify(newWorks));
            ajaxing--;
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            location.reload();
        }
    })
}

function DeleteMember(element, user_id) {
    let allWorks = JSON.parse($('#works').val());
    let allTeammember = JSON.parse($('#teammember').val());
    let newWorks = allWorks.slice();
    let updataWorks = [];
    let newTeammember = allTeammember.slice();
    for (let a = 0; a < allWorks.length; a++) {
        if (allWorks[a][12] == user_id) {
            newWorks[a][12] = '';
            updataWorks.push(newWorks[a].slice());
        } else if (allWorks[a][13] == user_id) {
            newWorks[a][13] = '';
            updataWorks.push(newWorks[a].slice());
        }
    }
    for (let a = 0; a < allTeammember.length; a++) {
        if (allTeammember[a][0] == user_id) {
            newTeammember.splice(a, 1);
        }
    }

    $('#works').val(JSON.stringify(newWorks))
    $('#teammember').val(JSON.stringify(newTeammember))

    for (let c = 0; c < $('.work-card').length; c++) {
        let setWordCardString = $($($('.work-card')[c]).children()[1]).attr('onclick');
        let thisSetWorkCard = setWordCardString.substring(23, setWordCardString.lastIndexOf('}') + 1)
        thisSetWorkCard = JSON.parse(thisSetWorkCard);
        let result = [];
        for (let a = 0; a < JSON.parse($('#tags').val()).length; a++) {
            let tags = [];
            tags.push(JSON.parse($('#tags').val())[a].tag_id)
            tags.push(JSON.parse($('#tags').val())[a].tagname)
            tags.push(JSON.parse($('#tags').val())[a].color)
            result.push(tags);
        }
        thisSetWorkCard.tags = result;
        thisSetWorkCard.teammember = JSON.parse($('#teammember').val());

        if (thisSetWorkCard.workData[12] == user_id) {
            thisSetWorkCard.workData[12] = '';
        } else if (thisSetWorkCard.workData[13] == user_id) {
            thisSetWorkCard.workData[13] = '';
        }
        let deadline;
        if (thisSetWorkCard.workData[3].length != 6) {
            deadline = null;
        } else {
            deadline = thisSetWorkCard.workData[3][0] + '-' +
                (thisSetWorkCard.workData[3][1] < 10 ? ('0' + thisSetWorkCard.workData[3][
                        1
                    ]) : thisSetWorkCard
                    .workData[3][
                        1
                    ]) + '-' +
                (thisSetWorkCard.workData[3][2] < 10 ? ('0' + thisSetWorkCard.workData[3][
                        2
                    ]) : thisSetWorkCard
                    .workData[3][
                        2
                    ]) + ' ' +
                (thisSetWorkCard.workData[3][3] < 10 ? ('0' + thisSetWorkCard.workData[3][
                        3
                    ]) : thisSetWorkCard
                    .workData[3][
                        3
                    ]) + ':' +
                (thisSetWorkCard.workData[3][4] < 10 ? ('0' + thisSetWorkCard.workData[3][
                        4
                    ]) : thisSetWorkCard
                    .workData[3][
                        4
                    ]) + ':' +
                (thisSetWorkCard.workData[3][5] < 10 ? ('0' + thisSetWorkCard.workData[3][
                        5
                    ]) : thisSetWorkCard
                    .workData[3][
                        5
                    ]);
        }

        ajaxing++;
        $.ajax({
            method: 'POST',
            url: '/content/plan/updateWork',
            datatype: "json",
            data: {
                work_id: +thisSetWorkCard.workData[0],
                work_title: thisSetWorkCard.workData[1],
                work_content: thisSetWorkCard.workData[2],
                deadline: deadline,
                tag_id1: +thisSetWorkCard.workData[4],
                tag_id2: +thisSetWorkCard.workData[5],
                tag_id3: +thisSetWorkCard.workData[6],
                tag_id4: +thisSetWorkCard.workData[7],
                tag_id5: +thisSetWorkCard.workData[8],
                tag_id6: +thisSetWorkCard.workData[9],
                file: thisSetWorkCard.workData[10],
                file_name: thisSetWorkCard.workData[11],
                first_principal: thisSetWorkCard.workData[12],
                second_principal: thisSetWorkCard.workData[13]
            },
            success: function (data) {

                ajaxing--;
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                location.reload();
            }
        })
        $($('#card-' + c).children()[1]).attr('onclick', `javascript:SetWorkCard(` + JSON.stringify(
            thisSetWorkCard) + `, ` + c + `)`)
    }

    $(element).parent().remove();
    $('img[alt=workPrincipal_' + user_id + ']').remove();

    ajaxing++;
    $.ajax({
        method: 'POST',
        url: '/content/plan/deleteMember',
        datatype: "json",
        data: {
            user_id: user_id,
        },
        success: function (data) {

            ajaxing--;
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            location.reload();
        }
    })
}

function MoveMember(toMemberElement, fromMemberElement, memberElement) {
    let teammember = JSON.parse($('#teammember').val())
    let user_id = memberElement.id;
    let changeToAdmin = false;
    let memberIndex = -1;
    if (toMemberElement.id == 'admin-move') {
        changeToAdmin = true;
    }
    for (let a = 0; a < teammember.length; a++) {
        if (teammember[a][0] == user_id) {
            memberIndex = a;
        }
    }

    if (toMemberElement.id != fromMemberElement.id) {
        ajaxing++;
        $.ajax({
            method: 'POST',
            url: '/content/plan/updateMember',
            datatype: "json",
            data: {
                user_id: user_id,
                group_id: teammember[memberIndex][4],
                isAdmin: changeToAdmin
            },
            success: function (data) {

                ajaxing--;
            },
            error: function (data) {
                alert('連接伺服器出現問題，請重試。')
                location.reload();
            }
        })
    }
}

function Action_AddCard(index) {
    setTimeout(function () {
        $('.add-card-textarea')[index].click()
        $($('.add-card')[index]).focus();
    }, 10)
}