const {  DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Terbiye = sequelize.define("terbiye",{
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    header:{
        type: DataTypes.STRING,
        allowNull: false
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    },
     
})

module.exports = Terbiye