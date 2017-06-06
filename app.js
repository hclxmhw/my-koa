const Koa = require("koa")

const bodyParser = require('koa-bodyparser');

const static = require('koa-static')

const controller = require('./controller');

var app = new Koa();

app.use(static(__dirname +'/web'));

app.use(bodyParser());

app.use(controller());

app.listen(3000);

console.log('app started at port 3000 ......');
