'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

var projectWithUser = async function (user_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query("select project_id, project_name, project_password, project_startdate, project_enddate from projectwithuser_view where user_id = '" + user_id + "'")
        .then((data) => {
            result = data;  //成功
        }, (error) => {
            result = false;  //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------

var projectAllData = async function (project_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query("select * from project_view where project_id = '" + project_id + "'")
        .then((data) => {
            result = data.rows;  //成功
            // console.log(data.rows);
        }, (error) => {
            result = 'failed';  //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------

//匯入
module.exports = { projectWithUser, projectAllData }