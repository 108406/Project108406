'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');

var projectWithUser = async function (user_id) {
    //存放結果
    var result = [];

    //讀取資料庫
<<<<<<< HEAD
    await query("select project_id, project_name, project_password, project_startdate, project_enddate, isadmin from projectwithuser_view where user_id = '" + user_id + "'")
        .then((data) => {
            result = data; //成功
        }, (error) => {
            result = false; //執行錯誤
=======
    await query("select project_id, project_name, project_password, project_startdate, project_enddate from projectwithuser_view where user_id = '" + user_id + "'")
        .then((data) => {
            result = data;  //成功
        }, (error) => {
            result = false;  //執行錯誤
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------

<<<<<<< HEAD
var projectWithPrincipal = async function (project_id, user_id) {
    //存放結果
    var result = [];
    //讀取資料庫
    await query("select project_id, user_id, first_principal, second_principal from mywork_view where project_id = '" + project_id + "' and user_id = '" + user_id + "' and (user_id = first_principal or user_id = second_principal)")
        .then((data) => {
            result = data.rows; //成功
        }, (error) => {
            result = 'failed'; //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}

var projectAllData = async function (project_id) {
    //存放結果
    var result = [];
    //讀取資料庫
    await query("select * from project_view where project_id = '" + project_id + "'")
        .then((data) => {
            result = data.rows; //成功
            // console.log(data.rows);
        }, (error) => {
            result = 'failed'; //執行錯誤
=======
var projectAllData = async function (project_id) {
    //存放結果
    var result = [];

    //讀取資料庫
    await query("select * from project_view where project_id = '" + project_id + "'")
        .then((data) => {
            result = data.rows;  //成功
        }, (error) => {
            result = false;  //執行錯誤
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
            console.log(error)
        });

    //回傳執行結果
    return result;
}
//------------------------------------------

<<<<<<< HEAD
var workWithUser = async function (user_id) {
    //存放結果
    var result = [];
    await query("select member_name, project_id, project_name, project_hint, listwork_serno, list_id, list_name, work_id, work_title, work_content, deadline, tag_id1, tagname1, color1, tag_id2, tagname2, color2, tag_id3, tagname3, color3, tag_id4, tagname4, color4, tag_id5, tagname5, color5, tag_id6, tagname6, color6, file_name, file, first_principal, second_principal, principal_photo1, principal_photo2, work_hint from mywork_view where user_id = '" + user_id + "' and project_enddate > now()")
        .then((data) => {
            result = data; //成功
        }, (error) => {
            result = false; //執行錯誤
            console.log(error);
        });

    //回傳執行結果
    return result;
}

var myWorkAllData = async function () {
    //存放結果
    var result = [];
    //讀取資料庫
    await query("select * from mywork_view")
        .then((data) => {
            result = data.rows; //成功
            // console.log(data.rows);
        }, (error) => {
            result = 'failed'; //執行錯誤
            console.log(error)
        });

    //回傳執行結果
    return result;
}


//匯入
module.exports = {
    projectWithUser,
    projectWithPrincipal,
    projectAllData,
    workWithUser,
    myWorkAllData
}
=======
//匯入
module.exports = { projectWithUser, projectAllData }
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
