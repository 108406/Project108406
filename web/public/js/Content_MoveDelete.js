let isDragging = false;
$('document').ready(function () {
    $(function () {
        $("[name='delete-tub']").click(function () {
            if (!isDragging) {
                IntoProject(this.id)
            }
        })
        $("[name='delete-tub']").draggable({
            revert: true,
            zIndex: 40,
            opacity: 0.7,
            cancel: ".block-setting",
            start: function () {
                isDragging = true;
            },
            stop: function() {
                isDragging = false;
            }
        });
        $("[name='delete-tub']").disableSelection();

        $('.tub-set').droppable({
            hoverClass: "ui-state-hover",
            drop: function (event, ui) {
                LeaveProject(ui.draggable[0].id)
                $(ui.draggable).remove();
            }
        });
    });
})