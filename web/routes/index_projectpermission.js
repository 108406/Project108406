//增加引用函式
const permission = require('./utility/projectpermission');


permission.displayProjectPermission('21').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data.list_permission);
        console.log(data.add_work);
        console.log(data.edit_work);
        console.log(data.delete_work);
    }
})


permission.addProjectPermission(false, false, false, false).then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


permission.deleteProjectPermission('21').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


permission.updateProjectPermission('21', true, true, true, false).then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})