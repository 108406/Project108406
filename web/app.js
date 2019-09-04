var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var content = require('./routes/content');
var content_updateProjectName = require('./routes/content_updateProjectName');
var content_addProject = require('./routes/content_addProject');
var plan = require('./routes/plan');
var addList = require('./routes/plan_addList');
var deleteList = require('./routes/plan_deleteList');
var updatePermission = require('./routes/plan_updatePermission');
var member = require('./routes/member');
var member_linebotPush = require('./routes/member_linebotPush');
var member_photo = require('./routes/member_photo');
var member_update = require('./routes/member_update');
var member_delete = require('./routes/member_delete');
var project = require('./routes/project');
var mywork = require('./routes/mywork');
var mywork_updateListWork = require('./routes/mywork_updateListWork');
var mywork_updateProjectLinebotPush = require('./routes/mywork_updateProjectLinebotPush');
var mywork_updateWorkLinebotPush = require('./routes/mywork_updateWorkLinebotPush');
var mywork_updateFile = require('./routes/mywork_updateFile');
var mywork_gotoPlan = require('./routes/mywork_gotoPlan');
var login = require('./routes/login');
var forgot = require('./routes/forgot');
var register = require('./routes/register');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
//為了改變限制檔案的大小 所以註解
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// parse application/x-www-form-urlencoded 改變限制檔案大小
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

app.use('/login',login);
app.use('/forgot',forgot);
app.use('/register',register);
app.use('/mywork',mywork);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/content', content);
app.use('/content/updateProjectName', content_updateProjectName);
app.use('/content/addProject', content_addProject);
app.use('/content/plan', plan);
app.use('/content/plan/addList', addList);
app.use('/content/plan/deleteList', deleteList);
app.use('/content/plan/updatePermission', updatePermission);
app.use('/member', member);
app.use('/member/linebotPush', member_linebotPush);
app.use('/member/photo', member_photo);
app.use('/member/update', member_update);
app.use('/member/delete', member_delete);
app.use('/project', project);
app.use('/mywork', mywork);
app.use('/mywork/updateListWork', mywork_updateListWork);
app.use('/mywork/updateProjectLinebotPush', mywork_updateProjectLinebotPush);
app.use('/mywork/updateWorkLinebotPush', mywork_updateWorkLinebotPush);
app.use('/mywork/updateFile', mywork_updateFile);

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
