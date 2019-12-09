'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


//------------------------------------------
<<<<<<< HEAD
// 用list_id查詢
//------------------------------------------
var fetchList = async function (list_id) {
=======
// 用list_serno查詢
//------------------------------------------
var fetchList = async function (list_serno) {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query('select * from list where list_id = $1', [list_id])
=======
    await query('select * from list where list_serno = $1', [list_serno])
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
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
// 新增列表資料
//------------------------------------------
<<<<<<< HEAD
var addList = async function (list_id, list_name) {
=======
var addList = async function (list_name) {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query('insert into list (list_id, list_name) values ($1, $2)', [list_id, list_name])
=======
    await query('insert into list (list_name) values ($1)', [list_name])
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
// 刪除列表資料
//------------------------------------------
<<<<<<< HEAD
var deleteList = async function (list_id) {
=======
var deleteList = async function (list_serno) {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query('delete from list where list_id = $1', [list_id])
=======
    await query('delete from list where list_serno = $1', [list_serno])
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
// 更改列表名稱
//------------------------------------------
<<<<<<< HEAD
var updateListName = async function (list_id, list_name) {
=======
var updateListName = async function (list_serno, list_name) {
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query('update list set list_name = $2 where list_id = $1', [list_id, list_name])
=======
    await query('update list set list_name = $2 where list_serno = $1', [list_serno, list_name])
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


//匯入
module.exports = { fetchList, addList, deleteList, updateListName }