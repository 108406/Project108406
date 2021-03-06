'use strict';

//引用操作資料庫的物件
const query = require('./asyncDB');
//------------------------------------------
// 查詢計畫
//------------------------------------------
var MessengeSelectSearch = async function(id){
    //存放結果
    let result;  
    //讀取資料庫
    await query('SELECT team.user_id,project_name,mem.linebotpush,project_enddate,project_startdate FROM teammember as team INNER JOIN project ON team.project_id=project.project_id INNER JOIN member as mem ON team.user_id=mem.user_id WHERE mem.user_id=$1', [id])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows;  //學生資料(物件)
            }else{
                result = -1;  //找不到資料
            }    
        }, (error) => {
            result = -9;  //執行錯誤
        });
    //回傳執行結果
        return result;  
}
//------------------------------------------
// 快到期計畫
//------------------------------------------
var MessengeSearchTimeOut = async function(){
    //存放結果
    let result;  
    //讀取資料庫
    await query('SELECT team.user_id,project_name,mem.linebotpush,project_enddate FROM teammember as team INNER JOIN project ON team.project_id=project.project_id INNER JOIN member as mem ON team.user_id=mem.user_id')
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows;  //學生資料(物件)
            }else{
                result = -1;  //找不到資料
            }    
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
        console.log(result);
        return result;  
}
//------------------------------------------
// 查詢我的工作
//------------------------------------------
var WorkSelectSearch = async function(id){
    //存放結果
    let result;  
    //讀取資料庫
    await query('SELECT DISTINCT mywork_view.work_id,mywork_view.first_principal,mywork_view.second_principal,mywork_view.work_title,mywork_view.work_hint,mywork_view.list_name FROM mywork_view WHERE (first_principal=$1 OR second_principal=$1) and mywork_view.project_enddate > now()', [id])
        .then((data) => {
            if(data.rows.length > 0){
                result = data.rows;  //學生資料(物件)
            }else{
                result = -1;  //找不到資料
            }    
        }, (error) => {
            result = -9;  //執行錯誤
        });

    //回傳執行結果
        // console.log(result);
        return result;  
}


//匯出
module.exports = {MessengeSelectSearch,MessengeSearchTimeOut,WorkSelectSearch};