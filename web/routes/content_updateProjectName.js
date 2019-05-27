var express = require('express');
var router = express.Router();

//增加引用函式
const project = require('./utility/project');

//接收GET請求
router.post('/', function(req, res, next) {
    project.updateProjectName(req.body.project_id, req.body.project_name, req.body.project_password).then(data => {
        if(data==true){
            res.render('complete.ejs');  //將資料傳給顯示頁面
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});

module.exports = router;