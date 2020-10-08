const functions = require('firebase-functions');
const app = require('express')();
const { createPost, getAllPosts } = require('./routes/Posts');
const {signup, login, uploadImage,addUserDetails,getAuthorisedUser} = require('./routes/user');
const { getAboutMe, createAboutMe } = require("./routes/aboutMe");
const { viewUser } = require("./routes/viewUser");

const userAuth = require('./utility/userAuthMiddleware.js')
var cors = require('cors');
app.use(cors());



//Post Routes
app.get('/getPosts',getAllPosts)
app.post('/createPost',userAuth,createPost);

// User Routes 
app.post('/signup',signup);
app.post('/login', login)
app.post('/user/image',uploadImage)
app.post('/user',userAuth, addUserDetails)
app.get('/user',userAuth,getAuthorisedUser)

app.post("/aboutme", userAuth, createAboutMe);
app.get("/aboutme", userAuth, getAboutMe);

// TODO, NEED TO ENSURE NO USERS ARE NAMED THE OTHER API ROUTES
app.get("/:handle", viewUser);

exports.api = functions.https.onRequest(app);