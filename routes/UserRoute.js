const { protect, register, resetPassword } = require('../controllers/AuthController')
const { getAll, createOne, deleteAll, deleteOne, updateOne, getOne } = require('../controllers/handleFactory')
const { restrictTo } = require('../middleware/restrictTo')
const upload = require('../middleware/uploadOption')
const User = require('../models/UserModel')

const router = require('express').Router()

router.use(protect)
// Member bn islemek
// 
router.route('/')
    .get(getAll(User))
    .post( upload.none(),  register)
    // .delete( deleteAll(User, {role: 'member'}) )



router.route('/:id')
    .delete( deleteOne(User))
    .patch( updateOne(User))
    .get(getOne(User))
    .put( resetPassword)

module.exports = router