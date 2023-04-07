const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');

const User = require('./models/user');
const Expense = require('./models/expense');
const Order = require("./models/order")

const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase')

const app = express();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json())
app.use(cors())

app.use('/user',userRoutes)
app.use('/',expenseRoutes)
app.use('/purchase', purchaseRoutes)

Expense.belongsTo(User, {constraints : true, onDelete : "CASCADE"});
User.hasMany(Expense)
User.hasMany(Order)
Order.belongsTo(User, {constraints : true, onDelete : "CASCADE"});

sequelize
// .sync({force : true})
.sync()
.then(result => {
    app.listen(3000)
})
.catch(err => console.log(err))