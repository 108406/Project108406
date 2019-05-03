//增加引用函式
const list = require('./utility/list');


list.fetchList('10').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data.list_serno);
        console.log(data.list_name);
    }
})


list.addList('列表十一').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


list.deleteList('21').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


list.updateListName('21', '列表11').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})