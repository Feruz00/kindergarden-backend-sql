const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Teacher = sequelize.define("teacher",{
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    job:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Teacher