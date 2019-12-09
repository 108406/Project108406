'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
<<<<<<< HEAD
var displayWorkHint = async function(work_id){
    var result=[];
    await sql(`SELECT "work_hint" FROM "workhint" where "work_id" = ` + work_id)
=======
var displayWorkHint = async function(workSerNo){
    var result=[];
    await sql(`SELECT "work_hint" FROM "workhint" where "work_serno" = ` + workSerNo)
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
        .then((data) => {            
            result = data.rows;  
        }, (error) => {
            console.log(error);
            result = null;
        });
    return result;
}

<<<<<<< HEAD
var deleteWorkHint = async function(user_id, work_id){
    var result=[];
	
    await sql(`delete from "workhint" where "user_id" = $1 and "work_id" = $2`, [user_id, work_id])
=======
var deleteWorkHint = async function(workhintSerNo){
    var result=[];
	
    await sql(`delete from "workhint" where "workhint_serno" = ` + workhintSerNo)
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
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

<<<<<<< HEAD
var addWorkHint = async function(user_id, work_id, work_hint){
    var result=[];
    await sql(`insert into "workhint" values (default, '` + user_id + `', ` + work_id + `, ` + work_hint + `)`)
=======
var addWorkHint = async function(userId, workSerNo, workHint){
    var result=[];
    await sql(`insert into "workhint" values (default, '` + userId + `', ` + workSerNo + `, ` + workHint + `)`)
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
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

<<<<<<< HEAD
var updateWorkHint = async function(user_id, work_id, work_hint){
    var result=[];
    await sql(`update "workhint" set "work_hint" = ` + work_hint + ` where "user_id" = '` + user_id + `' AND "work_id" = ` + work_id)
=======
var updateWorkHint = async function(userId, workSerNo, workHint){
    var result=[];
    await sql(`update "workhint" set "work_hint" = ` + workHint + ` where "user_id" = '` + userId + `' AND "work_serno" = ` + workSerNo)
>>>>>>> 3e2fdee9850ac92c20478a7fc9d0a1bc1fb92e52
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