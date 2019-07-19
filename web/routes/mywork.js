var express = require('express');
var router = express.Router();

//增加引用函式
const view = require('./utility/view');

//接收GET請求
router.get('/', function (req, res, next) {
    view.workWithUser('A001').then(data => {
        if (data == null) {
            res.render('error');  //導向錯誤頁面
        } else if (data.rows.length > 0) {
            var result = SetProjectResult(data);

            console.log(result);
            console.log(result[0].options);

            // res.render('mywork.ejs', { "items": result });  //將資料傳給顯示頁面
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

        if (!projectId.includes(data.rows[i].project_id)) {
            projectId.push(data.rows[i].project_id);
            project.push({
                "project_id": data.rows[i].project_id,
                "project_name": data.rows[i].project_name
            });
            var listwork = SetListResult(data, project);
            var options = SetOptions(project);
            result.push({ project, listwork, options });
        }
    }

    return result;
}

function SetOptions(project) {
    var project;
    var options = [];

    for (var i = 0; i < project.length; i++) {
        view.listWithProject(project[i].project_id).then(data => {
            if (data == null) {
                console.log(error);
            } else if (data.rowCount > 0) {
                var Name = [];

                for (var l = 0; l < data.rowCount; l++) {
                    if (!Name.includes(data.rows[l].list_name)) {
                        options.push(data.rows[l].list_name);
                    }
                }

                console.log("222" + options);
            } else {
                console.log('notFound');
            }
        })
    }

    return options;
}

function SetListResult(data, project) {
    var data;
    var project;
    var result = [];
    var listId = [];

    for (var i = 0; i < project.length; i++) {
        for (var j = 0; j < data.rowCount; j++) {
            var list = [];

            if (data.rows[j].project_id == project[i].project_id) {
                if (!listId.includes(data.rows[j].list_id)) {
                    listId.push(data.rows[j].list_id);
                    list.push({
                        "list_id": data.rows[j].list_id,
                        "list_name": data.rows[j].list_name
                    });
                    work = SetWorkResult(data, list);
                    result.push({ list, work });
                }
            }
        }
    }

    return result;

}

function SetWorkResult(data, list) {
    var data;
    var list;
    var result = [];
    var workId = [];

    for (var i = 0; i < list.length; i++) {
        for (j = 0; j < data.rowCount; j++) {
            if (data.rows[j].list_id == list[i].list_id) {
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
    }

    return result;
}

module.exports = router;