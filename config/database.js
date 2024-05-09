const {Sequelize} = require('sequelize')

const sequelize = new Sequelize(process.env.dbName, process.env.dbRoot, process.env.dbPassword, {
    dialect:'postgres',
    host: process.env.dbHost
})

module.exports = sequelize