$(document).ready(function () {
    $(".list-a").each(function (index) {
        $(this).on("click",function(){
            CardListEdit(index)
        })
    });
    function CardListEdit(index){
        if($($('.card-list')[index]).attr('style')==undefined){
            $($('.card-list')[index]).attr('style','background:rgba(52, 58, 64,0.7);');
            $($('.triangle')[index]).attr('style','border-width:8px 7px 0 7px;border-color:rgb(192, 192, 192) transparent transparent transparent;');
        }
        else{
            $($('.card-list')[index]).removeAttr('style');
            $($('.triangle')[index]).removeAttr('style');
        }
        
    }
})