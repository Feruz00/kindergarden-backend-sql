const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const fs = require('fs');

const deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.destroy({ where: { _id: req.params.id } });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    // Add your file deletion logic if needed
    res.status(204).json({
      status: 'success',
      data: null
    });
});

const deleteAll = (Model, filter = {}) =>
  catchAsync(async (req, res, next) => {
    await Model.destroy({ where: filter });

    // Add your file deletion logic if needed

    res.status(204).json({
      status: 'success',
      data: null
    });
});

const updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const [numAffected, affectedRows] = await Model.update(req.body, {
      where: { _id: req.params.id },
      returning: true // Ensure it returns the updated record(s)
    });

    if (numAffected === 0) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: affectedRows[0]
      }
    });
  });

const createOne = (Model) => 
  catchAsync(async (req, res, next) => {
    console.log(req.body)
    const doc = await Model.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            data: doc
        }
    });
  });

const getOne = (Model, popOptions) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByPk(req.params.id, {include: popOptions});

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      data: doc
    });
});

const getAll = (Model, filter = {}, popOptions) =>
  catchAsync(async (req, res, next) => {
    const fil = req.query ? req.query: filter?filter:{}
    // console.log("getAll geldim")
    const docs = await Model.findAll({ where: fil, include: popOptions });

    res.status(200).json({
      status: 'success',
      results: docs.length,
      data: docs
    });
  });

const updatePhoto = Model => 
  catchAsync(async (req, res, next) => {
    const { path } = req.file;
    const record = await Model.findByPk(req.params.id);
    const prevUrl = record.url;

    await Model.update({ url: path }, { where: { _id: req.params.id } }); 
    if (prevUrl && fs.existsSync(prevUrl)) {
      fs.unlinkSync(prevUrl);
    }
    res.send(req.file);
  });

module.exports = { deleteOne, deleteAll, updateOne, createOne, getOne, getAll, updatePhoto };
