var entity = require('../model/model')
var fs = require("fs");
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
    var body = ctx.request.body,
        page = parseInt(ctx.request.body.page),
        pageSize = parseInt(ctx.request.body.pageSize),
        id = body.id;
    var obj = null;
    if(id != null){
        var param = {
            user_id:id
        };
        if(body.workType != null){
            param.work_type = {
                $like: '%'+body.workType+'%'
            }
        }
        if(body.createTime != null){
            param.create_time = {
                $lte:body.createTime
            }
        }
        obj = await entity.Msg.findAndCountAll({
            include:[{
                association: entity.Msg.hasOne(entity.MsgBePost, {foreignKey:'msg_id', as:'msgId'}),
            }],
            where:param,
            limit:pageSize,
            offset: pageSize * (page-1)
        })
    }else{
        var param = {};
        if(body.workType != null){
            param.work_type = {
                $like: '%'+body.workType+'%'
            }
        }
        if(body.createTime != null){
            param.create_time = {
                $lte:body.createTime
            }
        }
        if(param.work_type != undefined || param.create_time != undefined){
            obj = await entity.Msg.findAndCountAll({
                include:[{
                    association: entity.Msg.hasOne(entity.MsgBePost, {foreignKey:'msg_id', as:'msgId'})
                }],
                where:param,
                limit:pageSize,
                offset: pageSize * (page-1)
            })
        }else{
            obj = await entity.Msg.findAndCountAll({
                include:[{
                    association: entity.Msg.hasOne(entity.MsgBePost, {foreignKey:'msg_id', as:'msgId'})
                }],
                limit:pageSize,
                offset: pageSize * (page-1)
            })
        }
    }
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
            id:body.id,
            login_pwd:body.loginPwd
        }
    })

    if(obj.length>0){
        var obj1 = await entity.User.update({
           login_pwd:body.newPwd
        },{
            where:{
                id:body.id
            }
        })
        if(obj1.length>0){
            resBody.code = "200";
            resBody.message = "成功";
            resBody.data = obj1;
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

var fn_user_update = async(ctx,next) => {
    var body = ctx.request.body;
    var obj = await entity.User.update({
        mobile:body.mobile,
        real_name:body.realName,
        age:body.age,
        id_card_num:body.idCardNum,
        id_card_front:body.idCardFront,
        id_card_back:body.idCardBack
    },{
        where:{
            id:body.id
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

var fn_user_upload = async(ctx,next)=>{
    var path = ctx.req.file.path;
    resBody.code = "200";
    resBody.message = "成功";
    resBody.data = path;
    ctx.response.body = resBody;
}

var fn_mbi_list = async(ctx,next) =>{
    var body = ctx.request.body,
        page = parseInt(body.page),
        pageSize = parseInt(body.pageSize);
    var param = {}
    if(body.workType != null){
        param.work_type = {
            $like: '%'+body.workType+'%'
        }
    }
    if(body.postTime != null){
        param.post_time = {
            $lte:body.postTime
        }
    }
    var obj = await entity.MsgBePost.findAndCountAll({
        where:param,
        limit:pageSize,
        offset: pageSize * (page-1)
    })
    if(obj.rows.length>=0){
        resBody.code = "200";
        resBody.message = "成功";
        resBody.data = obj.rows;
        ctx.response.body = resBody;
    }else{
        resBody.code = "500";
        resBody.message = "失败";
        resBody.data = null;
        ctx.response.body = resBody;
    }
}

var fn_msg_add = async(ctx,next)=>{
    var body = ctx.request.body;
    var obj = await entity.Msg.create({
        user_id: body.id,
        real_name: body.realName,
        work_type: body.workType,
        msg_type: body.msgType,
        address: body.address,
        price: body.price,
        contact: body.contact,
        work_time: body.workTime,
        remark: body.remark,
        create_time: new Date(),
        modify_time: new Date()
    })
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

var fn_resume_list = async(ctx,next)=>{
    var body = ctx.request.body,
        page = parseInt(body.page),
        pageSize = parseInt(body.pageSize);
    var param = {};
    if(body.workType != null){
        param.work_type = {
            $like: '%'+body.workType+'%'
        }
    }
    if(body.createTime != null){
        param.create_time = {
            $lte:body.createTime
        }
    }
    var obj = await entity.Resume.findAndCountAll({
        where:param,
        limit:pageSize,
        offset: pageSize * (page-1)
    })
    if(obj.rows.length>=0){
        resBody.code = "200";
        resBody.message = "成功";
        resBody.data = obj.rows;
        ctx.response.body = resBody;
    }else{
        resBody.code = "500";
        resBody.message = "失败";
        resBody.data = null;
        ctx.response.body = resBody;
    }
}

var fn_mbi_add = async(ctx,next)=>{
    var body = ctx.request.body;
    var obj = await entity.MsgBePost.create({
        msg_id:body.msgId,
        post_user_id: body.postUserId,
        post_user_name: body.postUserName,
        public_user_id: body.publicUserId,
        public_user_name: body.publicUserName,
        post_time: new Date(),
        work_type: body.workType
    })

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
    'POST /score/add': fn_score_add,
    'POST /resume/scanHistoryList': fn_resume_scanHistoryList,
    'POST /resume/update': fn_resume_update,
    'POST /user/updatePwd': fn_user_updatePwd,
    'POST /user/update': fn_user_update,
    'UPLOAD /user/upload': fn_user_upload,
    'POST /mbi/list': fn_mbi_list,
    'POST /msg/add': fn_msg_add,
    'POST /resume/list': fn_resume_list,
    'POST /mbi/add': fn_mbi_add
}