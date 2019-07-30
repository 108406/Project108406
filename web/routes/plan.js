var express = require('express');
var router = express.Router();

//增加引用函式
const view = require('./utility/view');

router.get('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        view.projectAllData(req.cookies.projectid).then(data => {
            if(data=='failed'){
                res.render('error');  //導向錯誤頁面
            }else{
                var projectPermission = SetProjectPermission(data);
                var teammeber = SetTeammember(data);
                var adminpush = SetAdminPush(data);
                var lists = SetList(data);
                var listwork = SetListWork(data, lists);
                var works = SetWork(data);
                console.log('??????')
                console.log(projectPermission)
                console.log(teammeber)
                console.log(adminpush)
                console.log(lists)
                console.log(listwork)
                console.log(works)
                res.render('plan.ejs', {projectPermission:projectPermission, teammeber:teammeber,
                    adminpush:adminpush, lists:lists, listwork:listwork, works:works});
            } 
        })
    } else {
        res.redirect('login');
    }
});

function SetProjectPermission(data) {
    result = [];
    result.push(data[0].list_permission);
    result.push(data[0].add_work);
    result.push(data[0].edit_work);
    result.push(data[0].delete_work);

    return result;
}

function SetTeammember(data) {
    result = [];
    userId = [];
    for (var i = 0; i < data.length; i ++) {
        user = [];
        if (!userId.includes(data[i].user_id)) {
            userId.push(data[i].user_id);
            user.push(data[i].user_id);
            user.push(data[i].isadmin);
            result.push(user);
        }
    }
    return result;
}

function SetAdminPush(data) {
    result = [];
    adminpush_serno = [];
    for (var i = 0; i < data.length; i ++) {
        adminpush = [];
        if (!adminpush_serno.includes(data[i].adminpush_serno)) {
            adminpush_serno.push(data[i].adminpush_serno);
            adminpush.push(data[i].adminpush_content);
            adminpush.push(data[i].adminpush_startdate);
            adminpush.push(data[i].adminpush_enddate);
            result.push(adminpush);
        }
    }
    result.sort(function(a, b) {
        return b[1] - a[1];
    });
    return result;
}

function SetList(data) {
    result = [];
    listid = [];
    listWork = [];
    for (var i = 0; i < data.length; i ++) {
        list = [];
        if (!listid.includes(data[i].list_id)) {
            listid.push(data[i].list_id);
            list.push(data[i].list_id);
            list.push(data[i].list_name);
            result.push(list);
        }
    }
    
    return result;
}

function SetListWork(data, list) {
    result = list;
    lw = [];
    for (var l = 0; l < result.length; l ++) {
        var tempWorks = [];
        for (var d = 0; d < data.length; d ++) {
            if (data[d].list_id == result[l][0]) {
                if (!tempWorks.includes(data[d].work_id) && data[d].work_id != null) {
                    tempWorks.push(data[d].work_id);
                }
            }
        }
        lw.push(tempWorks);
    }
    return lw;
}

function SetWork(data) {
    result = [];
    workSerno = [];
    for (var i = 0; i < data.length; i ++) {
        work = [];
        if (data[i].work_id != null) {
            if (!workSerno.includes(data[i].work_id)) {
                workSerno.push(data[i].work_id);
                work.push(data[i].work_id);
                work.push(data[i].work_title);
                work.push(data[i].work_content);
                work.push(data[i].deadline);
                work.push(data[i].tag);
                work.push(data[i].file);
                work.push(data[i].first_principal);
                work.push(data[i].second_principal);
                result.push(work);
            }
        }
    }
    return result;
}

module.exports = router;