let isDragging = false;
//計畫拖曳
$('document').ready(function () {
    $(function () {
        $("[name='delete-tub']").click(function (event) {
            if (!isDragging) {
                if (!(event.target.className == 'card-setting' || 
                $(event.target).parent().get(0).className == 'card-setting')) {
                    IntoProject(this.id)
                }
            }
        })
        $("[name='delete-tub']").draggable({
            containment: ".container-fluid",
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