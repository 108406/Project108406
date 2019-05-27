var express = require('express');
var router = express.Router();

//增加引用函式
const projectpermission = require('./utility/projectpermission');
const list = require('./utility/list');
const work = require('./utility/work');
const adminpush = require('./utility/adminpush');
const projectlist = require('./utility/projectlist');
const listwork = require('./utility/listwork');
const teammember = require('./utility/teammember');

router.get('/', function(req, res, next) {
    // console.log(Date.now() * 1000 + Math.floor(Math.random() * 1000));
    projectlist.fetchProjectListL(req.query.project_id).then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else{

            list.fetchList(data[0].list_serno).then(data => {
                console.log(data);

            })

            res.render('project_list_work.ejs', {items:data});
        } 
    })
});

module.exports = router;