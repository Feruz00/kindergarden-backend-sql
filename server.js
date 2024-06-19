const express = require('express')
const session = require('express-session')
const app = express()
const path = require('path')
const passport = require('passport')
const {Strategy} = require('passport-local')
const User = require('./models/UserModel')
const bcrypt = require('bcryptjs')
const AppError = require('./utils/appError')
const errorHandling = require('./middleware/errorHandling')
const cors = require('cors')
// const compression = require('compression')
const morgan = require('morgan');
const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');

app.use(
    helmet()
  );


app.use(cors({
    origin: [process.env.CLIENT],
    credentials: true
}))

app.use(xss());
app.use(morgan('tiny'))

app.use(
    hpp({
      whitelist: [
        'type',
      ]
    })
);


app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(session({
    secret: process.env.SECRET,
    saveUninitialized: true,
    resave: false,
    // rolling: true
}))

app.use(passport.initialize())
app.use(passport.session())


passport.use(new Strategy(async function verify(username, password, cb){
    try {
        const user = await User.findOne({where: {username:username}})
        
        if(user){
            if(user.comparePassword(password)){
                const {password:newPassword, _id, ...other} = user.toJSON()

                cb(null, {...other, id: _id})
            }
            else{
                cb(null, false)
            }
        }
        else{
            cb("User not found")
        }
    } catch (error) {
        // cb(error)
    }
}))

passport.serializeUser((user, cb)=>{
    cb(null, user)
})

passport.deserializeUser((user, cb)=>{
    cb(null, user)
})

app.use( '/uploads', express.static( path.join(__dirname, 'uploads')))
app.use( '/uploads/pdf', express.static( path.join(__dirname, 'uploads', "pdf")))

app.use('/api/education', require('./routes/EducationRoute'))
app.use('/api/teachers', require('./routes/TeacherRoute'))
app.use('/api/reviews', require('./routes/ReviewRoute'))
app.use('/api/subjects', require('./routes/SubjectRoute'))
app.use('/api/galtype', require('./routes/GalleryTypeRoute'))
app.use('/api/gallery', require('./routes/GalleryRoute'))

app.use('/api/auth', require('./routes/AuthRoute'))
app.use('/api/users', require('./routes/UserRoute'))
app.use('/api/about', require('./routes/AboutRoute'))
app.use('/api/dashboard', require('./routes/DashboardRoute'))
app.use('/api/terbiye', require('./routes/TerbiyeRoute'))
app.use('/api/footer', require('./routes/FooterRoute'))

app.all("*", (req,res, next)=>{
    next(new AppError('Bu sahypa kesgitlenmedik', 404))
})

app.use(errorHandling)

module.exports = app