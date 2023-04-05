const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');

const User = require('./models/user');
const Expense = require('./models/expense');

const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense');

const app = express();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json())
app.use(cors())

app.use('/user',userRoutes)
app.use('/',expenseRoutes)

Expense.belongsTo(User, {constraints : true, onDelete : "CASCADE"});
User.hasMany(Expense)

sequelize
// .sync({force : true})
.sync()
.then(result => {
    app.listen(3000)
})
.catch(err => console.log(err))