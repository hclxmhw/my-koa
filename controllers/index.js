var entity = require('../model/model')

var fn_login = async(ctx,next)=>{
    var
        username = ctx.request.body.username || "",
        password = ctx.request.body.password || "";
    var isValid = await entity.User.findAll({
        where: {
            mobile:username
        }
    })
    if(isValid.length<=0){
        console.log('query.' + JSON.stringify(isValid));
        ctx.response.body = JSON.parse(`{"code":"500","msg":"没有找到用户！"}`);
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
        ctx.response.body = JSON.parse(`{"code":"200","msg":"登录成功！"}`);
    }else{
        console.log('query.' + JSON.stringify(p));
        ctx.response.body = JSON.parse(`{"code":"500","msg":"密码错误！"}`);
    }
}

var fn_index = async(ctx,next) => {
    ctx.response.redirect('./web/index.html');
}

module.exports = {
    'POST /login':fn_login,
    'GET /':fn_index
}