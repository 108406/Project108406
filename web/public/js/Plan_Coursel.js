$('#PlanCarousel').hide();
$(document).ready(function () {
    var isTrue=true;
    $('#show-carousel').on("click", function () {
        if (isTrue) {
            $('#PlanCarousel').show();
            $('.body').css({ 'overflow-y': 'auto' })
            $('.deck').css({ 
                'top': '36em',
                'bottom':"auto",
        })
            isTrue=false;
        }
        else{
            $('#PlanCarousel').hide();
            $('.body').css({ 'overflow-y': 'hidden' })
            $('.deck').css({ 'top': '6em' })
            $('.deck').css({ 'bottom': '0' })
            isTrue=true;
        }
    })
})
