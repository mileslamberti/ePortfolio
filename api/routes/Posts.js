const {db} = require('../utility/admin')
exports.getAllPosts =  (req, res) => {
    db.collection('Post').orderBy("createdAt", 'desc').get().then(data => {
        let my_data = []
        data.forEach(doc => {
            my_data.push({
                userId: doc.id,
                body: doc.data().body,
                userHandle: doc.data().userHandle,
                createdAt: doc.data().createdAt
            });
        })
        return res.json(my_data);
    }).catch(err => console.error(err))
}

exports.createPost = (req, res) => {

    if(req.body.body ===''){
        return res.status(400).json({body: "Body must not be empty!"})
    }
    const newPost= {
        body: req.body.body,
        handle: req.user.handle,
        createdAt: new Date().toISOString()
    };
    db.collection('Post').add(newPost).then(doc => {
        return res.json({ message: `document ${doc.id} created` })
    }).catch(err => {
        console.error(err);

        return res.status(500).json({ error: `something went wrong` });

    })
}