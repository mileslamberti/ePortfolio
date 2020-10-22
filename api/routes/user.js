const config = require('../utility/config')
const {admin,db} = require('../utility/admin')

const firebase = require('firebase')
const {validateSignUp, validateLogin, reduceUserDetails} = require('../utility/emailValidation')
firebase.initializeApp(config);

exports.signup = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle
    }
    
    const {valid, errors} = validateSignUp(newUser);

    if (!valid){
        return res.status(400).json(errors);
    }

    const profilePic = 'profilepic.png'

    let token, userId;
    db.doc(`/users/${newUser.handle}`).get().then(doc => {
        if (doc.exists) {
            return res.status(400).json({ handle: `this username is already taken` })
        }
        else {
            return firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
    }).then(data => {
        userId = data.user.uid;
        return data.user.getIdToken();
    }).then(token1 => {
        token = token1;
        const userCredentials = {
            email: newUser.email,
            handle: newUser.handle,
            createdAt: new Date().toISOString(),
            imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${profilePic}?alt=media`,
            userId
        }
        return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    }).then(() => {
        return res.status(201).json({ token })
    }).catch(err => {
        console.error(err)
        if (err.code === 'auth/email-already-in-use') {
            return res.status(400).json({ email: `Email already in Use` })
        }else if ( err.code === 'auth/weak-password'){
            return res.status(400).json({password: "weak password"})
        }
        else {
            return res.status(500).json({ error: err.code });
        }
    })
}



exports.login =  (req, res) => {
    const user = { ...req.body };
    const {valid, errors} = validateLogin(user);

    if (!valid){
        return res.status(400).json(errors);
    }

   
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(data => {
        return data.user.getIdToken();
    }).then(token => {
        return res.json({ token })
    }).catch(err => {
        console.error(err);
        if (err.code === 'auth/wrong-password') {
            return res.status(403).json({ general: 'incorrect credentials, please try again' })
        } else return res.status(500).json({ error: err.code })
    })
}


exports.uploadImage = (req,res) => {
    const BusBoy = require('busboy');
    const path = require('path');
    const os = require('os');
    const fs = require('fs');

    const busboy = new BusBoy({headers:req.headers})

    var imageFileName;
    var image = {}
    busboy.on('file', (name,file,filename,encoding,mimetype) => {

        if( mimetype !== 'image/jpeg' && mimetype !== 'image/png'){
            return res.status(400).json({error: "wrong file type uploaded"})
        }
        const extension = filename.split('.').slice(-1)[0]
        imageFileName = `${Math.round(Math.random()*100000000000)}.${extension}`
        const filepath = path.join(os.tmpdir(),imageFileName);
        image = {filepath, mimetype};


        file.pipe(fs.createWriteStream(filepath))

    });


    busboy.on('finish', () => {
        admin.storage().bucket().upload(image.filepath, {
            resumable: false,
            metadata: {
                contentType: image.mimetype
            }
        }).then( () => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media`
        return res.json({message: 'image uploaded', image: imageUrl})
    })
    .catch(err => {
        console.error(err)
        return res.status(500).json({error:err.code})
    })
    });

    busboy.end(req.rawBody);
}


exports.addUserDetails  = (req,res) => {
    let userDetails = reduceUserDetails(req.body);
    db.doc(`/users/${req.user.handle}`).update(userDetails).then(() => {
        return res.status(201).json({messge: 'Added successfily'})
    }).catch( err => {
        console.error(err)
        return res.status(400).json({error:err.code})
        })
}

exports.getAuthorisedUser = (req,res) => {
    let userData = {};

    db.doc(`/users/${req.user.handle}`).get().then(doc => {
        if(doc.exists){
            userData.credentials = doc.data();
            return res.status(200).json({userData});
        }
    }).catch(err => {
        console.error(err);
        return res.status(500).json({error:err.code})
    })
}
