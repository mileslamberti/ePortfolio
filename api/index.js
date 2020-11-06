const functions = require('firebase-functions');
const app = require('express')();
const { viewUser } = require("./routes/viewUser");

const {signup, login, uploadImage, addUserDetails, getAuthorisedUser} = require('./routes/user');
const { getAboutMe, createAboutMe, createUserInfo, getUserInfo, updateProfilePic, getProfilePic, getUserTags, createUserTags, togglePrivacy, getPrivacy, createExperience, getExperience, getEducation, createEducation } = require("./routes/aboutMe");
const { viewUser } = require("./routes/viewUser");
const { saveProject, getProjects, getProjectInfo, getAllProjectCards, addProjectCard, deleteProjectCard, editFileCardAssociation, addFile, getProjectFiles } = require("./routes/projects");
const { getAllUsers } = require("./routes/profiles");

const userAuth = require('./utility/userAuthMiddleware.js')
var cors = require('cors');

app.use(cors());


// User Routes 
app.post('/signup',signup);
app.post('/login', login)
app.post('/user/image',uploadImage)
app.post('/user',userAuth, addUserDetails)
app.get('/user',userAuth,getAuthorisedUser)

// Routes for setting and getting profile content
app.post("/aboutme", userAuth, createAboutMe);
app.get("/:handle/aboutme", getAboutMe);
app.post("/userinfo", userAuth, createUserInfo);
app.get("/:handle/userinfo", getUserInfo);
app.post('/dp', userAuth, updateProfilePic)
app.get('/:handle/dp', getProfilePic)
app.post("/tags", userAuth, createUserTags);
app.get("/:handle/tags", getUserTags);
app.post("/private", userAuth, togglePrivacy);
app.get("/:handle/private", getPrivacy);

//  Routes for setting and getting project content
app.get("/project/:projectID", userAuth, getProject);
app.post("/saveproject", userAuth, saveProject);
app.get("/:handle/getprojects", getProjects);
app.get("/:handle/getprojects/:projectID", getProjectInfo);
app.post("/files/:projectID", userAuth, addFile)
app.get("/:handle/files/:projectID", getProjectFiles)


app.get("/:handle/getprojectcards/:projectID", getAllProjectCards);

app.post("/projectcards", userAuth, addProjectCard);
app.post("/deleteprojectcard", userAuth, deleteProjectCard);
app.post("/assignfiletocard", userAuth, editFileCardAssociation);

app.post("/projectcards", userAuth, addProjectCard);
app.post("/deleteprojectcard", userAuth, deleteProjectCard);

app.get("/profiles", getAllUsers);

// TODO, NEED TO ENSURE NO USERS ARE NAMED THE OTHER API ROUTES
app.get("/:handle", viewUser);

exports.api = functions.https.onRequest(app);