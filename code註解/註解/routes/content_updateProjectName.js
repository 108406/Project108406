var express = require('express');
var router = express.Router();

//增加引用函式
const project = require('./utility/project');
const myFunction = require('./utility/myFunction');

//接收POST請求
router.post('/', function (req, res, next) {
    // 從表單中獲取更新計畫的資料內容並更新計畫
    project.updateProjectName(req.body.project_id, req.body.project_name, req.body.project_password, req.body.project_startdate, req.body.project_enddate).then(data => {
        if (data == true) {
            startDate = new Date(req.body.project_startdate);
            endDate = new Date(req.body.project_enddate);
            projectNewStatus = -1;
            if (myFunction.IsAdateNotArrived(startDate + "", Date())) {
                projectNewStatus = 0;
            } else {
                if (myFunction.IsAdateNotArrived(endDate + "", Date())) {
                    projectNewStatus = 1;
                } else {
                    projectNewStatus = 2;
                }
            }
            res.send({
                'status': 'success!',
                'projectStatus' : projectNewStatus,
                "project_startdate": myFunction.SeparateDate(startDate),
                "project_enddate": myFunction.SeparateDate(endDate)                
            })
        } else {
            res.send({
                'status': 'failed!'
            })
        }
    })
});

module.exports = router;