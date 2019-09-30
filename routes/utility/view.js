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

var workWithUser = async function (user_id) {
    //存放結果
    var result = [];
    await query("select member_name, project_id, project_name, project_hint, listwork_serno, list_id, list_name, work_id, work_title, work_content, deadline, tag_id1, tagname1, color1, tag_id2, tagname2, color2, tag_id3, tagname3, color3, tag_id4, tagname4, color4, tag_id5, tagname5, color5, tag_id6, tagname6, color6, file_name, file, first_principal, second_principal, principal_photo1, principal_photo2, work_hint from mywork_view where user_id = '" + user_id + "'")
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
module.exports = { projectWithUser, projectAllData, workWithUser }