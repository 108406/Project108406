'use strict';

//引用操作資料庫的物件
const sql = require('./asyncDB');

//------------------------------------------
//執行資料庫動作的函式-傳回所有產品資料
//------------------------------------------
var fetchAdminPush = async function(projectId){
    var result=[];
    await sql(`SELECT * FROM "adminpush" where "project_id" = '` + projectId + `'`)
        .then((data) => {          
            result = data.rows;  
        }, (error) => {
            console.log(error);
            result = null;
        });
    return result;
}

var deleteAdminPush = async function(serno){
    var result=[];
	
    await sql(`delete from "adminpush" where "adminpush_serno" = ` + serno)
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

var addAdminPush = async function(id, content, startDate, endDate){
    var result=[];
    console.log(startDate);
    await sql(`insert into "adminpush" values (default, '` + id + `', '` + content + `', '` + startDate +`', '` + endDate + `')`)
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

//匯出
module.exports = {fetchAdminPush, deleteAdminPush, addAdminPush};