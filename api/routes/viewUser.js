
exports.viewUser = (req, res) => {
    return res.status(200).json({body: `user's ${req.params.handle} ROUTE`});
}