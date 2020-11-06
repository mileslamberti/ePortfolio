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
    db.doc(`/users/${req.params.handle}/data/aboutme`).get().then(doc => {
        if(doc.exists){
            aboutMe = doc.data().aboutMe;
            return res.status(200).json({aboutMe});
        } else {
            aboutMe = { displayName : "Display name", description : "Profile description"};
            db.doc(`/users/${req.params.handle}/data/aboutme`).set({aboutMe})
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
    db.doc(`/users/${req.params.handle}/data/userinfo`).get().then(doc => {
        if(doc.exists){
            userInfo = doc.data().userInfo;
            return res.status(200).json({userInfo});
        } else {
            userInfo = { occupation : "Occupation", location : "Location", number : "Phone number", email : "Contact email" };
            db.doc(`/users/${req.params.handle}/data/userinfo`).set({userInfo})
            return res.status(200).json({userInfo});
        }
    }).catch(err => {
        console.error(err);
        return res.status(500).json({error:err.code})
    })
}

exports.updateProfilePic  = (req,res) => {
    let url = Object.keys(req.body)[0] + '=media';
    console.log(url);
    db.doc(`/users/${req.user.handle}`).update({"imageUrl": url}).then(() => {
        return res.status(201).json({message: 'Success'})
    }).catch( err => {
        console.error(err)
        return res.status(400).json({error:err.code})
    })
}

exports.getProfilePic = (req,res) => {
    let profilePic = {};

    db.doc(`/users/${req.params.handle}`).get().then(doc => {
        if(doc.exists){
            profilePic = doc.data().imageUrl;
            return res.status(200).json({profilePic});
        }
    }).catch(err => {
        console.error(err);
        return res.status(500).json({error:err.code})
    })
}

exports.createUserTags = (req, res) => {

    if(req.body.body ===''){
        return res.status(400).json({body: "Body must not be empty!"})
    }
    const tags = req.body.tags;
    db.doc(`/users/${req.user.handle}/data/tags`).set({tags}).then(doc => {
            return res.json({ message: `tags updated` })
        }).catch(err => {
            console.error(err);
            return res.status(500).json({ error: `something went wrong` });
        });
}

exports.getUserTags = (req,res) => {
    let tags = [];
    db.doc(`/users/${req.params.handle}/data/tags`).get().then(doc => {
        if(doc.exists){
            tags = doc.data().tags;
        }
        return res.status(200).json({tags: tags});
    }).catch(err => {
        console.error(err);
        return res.status(500).json({error:err.code})
    })
}

exports.addExperience = (req, res) => {

    if(req.body.body ===''){
        return res.status(400).json({body: "Body must not be empty!"})
    }
    const experience = req.body.experience;
    db.collection(`/users/${req.user.handle}/data/experiences`).add(experience)
        .then(doc => {
            return res.json({ message: `Experience Added` })
        }).catch(err => {
            console.error(err);
            return res.status(500).json({ error: `something went wrong` });
        });
}

exports.getExperiences = async (req,res) => {
    let experiences = [];
    const databaseSnapshot = await db.collection(`/user/${userHandle}/data/experiences`).get();
    databaseSnapshot.forEach(experience => {
        experiences.push(experience.data());
    });
    // if user has no experiences then add an empty experience to their experiences
    if (experiences.length === 0){
        const experience = { 
            date : "working period", 
            companyName : "Name of the organisation", 
            jobTitle : "position in the company", 
            jobDescription : "job description"
        };
        experiences.push(experience);
        db.collection(`/users/${req.user.handle}/data/experiences`).add(experiences)
        return res.status(200).json({experiences});
    // if a user does have experiences return them
    } else {
        return res.status(200).json({experiences});
    }
}

exports.createEducation = (req, res) => {

    if(req.body.body ===''){
        return res.status(400).json({body: "Body must not be empty!"})
    }
    const educations = {
        when : req.body.when,
        where: req.body.where,
        what: req.body.what,
    };
    //db.collection(`/users/${req.user.handle}/data/`).doc("aboutme").set({aboutMe}).then(doc => {
    db.doc(`/users/${req.user.handle}/data/education`).set({educations}).then(doc => {
            return res.json({ message: `document ${doc.id} created` })
        }).catch(err => {
            console.error(err);
            return res.status(500).json({ error: `something went wrong` });
        });
}

exports.getEducation = (req,res) => {
    let educations = {};
    db.doc(`/users/${req.user.handle}/data/education`).get().then(doc => {
        if(doc.exists){
            educations = doc.data().educations;
            return res.status(200).json({educations});
        } else {
            educations = { when : "date", where : "Name of Institution", what : "degree"};
            db.doc(`/users/${req.user.handle}/data/education`).set({educations})
            return res.status(200).json({educations});
        }
    })
}

exports.togglePrivacy = (req,res) => {
    private = req.body.private;
    console.log(private);//remove this
    db.doc(`/users/${req.user.handle}`).update({"private": private}).then(() => {
        return res.status(201).json({message: 'Success'})
    }).catch( err => {
        console.error(err)
        return res.status(400).json({error:err.code})
    })
}

exports.getPrivacy = (req,res) => {
    let private = "";
    db.doc(`/users/${req.params.handle}`).get().then(doc => {
        if(doc.exists){
            private = doc.data().private;
            return res.status(200).json({private});
        }
    }).catch(err => {
        console.error(err);
        return res.status(500).json({error:err.code})
    })
}