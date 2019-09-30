'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


//------------------------------------------
// 用work_serno查詢
//------------------------------------------
var displayTag = async function (project_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('select * from tag where project_id = $1', [project_id])
        .then((data) => {
            result = data.rows; //專案資料(物件)
        }, (error) => {
            result = null; //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------

//------------------------------------------
// 更改工作內容
//------------------------------------------
var updateTag = async function (tag_id, tagname) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('update tag set tagname = $2 where tag_id = $1', [tag_id, tagname])
        .then((data) => {
            if (data.rowCount > 0) {
                result = true; //成功
            } else {
                result = false;
            }
        }, (error) => {
            result = false; //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------


//------------------------------------------
// 更改工作內容
//------------------------------------------
var addTag = async function (tag_id, project_id, tagname, color) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query('insert into tag (tag_id, project_id, tagname, color) values ($1, $2, $3, $4)', [tag_id, project_id, tagname, color])
        .then((data) => {
            if (data.rowCount > 0) {
                result = true; //成功
            } else {
                result = false;
            }
        }, (error) => {
            result = false; //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------


//匯入
module.exports = {displayTag, updateTag, addTag}