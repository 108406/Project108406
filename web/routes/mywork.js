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
            // var result = HandleProjectListWork(data);
            var result = [];
            for (var s = 0; s < data.rows.length; s++) {
                result.push({
                    "member_name": data.rows[s].member_name, 
                    "work_id": data.rows[s].work_id, "work_title": data.rows[s].work_title,
                    "list_id": data.rows[s].list_id, "list_name": data.rows[s].list_name,
                    "project_id": data.rows[s].project_id, "project_name": data.rows[s].project_name
                });
            }
            console.log(result);
            res.render('mywork.ejs', { items: result });  //將資料傳給顯示頁面
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
});

// function HandleProjectListWork(data) {
//     var result = [];
//     for (i = 0; i < data.rows.length; i++) {
//         if (i > 0) {
//             if (data.rows[i].project_id = data.rows[i - 1].project_id) {
//                 if (data.rows[i].list_id = data.rows[i - 1].list_id) {

//                 } else {
//                     return SetListResult(data.rows[i]);
//                 }
//             } else {
//                 return SetProjectResult(data.rows[i]);
//             }
//         }
//     }
// }

// function SetProjectResult(data) {
//     var result = [];
//     result.push({
//         "member_name": data.member_name,
//         "work_id": data.work_id, "work_title": data.work_title,
//         "list_id": data.list_id, "list_name": data.list_name,
//         "project_id": data.project_id, "project_name": data.project_name
//     });
//     return result;
// }

// function SetListResult(data) {
//     var result = [];
//     result.push({
//         "member_name": data.member_name,
//         "work_id": data.work_id, "work_title": data.work_title,
//         "list_id": data.list_id, "list_name": data.list_name,
//         "project_id": null, "project_name": data.project_name
//     });
//     return result;
// }

module.exports = router;