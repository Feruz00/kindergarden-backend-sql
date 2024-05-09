const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Gallery = require("./GalleryModel");
const GalleryType = sequelize.define("gallerytype",{
    _id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})
// GalleryType.hasMany(Gallery, {onDelete: 'CASCADE'})

module.exports=GalleryType