$(document).ready(function(){
    var isTrue=true;
    var isTrue2=true;
    var isTrue3=true;
    var isTrue4=true;
    $("#edit-label-dropdown").on('click',function(e){
        if(isTrue){
            $('div.dropdown-content').css({'display':'block'});
            isTrue=false;
        }
        else{
            $('div.dropdown-content').css({'display':'none'});
            isTrue=true;
        }
        $(document).on("click", function () {
            $('div.dropdown-content').css({'display':'none'});
            isTrue=true;
        })
        e.stopPropagation();
    })
    $("#label-edit-off").on('click',function(e){
            $('div.dropdown-content').css({'display':'none'});
            isTrue=true;
    })


    $("#add-new-label").on('click',function(e){
        if(isTrue2){
            $('.dropdown-content-add-label').css({'display':'block'});
            isTrue2=false;
        }
        else{
            $('.dropdown-content-add-label').css({'display':'none'});
            isTrue2=true;
        }
        $(document).on("click", function () {
            $('.dropdown-content-add-label').css({'display':'none'});
            isTrue2=true;
        })
        e.stopPropagation();
    })
    $("#add-label-off").on('click',function(e){
            $('.dropdown-content-add-label').css({'display':'none'});
            isTrue2=true;
    })


    $('#edit-right-dropdown').on('click',function(e){
        if(isTrue3){
            $('#dropdown-content-right').css({'display':'block'});
            isTrue3=false;
        }
        else{
            $('#dropdown-content-right').css({'display':'none'});
            isTrue3=true;
        }
        $(document).on("click", function () {
            $('#dropdown-content-right').css({'display':'none'});
            isTrue3=true;
        })
        e.stopPropagation();
    })
    $("#label-edit-right-off").on('click',function(e){
            $('#dropdown-content-right').css({'display':'none'});
            isTrue3=true;
    })


    $("#add-new-right-label").on('click',function(e){
        if(isTrue4){
            $('.dropdown-content-add-right-label').css({'display':'block'});
            isTrue4=false;
        }
        else{
            $('.dropdown-content-add-right-label').css({'display':'none'});
            isTrue4=true;
        }
        $(document).on("click", function () {
            $('.dropdown-content-add-right-label').css({'display':'none'});
            isTrue4=true;
        })
        e.stopPropagation();
    })
    $("#add-label-right-off").on('click',function(e){
            $('.dropdown-content-add-right-label').css({'display':'none'});
            isTrue4=true;
    })
});