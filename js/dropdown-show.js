$(document).ready(function(){
    var isTrue=true;
    $("#edit-label-dropdown").on('click',function(e){
        if(isTrue){
            $('.dropdown-content').css({'display':'block'});
            isTrue=false;
        }
        else{
            $('.dropdown-content').css({'display':'none'});
            isTrue=true;
        }
    })
});