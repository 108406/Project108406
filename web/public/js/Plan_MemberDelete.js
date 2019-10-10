$(document).ready(function(){
    var isTrue=true;
    $('#member-delete').click(function(){
        if(isTrue){
            $('.member-delete-icon').css({'display':'block'});
            isTrue=false;
        }
        else{
            $('.member-delete-icon').css({'display':'none'});
            isTrue=true;
        }
    })
})