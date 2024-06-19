const {  DataTypes } = require("sequelize");
const sequelize = require("../config/database");


const Dashboard = sequelize.define("dashboard",{
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true
    },
    header:{
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: false
    },
    mainImg:{
        type: DataTypes.STRING,
        allowNull: false
    },
     
})

module.exports = Dashboard