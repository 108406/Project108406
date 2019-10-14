'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var displayWorkHint = async function(work_id){
    var result=[];
    await sql(`SELECT "work_hint" FROM "workhint" where "work_id" = ` + work_id)
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            console.log(error);
            result = null;
        });
    return result;
}

var deleteWorkHint = async function(workhint_serno){
    var result=[];
	
    await sql(`delete from "workhint" where "workhint_serno" = ` + workhint_serno)
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

var addWorkHint = async function(user_id, work_id, work_hint){
    var result=[];
    await sql(`insert into "workhint" values (default, '` + user_id + `', ` + work_id + `, ` + work_hint + `)`)
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

var updateWorkHint = async function(user_id, work_id, work_hint){
    var result=[];
    await sql(`update "workhint" set "work_hint" = ` + work_hint + ` where "user_id" = '` + user_id + `' AND "work_id" = ` + work_id)
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
module.exports = {displayWorkHint, deleteWorkHint, addWorkHint, updateWorkHint};