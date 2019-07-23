'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

var projectWithUser = async function (user_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query("select project_id, project_name, project_password, project_startdate, project_enddate from projectwithuser_view where user_id = '" + user_id + "'")
        .then((data) => {
            if (data.rowCount > 0) {
                result = data;  //成功
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

var workWithUser = async function (user_id) {
    //存放結果
    var result = [];

    await query("select member_name, project_id, project_name, list_id, list_name, work_id, work_title, work_content, deadline, tag, file, first_principal, second_principal from mywork_view where user_id = '" + user_id + "'")
        .then((data) => {
            if (data.rowCount > 0) {
                result = data; //成功
            } else {
                result = false;
            }
        }, (error) => {
            result = false; //執行錯誤
            console.log(error);
        });

    //回傳執行結果
    return result;
}

//匯入
module.exports = { projectWithUser, workWithUser }