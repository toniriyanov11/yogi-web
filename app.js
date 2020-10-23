var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var moment = require('moment');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pengeluaranRouter = require('./routes/pengeluaran');
var pemasukanRouter = require('./routes/pemasukan');
var dataproduksiRouter = require('./routes/dataproduksi');
var invoiceRouter = require('./routes/invoice');
var jurnalRouter = require('./routes/jurnal');
var labarugiRouter = require('./routes/labarugi');
var barangreturnRouter = require('./routes/barangreturn');
var bahanbakuRouter = require('./routes/bahanbaku');
var barangsisaRouter = require('./routes/barangsisa');
var clientRouter = require('./routes/client');
var supplierRouter = require('./routes/supplier');
var masterRouter = require('./routes/master');
var inventoriRouter = require('./routes/inventori');
var setupRouter = require('./routes/setup');

var app = express();
var corsOptions = {
  origin:"*",
  methods: '*'
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',cors(corsOptions), indexRouter);
app.use('/login',cors(corsOptions), usersRouter);
app.use('/pengeluaran',cors(corsOptions), pengeluaranRouter);
app.use('/pemasukan',cors(corsOptions), pemasukanRouter);
app.use('/dataproduksi',cors(corsOptions), dataproduksiRouter);
app.use('/invoice',cors(corsOptions), invoiceRouter);
app.use('/jurnal',cors(corsOptions), jurnalRouter);
app.use('/labarugi',cors(corsOptions), labarugiRouter);
app.use('/barangreturn',cors(corsOptions), barangreturnRouter);
app.use('/bahanbaku',cors(corsOptions), bahanbakuRouter);
app.use('/barangsisa',cors(corsOptions), barangsisaRouter);
app.use('/client',cors(corsOptions), clientRouter);
app.use('/supplier',cors(corsOptions), supplierRouter);
app.use('/master',cors(corsOptions), masterRouter);
app.use('/inventori',cors(corsOptions), inventoriRouter);
app.use('/setup',cors(corsOptions), setupRouter);

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
