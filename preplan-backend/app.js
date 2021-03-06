import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose'
import cors from 'cors';
import { AccountController, UserController, EventController } from './controllers'
import { dbConfig } from './config';


const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://preplan:preplan@localhost:27017,localhost:27020,localhost:27023/preplan?replicaSet=rs0';

const indexRouter = require('./routes/index');

const app = express();

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("DB Connected");
    dbConfig.initDB();
  }, { useNewUrlParser: true })
  .catch(error => console.error(error));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors())

app.use('/api/auth', AccountController);
app.use('/api/users', UserController);
app.use('/api/dashboard', EventController);
app.use('/', indexRouter);

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


export { app }
