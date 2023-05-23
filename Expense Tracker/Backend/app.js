const path = require('path')
const fs = require('fs')

const mongoose = require('mongoose')

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');
const morgan = require('morgan')

const userRoutes = require('./routes/user')
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');

const app = express();

// const accessLogStream = fs.createWriteStream('access.log', { flags : 'a' })

app.use(bodyParser.urlencoded({ extended : false }));
app.use(bodyParser.json())
app.use(cors())
// app.use(morgan('combined', { stream : accessLogStream }))


app.use('/user',userRoutes);
app.use('/expenses',expenseRoutes);
app.use('/purchase', purchaseRoutes);
app.use('/premium', premiumRoutes);
app.use('/password', passwordRoutes);

app.use((req,res) => {
    let url = req.url
    res.header('Content-Security-Policy', "img-src 'self'");
    if(url == "/"){
        url = "index.html"
    }
    res.sendFile(path.join(__dirname, `public/${url}`))
})

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;


mongoose
  .connect(`mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_NAME}.m9hkv2n.mongodb.net/expenseTracker?retryWrites=true&w=majority`)
    .then(() => {
    app.listen(3000)
    console.log("Server Connected to PORT 3000");
    })
    .catch(err => {
        console.log(err);
    })