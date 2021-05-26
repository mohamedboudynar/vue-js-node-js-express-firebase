var express     = require('express');
var router      = express.Router();

router.use(function(req, res, next) { // run for any & all requests
  console.log("Connection to the API.."); // set up logging for every API call
  next(); // ..to the next routes from here..
});
/*
router.route('/This')
  .get(function(req, res) { });
  .post(function(req, res) { });

...*/
const path = __dirname + '/app/views/';


  router.route('/')
  .get(function(req, res) { 
    res.sendFile(path + "index.html");

  }).post(function(req, res) { 
    res.sendFile(path + "index.html");
 
  })
 // .post(function(req, res) { });
 router.route('/home')
 .get(function(req, res) { 
   res.sendFile(__dirname +"index.html");

 }) .post(function(req, res) { 
    res.sendFile(__dirname +"index.html");
 
  });
 router.route('/login')
 .get(function(req, res) { 
   res.sendFile(path + "index.html");

 })
 router.route('/register')
 .get(function(req, res) { 
   res.sendFile(path + "index.html");

 })
 router.route('/forgot_password')
 .get(function(req, res) { 
   res.sendFile(path + "index.html");

 })
 router.route('/dashboard')
 .get(function(req, res) { 
   res.sendFile(path + "index.html");

 })

 router.route('/my_profile')
 .get(function(req, res) { 
   res.sendFile(path + "index.html");

 })
 router.route('/liste_user')
 .get(function(req, res) { 
   res.sendFile(path + "index.html");

 })

 router.route('/*')
 .get(function(req, res) { 
   res.sendFile(path + "index.html");

 })
/*
app.get('/', function (req,res) {
    res.sendFile(path + "index.html");
  });
  app.get('/home', function (req,res) {
    res.sendFile(path + "index.html");
  });
  app.get('/login', function (req,res) {
    res.sendFile(path + "index.html");
  });
  app.get('/register', function (req,res) {
    res.sendFile(path + "index.html");
  });
  app.get('/dashboard', function (req,res) {
    res.sendFile(path + "index.html");
  });
  app.get('/liste_user', function (req,res) {
    res.sendFile(path + "index.html");
  });
  app.get('/my_profile', function (req,res) {
    res.sendFile(path + "index.html");
  });
  app.get('/forgot_password', function (req,res) {
    res.sendFile(path + "index.html");
  });
  app.get('/*', function (req,res) {
    res.sendFile(path + "index.html");
  });
*/
module.exports = {
    routes: router
}