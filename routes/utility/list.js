'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


//------------------------------------------
// 用list_id查詢
//------------------------------------------
var fetchList = async function (list_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from list where list_id = $1', [list_id])
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
var addList = async function (list_id, list_name) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('insert into list (list_id, list_name) values ($1, $2)', [list_id, list_name])
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
var deleteList = async function (list_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('delete from list where list_id = $1', [list_id])
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
var updateListName = async function (list_id, list_name) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('update list set list_name = $2 where list_id = $1', [list_id, list_name])
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