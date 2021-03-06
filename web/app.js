var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
  
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var content = require('./routes/content');
var content_leaveProject = require('./routes/content_leaveProject');
var content_updateProjectName = require('./routes/content_updateProjectName');
var content_addProject = require('./routes/content_addProject');
var plan = require('./routes/plan');
var addList = require('./routes/plan_addList');
var addTag = require('./routes/plan_addTag');
var addAdminpush = require('./routes/plan_addAdminpush');
var addWork = require('./routes/plan_addWork');
var addWorkHint = require('./routes/plan_addWorkHint');
var deleteList = require('./routes/plan_deleteList');
var deleteWork = require('./routes/plan_deleteWork');
var deleteWorkHint = require('./routes/plan_deleteWorkHint');
var deleteMember = require('./routes/plan_deleteMember');
var updateWork = require('./routes/plan_updateWork');
var updatePermission = require('./routes/plan_updatePermission');
var updateTag = require('./routes/plan_updateTag');
var updateListwork = require('./routes/plan_updateListwork');
var updateList = require('./routes/plan_updateList');
var updateMember = require('./routes/plan_updateMember');
var member = require('./routes/member');
var member_linebotPush = require('./routes/member_linebotPush');
var member_photo = require('./routes/member_photo');
var member_update = require('./routes/member_update');
var member_delete = require('./routes/member_delete');
var searchProject = require('./routes/searchProject');
var addToProject = require('./routes/addToProject');
var project = require('./routes/project');
var mywork = require('./routes/mywork');
var mywork_updateListWork = require('./routes/mywork_updateListWork');
var mywork_updateProjectLinebotPush = require('./routes/mywork_updateProjectLinebotPush');
var mywork_updateWorkLinebotPush = require('./routes/mywork_updateWorkLinebotPush');
var mywork_updateFile = require('./routes/mywork_updateFile');
var login = require('./routes/login');
var forgot = require('./routes/forgot');
var register = require('./routes/register');
var login_api = require('./routes/login');
var login_api_cb = require('./routes/login');
var login_api_logout = require('./routes/login');
var app = express();

//設定session參數
const session = require('express-session');

const session_options = {
  secret: 'e00a15bd1fa164dfc179db9b46ab4145',
  resave: false,
  saveUninitialized: true
};

app.use(session(session_options));  //設定使用Session

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({limit: '1mb'}));
app.use(express.urlencoded({ extended: true ,limit: '1mb', parameterLimit : 3670016}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true ,limit: '1mb', parameterLimit : 3670016}));

// parse application/json
app.use(bodyParser.json({limit: '1mb'}));

app.use('/login',login);
app.use('/forgot',forgot);
app.use('/register',register);
app.use('/mywork',mywork);
app.use('/', login);
app.use('/users', usersRouter);
app.use('/content', content);
app.use('/content/leaveProject', content_leaveProject);
app.use('/content/updateProjectName', content_updateProjectName);
app.use('/content/addProject', content_addProject);
app.use('/content/plan', plan);
app.use('/content/plan/addList', addList);
app.use('/content/plan/addTag', addTag);
app.use('/content/plan/addAdminpush', addAdminpush);
app.use('/content/plan/addWork', addWork);
app.use('/content/plan/addWorkHint', addWorkHint);
app.use('/content/plan/deleteList', deleteList);
app.use('/content/plan/deleteWork', deleteWork);
app.use('/content/plan/deleteWorkHint', deleteWorkHint);
app.use('/content/plan/deleteMember', deleteMember);
app.use('/content/plan/updateWork', updateWork);
app.use('/content/plan/updatePermission', updatePermission);
app.use('/content/plan/updateTag', updateTag);
app.use('/content/plan/updateListwork', updateListwork);
app.use('/content/plan/updateList', updateList);
app.use('/content/plan/updateMember', updateMember);
app.use('/member', member);
app.use('/member/linebotPush', member_linebotPush);
app.use('/member/photo', member_photo);
app.use('/member/update', member_update);
app.use('/member/delete', member_delete);
app.use('/project', project);
app.use('/searchProject', searchProject);
app.use('/addToProject', addToProject);
app.use('/mywork/updateListWork', mywork_updateListWork);
app.use('/mywork/updateProjectLinebotPush', mywork_updateProjectLinebotPush);
app.use('/mywork/updateWorkLinebotPush', mywork_updateWorkLinebotPush);
app.use('/mywork/updateFile', mywork_updateFile);
app.use('/auth/line', login_api);
app.use('/auth/line/cb', login_api_cb);
app.use('/auth/line/logout', login_api_logout);
 
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error.ejs');
});

module.exports = app;
