const {db} = require('../utility/admin')

exports.viewUser = (req, res) => {
    db.doc(`/users/${req.params.handle}/data/aboutme`).get().then(doc => {
        return res.json(doc)
    }).catch(err => {
        console.error(err);
        return res.status(500).json({ error: `something went wrong` });
    });
}
