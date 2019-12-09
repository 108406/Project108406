$("#TimeDate").kendoDateTimePicker({
    // value:"",
    format: "HH:mm tt yyyy-MM-dd",
    dateInput: true
});
$("#AdminDateTime").kendoDateTimePicker({
    format: "HH:mm tt yyyy-MM-dd",
    dateInput: true
});
$(".k-picker-wrap").on('click',function(e){
    $(".k-animation-container").on('click',function(e){
        console.log('觸發日期')
        e.stopPropagation();
    })
    $(".k-list-container").on('click',function(e){
        console.log('觸發時間')
        e.stopPropagation();
    })
    e.stopPropagation();
})
$("#TimeSet").on("click", function (e) {
    e.stopPropagation();
});
