var express = require('express');
var router = express.Router();

//增加引用函式
const project = require('./utility/project');
<<<<<<< HEAD
const myFunction = require('./utility/myFunction');

//接收GET請求
router.post('/', function (req, res, next) {
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
=======

//接收GET請求
router.post('/', function(req, res, next) {
    project.updateProjectName(req.body.project_id, req.body.project_name, req.body.project_password).then(data => {
        if(data==true){
            res.render('complete.ejs');  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    })
});

module.exports = router;