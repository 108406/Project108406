var express = require('express');
var router = express.Router();
//增加引用函式
const work = require('./utility/work');

//接收GET請求
router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        work.updateWorkFile(req.body.work_id, req.body.file, req.body.file_name).then(data => {
            console.log(data);
            if (data) {
                console.log('success');
                return res.status(200).send({
                    message: '上傳檔案成功。'
                });
            } else {
                console.log('上傳檔案時發生錯誤。')
                return res.status(400).send({
                    message: '上傳檔案時發生錯誤。'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});


module.exports = router;