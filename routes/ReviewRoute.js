const { protect } = require('../controllers/AuthController')
const { createReview } = require('../controllers/ReviewController')
const { getAll, deleteAll, getOne, deleteOne, updateOne, updatePhoto } = require('../controllers/handleFactory')
const { restrictTo } = require('../middleware/restrictTo')
const upload = require('../middleware/uploadOption')
const Review = require('../models/ReviewModel')

const router = require('express').Router()

router.route('/')
    .post(protect,  upload.single('file'), createReview)
    .get(getAll(Review))
    .delete(protect,  deleteAll(Review))

router.route('/:id')
    .get(getOne(Review))
    .delete(protect,  deleteOne(Review))
    .patch(protect,  updateOne(Review))

router.route('/:id/img')
    .patch(protect,  upload.single('file'), updatePhoto(Review))

module.exports = router