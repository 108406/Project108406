var express = require('express');
var router = express.Router();

//增加引用函式
const view = require('./utility/view');

//接收GET請求
router.get('/', function (req, res, next) {
    var tampTime = Date.now();
    view.workWithUser('A001').then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.rows.length > 0) {
            var result = SetProjectResult(data);

            res.render('mywork.ejs', { "items": result });  //將資料傳給顯示頁面
            console.log(Date.now() - tampTime);
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
});

function SetProjectResult(data) {
    var data;
    var result = [];
    var projectId = [];

    for (var i = 0; i < data.rowCount; i++) {
        var project = [];

        //確認project_id不重複
        if (!projectId.includes(data.rows[i].project_id)) {
            projectId.push(data.rows[i].project_id);
            project.push({
                "project_id": data.rows[i].project_id,
                "project_name": data.rows[i].project_name
            });
            var listwork = SetListResult(data, data.rows[i].project_id);  //整理列表
            var options = SetOptions(data, data.rows[i].project_id);  //整理列表選項
            result.push({ project, listwork, options });
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
        var list = [];

        if (data.rows[j].project_id == project_id) {        //確認是同個project
            if (!listId.includes(data.rows[j].list_id)) {   //確認list_id不重複
                if (data.rows[j].work_id != null) {         //確認列表裡有工作
                    listId.push(data.rows[j].list_id);
                    list.push({
                        "listwork_serno": data.rows[j].listwork_serno,
                        "list_id": data.rows[j].list_id,
                        "list_name": data.rows[j].list_name
                    });
                    work = SetWorkResult(data, data.rows[j].list_id);
                    result.push({ list, work });
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
            workId.push(data.rows[j].work_id);
            result.push({
                "work_id": data.rows[j].work_id,
                "work_title": data.rows[j].work_title,
                "work_content": data.rows[j].work_content,
                "deadline": data.rows[j].deadline,
                "tag": data.rows[j].tag,
                "file": data.rows[j].file,
                "first_principal": data.rows[j].first_principal,
                "second_principal": data.rows[j].second_principal
            });
        }
    }

    return result;
}

module.exports = router;