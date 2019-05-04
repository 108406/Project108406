'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


//------------------------------------------
// 用work_serno查詢專案
//------------------------------------------
var fetchListWorkL = async function (work_serno) {
    //存放結果
    let result;

    //讀取資料庫
    await query('select * from listwork where work_serno = $1', [work_serno])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows[0];  //專案列表資料(物件)
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
// 用list_serno查詢工作
//------------------------------------------
var fetchListWorkW = async function (list_serno) {
    //存放結果
    let result;

    //讀取資料庫
    await query('select * from listwork where list_serno = $1', [list_serno])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows[0];  //專案列表資料(物件)
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
var addListWork = async function (list_serno, work_serno) {
    //存放結果
    let result;

    //讀取資料庫
    await query('insert into listwork (list_serno, work_serno) values ($1, $2)', [list_serno, work_serno])
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
var deleteListWork = async function (listwork_serno) {
    //存放結果
    let result;

    //讀取資料庫
    await query('delete from listwork where listwork_serno = $1', [listwork_serno])
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
module.exports = { fetchListWorkL, fetchListWorkW, addListWork, deleteListWork }