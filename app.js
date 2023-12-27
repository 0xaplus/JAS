const express = require("express");
const { connectToMongoDB } = require("./config/db");
const jobsRoute = require("./routes/jobsRoutes");
const applicationRoute = require("./routes/applicationsRoutes");
const userModel = require('./models/userModel');

const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login'); //authorization middleware
const session = require('express-session');  //session middleware
require("dotenv").config();

const PORT = process.env.PORT;

const app = express();
connectToMongoDB();

app.use(express.json());

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));


app.use(passport.initialize()); // initialize passport middleware
app.use(passport.session()); // use passport session middleware

passport.use(userModel.createStrategy()); // use the user model to create the strategy

// serialize and deserialize the user object to and from the session
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

app.set('views', 'views');
app.set('view engine', 'ejs');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse multipart/form-data
// app.use(express.multipart({ uploadDir: __dirname + '/uploads' }));

// change to /api/v1/jobs later
app.use("/jobs", jobsRoute);
app.use("/jobs", applicationRoute);

app.get("/", (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// renders the signup page
app.get('/signup', (req, res) => {
  res.render('signup');
});

// handles the signup request for new users
app.post('/signup', (req, res) => {
  const user = req.body;
  userModel.register(new userModel({ username: user.username }), user.password, (err, user) => {
      if (err) {
          console.log(err);
          res.status(400).send(err);
      } else {
          passport.authenticate('local')(req, res, () => {
              res.redirect("/books")
          });
      }
  });
});


// handles the login request for existing users
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/books');
});

//catch errors middleware
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Something broke!');
});

// handles the logout request
app.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


app.listen(PORT, () => {
  console.log("Server is listening on PORT", PORT);
});
