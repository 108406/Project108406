$(document).ready(function(){
    var isTrue=true;
    var isTrue2=true;
    $('#dropdown-list-show-1').click(function(){
        if(isTrue){
            $('.dropdown-content-list').css({'display':'block'});
            isTrue=false;
        }
        else{
            $('.dropdown-content-list').css({'display':'none'});
            isTrue=true;
        }
        
    })
    $('#move-list-off-1').click(function(){
        $('.dropdown-content-list').css({'display':'none'});
        isTrue=true;
    })
    $('#dropdown-list-show-2').click(function(){
        if(isTrue2){
            $('.dropdown-content-list').css({'display':'block'});
            isTrue2=false;
        }
        else{
            $('.dropdown-content-list').css({'display':'none'});
            isTrue2=true;
        }
        
    })
    $('#move-list-off-2').click(function(){
        $('.dropdown-content-list').css({'display':'none'});
        isTrue2=true;
    })

    $(document).on('click',function(){
        $('.dropdown-content-list').css({'display':'none'});
        isTrue=true;
        isTrue2=true;
    });
})