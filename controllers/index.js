var entity = require('../model/model')
var resBody = {
            code:"",
            data:"",
            message:""
        }
var fn_login = async(ctx,next) => {
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

var fn_msg_select = async(ctx,next) => {
    var 
        page = parseInt(ctx.request.body.page),
        pageSize = parseInt(ctx.request.body.pageSize);
    var obj = await entity.Msg.findAndCountAll({
        limit:pageSize,
        offset: pageSize * (page-1)
    })
    if(obj.rows.length>0){
        console.log('query.' + JSON.stringify(obj));
        resBody.code = "200";
        resBody.message = "成功";
        resBody.data = obj.rows;
        ctx.response.body = resBody;
    }else{
        console.log('query.' + JSON.stringify(obj));
        resBody.code = "500";
        resBody.message = "失败";
        resBody.data = null;
        ctx.response.body = resBody;
    }
}

var fn_resume_select = async(ctx,next) => {
    var id = ctx.request.body.id;
    var obj = await entity.Resume.findAll({
        where:{
            user_id:id
        }
    })

    if(obj.length>0){
        console.log('query.' + JSON.stringify(obj));
        resBody.code = "200";
        resBody.message = "成功";
        resBody.data = obj;
        ctx.response.body = resBody;
    }else{
        console.log('query.' + JSON.stringify(obj));
        resBody.code = "500";
        resBody.message = "失败";
        resBody.data = null;
        ctx.response.body = resBody;
    }

}

var fn_user_select = async(ctx,next) => {
    var id = ctx.request.body.id;
    var obj = await entity.User.findAll({
        where:{
            id:id
        }
    })

    if(obj.length>0){
        console.log('query.' + JSON.stringify(obj));
        resBody.code = "200";
        resBody.message = "成功";
        resBody.data = obj;
        ctx.response.body = resBody;
    }else{
        console.log('query.' + JSON.stringify(obj));
        resBody.code = "500";
        resBody.message = "失败";
        resBody.data = null;
        ctx.response.body = resBody;
    }

}

var fn_score_add = async(ctx,next) => {
    var req = ctx.request.body;
    var user_id = req.userId;
    var from_id = req.fromId;
    var score = req.score;
    var real_name = req.realName;
    
    try {
        var obj = await entity.Score.create({
            user_id:user_id,
            from_id:from_id,
            score:score,
            score_time:new Date()
        })
    } catch (error) {
        console.log(error);
    }

    if(obj != undefined || obj != null){
        resBody.code = "200";
        resBody.message = "成功";
        resBody.data = obj;
        ctx.response.body = resBody;
    }else{
        resBody.code = "500";
        resBody.message = "失败";
        resBody.data = null;
        ctx.response.body = resBody;
    }
}
module.exports = {
    'POST /login':fn_login,
    'GET /':fn_index,
    'POST /msg/select':fn_msg_select,
    'POST /resume/select': fn_resume_select,
    'POST /user/select': fn_user_select,
    'POST /score/add': fn_score_add
}