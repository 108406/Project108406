function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    //成員管理者移動
    $("#admin-move,#member-move").sortable({
        axis: "x", connectWith: "#admin-move,#member-move", opacity: 0.7, items: ".member-img-trash"
    });
    //input、textarea可以點選拖曳也可以編輯
    $('input').on('click', function () {
        $(this).focus();
    });
    $('textarea').on('click', function () {
        $(this).focus();
    });
    $("#admin-move,#member-move").disableSelection();
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
        var elements = document.getElementsByClassName("work-card");

        for (var i = 0; i < elements.length; i++) {
            elements[i].ontouchstart = function () {
                clearTimeout(this.downTimer);
                this.downTimer = setTimeout(function () {
                    console.log('a')
                    $("#work-body-move-1,#work-body-move-2").sortable({
                        disabled: false,
                        connectWith: "#work-body-move-1,#work-body-move-2", stop: function (event, ui) {
                            $("#work-body-move-1,#work-body-move-2").sortable("disable");
                        }
                    });
                    $("#work-body-move-1,#work-body-move-2").disableSelection();
                    this.downTimer2 = setTimeout(function () {
                        console.log('bac')
                        $("#work-body-move-1,#work-body-move-2").sortable("disable");
                    }, 3000)
                }, 1000);
            };
            elements[i].ontouchend = function () {
                clearTimeout(this.downTimer);
            };
        }
        $("#work-total-move").sortable({
            axis: "x", items: ".work-total", cancel: ".drpdown", handle: ".card-footer"
        });
        $("#work-total-move").disableSelection();

    } else {
        $("#work-body-move-1,#work-body-move-2").sortable({
            connectWith: "#work-body-move-1,#work-body-move-2"
        });
        $("#work-body-move-1,#work-body-move-2").disableSelection();
        //列表移動

        $("#work-total-move").sortable({
            axis: "x", items: ".work-total", cancel: ".drpdown"
        });
        $("#work-total-move").disableSelection();
    }
}

browserRedirect();

