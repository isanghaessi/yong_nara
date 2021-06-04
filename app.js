var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var execSync = require('child_process').execSync;

const { sequelize } = require('./models');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
sequelize
	.sync({ force: false })
	.then(() => {
		console.log('sync database success!');
	})
    // yong
    // when there's no database, make it.
	.catch((err) => {
		console.error(err);
		console.log(execSync('npx sequelize db:create'));
		console.log('make database success!');
		sequelize
			.sync({ force: false })
			.then(() => {
				console.log('sync database success!');
			})
			.catch((err) => {
				console.error(err);
			});
	});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
	res.render('error');
});

module.exports = app;
