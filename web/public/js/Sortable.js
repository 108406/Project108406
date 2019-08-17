$(function () {
    //成員管理者移動
    $("#admin-move,#member-move").sortable({
        axis: "x",
        connectWith: "#admin-move,#member-move"
    });
    $("#admin-move,#member-move").disableSelection();
    //列表移動
    $("#work-total-move").sortable({
        axis: "x", items: ".work-total",cancel:".dropright"});
    $("#work-total-move").disableSelection();
    //卡片互相移動
    $("#work-body-move-1,#work-body-move-2").sortable({
        connectWith: "#work-body-move-1,#work-body-move-2",items:'.work-card',distance: 15});
    $("#work-body-move-1,#work-body-move-2").disableSelection();
    //input、textarea可以點選拖曳也可以編輯
    $('input').on('click', function() { 
        $(this).focus(); 
    });
    $('textarea').on('click', function() { 
        $(this).focus(); 
    });  

});