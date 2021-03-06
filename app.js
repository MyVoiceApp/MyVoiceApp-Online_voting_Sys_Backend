var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const mongoose = require('mongoose')
var cors = require('cors')
var multer = require('multer')


// mongoose.connect(
//     'mongodb://localhost:27017/surveyApp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
// })

mongoose.connect(
    'mongodb+srv://longlonglol:i2nfkWHS1W3X7Qwy@cluster0.aui5a.mongodb.net/longlonglol?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})

var app = express()
app.use(cors())
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Token, Access-Id',
    )
    next()
})
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'uploads')))

app.use('/user', require('./routes/user'));
app.use('/product', require('./routes/products'));
app.use('/upload', require('./routes/upload'));
app.use('/category', require('./routes/category'));
app.use('/topic', require('./routes/topics'));
app.use('/contactus', require('./routes/contactUs'));
app.use('/slider', require('./routes/slider'));
app.use('/survey', require('./routes/survey'));
app.use('/vote', require('./routes/vote'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app
