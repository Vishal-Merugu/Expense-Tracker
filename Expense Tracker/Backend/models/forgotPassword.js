const { Sequelize } = require('sequelize')

const sequelize = require("../util/database");

const ForgotPasswordRequest = sequelize.define('forgotpasswordrequests',{
    id : {
        type : Sequelize.STRING,
        isNull : false,
        primaryKey : true
    },
    isActive : {
        type : Sequelize.BOOLEAN,
        defaultValue : true
    }
}) 

module.exports = ForgotPasswordRequest;