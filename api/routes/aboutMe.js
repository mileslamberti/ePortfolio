const {db} = require('../utility/admin')

exports.createAboutMe = (req, res) => {

    if(req.body.body ===''){
        return res.status(400).json({body: "Body must not be empty!"})
    }
    const aboutMe = {
        displayName : req.body.displayName,
        inspirations : req.body.inspirations,
        jobs : req.body.jobs,
        experiences : req.body.experiences
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
        }
    }).catch(err => {
        console.error(err);
        return res.status(500).json({error:err.code})
    })
}

exports.createExperience = (req, res) => {

    if(req.body.body ===''){
        return res.status(400).json({body: "Body must not be empty!"})
    }
    const experiences = {
        date : req.body.date,
        companyName: req.body.companyName,
        jobTitle: req.body.jobTitle,
        jobDescription : req.body.jobDescription,
    };
    //db.collection(`/users/${req.user.handle}/data/`).doc("aboutme").set({aboutMe}).then(doc => {
    db.doc(`/users/${req.user.handle}/data/experience`).set({experiences}).then(doc => {
            return res.json({ message: `document ${doc.id} created` })
        }).catch(err => {
            console.error(err);
            return res.status(500).json({ error: `something went wrong` });
        });
}

exports.getExperience = (req,res) => {
    let experiences = {};
    db.doc(`/users/${req.user.handle}/data/experience`).get().then(doc => {
        if(doc.exists){
            experiences = doc.data().experiences;
            return res.status(200).json({experiences});
        } else {
            experiences = { date : "working period", companyName : "Name of the organisation", jobTitle : "position in the company", jobDescription : "job description"};
            db.doc(`/users/${req.user.handle}/data/experience`).set({experiences})
            return res.status(200).json({experiences});
        }
    }).catch(err => {
        console.error(err);
        return res.status(500).json({error:err.code})
    })
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
    }).catch(err => {
        console.error(err);
        return res.status(500).json({error:err.code})
    })
}