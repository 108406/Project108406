//增加引用函式
const project = require('./utility/project');


project.fetchProject('twice').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data.project_id);
        console.log(data.projectpermission_serno);
        console.log(data.project_password);
        console.log(data.project_name);
        console.log(data.project_startdate);
        console.log(data.project_enddate);
    }
})

var projects = {
    project_id: 'twice',
    projectpermission_serno: '10',
    project_password: 'TWICE',
    project_name: 'TWICE',
    project_startdate: '2019-05-05 19:19:19',
    project_enddate: '2019-05-05 23:23:23'
}
project.addProject(projects).then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


project.deleteProject('twice').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


project.updateProjectName('twice', 'once').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})