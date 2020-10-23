const { json } = require('express');
const {db} = require('../utility/admin')
const admin = require('firebase-admin');

exports.saveProject = (req, res) => {
  const project = {
    projectID :req.body.projectID,
    title : req.body.title,
    description : req.body.description,
  };
  // add the project
  db.doc(`/users/${req.user.handle}/projects/${project.projectID}`).set({project}).then(doc => {
    return res.json({ message: `${project.projectID} updated` })
  }).catch(err => {
      console.error(err);
      return res.status(500).json({ error: `something went wrong` });
  });
}

exports.getProjects = async (req, res) => {
  var projects = [];
  const databaseSnapshot = await db.collection(`/users/${req.params.handle}/projects`).get();
  databaseSnapshot.forEach(project => {
      projects.push(project.data().project);
  });
  return res.status(200).json({ projects });
}

exports.getProjectInfo = (req, res) => {
  const userHandle = req.params.handle;
  if (!userHandle){
    return res.status(206).json({ error: "no user given"});
  }
  db.doc(`/users/${userHandle}/projects/${req.params.projectID}`).get().then(doc => {
    if (doc.exists){
      const project = doc.data().project;
      return res.status(200).json({ project });
    } else {
      return res.status(206).json({error: `${req.params.projectID} does not exist under this user`})
    }
  })
}
exports.getProjectFiles = async (req, res) => {
  const userHandle = req.user.handle;
  if (!userHandle){
    return res.status(206).json({ error: "no user given"});
  }
  var files=[];
  const databaseSnapshot = await db.collection(`/users/${userHandle}/projects/${req.params.projectID}/files`).get();
    databaseSnapshot.forEach(file => {
      files.push(file.data().file);
    });
    return res.status(200).json({ files });
}
exports.addFile = (req, res) => {
  const userHandle = req.user.handle;
  const projectID = req.params.projectID
  const file = req.body;
  db.doc(`/users/${userHandle}/projects/${projectID}/files/${file.filename}`).set({file})
    .then( doc => {
      return res.status(200).json({ message: `${file.filename} added to ${projectID}` });
    }).catch( err => {
      return res.status(206).json({error: `problem adding file to database`});
    })
}
exports.editFileCardAssociation = (req, res) => {
  if (! req.body.hasOwnProperty("projectID")){
    return res.status(206).json({error: `request missing projectID`});
  } else if (! req.body.hasOwnProperty("id")){
    return res.status(206).json({error: `request missing id (cardID)`});
  } else if (! req.body.hasOwnProperty("filename")){
    return res.status(206).json({error: `request missing filename`});
  } else if (! req.user.handle){
    return res.status(206).json({error: `request missing user handle (in authHeader)`});
  }
  const userHandle = req.user.handle;
  const projectID = req.body.projectID;
  const filename = req.body.filename;
  const cardID = req.body.id;
  db.doc(`/users/${userHandle}/projects/${projectID}/files/${filename}`)
    .update({
        "file.associatedWithCard": cardID
      })
    .then( doc => {
      return res.status(200).json({message: "file associations updated"});
    }).catch(err => {
      console.error(err);
      return res.status(500).json({ error: `something went wrong` });
    });
  }
 

exports.getAllProjectCards = async (req, res) => {
  //TODO CHANGE to use UserAuth
  //const userHandle = req.user.handle;
  const userHandle = req.user.handle;
  if (!userHandle){
    return res.status(206).json({ error: "no user given"});
  }
  const snapshot = await db.collection(`/users/${userHandle}/projects/${req.params.projectID}/cards/`).get()
    var cards=[];
    snapshot.forEach(card => {
      cards.push(card.data());
    });
    return res.status(200).json({cards});
}

exports.deleteProjectCard = (req, res) => {
  const cardID = req.body.id;
  const projectID = req.body.projectID;
  const userHandle = req.user.handle;
  db.doc(`/users/${userHandle}/projects/${projectID}/cards/${cardID}`).delete()
    .then(doc => {
      return res.json({ message: `card ${cardID} created` })
    }).catch(err => {
      console.error(err);
      return res.status(500).json({ error: `something went wrong` });
  });
}
exports.addProjectCard = (req, res) => {
  const userHandle = req.user.handle;
  if ( !checkCardData(req.body) ){
    return res.status(200).json( { 
      error: "req body does not contain all card details",
      body: req.body
    })
  }
  const card = req.body;
  db.doc(`/users/${userHandle}/projects/${card.projectID}/cards/${card.id}`).set({card})
    .then( doc => {
      return res.json({ message: `card ${card.id} updated` })
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ error: `something went wrong` });
    });
}

const checkCardData = (card) => {
  var validBody = true;
  if ( !card.hasOwnProperty("projectID")){
    validBody = false;
    console.log("no projectID");
  }
  if ( !card.hasOwnProperty("id")){
    validBody = false;
    console.log("no id");
  }
  if ( !card.hasOwnProperty("position")){
    validBody = false;
    console.log("no position");

  }
  if ( !card.hasOwnProperty("title")){
    validBody = false;
    console.log("no title");
  }
  if ( !card.hasOwnProperty("description")){
    validBody = false;
    console.log("no description");

  }
  if ( !card.hasOwnProperty("subtitle")){
    validBody = false;
    console.log("no subtitle");

  }
  if ( !card.hasOwnProperty("img")){
    validBody = false;
    console.log("no img");
  }
  return validBody;
}
