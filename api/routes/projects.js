const {db} = require('../utility/admin')

exports.saveProject = (req, res) => {
  const project = {
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
exports.getProjects = (req, res) => {
  return res.json({ message: `looking for projects??` })
}
