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
    // 分顯示兩個數字
    result[4] = date.substring(0, 2);
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


module.exports = { SeparateDate, IsAdateNotArrived };