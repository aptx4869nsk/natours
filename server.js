const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Synchronous --- so doesn't need server.close(()=> process.exit(1))
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1); // 0 for success, 1 for uncaught exception
});

dotenv.config({ path: './config.env' });

const app = require('./app');

/**
 * MongoDB Cloud
 */
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'));

/**
 * MongoDB Local
 */
// mongoose
//   .connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//   })
//   .then(() => console.log('DB Local Connection successful!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App runing on port ${port}`);
});

// Global rejection
// Listening event porcess.on('')
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1); // 0 for success, 1 for uncaught exception
  });
});
