exports.getExpenses = (req,options) => {
    const user = req.user;
    return user.getExpenses(options)
}