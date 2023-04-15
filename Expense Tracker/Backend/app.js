const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require("./models/order");
const ForgotPasswordRequest = require("./models/forgotPassword");
const FilesDownloaded = require('./models/filesdownloaded');

const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');

const app = express();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json())
app.use(cors())

app.use('/user',userRoutes);
app.use('/',expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passwordRoutes);



Expense.belongsTo(User, {constraints : true, onDelete : "CASCADE"});
User.hasMany(Expense)
User.hasMany(Order)
Order.belongsTo(User, {constraints : true, onDelete : "CASCADE"});User.hasMany(ForgotPasswordRequest);
ForgotPasswordRequest.belongsTo(User);
User.hasMany(FilesDownloaded);
FilesDownloaded.belongsTo(User)

sequelize
// .sync({force : true})
.sync()
.then(result => {
    app.listen(process.env.PORT || 3000)
})
.catch(err => console.log(err))