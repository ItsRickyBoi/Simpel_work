
// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // const userRoutes = require('./routes/userRoutes');
// // const authRoutes = require('./routes/authRoutes');
// // const taskRoutes = require('./routes/taskRoutes');
// // const attendanceRoutes = require('./routes/attendanceRoutes');
// // const companyRoutes = require('./routes/companyRoutes');

// // const db = require('./config/db');

// // const app = express();

// // app.use(cors());
// // app.use(bodyParser.json());
// // app.use(bodyParser.urlencoded({ extended: true }));

// // db.authenticate()
// //   .then(() => {
// //     console.log('Successfully connected to the database!');
// //   })
// //   .catch(err => {
// //     console.error('Unable to connect to the database:', err);
// //   });

// // app.use('/api/users', userRoutes);
// // app.use('/api/auth', authRoutes);
// // app.use('/api/tasks', taskRoutes);
// // app.use('/api/attendance', attendanceRoutes);
// // app.use('/api/company', companyRoutes);

// // app.get('/', (req, res) => {
// //   res.send('Welcome to the API');
// // });

// // const PORT = process.env.PORT || 3000;
// // app.listen(PORT, () => {
// //   console.log(`Server is running on port ${PORT}`);
// // });

// const express = require('express');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const userRoutes = require('./routes/userRoutes');
// const authRoutes = require('./routes/authRoutes');
// const taskRoutes = require('./routes/taskRoutes');
// const attendanceRoutes = require('./routes/attendanceRoutes');
// const companyRoutes = require('./routes/companyRoutes');
// const db = require('./config/db');

// const app = express();

// app.use(cors({
//   origin: 'http://localhost:5173', // Adjust the origin as needed
//   credentials: true
// }));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(session({
//   secret: 'strv122bisbased', // Replace with a strong secret key
//   resave: false,
//   saveUninitialized: false,
//   cookie: {
//     secure: false, // Set to true in production and false in development
//     maxAge: 1000 * 60 * 60 * 24 // 1 day
//   }
// }));

// db.authenticate()
//   .then(() => {
//     console.log('Successfully connected to the database!');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

// app.use('/api/users', userRoutes);
// app.use('/api/auth', authRoutes);
// app.use('/api/tasks', taskRoutes);
// app.use('/api/attendance', attendanceRoutes);
// app.use('/api/company', companyRoutes);

// app.get('/', (req, res) => {
//   res.send('Welcome to the API');
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const path = require('path');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const companyRoutes = require('./routes/companyRoutes');

const db = require('./config/db');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.authenticate()
  .then(() => {
    console.log('Successfully connected to the database!');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(session({
  secret: 'strv122bisbased', // Replace with a strong secret key
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: true, // Set to true if using HTTPS
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/company', companyRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
