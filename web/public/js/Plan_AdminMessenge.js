$(document).ready(function(){
    $("[name='modal-messenge-show']").hide();
    $('#admin-text-show').on('click',function(){
        $("[name='modal-messenge-show']").toggle();
    });
})