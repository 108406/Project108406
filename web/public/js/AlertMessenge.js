$(document).ready(function(){
    $('.BtnSend').on('click',function(){
        $('.SuccessMessenge').fadeIn(1500);
        setTimeout(function(){ $('.SuccessMessenge').fadeOut("slow"); }, 1500);
    })
})