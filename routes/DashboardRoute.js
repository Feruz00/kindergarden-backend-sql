const { protect } = require('../controllers/AuthController');
const { createDashboard, updatePhotoDashboard } = require('../controllers/DashboardController');
const { getAll, updateOne, deleteOne } = require('../controllers/handleFactory');
const upload = require('../middleware/uploadOption');
const Dashboard = require('../models/DashboardModel');

const router = require('express').Router()

router.route('/')
    .get(getAll(Dashboard))
    .post( protect,  upload.fields([
        {name: 'mainImg', maxCount: 1},
    ]), createDashboard )

router.use(protect );


router.route('/:id')
    .put(updateOne(Dashboard))
    .patch(upload.fields([
        {name: 'file', maxCount: 1},
    ]), updatePhotoDashboard)
    .delete(deleteOne(Dashboard))
module.exports = router;