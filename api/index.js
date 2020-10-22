const functions = require('firebase-functions');
const app = require('express')();
const { createPost, getAllPosts } = require('./routes/Posts');
const {signup, login, uploadImage, addUserDetails, getAuthorisedUser} = require('./routes/user');
const { getAboutMe, createAboutMe, createUserInfo, getUserInfo, updateProfilePic, getProfilePic, getUserTags, createUserTags } = require("./routes/aboutMe");
const { viewUser } = require("./routes/viewUser");

const { saveProject, getProjects, getProjectInfo, getAllProjectCards, addProjectCard, deleteProjectCard, editFileCardAssociation, addFile, getProjectFiles } = require("./routes/projects");
const { getAllUsers } = require("./routes/profiles");


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

// Routes for setting and getting profile content
app.post("/aboutme", userAuth, createAboutMe);
app.post("/getaboutme", getAboutMe);
app.post("/userinfo", userAuth, createUserInfo);
app.post("/getuserinfo", getUserInfo);
app.post('/updatedp',userAuth, updateProfilePic)
app.post('/getdp', getProfilePic)
app.post("/tags", userAuth, createUserTags);
app.post("/gettags", getUserTags);

app.post("/saveproject", userAuth, saveProject)
app.get("/projects", userAuth, getProjects);
app.get("/project/:projectID", userAuth, getProjectInfo);

app.post("/files/:projectID", userAuth, addFile)
app.get("/files/:projectID", userAuth, getProjectFiles)

app.get("/profiles", getAllUsers);

app.get("/getprojectcards/:projectID", userAuth, getAllProjectCards);
app.post("/projectcards", userAuth, addProjectCard);
app.post("/deleteprojectcard", userAuth, deleteProjectCard);
app.post("/assignfiletocard", userAuth, editFileCardAssociation);

// TODO, NEED TO ENSURE NO USERS ARE NAMED THE OTHER API ROUTES
app.get("/:handle", viewUser);

exports.api = functions.https.onRequest(app);