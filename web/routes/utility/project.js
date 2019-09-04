'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


//------------------------------------------
// 用project_id查詢
//------------------------------------------
var fetchProject = async function (project_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from project where project_id = $1', [project_id])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows;  //專案資料(物件)
            } else {
                result = false;  //找不到資料
            }
        }, (error) => {
            result = false;  //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------


//------------------------------------------
// 新增專案資料
//------------------------------------------
var addProject = async function (projects) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('insert into project (project_id, project_password, project_name, project_startdate, project_enddate) values ($1, $2, $3, $4, $5)'
        , [projects.project_id, projects.project_password, projects.project_name, projects.project_startdate, projects.project_enddate])
        .then((data) => {
            if (data.rowCount > 0) {
                result = true;  //成功
            } else {
                result = false;
            }
        }, (error) => {
            result = false;  //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------


//------------------------------------------
// 刪除專案資料
//------------------------------------------
var deleteProject = async function (project_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('delete from project where project_id = $1', [project_id])
        .then((data) => {
            if (data.rowCount > 0) {
                result = true;  //成功
            } else {
                result = false;
            }
        }, (error) => {
            result = false;  //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------


//------------------------------------------
// 更改專案
//------------------------------------------
var updateProjectName = async function (project_id, project_name, project_password, project_startdate, project_enddate) {
    //存放結果
    var result = [];
    console.log(project_id + ', ' + project_name + ', ' + project_password + ', ' + project_startdate + ', ' + project_enddate)
    //讀取資料庫
    await query('update project set project_name = $2, project_password = $3, project_startdate = $4, project_enddate = $5 where project_id = $1', [project_id, project_name, project_password, project_startdate, project_enddate])
        .then((data) => {
            if (data.rowCount > 0) {
                result = true;  //成功
            } else {
                result = false;
            }
        }, (error) => {
            result = false;  //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------


//匯入
module.exports = { fetchProject, addProject, deleteProject, updateProjectName }