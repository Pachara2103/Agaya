
exports.getAll =(req, res, next )=> {
    res.status(200).json({success:true, data:"test server"})
}