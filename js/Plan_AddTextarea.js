$(document).ready(function() {
    $('.add-card').each(function () {
        $(this).hide();
    });
})
document.addEventListener('click', function (event) {
    var notClick = true;
    for (var p = 0; p < event.path.length; p++) {
        if ($(event.path[p]).hasClass('add-card-textarea')) {
            $('.add-card').each(function () {
                $(this).hide();
            });
            var thisPosi = $(event.path[p]).position().left;
            var samePosiIndex;
            $('.add-card-textarea').each(function (index) {
                if ($(this).position().left == thisPosi) {
                    samePosiIndex = index;
                }
            });
            $($('.add-card')[samePosiIndex]).show();
            $($('.card-add-text')[samePosiIndex]).focus();
            notClick = false;
        }
        if ($(event.path[p]).hasClass('card-add-text')) {
            notClick = false;
        }
    }
    if (notClick){
        var somethingAdd = false;
        var addIndex = -1;
        var addTitle = '';
        $('.add-card').each(function (index) {
            $(this).hide();
            if ($($('.card-add-text')[index]).val() != '') {
                somethingAdd = true;
                addIndex = index;
                addTitle = $($('.card-add-text')[index]).val();
                $($('.card-add-text')[index]).val('')
            }
        });
        if (somethingAdd) {
            AddCard(addIndex, addTitle);
        }
    }
})

// 新增卡片用的function
function AddCard(index, title) {
    console.log('index: ' + index + ', title: ' + title)
}