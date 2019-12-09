'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


//------------------------------------------
<<<<<<< HEAD
// 用list_id查詢專案
//------------------------------------------
var fetchProjectListP = async function (list_id) {
=======
// 用list_serno查詢專案
//------------------------------------------
var fetchProjectListP = async function (list_serno) {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query('select * from projectlist where list_id = $1', [list_id])
=======
    await query('select * from projectlist where list_serno = $1', [list_serno])
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows;  //專案列表資料(物件)
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
// 用project_id查詢列表
//------------------------------------------
var fetchProjectListL = async function (project_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from projectlist where project_id = $1', [project_id])
        .then((data) => {
            result = data.rows;  //專案列表資料(物件)
        }, (error) => {
            result = false;  //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------



//------------------------------------------
// 新增專案列表資料
//------------------------------------------
<<<<<<< HEAD
var addProjectList = async function (project_id, list_id) {
=======
var addProjectList = async function (project_id, list_serno) {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query('insert into projectlist (project_id, list_id) values ($1, $2)', [project_id, list_id])
=======
    await query('insert into projectlist (project_id, list_serno) values ($1, $2)', [project_id, list_serno])
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
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
// 刪除專案列表資料
//------------------------------------------
var deleteProjectList = async function (projectlist_serno) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('delete from projectlist where projectlist_serno = $1', [projectlist_serno])
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
module.exports = { fetchProjectListP, fetchProjectListL, addProjectList, deleteProjectList }