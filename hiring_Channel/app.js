const express = require('express')
const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const routerNav = require('./src/index')
// use dependencies
const app = express()
// use middleware for incoming request
app.use(bodyParser.json())
// parsing from url www-formencode
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger('dev'))
app.use(cors())
app.use('/api/v1/', routerNav)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get('*', (req, res) => {
    res.send('404 not found')
})
// listen to connection with callback function
app.listen(3000, function () {
    console.log('Server is running on Port 3000')
})