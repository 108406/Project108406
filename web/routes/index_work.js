//增加引用函式
const work = require('./utility/work');


work.displayWork('10').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data.work_serno);
        console.log(data.work_title);
        console.log(data.work_content);
        console.log(data.deadline);
        console.log(data.tag);
        console.log(data.file);
        console.log(data.first_principal);
        console.log(data.second_principal);
    }
})


work.displayWorkTitle('10').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data.work_serno);
        console.log(data.work_title);
    }
})

var work_add = {
    work_title: '工作二四',
    work_content: '這是工作二四',
    deadline: '2019-05-06',
    tag: '@工作',
    file: 'zip',
    first_principal: '柯學易',
    second_principal: '張智皓'
}
work.addWork(work_add).then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


work.deleteWork('22').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})

var work_update = {
    work_serno: '24',
    work_title: '工作二三',
    work_content: '這是工作二三',
    deadline: '2019-05-04 23:59:59',
    tag: '@工作細項',
    file: 'zip檔案',
    first_principal: '張智皓',
    second_principal: '柯學易'
}
work.updateWork(work_update).then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


work.displayWrokPrincipal('23').then(data => {
    if (data == -1) {
        console.log('找不到資料');
    } else if (!data) {
        console.log('notFound');
    } else {
        console.log(data.first_principal);
        console.log(data.second_principal);
    }
})


//--------deadline輸出格式有問題
work.displayMyWork('柯網頁').then(data => {
    if (data == -1) {
        console.log('找不到資料');
    } else if (!data) {
        console.log('notFound');
    } else {
        data.forEach(work => {
            console.log(work.work_serno);
            console.log(work.work_title);
        });
    }
})