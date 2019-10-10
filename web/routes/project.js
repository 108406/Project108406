var express = require('express');
var router = express.Router();

//增加引用函式
const view = require('./utility/view');

router.get('/', function(req, res, next) {
    // console.log(Date.now() * 1000 + Math.floor(Math.random() * 1000));
    view.projectAllData(req.query.project_id).then(data => {
        if(data==null){
            res.redirect('/login');  //導向錯誤頁面
        }else{
            // 0 => list_permission, 1 => add_work, 2 => edit_work, 3 => delete_work
            var projectPermission = SetProjectPermission(data);
            var teammeber = SetTeammember(data);
            var adminpush = SetAdminPush(data);
            var lists = SetList(data);
            var listwork = SetListWork(data, lists);
            var works = SetWork(data);

            console.log(projectPermission);
            console.log(teammeber);
            console.log(adminpush);
            console.log(listwork);
            console.log(lists);
            console.log(works);
            res.render('project_list_work.ejs', {items:data});
        } 
    })
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
    listSerno = [];
    listWork = [];
    for (var i = 0; i < data.length; i ++) {
        list = [];
        if (!listSerno.includes(data[i].list_serno)) {
            listSerno.push(data[i].list_serno);
            list.push(data[i].list_serno);
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
            if (data[d].list_serno == result[l][0]) {
                if (!tempWorks.includes(data[d].work_serno) && data[d].work_serno != null) {
                    tempWorks.push(data[d].work_serno);
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
        if (data[i].work_serno != null) {
            if (!workSerno.includes(data[i].work_serno)) {
                workSerno.push(data[i].work_serno);
                work.push(data[i].work_serno);
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