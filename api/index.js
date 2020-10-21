const functions = require('firebase-functions');
const app = require('express')();
const { createPost, getAllPosts } = require('./routes/Posts');
const {signup, login, uploadImage, updateProfilePic, addUserDetails, getAuthorisedUser} = require('./routes/user');
<<<<<<< Updated upstream
const { getAboutMe, createAboutMe } = require("./routes/aboutMe");
=======
const { getAboutMe, createAboutMe, createUserInfo, getUserInfo, getUserTags, createUserTags, createExperience, getExperience, getEducation, createEducation } = require("./routes/aboutMe");
>>>>>>> Stashed changes
const { viewUser } = require("./routes/viewUser");
const { saveProject, getProjects} = require("./routes/projects");

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
app.post('/user/updatepp',userAuth, updateProfilePic)
app.post('/user',userAuth, addUserDetails)
app.get('/user',userAuth,getAuthorisedUser)

app.post("/aboutme", userAuth, createAboutMe);
app.get("/aboutme", userAuth, getAboutMe);
<<<<<<< Updated upstream
=======
app.post("/userinfo", userAuth, createUserInfo);
app.get("/userinfo", userAuth, getUserInfo);
app.post("/tags", userAuth, createUserTags);
app.get("/tags", userAuth, getUserTags);
app.post("/experience", userAuth, createExperience);
app.get("/experience", userAuth, getExperience);
app.post("/education", userAuth, createEducation);
app.get("/education", userAuth, getEducation);
>>>>>>> Stashed changes

app.post("/projects", userAuth, saveProject);
app.get("/projects", userAuth, getProjects);

// TODO, NEED TO ENSURE NO USERS ARE NAMED THE OTHER API ROUTES
app.get("/:handle", viewUser);

exports.api = functions.https.onRequest(app);