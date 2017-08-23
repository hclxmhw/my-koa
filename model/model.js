const Sequelize = require('sequelize');
const config = require('../config');
var sequelizeInstance = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
})
var User = sequelizeInstance.define('user_info', {
    id: {
        type: Sequelize.STRING(32),
        primaryKey: true
    },
    user_type: Sequelize.STRING(2),
    login_pwd: Sequelize.STRING(32),
    mobile: Sequelize.STRING(32),
    login_name: Sequelize.STRING(32),
    age: Sequelize.STRING(2),
    real_name: Sequelize.STRING(32),
    id_card_num: Sequelize.STRING(32),
    id_card_front: Sequelize.STRING(64),
    id_card_back: Sequelize.STRING(64),
    create_time: Sequelize.DATE,
    modify_time: Sequelize.DATE
},{
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    freezeTableName: true //设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
})

var Msg = sequelizeInstance.define('msg_info',{
    id:{
        type: Sequelize.STRING(32),
        primaryKey: true
    },
    user_id: Sequelize.STRING(32),
    real_name: Sequelize.STRING(32),
    work_type: Sequelize.STRING(32),
    msg_type: Sequelize.STRING(32),
    address: Sequelize.STRING(64),
    price: Sequelize.STRING(8),
    contact: Sequelize.STRING(32),
    work_time: Sequelize.DATE,
    remark: Sequelize.STRING(64),
    create_time: Sequelize.DATE,
    modify_time: Sequelize.DATE
},{
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    freezeTableName: true //设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
})

var Resume = sequelizeInstance.define('resume_info',{
    id:{
        type: Sequelize.STRING(32),
        primaryKey: true
    },
    user_id: Sequelize.STRING(32),
    real_name: Sequelize.STRING(32),
    work_type: Sequelize.STRING(32),
    age: Sequelize.STRING(2),
    certificate: Sequelize.STRING(64),
    work_year: Sequelize.STRING(2),
    work_exp: Sequelize.STRING(124),
    exp_salary: Sequelize.STRING(124),
    work_address: Sequelize.STRING(64),
    scan_times: Sequelize.INTEGER(11),
    open: Sequelize.STRING(1),
    remark: Sequelize.STRING(124),
    create_time: Sequelize.DATE,
    modify_time: Sequelize.DATE,
    id_card_num: Sequelize.STRING(32),
    mobile: Sequelize.STRING(32)
},{
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    freezeTableName: true //设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
})

var Msg_be_post_info = sequelizeInstance.define('msg_be_post_info',{
    id:{
        type: Sequelize.STRING(32),
        primaryKey: true
    },
    msg_id: {
        type:Sequelize.STRING(32),
        references: {
            model: 'Msg',
            key: 'id'
        },
    },
    post_user_id: Sequelize.STRING(32),
    post_user_name: Sequelize.STRING(32),
    public_user_id: Sequelize.STRING(32),
    public_user_name: Sequelize.STRING(32),
    post_time: Sequelize.DATE,
    work_type: Sequelize.STRING(32)
},{
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    freezeTableName: true //设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
})

var Resume_scan_history = sequelizeInstance.define('resume_scan_history',{
    id:{
        type: Sequelize.STRING(32),
        primaryKey: true
    },
    scan_name: Sequelize.STRING(32),
    work_type: Sequelize.STRING(32),
    scan_time: Sequelize.DATE,
    resume_user_id: Sequelize.STRING(32),
    scan_user_id: Sequelize.STRING(32)
},{
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    freezeTableName: true //设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
})

var Score = sequelizeInstance.define('score_info',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        initialAutoIncrement:1
    },
    user_id: Sequelize.STRING(32),
    real_name: Sequelize.STRING(32),
    score: Sequelize.STRING(1),
    from_id: Sequelize.STRING(32),
    score_time: Sequelize.DATE
},{
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    freezeTableName: true //设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
})

var Sms_valid = sequelizeInstance.define('sms_valid',{
    id:{
        type: Sequelize.STRING(32),
        primaryKey: true
    },
    mobile: Sequelize.STRING(32),
    valid_code: Sequelize.STRING(6),
    create_time: Sequelize.DATE
},{
    timestamps: false, //为模型添加 createdAt 和 updatedAt 两个时间戳字段
    freezeTableName: true //设置为true时，sequelize不会改变表名，否则可能会按其规则有所调整
})

// var fn_find = async (entity,params) =>{
//     var e =  await entity.findAll({
//         where: params
//     })
//     return e;
//     // .then(function (p) {
//     //     console.log('query.' + JSON.stringify(p));
//     //     return p;
//     // }).catch(function (err) {
//     //     console.log('failed: ' + err);
//     //     return err;
//     // });
// }

Msg.hasOne(Msg_be_post_info,{foreignKey:'msg_id',as:'MsgId'})
sequelizeInstance.sync();
module.exports = {
    'sequelizeInstance':sequelizeInstance,
    'User': User,
    'Msg': Msg,
    'Resume': Resume,
    'MsgBePost': Msg_be_post_info,
    'ResumeScanHistory': Resume_scan_history,
    'Score': Score,
    'SmsValid': Sms_valid
}