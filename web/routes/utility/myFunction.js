'use strict';

//Sun May 26 2019 18:41:17 GMT+0800 (GMT+08:00)
var SeparateDate = function (date) {
    var result = [6];
    var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    date = (date + "").substring(4, date.length);
    for (var i = 0; i < month.length; i++) {
        if (date.substring(0, 3).toLowerCase() == month[i].toLowerCase()) {
            result[1] = i + 1;
        }
    }
    date = date.substring(4, date.length);
    result[2] = +date.substring(0, 2);
    date = date.substring(3, date.length);
    result[0] = +date.substring(0, 4);
    date = date.substring(5, date.length);
    result[3] = +date.substring(0, 2);
    date = date.substring(3, date.length);
    result[4] = +date.substring(0, 2);
    date = date.substring(3, date.length);
    result[5] = +date.substring(0, 2);

    return result;
}

var IsAdateNotArrived = function (date1, date2) {
    date1 = SeparateDate(date1);
    date2 = SeparateDate(date2);
    for (var i = 0; i < 6; i++) {
        if (date1[i] > date2[i]) {
            return true;
        } else if (date1[i] < date2[i]) {
            return false;
        }
    }
    return false;
}

var nowTimeToDB = function () {
    var nowTime = SeparateDate(new Date());
    var result = nowTime[0] + '-' +
        (nowTime[1] < 10 ? ('0' + nowTime[1]) : nowTime[1]) + '-' +
        (nowTime[2] < 10 ? ('0' + nowTime[2]) : nowTime[2]) + 'T' +
        (nowTime[3] < 10 ? ('0' + nowTime[3]) : nowTime[3]) + ':' +
        (nowTime[4] < 10 ? ('0' + nowTime[4]) : nowTime[4]);
    return result;
}

module.exports = {
    SeparateDate,
    IsAdateNotArrived,
    nowTimeToDB
};