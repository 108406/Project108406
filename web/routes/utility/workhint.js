'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var displayWorkHint = async function(workSerNo){
    var result=[];
    await sql(`SELECT "work_hint" FROM "workhint" where "work_serno" = ` + workSerNo)
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            console.log(error);
            result = null;
        });
    return result;
}

var deleteWorkHint = async function(workhintSerNo){
    var result=[];
	
    await sql(`delete from "workhint" where "workhint_serno" = ` + workhintSerNo)
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

var addWorkHint = async function(userId, workSerNo, workHint){
    var result=[];
    await sql(`insert into "workhint" values (default, '` + userId + `', ` + workSerNo + `, ` + workHint + `)`)
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

var updateWorkHint = async function(userId, workSerNo, workHint){
    var result=[];
    await sql(`update "workhint" set "work_hint" = ` + workHint + ` where "user_id" = '` + userId + `' AND "work_serno" = ` + workSerNo)
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