//搜尋
$(document).ready(function () {
    InitSearchForBox();
})

function InitSearchForBox() {
    $('#SearchForBox').on('click', function (e) {
        if ($('#projectId').val() != '') {
            $('.Search_Box').css('display', 'block');
            $('.Search_Box').empty();
            $('.Search_Box').append('<div class="searchMask"></div><img src="/imgs/Loading.gif" class="LoadingShow"><span class="badge ProjectNameTitle">計畫名稱</span><br><div id="ProjectName" class="ProjectName">計畫搜尋中...</div><hr class="ProjectHr"><span class="badge ProjectNameTitle">輸入計畫密碼</span><input id="projectPassword" class="Search_Box_Password" type="text" placeholder="輸入專案密碼"><br><div class="ButtonGroup"><button onclick="AddProject()" type="button" class="btn btn-warning BtnSend">送出</button><button type="button" class="btn btn-danger BtnCancel">取消</button></div>');
            QueryProject();
            $(document).click(function (e) {
                $('.Search_Box').css('display', 'none');
            })
            e.stopPropagation();
        }
    })
    $('.BtnCancel').on('click', function () {
        $('.Search_Box').css('display', 'none');
    })
    $(".Search_Box").on("click", function (e) {
        e.stopPropagation();
    });
}