const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const db = require('./models')

//nunjucks boilerplate
app.engine('html',nunjucks.render);
app.set('view engine','html');
var env = nunjucks.configure('views',{ noCache: true});

//middleware
app.use(morgan('dev'))//log info about requests
//body parser
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

//router
app.use('/',routes);


//database and server
db.User.sync({logging: false})
.then(function(){
  console.log("Synced User")
  return db.Page.sync({logging: false})
}).then(function(){
  app.listen(3000, function(){
    console.log("Server listening on port 1337.")
  });
}).catch(console.error)
