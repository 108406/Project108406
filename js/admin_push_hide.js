$('#list-group-item-hide').hide();
$(document).ready(function(){
    $("#list-group-item-show").click(function(){
      $("#list-group-item-hide").toggle();
    });
  });