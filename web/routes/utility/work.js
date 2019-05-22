'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


//------------------------------------------
// 用work_serno查詢
//------------------------------------------
var displayWork = async function (work_serno) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from work where work_serno = $1', [work_serno])
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
// 用work_serno顯示work_title
//------------------------------------------
var displayWorkTitle = async function (work_serno) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from work where work_serno = $1', [work_serno])
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
// 新增工作資料
//------------------------------------------
var addWork = async function (work_add) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('insert into work (work_title, work_content, deadline, tag, file, first_principal, second_principal) values ($1, $2, $3, $4, $5, $6, $7)'
    , [work_add.work_title, work_add.work_content, work_add.deadline, work_add.tag, work_add.file, work_add.first_principal, work_add.second_principal])
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
// 刪除工作資料
//------------------------------------------
var deleteWork = async function (work_serno) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('delete from work where work_serno = $1', [work_serno])
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
var updateWork = async function (work_update) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('update work set work_title = $2, work_content = $3, deadline = $4, tag = $5, file = $6, first_principal = $7, second_principal = $8 where work_serno = $1'
    , [work_update.work_serno, work_update.work_title, work_update.work_content, work_update.deadline, work_update.tag, work_update.file, work_update.first_principal, work_update.second_principal])
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
// 用work_serno查詢
//------------------------------------------
var displayWrokPrincipal = async function (work_serno) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from work where work_serno = $1', [work_serno])
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
// 用user_id查詢
//------------------------------------------
var displayMyWork = async function (user_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from work where first_principal = $1 or second_principal = $1', [user_id])
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


//匯入
module.exports = { displayWork, displayWorkTitle, addWork, deleteWork, updateWork, displayWrokPrincipal, displayMyWork }