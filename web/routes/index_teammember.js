//增加引用函式
const teammember = require('./utility/teammember');


teammember.displayTeamMember('B001').then(data => {
    if (!data) {
        console.log('notFound');
    } else {data.forEach(teammember => {
        console.log(teammember.teammember_serno);
        console.log(teammember.user_id);
        console.log(teammember.project_id);
        console.log(teammember.group_id);
        console.log(teammember.isadmin);        
    });
    }
})


teammember.displayMyProject('A001').then(data => {
    if (!data) {
        console.log('notFound');
    } else {data.forEach(teammember => {
        console.log(teammember.teammember_serno);
        console.log(teammember.user_id);
        console.log(teammember.project_id);
        console.log(teammember.group_id);
        console.log(teammember.isadmin);        
    });
    }
})


teammember.addTeamMember('E001', 'F001', 'G001', true).then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


teammember.deleteTeamMember('22').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})


teammember.updateTeamMember('C003', 'B001', 'B001', true).then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})