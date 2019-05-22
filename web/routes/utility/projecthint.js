'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var displayProjectHint = async function(projectId){
    var result=[];
    await sql(`SELECT * FROM "projecthint" where "project_id" = '` + projectId + `'`)
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            console.log(error);
            result = null;
        });
    return result;
}

var deleteProjectHint = async function(projecthintSerNo){
    var result=[];
	
    await sql(`delete from "projecthint" where "projecthint_serno" = ` + projecthintSerNo)
        .then((data) => {
            if (data.rowCount > 0) {
                result = true;
            } else {
                result = false;
            }            
        }, (error) => {
            console.log(error);
            result = false;
        });
		
    return result;
}

var addProjectHint = async function(userId, projectId, projectHint){
    var result=[];
    await sql(`insert into "projecthint" values (default, '` + userId + `', '` + projectId + `', ` + projectHint + `)`)
        .then((data) => {
            if (data.rowCount > 0) {
                result = true;
            } else {
                result = false;
            }            
        }, (error) => {
            console.log(error);
            result = false;
        });
        console.log(result);

    return result;
}

var updateProjectHint = async function(userId, projectId, projectHint){
    var result=[];
    await sql(`update "projecthint" set "project_hint" = ` + projectHint + ` where "user_id" = '` + userId + `' AND "project_id" = '` + projectId + `'`)
        .then((data) => {
            if (data.rowCount > 0) {
                result = true;
            } else {
                result = false;
            }            
        }, (error) => {
            console.log(error);
            result = false;
        });
        console.log(result);

    return result;
}

//匯出
module.exports = {displayProjectHint, deleteProjectHint, addProjectHint, updateProjectHint};