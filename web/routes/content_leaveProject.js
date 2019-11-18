var express = require('express');
var router = express.Router();

//增加引用函式
const teammember = require('./utility/teammember');
const project = require('./utility/project');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        teammember.displayTeamMember(req.body.project_id).then(data => {
            if (data.length > 1) {
                teammember.deleteTeamMember(req.cookies.userid, req.body.project_id).then(data2 => {
                    if (data2) {
                        console.log('退出計畫成功。')
                        return res.status(200).send({
                            message: '退出計畫成功。'
                        });
                    } else {
                        return res.status(400).send({
                            message: '退出計畫時發生錯誤。'
                        });
                    }
                })
            } else {
                project.deleteProject(req.body.project_id).then(data2 => {
                    if (data2) {
                        console.log('計畫刪除成功。')
                        return res.status(200).send({
                            message: '計畫刪除成功。'
                        });
                    } else {
                        return res.status(400).send({
                            message: '刪除計畫時發生錯誤。'
                        });
                    }
                })
            }
        });

    } else {
        res.redirect('/login');
    }
});

module.exports = router;