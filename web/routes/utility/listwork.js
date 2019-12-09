'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


//------------------------------------------
<<<<<<< HEAD
// 用work_id查詢專案
//------------------------------------------
var fetchListWorkL = async function (work_id) {
=======
// 用work_serno查詢專案
//------------------------------------------
var fetchListWorkL = async function (work_serno) {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query('select * from listwork where work_id = $1', [work_id])
=======
    await query('select * from listwork where work_serno = $1', [work_serno])
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
<<<<<<< HEAD
// 用list_id查詢工作
//------------------------------------------
var fetchListWorkW = async function (list_id) {
=======
// 用list_serno查詢工作
//------------------------------------------
var fetchListWorkW = async function (list_serno) {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query('select * from listwork where list_id = $1', [list_id])
=======
    await query('select * from listwork where list_serno = $1', [list_serno])
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
// 新增列表工作資料
//------------------------------------------
<<<<<<< HEAD
var addListWork = async function (list_id, work_id) {
=======
var addListWork = async function (list_serno, work_serno) {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query('insert into listwork (list_id, work_id) values ($1, $2)', [list_id, work_id])
=======
    await query('insert into listwork (list_serno, work_serno) values ($1, $2)', [list_serno, work_serno])
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
<<<<<<< HEAD
var deleteListWork = async function (list_id, work_id) {
=======
var deleteListWork = async function (listwork_serno) {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query('delete from listwork where list_id = $1 and work_id = $2', [list_id, work_id])
=======
    await query('delete from listwork where listwork_serno = $1', [listwork_serno])
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


<<<<<<< HEAD
//------------------------------------------
// 更改列表工作
//------------------------------------------
var updateListWork = async function (listwork_serno, list_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('update listwork set list_id = $2 where listwork_serno = $1', [listwork_serno, list_id])
        .then((data) => {
            if (data.rowCount > 0) {
                result = true;
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
module.exports = { fetchListWorkL, fetchListWorkW, addListWork, deleteListWork, updateListWork }
=======
//匯入
module.exports = { fetchListWorkL, fetchListWorkW, addListWork, deleteListWork }
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
