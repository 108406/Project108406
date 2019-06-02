var express = require('express');
var router = express.Router();

//增加引用函式
const project = require('./utility/project');
const projectpermission = require('./utility/projectpermission');
const teammember = require('./utility/teammember');

//接收GET請求
router.post('/', function(req, res, next) {
    var projectId = InisID(8);
    var addProjectData = {project_id : projectId, project_password : req.body.project_password, 
        project_name: req.body.project_name, project_startdate : req.body.project_startdate, project_enddate : req.body.project_enddate};
    project.addProject(addProjectData).then(data => {
        if(data){
            projectpermission.addProjectPermission(projectId, false, false, false, false).then(data => {
                if(data){
                    teammember.addTeamMember('A001', projectId, null, null).then(data => {
                        if (data) {
                            res.render('complete.ejs');  //將資料傳給顯示頁面
                        }else {
                            res.render('notFound');  //導向找不到頁面
                        }
                    })
                    
                }else{
                    res.render('notFound');  //導向找不到頁面
                }  
            })
        }else{
            res.render('notFound');  //導向找不到頁面
        }  
    })

    
});

function InisID(length) {
    var allUpperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var allLowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var allNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    var result = "";

    for (var s = 0; s < length; s++) {
    var type = Math.floor(Math.random() * 3);
        switch(type) {
            case 0:
            result += (allUpperCase[Math.floor(Math.random() * allUpperCase.length)]);
            break;
            case 1:
            result += (allLowerCase[Math.floor(Math.random() * allLowerCase.length)]);
            break;
            default:
            result += (allNumber[Math.floor(Math.random() * allNumber.length)]);
            break;
        }
    }
    return result;
}

module.exports = router;