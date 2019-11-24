var express = require('express');
var router = express.Router();

//增加引用函式
const view = require('./utility/view');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        view.projectWithPrincipal(req.body.project_id, req.cookies.userid).then(data => {
            if (data) {
                if (data.length > 0) {
                    return res.status(200).send({
                        status: 1,
                        message: '還有負責的工作'
                    });
                } else {
                    return res.status(200).send({
                        status: 0,
                        message: '沒有負責的工作'
                    });
                }
            } else {
                return res.status(400).send({
                    message: '查詢有無負責的工作發生錯誤。'
                });
            }
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;