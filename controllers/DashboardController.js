const Dashboard = require("../models/DashboardModel")
const catchAsync = require("../utils/catchAsync")

const createDashboard = catchAsync(
    async (req, res, next)=>{
        // console.log("geldim icinde:", req.body.header, req.body.list)
        // console.log("files", req.files)
        const {mainImg} = req.files
        const picturePath = mainImg[0].path
        const data = await Dashboard.create({
            ...req.body,
            mainImg:picturePath
        })
        // console.log(data)
        res.send(data)

    }
)

const updatePhotoDashboard = catchAsync(
    async (req, res, next)=>{
        const mainImg = req.files.file ?  req.files.file[0].path : undefined
        const data = await Dashboard.update({
            mainImg
        },{
            where:{
                _id: req.params.id}
        })
        res.send(data)

    }
)

module.exports = {createDashboard, updatePhotoDashboard}