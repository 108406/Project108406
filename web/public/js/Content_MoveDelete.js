$(function () {
    $("[name='delete-tub']").draggable({
        revert: true, zIndex:40, opacity: 0.7,cancel:".block-setting", drag: function (event, ui) {
            $(".card-link").attr("href","#")
        }, stop: function (event, ui) { 
            $(".card-link").attr("href","plan.html")
        }
    });
    $("[name='delete-tub']").disableSelection();

    $('.tub-set').droppable({
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(ui.draggable).remove();
        }
    });
});
