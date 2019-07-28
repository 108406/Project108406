$(function () {
    $( "#draggable" ).draggable({ helper: "original" });
    $("[name='delete-tub']").draggable({ revert: true });
    // $("#started").disableSelection();

    $('.tub-set').droppable({
        hoverClass: "ui-state-hover",
        drop: function (event, ui) {
            $(ui.draggable).remove();
        }
    });
});
