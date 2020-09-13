const express = require('express')
const app = express()
const mongoose =require('mongoose');
const router = express.Router()
const userRoute = require('./routes/api/users')
const storyRoute = require('./routes/api/stories')
const bodyParser = require('body-parser');
const passport=require('passport');
const cors = require('cors')
const path = require('path');

app.use(cors())
//Body Parser middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to MongoDB
mongoose
	.connect(db)
	.then( () => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

//Passport Middleware
app.use(passport.initialize());
//Passport Config
require('./config/passport')(passport);

app.use('/api/users',userRoute);
app.use('/api/stories',storyRoute);

if(process.env.NODE_ENV == 'production'){
    app.use(express.static('client/build'));
    app.get('*', (req,res) =>{
        res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    });
}

const port = process.env.PORT || 5000;
app.listen(port);