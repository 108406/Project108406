'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


//------------------------------------------
// 用work_id查詢
//------------------------------------------
var displayWork = async function (work_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from work where work_id = $1', [work_id])
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
// 用work_id顯示work_title
//------------------------------------------
var displayWorkTitle = async function (work_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from work where work_id = $1', [work_id])
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
var deleteWork = async function (work_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('delete from work where work_id = $1', [work_id])
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
    await query('update work set work_title = $2, work_content = $3, deadline = $4, tag_id1 = $5, tag_id2 = $6, tag_id3 = $7, tag_id4 = $8, tag_id5 = $9, tag_id6 = $10, file = $11, file_name = $12, first_principal = $13, second_principal = $14 where work_id = $1'
    , [work_update.work_id, work_update.work_title, work_update.work_content, work_update.deadline, work_update.tag_id1, work_update.tag_id2, work_update.tag_id3, work_update.tag_id4, work_update.tag_id5, work_update.tag_id6, work_update.file, work_update.file_name, work_update.first_principal, work_update.second_principal])
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
// 用work_id查詢
//------------------------------------------
var displayWrokPrincipal = async function (work_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from work where work_id = $1', [work_id])
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


//------------------------------------------
// 更改工作檔案
//------------------------------------------
var updateWorkFile = async function (work_id, file, file_name) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('update work set file = $2, file_name = $3 where work_id = $1'
    , [work_id, file, file_name])
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
module.exports = { displayWork, displayWorkTitle, addWork, deleteWork, updateWork, displayWrokPrincipal, displayMyWork, updateWorkFile }