const {db} = require('../utility/admin')

exports.createAboutMe = (req, res) => {

    if(req.body.body ===''){
        return res.status(400).json({body: "Body must not be empty!"})
    }
    const aboutMe = {
        displayName : req.body.displayName,
        description : req.body.description,
        bio : req.body.bio,
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
            aboutMe = { displayName : "Display name", description : "Profile description", bio : "Profile bio"};
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
    })
}



exports.getEducation = async (req,res) => {
    // BETTER HANDLING OF MULITPLE EDUCATIONS
    // var educations = [];
    // const snapshot = await db.collection(`/users/${req.params.handle}/data/education`).get()
    // snapshot.forEach(education => {
    //     educations.push(education)
    // })
    // if(educations.length === 0){
    //     return res.status(200).json({});
    // } else {
    //     return res.status(200).json({educations});
    // }
    let educations = [];
    db.doc(`/users/${req.params.handle}/data/education`).get().then(doc => {
        if(doc.exists){
            educations=doc.data().education;
        }
        return res.status(200).json({educations: educations});
    })
}
exports.getExperience = async (req,res) => {
    // better handling of multiple experiences
    // var experiences = [];
    // const snapshot = await db.collection(`/users/${req.params.handle}/data/experience`).get()
    // snapshot.forEach(experience => {
    //     experiences.push(experience)
    // })
    // if(experiences.length === 0){
    //     return res.status(200).json({});
    // } else {
    //     return res.status(200).json({experiences});
    // }
    let experiences = [];
    db.doc(`/users/${req.params.handle}/data/experience`).get().then(doc => {
        if(doc.exists){
            experiences = doc.data().experiences;
        }
        console.log("getting experiences: ", experiences);
        return res.status(200).json({experiences: experiences});
    })
}

exports.setExperience = (req, res) => {
    const experiences = req.body.experiences;
    console.log("setting experiences: ",experiences);
    db.doc(`/users/${req.user.handle}/data/experience`).set({experiences}).then(doc => {
            return res.json({ message: `experiences updated` })
        }).catch(err => {
            console.error(err);
            return res.status(500).json({ error: `something went wrong` });
        });
}
exports.setEducation = (req, res) => {
    const education = req.body.education;

    db.doc(`/users/${req.user.handle}/data/education`).set({education}).then(doc => {
            return res.json({ message: `education updated` })
        }).catch(err => {
            console.error(err);
            return res.status(500).json({ error: `something went wrong` });
        });
}

// better method of multiple educations
exports.addEducation = (req,res) => {
    const education = req.body.education;
    db.collection(`/users/${req.user.handle}/data/education`).add(education)
        .then(res => {
            return res.status(200).json({message: 'education added'});
        }).catch(err => {
            console.error(err);
            return res.status(500).json({error:err.code})
        })
}

// better multiple experience method
exports.addExperience = (req,res) => {
    const experiences = req.body.experience;
    db.collection(`/users/${req.user.handle}/data/experience`).add(experiences)
        .then(res => {
            return res.status(200).json({message: 'experience added'});
        }).catch(err => {
            console.error(err);
            return res.status(500).json({error:err.code})
        })
}