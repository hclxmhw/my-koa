var fn_login = async(ctx,next)=>{
    var
        username = ctx.request.body.username || "",
        password = ctx.request.body.password || "";
    if(username == 'mhw' && password == '123'){
        ctx.response.body = JSON.parse(`{"username":"${username}","password":"${password}","code":"200","msg":"登录成功！"}`);
    }else{
        ctx.response.body = JSON.parse(`{"username":"${username}","password":"${password}","code":"500","msg":"密码错误！"}`);
    }
}

var fn_index = async(ctx,next) => {
    ctx.response.redirect('./web/index.html');
}

module.exports = {
    'POST /login':fn_login,
    'GET /':fn_index
}