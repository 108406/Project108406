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
<<<<<<< HEAD
                var tags = SetTag(data);
                console.log(data[0].project_name);
                console.log(projectPermission);
                console.log(teammeber);
                console.log(adminpush);
                console.log(lists);
                console.log(listwork);
                console.log(works);
                console.log(tags);
                res.render('plan.ejs', {project_name:data[0].project_name, projectPermission:projectPermission, teammember:teammeber,
                    adminpush:adminpush, lists:lists, listwork:listwork, works:works, tags:tags});
=======
                console.log(projectPermission)
                console.log(teammeber)
                console.log(adminpush)
                console.log(lists)
                console.log(listwork)
                console.log(works)
                res.render('plan.ejs', {projectPermission:projectPermission, teammeber:teammeber,
                    adminpush:adminpush, lists:lists, listwork:listwork, works:works});
>>>>>>> 885d6de2ad241b4e80ac3d2c4179662c448a509f
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
            user.push(data[i].member_name);
            user.push(data[i].photo);
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
<<<<<<< HEAD
                work.push(data[i].tag_id1);
                work.push(data[i].tag_id2);
                work.push(data[i].tag_id3);
                work.push(data[i].tag_id4);
                work.push(data[i].tag_id5);
                work.push(data[i].tag_id6);
=======
                work.push(data[i].tag);
>>>>>>> 885d6de2ad241b4e80ac3d2c4179662c448a509f
                work.push(data[i].file);
                work.push(data[i].first_principal);
                work.push(data[i].second_principal);
                result.push(work);
            }
        }
    }
    return result;
}

<<<<<<< HEAD
function SetTag (data) {
    allTag = [];
    tag_id = [];
    tagSetting = [];
    for (var i = 0; i < data.length; i ++) {
        if (!tag_id.includes(data[i].tag_id1) && data[i].tag_id1 != null) {
            tagSetting.push(data[i].tag_id1);
            tagSetting.push(data[i].tagname1);
            tagSetting.push(data[i].color1);
            tag_id.push(data[i].tag_id1);
            allTag.push(tagSetting);
            tagSetting = [];
        }
        if (!tag_id.includes(data[i].tag_id2) && data[i].tag_id2 != null){
            tagSetting.push(data[i].tag_id2);
            tagSetting.push(data[i].tagname2);
            tagSetting.push(data[i].color2);
            tag_id.push(data[i].tag_id2);
            allTag.push(tagSetting);
            tagSetting = [];
        }
        if (!tag_id.includes(data[i].tag_id3) && data[i].tag_id3 != null){
            tagSetting.push(data[i].tag_id3);
            tagSetting.push(data[i].tagname3);
            tagSetting.push(data[i].color3);
            tag_id.push(data[i].tag_id3);
            allTag.push(tagSetting);
            tagSetting = [];
        }
        if (!tag_id.includes(data[i].tag_id4) && data[i].tag_id4 != null){
            tagSetting.push(data[i].tag_id4);
            tagSetting.push(data[i].tagname4);
            tagSetting.push(data[i].color4);
            tag_id.push(data[i].tag_id4);
            allTag.push(tagSetting);
            tagSetting = [];
        }
        if (!tag_id.includes(data[i].tag_id5) && data[i].tag_id5 != null){
            tagSetting.push(data[i].tag_id5);
            tagSetting.push(data[i].tagname5);
            tagSetting.push(data[i].color5);
            tag_id.push(data[i].tag_id5);
            allTag.push(tagSetting);
            tagSetting = [];
        }
        if (!tag_id.includes(data[i].tag_id6) && data[i].tag_id6 != null){
            tagSetting.push(data[i].tag_id6);
            tagSetting.push(data[i].tagname6);
            tagSetting.push(data[i].color6);
            tag_id.push(data[i].tag_id6);
            allTag.push(tagSetting);
            tagSetting = [];
        }
    }
    allTag.sort();
    return allTag;
}

=======
>>>>>>> 885d6de2ad241b4e80ac3d2c4179662c448a509f
module.exports = router;