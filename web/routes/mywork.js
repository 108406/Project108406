var express = require('express');
var router = express.Router();

//增加引用函式
const view = require('./utility/view');

//接收GET請求
router.get('/', function (req, res, next) {
    var tampTime = Date.now();
    view.workWithUser(req.cookies.userid).then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.rows.length > 0) {
            var result = SetProjectResult(data, req.cookies.userid);

            res.render('mywork.ejs', { "items": result });  //將資料傳給顯示頁面
            console.log(Date.now() - tampTime);
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
});

function SetProjectResult(data, user_id) {
    var data;
    var result = [];
    var projectId = [];

    for (var i = 0; i < data.rowCount; i++) {
        var project = [];

        if (data.rows[i].first_principal == user_id || data.rows[i].second_principal) {
            //確認project_id不重複
            if (!projectId.includes(data.rows[i].project_id)) {
                projectId.push(data.rows[i].project_id);
                project.push({
                    "project_id": data.rows[i].project_id,
                    "project_name": data.rows[i].project_name,
                    "project_hint": data.rows[i].project_hint
                });
                var listwork = SetListResult(data, data.rows[i].project_id);  //整理列表
                var options = SetOptions(data, data.rows[i].project_id);  //整理列表選項
                result.push({ project, listwork, options });
            }
        }
    }

    return result;
}

function SetOptions(data, project_id) {
    var data;
    var project_id;
    var options = [];
    var id = [];

    for (var i = 0; i < data.rowCount; i++) {           //確認是同一個project
        if (data.rows[i].project_id == project_id) {    //確認list_id不重複
            if (!id.includes(data.rows[i].list_id)) {
                id.push(data.rows[i].list_id);
                options.push({
                    "list_id": data.rows[i].list_id,
                    "list_name": data.rows[i].list_name
                });
            }
        }
    }

    return options;
}

function SetListResult(data, project_id) {
    var data;
    var project_id;
    var result = [];
    var listId = [];

    for (var j = 0; j < data.rowCount; j++) {

        if (data.rows[j].project_id == project_id) {        //確認是同個project
            if (!listId.includes(data.rows[j].list_id)) {   //確認list_id不重複
                if (data.rows[j].work_id != null) {         //確認列表裡有工作
                    listId.push(data.rows[j].list_id);
                    work = SetWorkResult(data, data.rows[j].list_id);
                    result.push({
                        "listwork_serno": data.rows[j].listwork_serno,
                        "list": {
                            "list_id": data.rows[j].list_id,
                            "list_name": data.rows[j].list_name
                        }, work
                    });
                }
            }
        }
    }

    return result;

}

function SetWorkResult(data, list_id) {
    var data;
    var list_id;
    var result = [];
    var workId = [];

    for (var j = 0; j < data.rowCount; j++) {
        if (data.rows[j].list_id == list_id) { //確認同一個list
            if (data.rows[j].work_id != null) {
                workId.push(data.rows[j].work_id);
                result.push({
                    "work_id": data.rows[j].work_id,
                    "work_hint": data.rows[j].work_hint,
                    "work_title": data.rows[j].work_title,
                    "work_content": data.rows[j].work_content,
                    "deadline": data.rows[j].deadline,
                    "tag_id1": data.rows[j].tag_id1,
                    "tagname1": data.rows[j].tagname1,
                    "color1": data.rows[j].color1,
                    "tag_id2": data.rows[j].tag_id2,
                    "tagname2": data.rows[j].tagname2,
                    "color2": data.rows[j].color2,
                    "tag_id3": data.rows[j].tag_id3,
                    "tagname3": data.rows[j].tagname3,
                    "color3": data.rows[j].color3,
                    "tag_id4": data.rows[j].tag_id4,
                    "tagname4": data.rows[j].tagname4,
                    "color4": data.rows[j].color4,
                    "tag_id5": data.rows[j].tag_id5,
                    "tagname5": data.rows[j].tagname5,
                    "color5": data.rows[j].color5,
                    "tag_id6": data.rows[j].tag_id6,
                    "tagname6": data.rows[j].tagname6,
                    "color6": data.rows[j].color6,
                    "file_name": data.rows[j].file_name,
                    "file": data.rows[j].file,
                    "first_principal": data.rows[j].first_principal,
                    "second_principal": data.rows[j].second_principal,
                    "principal_photo1": data.rows[j].principal_photo1,
                    "principal_photo2": data.rows[j].principal_photo2,
                });
            }
        }
    }

    return result;
}

module.exports = router;