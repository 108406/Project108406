var express = require('express');
var router = express.Router();

//增加引用函式
const teammember = require('./utility/teammember');

//更新成員
router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        teammember.updateTeamMember(req.body.user_id, req.cookies.projectid, req.body.group_id, req.body.isAdmin).then(data => {
            if (data) {                
                console.log('更新成員成功')
                return res.status(200).send({
                    message: '更新成員成功'
                });
            } else {
                console.log('更新成員時發生問題')
                return res.status(400).send({
                    message: '更新成員時發生問題'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;