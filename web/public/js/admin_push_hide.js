$('#list-group-item-hide1').hide();
$('#list-group-item-hide2').hide();
$(document).ready(function(){
    $("#list-group-item-show").click(function(){
      $("#list-group-item-hide1").toggle();
      $("#list-group-item-hide2").toggle();
    });
  });