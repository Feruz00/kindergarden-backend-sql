const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const GalleryType = require("./GalleryTypeModel");

const Gallery = sequelize.define("gallery",{
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
    picture: DataTypes.STRING,
    url:{
        type: DataTypes.STRING,
        allowNull: false
    },
    images: {
        type: DataTypes.ARRAY(DataTypes.STRING), 
        allowNull: true 
    },
    // type:{
    //     allowNull: false,
    //     type:DataTypes.INTEGER,
    //     references:{
    //         model:'gallerytypes',
    //         key:'_id'
    //     }
    // }
})




module.exports = Gallery