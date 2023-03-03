const PORT = process.env.PORT || 5000
const express = require("express")
const mongoose = require('mongoose'); 
const bodyParser = require('body-parser');
const cors = require ('cors');
const userRoute=require('./routes/UserRoutes/UserRouter');
//import readFileSync from 'fs';
const fs = require('fs');

const path = require('path')
require('dotenv').config()
const app = express();

const MONGO_URL = "mongodb+srv://safaT:123@cluster0.abq6co0.mongodb.net/?retryWrites=true&w=majority"

// ---------------------- Connecter à MongoDB -------------------
/*const mongoUri = 'mongodb+srv://safa:123@cluster0.jfkalx0.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(mongoUri);
mongoose.connection.on('connected', () => {
 console.log('MongoDB connected');
});
mongoose.connection.on('error', () => {
 console.error('Error connecting to mongo', err);
});*/
/* -------------------------------------------------------------- */

mongoose.set('strictQuery', true);
mongoose.connect(MONGO_URL , () => {
  console.log('MongoDB connected');
 });
 mongoose.connection.on('error', () => {
  console.error('Error connecting to mongo', err);
 });
  /*,{
  useNewUrlParser : true,

}, (err)=> {
  if(err) throw err;
  console.log("MongoDB connection established");
});*/

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});


app.use(express.json());
app.use(express.static(__dirname));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`));

app.use("/api",userRoute);
