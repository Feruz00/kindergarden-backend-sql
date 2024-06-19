const User = require("../models/UserModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
// const passport = require('passport')
const bcrypt = require('bcryptjs')

const register = catchAsync(async (req, res, next) => {
    const { password, ...other } = req.body;
    // if(req.body.secret !== process.env.mySecret) res.status(403).json(({message: 'Failed'}))
    const pass = User.hashPassword(password);
    const user = await User.create({
        ...other,
        password: pass
    });
    res.json(user);
});

const failedUser = catchAsync(async (req, res, next) => {
    return res.status(403).json({
        message: 'User not logged in'
    });
});

const getUser = (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }
    return res.status(403).json({
        message: 'User not logged in'
    });
};

const logout = (req, res) => {
    req.logout(err=>{
        console.log(err)
    });
    res.json();
};

const changeInfo = catchAsync(async (req, res, next) => {
    // console.log(req.user)
    // console.log(req.body)
    const [rowsAffected, updatedUsers] = await User.update( req.body,  {where: {username: req.user.username}, returning: true} );
    // console.log(req.body)
    // await user.update(req.body);
    // console.log(user)
    if(rowsAffected===0) console.log("user data not changed")
    const {password, ...user} = updatedUsers[0]

    res.json(user);
});

const changePassword = catchAsync(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findOne({where: {username: req.user.username}});
    if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }
    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (isPasswordCorrect) {
        const hash = User.hashPassword(newPassword);
        user.password = hash;
        await user.save();
        return res.json({ success: true, message: 'Your password has been changed successfully' });
    } else {
        res.status(400).json({ success: false, message: 'Incorrect password' });
    }
});

const uploadPhoto = catchAsync(async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const file = req.file.path;
        const [rowsAffected, updatedUsers] = await User.update({ url: file }, {where: {username: req.user.username}, returning: true});
        // await user.update();
        const {password, ...user} = updatedUsers[0].dataValues
        req.user.url = user.url
        // console.log(user, req.user)

        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

const protect = catchAsync(async (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.status(403).json({ message: 'Bu sahypa girip bilmeýärsiňiz' });
});

const resetPassword = catchAsync(async (req, res, next) => {
    const found = await User.findByPk(req.params.id);
    const hash = User.hashPassword(req.body.password);
    found.password = hash;
    await found.save();
    res.json(found);
});

module.exports = {
    protect,
    getUser,
    logout,
    register,
    failedUser,
    resetPassword,
    uploadPhoto,
    changeInfo,
    changePassword
};
