const {  DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const AboutUs = sequelize.define("about",{
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    header:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false
    },
    content:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    list: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true
    },
    mainImg:{
        type: DataTypes.STRING,
        allowNull: false
    },
    smallImg: DataTypes.STRING 
})

module.exports = AboutUs