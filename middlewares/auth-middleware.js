
var admin = require("firebase-admin");


module.exports = checkIfAuthenticated = (req, res, next) => {
  if(!req.headers.authorization){
    return res.status(401).send('You are not authorized to make this request')
  }

 var idToken = req.headers.authorization.split(' ')[1];
 if(idToken === null ){
  return res.status(401).send('Unauthorised request')
}
  admin.auth().verifyIdToken(idToken).then((decodedToken) => {
 if (decodedToken.admin == true) {
   
  return next();
    }
    throw new Error('unauthorized')
  //  console.log(decodedToken.uid);
/*  admin.auth().setCustomUserClaims(decodedToken.uid, {admin: false}).then(() => {
    // The new custom claims will propagate to the user's ID token the
    // next time a new one is issued.
    console.log('admin')
  });*/
  })
  .catch((error) => {
    return res
         .status(401)
         .send({ error: 'You are not authorized to make this request' });
  });

 };

 
/*
const getAuthToken = (req, res, next) => {
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};


module.exports = checkIfAuthenticated = (req, res, next) => {
 getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};
//eyJhbGciOiJSUzI1NiIsImtpZCI6IjMwMjUxYWIxYTJmYzFkMzllNDMwMWNhYjc1OTZkNDQ5ZDgwNDI1ZjYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiendpaW4iLCJwaWN0dXJlIjoiSUNPTjAuUE5HIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL2xhcmF2ZWx2dWVvbmV1aSIsImF1ZCI6ImxhcmF2ZWx2dWVvbmV1aSIsImF1dGhfdGltZSI6MTYyMjEyODIwOSwidXNlcl9pZCI6IlpuMHVJQWtiYW9SQ0xNY1V1ZXNLSmpvc2dmMDMiLCJzdWIiOiJabjB1SUFrYmFvUkNMTWNVdWVzS0pqb3NnZjAzIiwiaWF0IjoxNjIyMTI4MjA5LCJleHAiOjE2MjIxMzE4MDksImVtYWlsIjoibW9oYW1lZC5ib3VkaW5hcjk3QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm1vaGFtZWQuYm91ZGluYXI5N0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.HBAkTlqqTT1rN_zXjbrXa227ZMMVVnBa768EZEpKAmFDlBQsxnOwerRryK_SlGBRzzEY_JNVWxRaCz5HFyw5P7Agar-VekCfcYvkcD4kB4xBNyj-nfp8oKf4lXORHTUqPw6Y058v88birSYH8D51yWSVktK_O5ErWFuLbIpnxD7dAXi4bwzxHjqrDb06_8ro9d4-76cW6zMwAAyNy0YeUujI4d-nbq-jZrOZ3wdqvSg4iQwHd6vol6q7gYQ2mxILzjqvkhECTOjhVuvS3vEZMjt1GO3dcBT4zu3ysCKBgw03QRVPM0iXKWZrXllqBuzX2aTfVyi5eX8LtuSw-LnI4g
*/