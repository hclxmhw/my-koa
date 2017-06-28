var entity = require('../model/model')
var resBody = {
            code:"",
            data:"",
            message:""
        }
var fn_login = async(ctx,next)=>{
    var
        username = ctx.request.body.mobile || "",
        password = ctx.request.body.loginPwd || "";
    var isValid = await entity.User.findAll({
        where: {
            mobile:username
        }
    })
    if(isValid.length<=0){
        console.log('query.' + JSON.stringify(isValid));
        // ctx.response.body = JSON.parse(`{"code":"500","message":"没有找到用户！"}`);
        resBody.code = "500";
        resBody.message = "没有找到用户！";
        resBody.data = null;
        ctx.response.body = resBody;
        return;
    }
    var p = await entity.User.findAll({
        where: {
            mobile:username,
            login_pwd:password
        }
    })
    if(p.length>0){
        console.log('query.' + JSON.stringify(p));
        resBody.code = "200";
        resBody.message = "登录成功！";
        resBody.data = p;
        ctx.response.body = resBody;
    }else{
        console.log('query.' + JSON.stringify(p));
        // ctx.response.body = JSON.parse(`{"code":"500","message":"密码错误！"}`);
        resBody.code = "500";
        resBody.message = "密码错误！";
        resBody.data = null;
        ctx.response.body = resBody;
    }
}

var fn_index = async(ctx,next) => {
    ctx.response.redirect('login.html');
}

module.exports = {
    'POST /login':fn_login,
    'GET /':fn_index
}