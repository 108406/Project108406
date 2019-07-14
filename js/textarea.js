$(document).ready(function () {
    $('.add-card').hide();
    $('#add-card-textarea').on("click", function (e) {
        $('.add-card').show();
        $(document).on("click", function () {
            var textArea = $("#card-textarea").val();
            if (textArea == "") {
                $('.add-card').hide();
            }
            else {
                $('.add-card').hide();
                var creatediv = function () {
                    var parentDiv = document.createElement("div");//创建父div
                    parentDiv.className = "card work-card";//给父div设置class属性
                    var sonDiv = document.createElement("div");//创建子div
                    sonDiv.className = "work-name";//给子sonDiv设置class属性
                    sonDiv.innerText = textArea;////给子sonDiv的文本节点赋值
                    parentDiv.appendChild(sonDiv);//将子sonDiv赋值给父parentDiv
                    $("#add-card").before(parentDiv);
                    function clear() {
                        document.getElementById("card-textarea").value="";
                    }
                    clear();
                }
                creatediv();
            }
        });

        e.stopPropagation();

    });

    $('.add-card').on("click", function (e) {
        e.stopPropagation();
    });

});



