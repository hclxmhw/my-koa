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

module.exports = {
    'User': User
}