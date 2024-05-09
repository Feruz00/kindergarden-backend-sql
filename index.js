// const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path')

// process.on('uncaughtException', err => {
//   console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//   console.log(err.name, err.message);
//   process.exit(1);
// });

dotenv.config({ path: './config.env' });
const app = require('./server');
const sequelize = require('./config/database');
const GalleryType = require('./models/GalleryTypeModel');
const Gallery = require('./models/GalleryModel');

// GalleryType.hasMany(Gallery, {onDelete: 'CASCADE', as:'type'})
// Gallery.belongsTo(GalleryType, { onDelete: 'CASCADE', as:'type'})
Gallery.belongsTo(GalleryType, { foreignKey: 'type', targetKey: '_id', onDelete:'CASCADE' });

sequelize.sync()
    .then(()=>{
        console.log("DB connected successfully")
        const port = process.env.PORT || 3001;
        app.listen(port, ()=>{
            console.log(`Server listening on ${port} port`)
        })
    })
    .catch(err=>{
        console.log("Failed to connect db", err)
    })

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(process.env.DB)
//   .then(() => console.log('DB connection successful!'));

// const port = process.env.PORT || 3004;
// const server = app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  // app.close(() => {
  //   process.exit(1);
  // });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  app.close(() => {
    console.log('💥 Process terminated!');
  });
});