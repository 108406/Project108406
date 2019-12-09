'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


//------------------------------------------
// 用project_id查詢成員
//------------------------------------------
var displayTeamMember = async function (project_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from teammember where project_id = $1', [project_id])
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

<<<<<<< HEAD
//------------------------------------------
// 用project_id查詢成員
//------------------------------------------
var VerificationTeamMember = async function (user_id, project_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from teammember where user_id = $1 and project_id = $2', [user_id, project_id])
        .then((data) => {
            if (data.rows.length > 0) {
                result = true;  //專案資料(物件)
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

=======
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52

//------------------------------------------
// 用user_id顯示MyProject
//------------------------------------------
var displayMyProject = async function (user_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from teammember where user_id = $1', [user_id])
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
// 新增成員
//------------------------------------------
var addTeamMember = async function (user_id, project_id, group_id, isadmin) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('insert into teammember (user_id, project_id, group_id, isadmin) values ($1, $2, $3, $4)', [user_id, project_id, group_id, isadmin])
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
// 刪除成員資料
//------------------------------------------
<<<<<<< HEAD
var deleteTeamMember = async function (user_id, project_id) {
=======
var deleteTeamMember = async function (teammember_serno) {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query('delete from teammember where user_id = $1 and project_id = $2', [user_id, project_id])
=======
    await query('delete from teammember where teammember_serno = $1', [teammember_serno])
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
// 更改工作內容
//------------------------------------------
var updateTeamMember = async function (user_id, project_id, group_id, isadmin) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('update teammember set group_id = $3, isadmin = $4 where user_id = $1 and project_id = $2', [user_id, project_id, group_id, isadmin])
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
<<<<<<< HEAD
module.exports = { displayTeamMember, VerificationTeamMember, displayMyProject, addTeamMember, deleteTeamMember, updateTeamMember }
=======
module.exports = { displayTeamMember, displayMyProject, addTeamMember, deleteTeamMember, updateTeamMember }
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
