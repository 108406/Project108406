var express = require('express');
var router = express.Router();

//增加引用函式
const teammember = require('./utility/teammember');
const project = require('./utility/project');

//接收GET請求
router.get('/', function(req, res, next) {
    teammember.displayMyProject('A001').then(data => {
        if(data==null){
            res.render('error');  //導向錯誤頁面
        }else if(data.length > 0){ 
            var newData = [];
            for (var i = 0; i < data.length; i ++) {
                project.fetchProject(data[i].project_id).then(data2 => {
                    if(data2==null){
                        res.render('error');  //導向錯誤頁面
                    }else if(data2.length > 0){
                        newData.push([data2[0].project_id, data2[0].project_name, data2[0].project_password, data2[0].project_startdate, data2[0].project_enddate]);
                        if (newData.length == data.length) {
                            newData.sort();
                            var result = [];
                            for (var s = 0 ; s < newData.length; s ++) {
                                var projectStatus = -1;
                                if (IsAdateNotArrived(newData[s][3] + "", Date())) {
                                    projectStatus = 0;
                                } else {
                                    if (IsAdateNotArrived(newData[s][4] + "", Date())) {
                                        projectStatus = 1;
                                    } else {
                                        projectStatus = 2;
                                    }
                                }
                                result.push({"project_id" : newData[s][0], "project_name" : newData[s][1], "project_password" : newData[s][2],
                                    "project_startdate" : newData[s][3], "project_enddate" : newData[s][4],
                                    "project_status" : projectStatus});
                            }

                            // console.log(result[0].project_startdate + " > " + Date() + ", " + (result[0].project_startdate + "" > Date()));
                            res.render('content.ejs', {items:result});  //將資料傳給顯示頁面
                        }
                        
                    }else{
                        res.render('notFound');  //導向找不到頁面
                    }  
                })
            }
            return data;
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })
});


function IsAdateNotArrived(date1, date2) {
    date1 = SeparateDate(date1);
    date2 = SeparateDate(date2);
    for (var i = 0; i < 6; i ++) {
        if (date1[i] > date2[i]){
            return true;
        } else if (date1[i] < date2[i]) {
            return false;
        }
    }    
    return false;
}
//Sun May 26 2019 18:41:17 GMT+0800 (GMT+08:00)
function SeparateDate(date) {
    var result = [6];
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];  
    date = date.substring(4, date.length);
    for (var i = 0; i < month.length; i ++) {
        if (date.substring(0,3).toLowerCase() == month[i].toLowerCase()) {
            result[1] = i + 1;
        }
    }  
    date = date.substring(4, date.length);
    result[2] = +date.substring(0,2);
    date = date.substring(3, date.length);
    result[0] = +date.substring(0,4);
    date = date.substring(5, date.length);
    result[3] = +date.substring(0,2);
    date = date.substring(3, date.length);
    result[4] = +date.substring(0,2);
    date = date.substring(3, date.length);
    result[5] = +date.substring(0,2);

    return result;
}

module.exports = router;