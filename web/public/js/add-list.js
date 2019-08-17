$('div.add-list-submit').hide();

$(document).ready(function () {
    $('#add-list').on("click", function (e) {
        $('div.add-list-submit').show();
        $('.btn-add-list').on("click", function () {
            var input_value = $('#add-list-input').val();
            if (input_value=="") {
                return false;
            }
            else {
                var creatediv = function () {
                    var work_total = document.createElement("div");
                    work_total.className = "work-total";

                    var work_header = document.createElement("div");
                    work_header.className = "work-header";

                    var son_input = document.createElement('input');
                    son_input.className = "form-control input-style";
                    son_input.value = input_value;

                    var son_btn = document.createElement('button');
                    son_btn.className = 'btn btn-link btn-header';
                    son_btn.type = 'button';

                    var son_btn_i = document.createElement('i');
                    son_btn_i.className = "fas fa-ellipsis-h";

                    son_btn.appendChild(son_btn_i);
                    work_header.appendChild(son_input);
                    work_header.appendChild(son_btn);

                    var work_body = document.createElement('div');
                    work_body.className = "work-body";

                    var card_footer = document.createElement('div');
                    card_footer.className = 'card-footer';

                    var a_footer = document.createElement('a');
                    a_footer.className = "a-footer";
                    a_footer.href = "#";

                    var footer_name_i = document.createElement('i');
                    footer_name_i.className = "fas fa-plus";
                    footer_name_i.innerText = "新增另外一張卡片";

                    var footer_name = document.createElement('div');
                    footer_name.className = "footer-name";



                    footer_name.appendChild(footer_name_i);
                    a_footer.appendChild(footer_name);
                    card_footer.appendChild(a_footer);




                    work_total.appendChild(work_header);

                    work_total.appendChild(work_body);

                    work_total.appendChild(card_footer);

                    $(".add-list").before(work_total);
                    function clear() {
                        document.getElementById("add-list-input").value = "";
                    }
                    clear();
                }

            }
            creatediv();
        });
        $(document).on("click", function () {
            $('div.add-list-submit').hide();
        });

        e.stopPropagation();

    });


});

