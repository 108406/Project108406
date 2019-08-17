$(document).ready(function () {
    
    $("#add-card-1").hide();
    $("#add-card-textarea-1").on("click", function (e) {
        $("#add-card-1").show();
        $(document).on("click", function () {
            var textArea = $("#card-textarea-1").val();
            if (textArea == "") {
                $("#add-card-1").hide();
            }
            else {
                $("#add-card-1").hide();
                var creatediv = function () {
                    var parentDiv = document.createElement("div");
                    parentDiv.className = "card work-card";
                    var sonDiv = document.createElement("div");
                    sonDiv.className = "work-name";
                    sonDiv.innerText = textArea;
                    parentDiv.appendChild(sonDiv);
                    $("#add-card-1").before(parentDiv);
                    function clear() {
                        document.getElementById("card-textarea-1").value="";
                    }
                    clear();
                }
                creatediv();
            }
        });

        e.stopPropagation();

    });

    $("#add-card-1").on("click", function (e) {
        e.stopPropagation();
    });

    $("#add-card-2").hide();
    $("#add-card-textarea-2").on("click", function (e) {
        $("#add-card-2").show();
        $(document).on("click", function () {
            var textArea = $("#card-textarea-2").val();
            if (textArea == "") {
                $("#add-card-2").hide();
            }
            else {
                $("#add-card-2").hide();
                var creatediv = function () {
                    var parentDiv = document.createElement("div");
                    parentDiv.className = "card work-card";
                    var sonDiv = document.createElement("div");
                    sonDiv.className = "work-name";
                    sonDiv.innerText = textArea;
                    parentDiv.appendChild(sonDiv);
                    $("#add-card-2").before(parentDiv);
                    function clear() {
                        document.getElementById("card-textarea-2").value="";
                    }
                    clear();
                }
                creatediv();
            }
        });

        e.stopPropagation();

    });

    $("#add-card-2").on("click", function (e) {
        e.stopPropagation();
    });

});



