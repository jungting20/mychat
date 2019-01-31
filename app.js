const express = require('express');
const session = require('express-session');
const cookieparser = require('cookie-parser');
const path = require('path');
const indexrouter = require('./routes/index');
const morgan = require('morgan');
const webSocket = require('./socket');
require('dotenv').config();


const app = express();

const sessionMiddleware = session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  });

app.set('view engine','pug');
app.set('views',path.join(__dirname,'views'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({extended:false}));
app.use(cookieparser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware);


app.use('/',indexrouter);

const server = app.listen(process.env.PORT || 8009,() => {
    console.log(`${process.env.PORT}포트 에서 실행 `);
});

webSocket(server,app,sessionMiddleware);