const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('expense',"root", "Vishal@360",{
    dialect : "mysql",
    host : "localhost"
});

module.exports = sequelize;