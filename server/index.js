const express = require ('express');
const mongoose = require ('mongoose');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv/config');


//Import routes
const postRoute = require('./routes/posts');
const auth = require('./routes/auth');


//Connect to DB
mongoose.connect(
    process.env.databaseURL,
    {useNewUrlParser: true,
    useUnifiedTopology: true },
    () => console.log('connected')
);

//Middleware
app.use(bodyParser.json());
app.use(express.json());

//Route middlewares
app.use('/posts', postRoute);
app.use('/user', auth);


//Listen to server
app.listen(3000);