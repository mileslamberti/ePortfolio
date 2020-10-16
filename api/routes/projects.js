const { json } = require('express');
const {db} = require('../utility/admin')

exports.saveProject = (req, res) => {
  const project = {
    projectID :req.body.projectID,
    title : req.body.title,
    description : req.body.description,
    files : req.body.files,
  };

  const projectID=req.body.projectID;
  //db.collection(`/users/${req.user.handle}/data/projects/`).doc(projectID).set({aboutMe}).then(doc => {
    db.doc(`/users/${req.user.handle}/projects/${projectID}`).set({project}).then(doc => {
      return res.json({ message: `${projectID} added` })
  }).catch(err => {
      console.error(err);
      return res.status(500).json({ error: `something went wrong` });
  });
}
exports.getProjects = async (req, res) => {
  var projects = [];
  const databaseSnapshot = await db.collection(`/users/${req.user.handle}/projects`).get();
  databaseSnapshot.forEach(project => {
      projects.push(project.data().project);
  });
  return res.status(200).json({ projects });
}

exports.getProject = (req, res) => {
  const userHandle = req.user.handle;
  if (!userHandle){
    return res.status(206).json({ error: "no user given"});
  }
  db.doc(`/users/${userHandle}/projects/${req.params.projectID}`).get().then(doc => {
    if (doc.exists){
      project=doc.data().project;
      return res.status(200).json({ project });
    } else {
      return res.status(206).json({error: `${req.params.projectID} does not exist under this user`})
    }
  })
}
exports.getAllProjectCards = async (req, res) => {
  //TODO CHANGE to use UserAuth
  //const userHandle = req.user.handle;
  const userHandle = req.body.handle;
  if (!userHandle){
    return res.status(206).json({ error: "no user given"});
  }
  const snapshot = await db.collection(`/users/${userHandle}/projects/${req.params.projectID}/cards/`).get()
    var cards=[];
    snapshot.forEach(card => {
      cards.push(card.data());
    });
    if (cards.length > 0){
      return res.status(200).json({cards});
    }
    return res.status(206).json({ error: "no data in users collection"});
}

exports.addProjectCard = (req, res) => {
    //TODO CHANGE to use UserAuth
  const userHandle = req.body.handle;
  if ( !hasCardData(req.body) ){
    return res.status(400).json( { error: "req body does not contain all card details"})
  }
  const card = req.body;
  db.doc(`/users/${userHandle}/projects/${newCard.projectID}/cards/${newCard.id}`).set({card})
    .then( doc => {
      return res.json({ message: `card ${doc.id} created` })
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ error: `something went wrong` });
    });
}

const hasCardData = (card) => {
  if ( !card.projectID || !card.id || !card.position || !card.title || !card.subtitle || !card.description || !card.img){
    return false;
  }
  return true;
}
