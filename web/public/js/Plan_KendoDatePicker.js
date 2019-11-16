//組長推播的日期顯示
$("#TimeDate").kendoDateTimePicker({
    value: new Date(),
    format: "yyyy-MM-dd HH:mm:ss",
    dateInput: true
});
$("#adminpushEndDate").kendoDateTimePicker({
    value: new Date(),
    format: "yyyy-MM-dd HH:mm:ss",
    dateInput: true
});
$(".k-picker-wrap").on('click',function(e){
    $(".k-animation-container").on('click',function(e){
        e.stopPropagation();
    })
    $(".k-list-container").on('click',function(e){
        e.stopPropagation();
    })
    e.stopPropagation();
})
$("#TimeSet").on("click", function (e) {
    e.stopPropagation();
});
