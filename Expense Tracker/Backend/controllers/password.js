
exports.postForgotPassword = (req,res,next) => {
    res.status(200).json({ success : true, message : "you chose to reset your password" })
}
