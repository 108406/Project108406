var express = require('express');
var router = express.Router();

//增加引用函式
const project = require('./utility/project');
const projecthint = require('./utility/projecthint');
const teammember = require('./utility/teammember');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        project.VerificationProject(req.body.projectId, req.body.projectPassword).then(data => {
            if (data) {
                teammember.VerificationTeamMember(req.cookies.userid, req.body.projectId).then(result => {
                    if (!result) {
                        teammember.addTeamMember(req.cookies.userid, req.body.projectId, null, false).then(data2 => {
                            projecthint.addProjectHint(req.cookies.userid, req.body.projectId, true).then(data2 => {
                                return res.status(200).send({
                                    success: true,
                                });
                            });
                        });
                    } else {
                        return res.status(200).send({
                            success: false,
                            message: '計畫內已有資料'
                        });
                    }
                });
            } else {
                return res.status(200).send({
                    success: false,
                    message: '計畫密碼錯誤'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;