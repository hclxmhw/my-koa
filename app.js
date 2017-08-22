const Koa = require("koa")
const bodyParser = require('koa-bodyparser');
const static = require('koa-static')
const controller = require('./controller');

var app = new Koa();



// User.findAll({
//     where: {
//         mobile: '15826447796'
//     }
// }).then(function (p) {
//     console.log('query.' + JSON.stringify(p));
// }).catch(function (err) {
//     console.log('failed: ' + err);
// });

app.use(static(__dirname +'/web'));

app.use(static(__dirname +'/uploads'));

app.use(bodyParser());

app.use(controller());

app.listen(3000);

console.log('app started at port 3000 ......');
