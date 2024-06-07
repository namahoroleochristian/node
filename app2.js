const nodemailer = require('nodemailer');
const env = require('dotenv').config();
const path = require('path');
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const session = require('express-session');
const bcrypt = require('bcrypt');
const app = express();

app.use(session({
  secret: '123',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true if using HTTPS
}));

// PostgreSQL connection pool
// const pool = new Pool({
//   user: 'eli',
//   host: 'localhost',
//   database: 'node_crud',
//   password: '2704',
//   port: 5432, // Default PostgreSQL port
// });




const pool2 = new Pool({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool2.connect((err) => {
  if (err) console.error('Database connection error:', err);
  else console.log('Database Connected!');
});

// Set views file
app.set('views', path.join(__dirname, 'views'));

// Set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Static files
app.use(express.static('public'));

// Prevent caching for all routes
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  next();
});

// Middleware to protect routes
function requireLogin(req, res, next) {
  if (req.session.loggedin) {
    next();
  } else {
    res.redirect('/');
  }
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/home.html');
});

app.get('/log', requireLogin, (req, res) => {
  const sql = 'SELECT * FROM crud';
  pool2.query(sql, (err, result) => {
    if (err) throw err;
    res.render('user_index', {
      title: 'CRUD Operation using NodeJS / ExpressJS / PostgreSQL',
      users: result.rows
    });
  });
});

app.get('/add', requireLogin, (req, res) => {
  res.render('user_add', {
    title: 'CRUD Operation using NodeJS / ExpressJS / PostgreSQL'
  });
});

app.post('/save', requireLogin, (req, res) => {
  const data = [req.body.name, req.body.email, req.body.phone_no];
  const sql = 'INSERT INTO crud(name, email, phone_no) VALUES ($1, $2, $3)';
  pool2.query(sql, data, (err, result) => {
    if (err) throw err;
    res.redirect('/log');
  });
});

app.get('/edit/:userId', requireLogin, (req, res) => {
  const userId = req.params.userId;
  const sql = 'SELECT * FROM crud WHERE id = $1';
  pool2.query(sql, [userId], (err, result) => {
    if (err) throw err;
    res.render('user_edit', {
      title: 'CRUD Operation using NodeJS / ExpressJS / PostgreSQL',
      user: result.rows[0]
    });
  });
});

app.post('/update', requireLogin, (req, res) => {
  const userId = req.body.id;
  const data = [req.body.name, req.body.email, req.body.phone_no, userId];
  const sql = 'UPDATE crud SET name = $1, email = $2, phone_no = $3 WHERE id = $4';
  pool2.query(sql, data, (err, result) => {
    if (err) throw err;
    res.redirect('/log');
  });
});

app.get('/delete/:userId', requireLogin, (req, res) => {
  const userId = req.params.userId;
  const sql = 'DELETE FROM crud WHERE id = $1';
  pool2.query(sql, [userId], (err, result) => {
    if (err) throw err;
    res.redirect('/log');
  });
});

app.get('/register', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.post('/add1', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const name = req.body.name;
    const email = req.body.email;

    const sql = 'INSERT INTO users (name, password) VALUES ($1, $2)';
    pool2.query(sql, [name, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting data into database:', err);
        res.status(500).send('Internal Server Error');
      } else {
        console.log('Data inserted successfully');
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
          }
        });

        const mailOptions = {
          from: {
            name: 'student portal',
            address: process.env.USER
          },
          to: req.body.email,
          subject: 'Confirmation',
          text: `Hello, you are now successfully registered as a student registerer staff using this email. Your username is ${req.body.name}, your password is ${req.body.password}. Thank you.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            return console.error('Error sending email:', error);
          }
          console.log('Email sent:', info.response);
        });

        res.redirect('/login');
      }
    });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).send();
  }
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/views/login.html');
});

app.post('/login', async (req, res) => {
  try {
    const name = req.body.name;
    const password = req.body.password;

    const selectUserSql = 'SELECT * FROM users WHERE name = $1';
    pool2.query(selectUserSql, [name], async (err, result) => {
      if (err) {
        console.error('Error querying database:', err);
        return res.status(500).send('Internal Server Error');
      }

      const user = result.rows[0];

      if (!user) {
        return res.status(400).send('Cannot find user');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        req.session.loggedin = true;
        req.session.username = name;
        res.redirect('/log');
      } else {
        res.sendFile(__dirname + '/views/home.html');
      }
    });

  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

app.get('/protected', requireLogin, (req, res) => {
  res.send('This is a protected route.');
});

// Server Listening
app.listen(4000, () => {
  console.log('Server is running at port 4000');
}); 
module.exports = pool2;