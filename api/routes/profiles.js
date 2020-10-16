const {db} = require('../utility/admin')

exports.getAllUsers = async (req,res) => {
    var users = [];
    const databaseSnapshot = await db.collection(`/users`).get();
    databaseSnapshot.forEach(user => {
        users.push(user.data().handle);
    });
    return res.json({ users });
}
