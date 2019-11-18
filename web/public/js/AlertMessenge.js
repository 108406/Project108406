$(document).ready(function(){
    //成功訊息
    $('.BtnSend').on('click',function(){
        $('.SuccessMessenge').fadeIn(1500);
        setTimeout(function(){ $('.SuccessMessenge').fadeOut("slow"); }, 1500);
    })
})