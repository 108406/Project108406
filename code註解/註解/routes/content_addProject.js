var express = require('express');
var router = express.Router();

//增加引用函式
const project = require('./utility/project');
const projecthint = require('./utility/projecthint');
const projectpermission = require('./utility/projectpermission');
const teammember = require('./utility/teammember');
const list = require('./utility/list');
const tag = require('./utility/tag');
const projectlist = require('./utility/projectlist');
const myfunction = require('./utility/myFunction');

//接收POST請求
router.post('/', function (req, res, next) {
    if (req.cookies.userid != undefined) {
        var projectId = InisID(8);
        var tempStartdate = '';
        var tempEnddate = '';
        if (req.body.project_startdate == "") {
            tempStartdate += myfunction.SeparateDate(Date())[0] + '-';
            tempStartdate += (myfunction.SeparateDate(Date())[1] < 10) ? ('0' + myfunction.SeparateDate(Date())[1]) : (myfunction.SeparateDate(Date())[1]);
            tempStartdate += '-';
            tempStartdate += (myfunction.SeparateDate(Date())[2] < 10) ? ('0' + myfunction.SeparateDate(Date())[2]) : (myfunction.SeparateDate(Date())[2]) + 'T';
            tempStartdate += (myfunction.SeparateDate(Date())[3] < 10) ? ('0' + myfunction.SeparateDate(Date())[3]) : (myfunction.SeparateDate(Date())[3]) + ':';
            tempStartdate += (myfunction.SeparateDate(Date())[4] < 10) ? ('0' + myfunction.SeparateDate(Date())[4]) : (myfunction.SeparateDate(Date())[4]);
        } else {
            tempStartdate = req.body.project_startdate;
        }
        if (req.body.project_enddate == "") {
            tempEnddate += (myfunction.SeparateDate(Date())[0] + 100) + '-';
            tempEnddate += (myfunction.SeparateDate(Date())[1] < 10) ? ('0' + myfunction.SeparateDate(Date())[1]) : (myfunction.SeparateDate(Date())[1]);
            tempEnddate += '-';
            tempEnddate += (myfunction.SeparateDate(Date())[2] < 10) ? ('0' + myfunction.SeparateDate(Date())[2]) : (myfunction.SeparateDate(Date())[2]) + 'T';
            tempEnddate += (myfunction.SeparateDate(Date())[3] < 10) ? ('0' + myfunction.SeparateDate(Date())[3]) : (myfunction.SeparateDate(Date())[3]) + ':';
            tempEnddate += (myfunction.SeparateDate(Date())[4] < 10) ? ('0' + myfunction.SeparateDate(Date())[4]) : (myfunction.SeparateDate(Date())[4]);
        } else {
            tempEnddate = req.body.project_enddate;
        }
        var addProjectData = {
            project_id: projectId,
            project_password: req.body.project_password,
            project_name: req.body.project_name,
            project_startdate: tempStartdate,
            project_enddate: tempEnddate
        };

        // 新增計畫
        project.addProject(addProjectData).then(data => {
            if (data) {
                projectpermission.addProjectPermission(projectId, false, false, false, false).then(data => {
                    if (data) {
                        teammember.addTeamMember(req.cookies.userid, projectId, null, true).then(data => {
                            if (data) {
                                var listId = Date.now() * 1000 + Math.floor(Math.random() * 1000);
                                list.addList(listId, '列表標題').then(data => {
                                    if (data) {
                                        projectlist.addProjectList(projectId, listId).then(data => {
                                            if (data) {
                                                projecthint.addProjectHint(req.cookies.userid, projectId, true).then(data2 => {
                                                    if (data2) {
                                                        InitTagsInProject(projectId).then(data => {
                                                            if (data) {
                                                                return res.status(200).send({
                                                                    message: '更新成員成功'
                                                                });
                                                            }
                                                        })
                                                    }
                                                });
                                            }
                                        })
                                    }
                                })
                            } else {
                                res.redirect('/login'); //導向login頁面
                            }
                        })

                    } else {
                        res.redirect('/login'); //導向login頁面
                    }
                })
            } else {
                res.redirect('/login'); //導向login頁面
            }
        })
    } else {
        res.redirect('/login');
    }

});

//自動產生project ID
function InisID(length) {
    var allUpperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var allLowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var allNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    var result = "";

    for (var s = 0; s < length; s++) {
        var type = Math.floor(Math.random() * 3);
        switch (type) {
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

//新增計畫的預設標籤
var InitTagsInProject = async function (project_id) {
    let tag_id;

    tag_id = Date.now() * 1000 + Math.floor(Math.random() * 1000);
    tag.addTag(tag_id, project_id, '', '#61BD4F').then(data => {
        if (!data) {
            console.log('建立標籤時發生問題');
            return res.status(400).send({
                message: '建立標籤時發生問題'
            });
        }
    })

    tag_id = Date.now() * 1000 + Math.floor(Math.random() * 1000);
    tag.addTag(tag_id, project_id, '', '#F2D600').then(data => {
        if (!data) {
            console.log('建立標籤時發生問題');
            return res.status(400).send({
                message: '建立標籤時發生問題'
            });
        }
    })

    tag_id = Date.now() * 1000 + Math.floor(Math.random() * 1000);
    tag.addTag(tag_id, project_id, '', '#FF9F1A').then(data => {
        if (!data) {
            console.log('建立標籤時發生問題');
            return res.status(400).send({
                message: '建立標籤時發生問題'
            });
        }
    })

    tag_id = Date.now() * 1000 + Math.floor(Math.random() * 1000);
    tag.addTag(tag_id, project_id, '', '#EB5A46').then(data => {
        if (!data) {
            console.log('建立標籤時發生問題');
            return res.status(400).send({
                message: '建立標籤時發生問題'
            });
        }
    })

    tag_id = Date.now() * 1000 + Math.floor(Math.random() * 1000);
    tag.addTag(tag_id, project_id, '', '#C377E0').then(data => {
        if (!data) {
            console.log('建立標籤時發生問題');
            return res.status(400).send({
                message: '建立標籤時發生問題'
            });
        }
    })

    tag_id = Date.now() * 1000 + Math.floor(Math.random() * 1000);
    tag.addTag(tag_id, project_id, '', '#0079BF').then(data => {
        if (!data) {
            console.log('建立標籤時發生問題');
            return res.status(400).send({
                message: '建立標籤時發生問題'
            });
        }
    })
    return true;
}

module.exports = router;