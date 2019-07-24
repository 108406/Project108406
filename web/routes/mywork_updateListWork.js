var express = require('express');
var router = express.Router();
//增加引用函式
const listwork = require('./utility/listwork.js');

//接收POST請求
router.post('/', function (req, res, next) {
    listwork.updateListWork('103', req.body.listwork_serno, req.body.list_id).then(data => {
        if (data) {
            console.log("update list Successful!");
            res.render('complete.ejs');
        } else {
            res.render('notFound');  //導向找不到頁面
        }
    })
})

module.exports = router;