var express = require('express');
var router = express.Router();

//增加引用函式
const project = require('./utility/project');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        project.fetchProject(req.body.projectId).then(data => {
            if (data) {
                return res.status(200).send({
                    found: true,
                    data: data
                });
            } else {
                return res.status(200).send({
                    found: false
                });
            }
        })
    } else {
        res.redirect('login');
    }
});

module.exports = router;