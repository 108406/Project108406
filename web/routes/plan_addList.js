var express = require('express');
var router = express.Router();

//增加引用函式
const list = require('./utility/list');
const projectlist = require('./utility/projectlist');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        var listId = Date.now() * 1000 + Math.floor(Math.random() * 1000);
        list.addList(listId, req.body.list_name).then(data => {
            if (data) {
                projectlist.addProjectList(req.cookies.projectid, listId).then(data2 => {
                    if (data2) {
                        console.log('列表新增成功。')
                        return res.status(200).send({
                            message: '列表新增成功。',
                            list_id: listId
                        });
                    } else {
                        return res.status(400).send({
                            message: '新增專案列表時發生錯誤。'
                        });
                    }
                })
            } else {
                console.log('新增列表時發生錯誤。')
                return res.status(400).send({
                    message: '新增列表時發生錯誤。'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;