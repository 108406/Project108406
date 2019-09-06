var express = require('express');
var router = express.Router();
//增加引用函式
const work = require('./utility/work');

//接收GET請求
router.post('/', function(req, res, next) {
    work.updateWorkFile(req.body.work_id, req.body.file, req.body.file_name).then(data => {
        if (data) {
            console.log("Successful!");
        }else {
            res.render('notFound');  //導向找不到頁面
        }
    })
});


module.exports = router;