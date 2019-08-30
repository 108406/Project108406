var express = require('express');
var router = express.Router();
//增加引用函式
const projecthint = require('./utility/projecthint.js');

//接收POST請求
router.post('/', function (req, res, next) {
    projecthint.updateProjectHint('A001', req.body.project_id, req.body.project_hint).then(data => {
        if (data) {
            console.log("update projecthint Successful!");
            res.render('complete.ejs');
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
})

module.exports = router;