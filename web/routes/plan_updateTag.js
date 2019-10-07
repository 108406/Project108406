var express = require('express');
var router = express.Router();

//增加引用函式
const tag = require('./utility/tag');

router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        tag.updateTag(req.body.tag_id, req.body.tagname).then(data => {
            if (data) {                
                console.log('更新標籤成功')
                return res.status(200).send({
                    message: '更新標籤成功',
                    tag_id : tag_id
                });
            } else {
                console.log('更新標籤時發生問題')
                return res.status(400).send({
                    message: '更新標籤時發生問題'
                });
            }
        })
    } else {
        res.redirect('/login');
    }
});

module.exports = router;