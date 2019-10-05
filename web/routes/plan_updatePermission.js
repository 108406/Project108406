var express = require('express');
var router = express.Router();

//增加引用函式
const projectpermission = require('./utility/projectpermission');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        projectpermission.updateProjectPermission(req.body.permission_serno, req.body.listPermission, req.body.addWorkPermission, req.body.editWorkPermission, req.body.deleteWorkPermission).then(data => {
            if (data) {                
                console.log('更新專案權限成功')
                return res.status(200).send({
                    message: '更新專案權限成功'
                });
            } else {
                console.log('更新專案權限時發生問題')
                return res.status(400).send({
                    message: '更新專案權限時發生問題'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;