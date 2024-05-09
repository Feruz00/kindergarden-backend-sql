const router = require('express').Router()

const rateLimit = require('express-rate-limit');
const { register, protect, getUser, failedUser, changeInfo, changePassword, logout, uploadPhoto } = require('../controllers/AuthController');
const passport = require('passport');
const { deleteOne } = require('../controllers/handleFactory');
const User = require('../models/UserModel');
const upload = require('../middleware/uploadOption');
const checkStatus = require('../middleware/userOptions');

const limiter = rateLimit({
    max: 5,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});

router.route('/')
    .get(protect, getUser)
    .post(register)
    .put(protect, changeInfo)
    .patch(protect, changePassword)

router.route('/login')
    .post(limiter, passport.authenticate('local',{
        successRedirect:'/api/auth',
        failureRedirect:'/api/auth/fail'
    }))

router.route('/fail').get(failedUser)
router.route('/logout')
    .get(logout)
router.route('/img')
    .delete(deleteOne(User))
    .patch( upload.single('file'), uploadPhoto )
    .delete(deleteOne(User))

module.exports = router