const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const path = require('path')

const userRoutes = require('./routes/user')

const app = express();

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname,'public')))
app.use(cors())

app.use('/user',userRoutes)

sequelize.sync()
.then({force : true})
.then(result => {
    app.listen(3000)
})
.catch(err => console.log(err))