$(document).ready(function(){
    $('.change-card-deletes-check').hide();
    $('.btn-delete-close').hide();
    $('.change-card-deletes').on('click',function(){
        $('.change-card-deletes-check').show();
        $('.btn-delete-close').show();
        $('.change-card-deletes').hide();
        // $('.change-card-deletes-check').on('click',function(){
        //     $('#card-1').remove();
        // });   
        $('.btn-delete-close').on('click',function(){
            $('.change-card-deletes-check').hide();
            $('.btn-delete-close').hide();
            $('.change-card-deletes').show();
        });
    });
});