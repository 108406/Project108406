//增加引用函式
const listwork = require('./utility/listwork');


listwork.fetchListWorkL('9').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data.listwork_serno);
        console.log(data.list_serno);
        console.log(data.work_serno);
    }
})


listwork.fetchListWorkW('10').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data.listwork_serno);
        console.log(data.list_serno);
        console.log(data.work_serno);
    }
})


listwork.addListWork('10', '5').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


listwork.deleteListWork('23').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})
