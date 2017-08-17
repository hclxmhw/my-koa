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

var fn_resume_scanHistoryList = async(ctx,next) => {
    var resume_user_id = ctx.request.body.resumeUserId
    var obj = await entity.ResumeScanHistory.findAll({
        where:{
            resume_user_id:resume_user_id
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

var fn_resume_update = async(ctx,next) => {
    var body = ctx.request.body;
    var obj = await entity.Resume.update({
        real_name: body.realName,
        work_type: body.workType,
        age: body.age,
        certificate: body.certificate,
        work_year: body.workYear,
        work_exp: body.workExp,
        exp_salary: body.expSalary,
        work_address: body.workAddress,
        modify_time: new Date(),
        remark: body.remark,
        id_card_num: body.idCardNum,
        mobile: body.mobile
    },{
        where:{
            user_id:body.id
        }
    })

    if(obj.length>0){
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

var fn_user_updatePwd = async(ctx,next) => {
    var body = ctx.request.body;
    var obj = await entity.User.findAll({
        where:{
            mobile:body.mobile,
            login_pwd:body.loginPwd
        }
    })

    if(obj.length>0){
        var obj1 = await entity.User.update({
           login_pwd:body.newPwd
        })
        if(obj1.length>0){
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
    'POST /score/add': fn_score_add,
    'POST /resume/scanHistoryList': fn_resume_scanHistoryList,
    'POST /resume/update': fn_resume_update,
    'POST /user/updatePwd': fn_user_updatePwd
}