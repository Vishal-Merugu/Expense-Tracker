exports.getExpenses = (req) => {
    const user = req.user;
    return user.getExpenses()
}