function Logout() {
    document.cookie = 'userid=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
    window.location.href = window.location.origin + '/login'
}

function AddProject() {
    let projectId = $('#projectId').val();
    let projectPassword = $('#projectPassword').val();
    $('.LoadingShow').show();
    $('.searchMask').show();

    $.ajax({
        type: 'POST',
        url: 'addToProject',
        data: {
            projectId: projectId,
            projectPassword: projectPassword
        },
        success: function (data) {
            $('.LoadingShow').hide();
            $('.searchMask').hide();
            $('.Search_Box').hide();
            if (data.success) {
                $('.SuccessMessenge').fadeIn(500);
                setTimeout(function () {
                    $('.SuccessMessenge').fadeOut("slow");
                }, 2500);
            } else {
                if (data.message == '計畫密碼錯誤') {
                    $('.FailMessenge').text('計畫加入失敗，請檢查計畫密碼是否有誤。')
                } else {
                    $('.FailMessenge').text('您已經在該計畫中。')
                }
                $('.FailMessenge').fadeIn(500);
                setTimeout(function () {
                    $('.FailMessenge').fadeOut("slow");
                }, 2500);
            }
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            location.reload();
        }
    });
}

function QueryProject() {
    let projectId = $('#projectId').val();
    $('.LoadingShow').show();
    $('.searchMask').show();

    $.ajax({
        type: 'POST',
        url: 'searchProject',
        data: {
            projectId: projectId
        },
        success: function (data) {
            $('.LoadingShow').hide();
            $('.searchMask').hide();
            if (data.found) {
                $('.Search_Box').empty();
                $('.Search_Box').append(
                    '<div class="searchMask"></div><img src="./imgs/Loading.gif" class="LoadingShow"><span class="badge ProjectNameTitle">計畫名稱</span><br><div id="ProjectName" class="ProjectName">計畫搜尋中...</div><hr class="ProjectHr"><span class="badge ProjectNameTitle">輸入計畫密碼</span><input id="projectPassword" class="Search_Box_Password" type="text" placeholder="輸入專案密碼"><br><div class="ButtonGroup"><button onclick="AddProject()" type="button" class="btn btn-warning BtnSend">送出</button><button type="button" class="btn btn-danger BtnCancel">取消</button></div>'
                );
                $('#ProjectName').text(data.data[0].project_name);
                InitSearchForBox();
            } else {
                let deleteNextEle = true;
                while (deleteNextEle) {
                    if ($('.ProjectHr').next().length > 0) {
                        $('.ProjectHr').next().remove();
                    } else {
                        $('.badge.ProjectNameTitle').next().remove();
                        $('.badge.ProjectNameTitle').remove();
                        $('#ProjectName').text('該計畫不存在。');
                        deleteNextEle = false;
                    }
                }
            }
        },
        error: function (data) {
            alert('連接伺服器出現問題，請重試。')
            location.reload();
        }
    });

}