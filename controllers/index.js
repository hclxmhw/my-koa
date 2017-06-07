var entity = require('../model/model')
var async = require('async')

var fn_login = async(ctx,next)=>{
    // var
    //     username = ctx.request.body.username || "",
    //     password = ctx.request.body.password || "";
    // var p = await entity.User.findAll({
    //     where: {
    //         mobile:username,
    //         login_pwd:password
    //     }
    // })
    // if(p.length>0){
    //     console.log('query.' + JSON.stringify(p));
    //     ctx.response.body = JSON.parse(`{"code":"200","msg":"登录成功！"}`);
    // }else{
    //     console.log('query.' + JSON.stringify(p));
    //     ctx.response.body = JSON.parse(`{"code":"500","msg":"登录成功！"}`);
    // }
        
    async.series({
        one: function(callback) {
            var
                username = ctx.request.body.username || "",
                password = ctx.request.body.password || "";
            (async () => {
                var p = await entity.User.findAll({
                    where: {
                        mobile:username,
                        login_pwd:password
                    }
                });
                if(p.length>0){
                    console.log('query.' + JSON.stringify(p));
                    callback(null,p);
                }else{
                    console.log('query.' + JSON.stringify(p));
                    callback('err',p);
                }
            })();
                
            // res.then(function (p) {
            //     if(p.length>0){
            //         console.log('query.' + JSON.stringify(p));
            //         callback(null,p);
            //     }else{
            //         console.log('query.' + JSON.stringify(p));
            //         callback('err',p);
            //     }
            // }).catch(function (err) {
            //     console.log('failed: ' + err);
            //     callback('networkErr',err);
            // });
        }
    }, function(err, results) {
        // results is now equal to: {one: 1, two: 2}
        if(err){
            if(err == 'err'){
                ctx.response.body = JSON.parse(`{"code":"500","msg":"密码错误！"}`);
            }else if(err == 'networkErr'){
                ctx.response.body = JSON.parse(`{"code":"500","msg":"网络异常！"}`);
            }
        }else{
            ctx.response.body = JSON.parse(`{"code":"200","msg":"登录成功！"}`);
        }

    });
}

var fn_index = async(ctx,next) => {
    ctx.response.redirect('./web/index.html');
}

module.exports = {
    'POST /login':fn_login,
    'GET /':fn_index
}