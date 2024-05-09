const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require('bcryptjs');

class User extends Model {
  // Custom instance method to compare passwords
  comparePassword(password) {
    return bcrypt.compareSync(password, this.password);
  }

  // Custom class method to hash passwords
  static hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }
}

User.init({
  id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey:true,
        field: '_id'
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: { type: DataTypes.STRING, allowNull: false },
  status:{
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  fullName:{
    type: DataTypes.STRING,
    allowNull: true
  },
  url:{
    type: DataTypes.STRING,
    allowNull: true
  },
  bio:{
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'user',
  timestamps: false // If you don't need timestamps
});

module.exports = User;
