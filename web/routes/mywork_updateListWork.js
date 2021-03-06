var express = require('express');
var router = express.Router();
//增加引用函式
const listwork = require('./utility/listwork.js');

//接收POST請求
router.post('/', function (req, res, next) {
    listwork.updateListWork(req.body.listwork_serno, req.body.list_id).then(data => {
        if (data) {
            res.render('complete.ejs');
        } else {
            res.redirect('/login');  //導向找不到頁面
        }
    })
})

module.exports = router;