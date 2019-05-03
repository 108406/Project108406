'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');


//------------------------------------------
// 顯示projectpermission
//------------------------------------------
var displayProjectPermission = async function (projectpermission_serno) {
    //存放結果
    let result;

    //讀取資料庫
    await query('select * from projectpermission where projectpermission_serno = $1', [projectpermission_serno])
        .then((data) => {
            if (data.rows.length > 0) {
                result = data.rows[0];  //專案資料(物件)
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
// 新增專案權限
//------------------------------------------
var addProjectPermission = async function (listpermission, addwork, editwork, deletework) {
    //存放結果
    let result;

    //讀取資料庫
    await query('insert into projectpermission (list_permission, add_work, edit_work, delete_work) values ($1, $2, $3, $4)', [listpermission, addwork, editwork, deletework])
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
// 刪除專案權限
//------------------------------------------
var deleteProjectPermission = async function (serno) {
    //存放結果
    let result;

    //讀取資料庫
    await query('delete from projectpermission where projectpermission_serno = $1', [serno])
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
// 更改專案權限
//------------------------------------------
var updateProjectPermission = async function (serno, listpermission, addwork, editwork, deletework) {
    //存放結果
    let result;

    //讀取資料庫
    await query('update projectpermission set list_permission  = $2, add_work = $3, edit_work = $4, delete_work = $5 where projectpermission_serno = $1', [serno, listpermission, addwork, editwork, deletework])
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

//匯出
module.exports = { displayProjectPermission, addProjectPermission, deleteProjectPermission, updateProjectPermission }