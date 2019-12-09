$(document).ready(function(){
    $('#SearchForBox').on('click',function(e){
        $('.Search_Box').css('display','block');
        $(document).click(function(e){
            $('.Search_Box').css('display','none');
        })
        e.stopPropagation();
    })
    $('.BtnCancel').on('click',function(){
        $('.Search_Box').css('display','none');
    })
    $(".Search_Box").on("click", function (e) {
        e.stopPropagation();
    });
})