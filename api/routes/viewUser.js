
exports.viewUser = (req, res) => {
    return res.status(200).json({body: `user ${req.params.handle}'s ROUTE`});
}