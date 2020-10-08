const {db} = require('../utility/admin')

exports.viewUser = (req, res) => {
    db.doc(`/users/${req.params.handle}/data/aboutme`).get().then(doc => {
        let aboutMe = {};
        if(doc.exists){
            aboutMe = doc.data().aboutMe;
            return res.status(200).json({aboutMe});
        }
        }).catch(err => {
            console.error(err);
            return res.status(500).json({error:err.code})
        })
    }