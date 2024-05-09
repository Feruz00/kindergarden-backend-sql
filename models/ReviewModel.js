const { DataTypes} = require('sequelize')
const sequelize = require('../config/database')

const Review = sequelize.define("review", {
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    review:{
        type: DataTypes.STRING,
        allowNull: false
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    job:{
        type: DataTypes.STRING,
        allowNull: false
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false
    },
    "bio":DataTypes.SMALLINT
})

module.exports = Review