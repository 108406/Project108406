$(function () {
    $("[name='delete-tub']").draggable({ revert: true });
    // $("#started").disableSelection();
    $('.tub-set').droppable({
        drop: function (event, ui) {
            $(ui.draggable).remove();
        }
    });
});
