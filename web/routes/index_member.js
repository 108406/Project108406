//增加引用函式
const member = require('./utility/member');

member.displayMember('twiceisverycute').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data.user_id);
        console.log(data.photo);
        console.log(data.member_name);
        console.log(data.email);
        console.log(data.member_password);
        console.log(data.linebotpush);
    }
})


var members = {
    user_id: 'twiceisno1',
    photo: 'twice',
    email: 'twice@gmail.com',
    member_name: 'TWICE',
    member_password: 'once',
    linebotpush: false
}
member.addMember(members).then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})

member.deleteMember('twiceisno1').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})

member.updateMemberPhoto('twice', 'once').then(data => {
    if (!data) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})

member.updateMemberEmail('twice', 'twice@gmail.com').then(data => {
    if (data == -9) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})

member.updateMemberLinebotPush('twice', true).then(data => {
    if (data == -9) {
        console.log('notFound');
    } else {
        console.log(data);
    }
})