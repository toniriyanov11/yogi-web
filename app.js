var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pengeluaranRouter = require('./routes/pengeluaran');
var pemasukanRouter = require('./routes/pemasukan');
var dataproduksiRouter = require('./routes/dataproduksi');
var invoiceRouter = require('./routes/invoice');
var jurnalRouter = require('./routes/jurnal');
var labarugiRouter = require('./routes/labarugi');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/login', usersRouter);
app.use('/pengeluaran', pengeluaranRouter);
app.use('/pemasukan', pemasukanRouter);
app.use('/dataproduksi', dataproduksiRouter);
app.use('/invoice', invoiceRouter);
app.use('/jurnal', jurnalRouter);
app.use('/labarugi', labarugiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
