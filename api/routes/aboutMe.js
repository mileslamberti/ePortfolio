const {db} = require('../utility/admin')

exports.createAboutMe = (req, res) => {

    if(req.body.body ===''){
        return res.status(400).json({body: "Body must not be empty!"})
    }
    const aboutMe = {
        displayName : req.body.displayName,
        description : req.body.description,
    };
    //db.collection(`/users/${req.user.handle}/data/`).doc("aboutme").set({aboutMe}).then(doc => {
    db.doc(`/users/${req.user.handle}/data/aboutme`).set({aboutMe}).then(doc => {
            return res.json({ message: `document ${doc.id} created` })
        }).catch(err => {
            console.error(err);
            return res.status(500).json({ error: `something went wrong` });
        });
}

exports.getAboutMe = (req,res) => {
    let aboutMe = {};
    db.doc(`/users/${req.user.handle}/data/aboutme`).get().then(doc => {
        if(doc.exists){
            aboutMe = doc.data().aboutMe;
            return res.status(200).json({aboutMe});
        } else {
            aboutMe = { displayName : "Display name", description : "Profile description"};
            db.doc(`/users/${req.user.handle}/data/aboutme`).set({aboutMe})
            return res.status(200).json({aboutMe});
        }
    }).catch(err => {
        console.error(err);
        return res.status(500).json({error:err.code})
    })
}

exports.createUserInfo = (req, res) => {

    if(req.body.body ===''){
        return res.status(400).json({body: "Body must not be empty!"})
    }
    const userInfo = {
        occupation : req.body.occupation,
        location : req.body.location,
        number : req.body.number,
        email : req.body.email
    };

    db.doc(`/users/${req.user.handle}/data/userinfo`).set({userInfo}).then(doc => {
            return res.json({ message: `document ${doc.id} created` })
        }).catch(err => {
            console.error(err);
            return res.status(500).json({ error: `something went wrong` });
        });
}

exports.getUserInfo = (req,res) => {
    let userInfo = {};
    db.doc(`/users/${req.user.handle}/data/userinfo`).get().then(doc => {
        if(doc.exists){
            userInfo = doc.data().userInfo;
            return res.status(200).json({userInfo});
        } else {
            userInfo = { occupation : "Occupation", location : "Location", number : "Phone number", email : "Contact email" };
            db.doc(`/users/${req.user.handle}/data/userInfo`).set({userInfo})
            return res.status(200).json({userInfo});
        }
    }).catch(err => {
        console.error(err);
        return res.status(500).json({error:err.code})
    })
}