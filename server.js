const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const _ = require('lodash');
//const path = __dirname + '/app/views/';
const path = __dirname + '/public/';
const app = express();

app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//const db = require("./app/models");

//db.sequelize.sync();
/*
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
/*
var myRoutes = require('./app/routes/routes');

app.use('/api', myRoutes.routes);
*/

var admin = require("firebase-admin");
var checkIfAuthenticated =require('./middlewares/auth-middleware')
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://laravelvueoneui-default-rtdb.firebaseio.com"
});

/*admin.auth().listUsers().then(data=>{
  console.log(data.users)
})*/
app.get('/api/userslistt',function (req,res) {
  console.log(req.headers.Authorization)
})

const getAuthToken=(req, res) => {
  console.log(req.headers.Authorization)

  /*try {
    const { authToken } = req.headers.authorization;
    const userInfo =  admin
      .auth()
      .verifyIdToken(authToken);
    req.authId = userInfo.uid;
    return next();
  } catch (e) {
    return res
      .status(401)
      .send({ error: 'You are not authorized to make this request' });
  }*/
};
app.get('/api/checkadmin',checkIfAuthenticated,function(req,res){
//console.log(req.headers.authorization.split(' ')[1])
res.json('ok')
})

app.post('/api/setadmin',function(req,res){
  //console.log(req.headers.authorization.split(' ')[1])
  admin
  .auth()
  .setCustomUserClaims(req.body.id, { admin: false })
  .then(() => {
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
  });
  })

  /*app.get('/api/setadmin',function(req,res){
    //console.log(req.headers.authorization.split(' ')[1])
    admin
    .auth()
    .setCustomUserClaims("g5ZZlBWAE7V8CrEQindVg6Em3pY2", { admin: true })
    .then(() => {
      // The new custom claims will propagate to the user's ID token the
      // next time a new one is issued.
    });
    })*/
  
/*app.post('/api/roles',function(req,res){
  //console.log(req.headers.authorization.split(' ')[1])
   
//console.log(req.body)

  admin
  .auth()
  .getUser(req.body.id)
  .then((userRecord) => {
    // The claims can be accessed on the user record.
   // console.log(userRecord.customClaims.admin);
//if(userRecord.customClaims.admin==true){
//  res.json('admin')
console.log(userRecord.customClaims.admin)

//}else{
 // res.json('user')



//}

  }).catch(()=>{
  console.log('df')
  });
})*/
app.get('/api/userslist',checkIfAuthenticated,function (req,res) {
  
  //console.log(req.headers.authorization)

  //res.sendFile(path + "index.html");
  /*admin.auth().listUsers().then(data=>{
  // console.log(data.users)
  //res.data=data.users;
//  res.json(data.users);
res.json(_.sortBy(data.users, ['data.users.metadata.creationTime'],['asc']))
//res.json(data.users.metadata)
//console.log(data.users[0].metadata.creationTime)
 })
 */

 const listAllUsers = (nextPageToken) => {
  // List batch of users, 1000 at a time.
  admin
    .auth()
    .listUsers(nextPageToken)
    .then((listUsersResult) => {
     /* myArray = _.sortBy(listUsersResult.users, function(dateObj) {
        return new Date(dateObj.metadata.creationTime);
        
      });*/
    //  res.json(
        
     // res.json(_.sortBy(listUsersResult.users, ['email'],['asc']))
      
      //);

      res.json(_.orderBy(listUsersResult.users, (a)=>new Date([a.metadata.creationTime]),['desc']))
//res.json(listUsersResult.users);
     /*listUsersResult.users.forEach((userRecord) => {
        //console.log('user', userRecord.toJSON());
      });*/
      if (listUsersResult.pageToken) {
        // List next batch of users.
        res.json(listAllUsers(listUsersResult.pageToken));
        
      }
    })
    .catch((error) => {
      console.log('Error listing users:', error);
    });
};
listAllUsers();

//console.log(myArray)


 });
app.delete('/api/deleteUser/:id', function (req,res) {
  const id = req.params.id;
  //res.sendFile(path + "index.html");
  admin.auth().deleteUser(id).then(() => {
    console.log('Successfully deleted user');
    admin.auth().listUsers().then(data=>{
      // console.log(data.users)
      //res.data=data.users;
    //  res.json(data.users);
    res.json(_.orderBy(data.users, (a)=>new Date([a.metadata.creationTime]),['desc']))

    //res.json(data.users.metadata)
    //console.log(data.users[0].metadata.creationTime)
     })
  })
  .catch((error) => {
    console.log('Error deleting user:', error);
  });
 });

 app.post('/api/addUser', function (req,res) {
  
  //res.sendFile(path + "index.html");
  //console.log(req.body)
  admin.auth().createUser({
    email: req.body.email,
    password: req.body.password,
    displayName: req.body.name,
    emailVerified:req.body.emailVerified
  }).then((ress)=>{
    admin
    .auth()
    .setCustomUserClaims(ress.uid, { admin: req.body.role })
    .then(() => {
      // The new custom claims will propagate to the user's ID token the
      // next time a new one is issued.
      admin.auth().listUsers().then(data=>{
        // console.log(data.users)
        //res.data=data.users;
      //  res.json(data.users);
      res.json(_.orderBy(data.users, (a)=>new Date([a.metadata.creationTime]),['desc']))
    
      //res.json(data.users.metadata)
      //console.log(data.users[0].metadata.creationTime)
       });
    });
 
 
  }).catch((err)=>{
    console.log('Error adding user:', err);
  
  
  });;

  
  /*.then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log('Successfully created new user:', userRecord.uid);
  })
  .catch((error) => {
    console.log('Error creating new user:', error);
  });*/
})

app.get('/api/user/edit/:id',function (req,res) {
  const id = req.params.id;
  //res.sendFile(path + "index.html");
  admin.auth().getUser(id).then((userRecord) => {
    // See the UserRecord reference doc for the contents of userRecord.
    //console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    res.json(userRecord)
  }).catch((error) => {
    console.log('Error fetching user data:', error);
  });
});

app.put('/api/user/edit/:id',function (req,res) {
  const id = req.params.id;
  //console.log(res.password)
  //res.sendFile(path + "index.html");
  admin.auth().updateUser(id,{
   // email: req.body.email,
   displayName: req.body.name,
  password: req.body.password?req.body.password: res.password,
  emailVerified:req.body.emailVerified


  }).then((ress) => {
    admin
    .auth()
    .setCustomUserClaims(ress.uid, { admin: req.body.role })
    .then(() => {
      // The new custom claims will propagate to the user's ID token the
      // next time a new one is issued.
      admin.auth().listUsers().then(data=>{
        // console.log(data.users)
        //res.data=data.users;
      //  res.json(data.users);
      res.json(_.orderBy(data.users, (a)=>new Date([a.metadata.creationTime]),['desc']))
    
      //res.json(data.users.metadata)
      //console.log(data.users[0].metadata.creationTime)
       });
    });
    // See the UserRecord reference doc for the contents of userRecord.
    //console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
  //  admin.auth().listUsers().then(data=>{
      // console.log(data.users)
      //res.data=data.users;
    //  res.json(data.users);
  //  res.json(_.orderBy(data.users, (a)=>new Date([a.metadata.creationTime]),['desc']))
  
    //res.json(data.users.metadata)
    //console.log(data.users[0].metadata.creationTime)
  //   })
  }).catch((error) => {
    console.log('Error fetching user data:', error);
  });
});

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
//require("./app/routes/turorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});