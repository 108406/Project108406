var express = require('express');
var router = express.Router();

//增加引用函式
const teammember = require('./utility/teammember');

//刪除成員
router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        teammember.deleteTeamMember(req.body.user_id, req.cookies.projectid).then(data => {
            if (data) {
                console.log('成員刪除成功。')
                return res.status(200).send({
                    message: '成員刪除成功。'
                });
            } else {
                return res.status(400).send({
                    message: '刪除成員時發生錯誤。'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;