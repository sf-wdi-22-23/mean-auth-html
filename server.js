/*
 * SERVER.JS
 */

require('dotenv').load();
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config')
  , express = require('express')
  , app = express()
  , resources = require('./resources')
  , path = require('path')
  , bodyParser = require('body-parser')
  , flash = require('connect-flash')
  , cors = require('cors')
  , logger = require('morgan')
  , server = app.listen(config.port)
  , mongoose  = require('mongoose')
  , mailer = require('express-mailer');

mongoose.connect(config.db);

app.use("/", express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(logger('dev'));
app.use(flash());

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

mailer.extend(app, {
  from: 'team.vivifi@gmail.com',
  host: 'smtp.gmail.com', // hostname 
  secureConnection: true, // use SSL 
  port: 465, // port for secure SMTP 
  transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts 
  auth: {
    user: 'team.vivifi@gmail.com',
    pass: config.emailpass
  }
});

// var ejs = require('ejs');
// app.engine('html', ejs.renderFile); 
// app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('view options', {
  layout: false
});

// RESOURCES
app.get('/', resources.index);
app.get('/templates/:name', resources.templates);
require('./resources/users')(app);
require('./resources/posts')(app);

// redirect all others to the index (HTML5 history)
app.get('*', resources.index);

module.exports = server;
console.log('server running at http://localhost:' + config.port);


