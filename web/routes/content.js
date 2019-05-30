var express = require('express');
var router = express.Router();

//增加引用函式
const view = require('./utility/view');
const member = require('./utility/member');
const myFunction = require('./utility/myFunction');

//接收GET請求
router.post('/', function(req, res, next) {
    if (req.query.userid == undefined) {
        member.tempIdentityCertification(req.body.account, req.body.password).then(data => {
            if (data) {
                view.projectWithUser(req.body.account).then(data => {
                    if(data != false){
                        var result = [];
                        for (var s = 0; s < data.rows.length; s++) {
                            var projectStatus = -1;
                            if (IsAdateNotArrived(data.rows[s].project_startdate + "", Date())) {
                                projectStatus = 0;
                            } else {
                                if (IsAdateNotArrived(data.rows[s].project_enddate + "", Date())) {
                                    projectStatus = 1;
                                } else {
                                    projectStatus = 2;
                                }
                            }
                            result.push({"project_id" : data.rows[s].project_id, "project_name" : data.rows[s].project_name, "project_password" : data.rows[s].project_password,
                                "project_startdate" : data.rows[s].project_startdate, "project_enddate" : data.rows[s].project_enddate,
                                "project_status" : projectStatus});
                        }
                        
                        res.render('content.ejs', {items:result, account : req.body.account});  //將資料傳給顯示頁面
                        
                    }else{
                        res.render('error');  //導向錯誤頁面
                    }  
                })
            } else {
                res.render('login.ejs', {text: "block"});  //導向找不到頁面
            }
        })
    }
});

router.get('/', function(req, res, next) {
    if (req.query.userid != undefined) {
        view.projectWithUser(req.query.userid).then(data => {
            if(data != false){
                var result = [];
                for (var s = 0; s < data.rows.length; s++) {
                    var projectStatus = -1;
                    if (IsAdateNotArrived(data.rows[s].project_startdate + "", Date())) {
                        projectStatus = 0;
                    } else {
                        if (IsAdateNotArrived(data.rows[s].project_enddate + "", Date())) {
                            projectStatus = 1;
                        } else {
                            projectStatus = 2;
                        }
                    }
                    result.push({"project_id" : data.rows[s].project_id, "project_name" : data.rows[s].project_name, "project_password" : data.rows[s].project_password,
                        "project_startdate" : data.rows[s].project_startdate, "project_enddate" : data.rows[s].project_enddate,
                        "project_status" : projectStatus});
                }
                
                res.render('content.ejs', {items:result, account : req.query.userid});  //將資料傳給顯示頁面
                
            }else{
                res.render('error');  //導向錯誤頁面
            }  
        })
    } else {
        res.render('login.ejs', {text: "block"});  //導向找不到頁面
    }
});

function IsAdateNotArrived(date1, date2) {
    date1 = myFunction.SeparateDate(date1);
    date2 = myFunction.SeparateDate(date2);
    for (var i = 0; i < 6; i ++) {
        if (date1[i] > date2[i]){
            return true;
        } else if (date1[i] < date2[i]) {
            return false;
        }
    }    
    return false;
}

module.exports = router;