/* eslint-disable no-undef */
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('Uncaught Exception. Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');
const mongoose = require('mongoose');

// MONGOOSE
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: true,
  })
  .then(() => {
    console.log('Connection success DB!');
  });

// START SERVER
const port = 3000;
const server = app.listen(port, () => {
  console.log(`listening on ${port}....`);
});

// UNHANDLED REJECTIONS
process.on('unhandledRejection', (err) => {
  console.log('Unhandled rejection. Shutting down server...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
