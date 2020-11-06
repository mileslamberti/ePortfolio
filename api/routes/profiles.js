const {db} = require('../utility/admin')

exports.getAllUsers = async (req,res) => {
    var users = [];
    const databaseSnapshot = await db.collection(`/users`).get();
    databaseSnapshot.forEach(user => {
<<<<<<< HEAD
        users.push(user.data().handle);
=======
        if(user.data().hasOwnProperty('private')){
            if (!user.data().private){
                users.push(user.data().handle);
            }
        }
>>>>>>> master
    });
    return res.json({ users });
}
