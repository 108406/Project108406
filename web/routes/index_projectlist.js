//增加引用函式
const projectlist = require('./utility/projectlist');


projectlist.fetchProjectListP('1').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data.projectlist_serno);
        console.log(data.project_id);
        console.log(data.list_serno);
    }
})


projectlist.fetchProjectListL('C001').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data.projectlist_serno);
        console.log(data.project_id);
        console.log(data.list_serno);
    }
})


projectlist.addProjectList('B001', '3').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


projectlist.deleteProjectList('23').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})
