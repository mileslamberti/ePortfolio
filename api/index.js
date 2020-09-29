const functions = require('firebase-functions');
const app = require('express')();
const { createPost, getAllPosts } = require('./routes/Posts');
const {signup, login, uploadImage,addUserDetails,getAuthorisedUser} = require('./routes/user')
const userAuth = require('./utility/userAuthMiddleware.js')




//Post Routes
app.get('/getPosts',getAllPosts)
app.post('/createPost',userAuth,createPost);

// User Routes 
app.post('/signup',signup);
app.post('/login', login)
app.post('/user/image',userAuth,uploadImage)
//app.post('/user/getImage',userAuth,getImage);
app.post('/user',userAuth, addUserDetails)
app.get('/user/',userAuth,getAuthorisedUser)


exports.api = functions.https.onRequest(app);