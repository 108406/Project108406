function Kanboard_Value(x){
    var y=document.getElementById(x).value
    $('#kanboard').text(y);
}
function list_value(x){
    var y=document.getElementById(x).value
    $('#list-get').text(y);
}
function position_value(x){
    var y=document.getElementById(x).value
    $('#position-get').text(y);
}
function move_list_Value(x){
    var y=document.getElementById(x).value
    $('#move-list-value').text(y);
}
function drop_position_value(x){
    var y=document.getElementById(x).value
    $('#drop-move-get-position').text(y);
}

