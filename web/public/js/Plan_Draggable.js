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
    if ($('#isAdmin').val() == 'true') {
        $("#admin-move,#member-move").sortable({
            axis: "x",
            connectWith: "#admin-move,#member-move",
            opacity: 0.7,
            items: ".member-img-trash",
            update: function (event, ui) {
                if (ui.sender != null) {
                    if (ui.sender[0].id == 'admin-move' && $(ui.sender[0]).children().length <= 0) {
                        alert('一個專案必須至少存在一位管理者。')
                        $("#admin-move").sortable("cancel");
                    } else {
                        MoveMember(event.target, ui.sender[0], ui.item[0]);
                    }
                }
            }
        });
    }
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
                    let workbodymoveString = '';
                    for (let a = 0; a < $('.work-body').length; a++) {
                        if (workbodymoveString != '') {
                            workbodymoveString += ','
                        }
                        workbodymoveString += ('#work-body-move-' + (a + 1))
                    }
                    console.log(workbodymoveString)
                    $(workbodymoveString).sortable({
                        disabled: false,
                        connectWith: workbodymoveString,
                        stop: function (event, ui) {
                            $(workbodymoveString).sortable("disable");
                        }
                    });
                    $(workbodymoveString).disableSelection();
                    this.downTimer2 = setTimeout(function () {
                        console.log('bac')
                        $(workbodymoveString).sortable("disable");
                    }, 3000)
                }, 1000);
            };
            elements[i].ontouchend = function () {
                clearTimeout(this.downTimer);
            };
        }
        $("#work-total-move").sortable({
            axis: "x",
            items: ".work-total",
            cancel: ".drpdown",
            handle: ".card-footer"
        });
        $("#work-total-move").disableSelection();

    } else {
        let workbodymoveString = '';
        for (let a = 0; a < $('.work-body').length; a++) {
            if (workbodymoveString != '') {
                workbodymoveString += ','
            }
            workbodymoveString += ('#work-body-move-' + (a + 1))
        }
        if ($('#isAdmin').val() == 'true' || $('#projectPermission').val().split(',')[2] == 'true') {
            $(workbodymoveString).sortable({
                connectWith: workbodymoveString,
                update: function (event, ui) {
                    if (ui.sender != null) {
                        DragWorkToList(event.target, ui.sender[0], ui.item[0])
                    }
                }
            });
        }
        $(workbodymoveString).disableSelection();
        //列表移動

        $("#work-total-move").sortable({
            axis: "x",
            items: ".work-total",
            cancel: ".drpdown",
            update: function (event, ui) {
                if (ui.sender != null) {}
            }
        });
        $("#work-total-move").disableSelection();
    }
}

browserRedirect();