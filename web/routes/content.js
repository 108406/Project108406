var express = require('express');
var router = express.Router();

//增加引用函式
const view = require('./utility/view');
const member = require('./utility/member');
const myFunction = require('./utility/myFunction');

router.get('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        view.projectWithUser(req.cookies.userid).then(data => {
            if (data != false) {
                var result = [];
                for (var s = 0; s < data.rows.length; s++) {
                    var projectStatus = -1;
                    if (myFunction.IsAdateNotArrived(data.rows[s].project_startdate + "", Date())) {
                        projectStatus = 0;
                    } else {
                        if (myFunction.IsAdateNotArrived(data.rows[s].project_enddate + "", Date())) {
                            projectStatus = 1;
                        } else {
                            projectStatus = 2;
                        }
                    }
                    result.push({
                        "project_id": data.rows[s].project_id,
                        "project_name": data.rows[s].project_name,
                        "project_password": data.rows[s].project_password,
                        "project_startdate": myFunction.SeparateDate(data.rows[s].project_startdate),
                        "project_enddate": myFunction.SeparateDate(data.rows[s].project_enddate),
                        "project_status": projectStatus
                    });
                }
                res.render('content.ejs', {
                    items: result,
                    account: req.cookies.userid
                }); //將資料傳給顯示頁面

            } else {
                res.redirect('/login'); //導向錯誤頁面
            }
        })
    } else {
        res.redirect('/login');
    }
});



module.exports = router;