const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Subject = sequelize.define("subject",{
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    url:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Subject