const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const rootDir = require('./util/rootdir');
const path = require('path');
const port = process.env.PORT || 3000

//
// Routers
//
const homepageRouter = require('./routes/homepage');
const chatRouter = require('./routes/chat');
const surveyRouter = require('./routes/survey');

//
// App Settings
//
const app = express();
app.set('view engine', ejs);

//
// Routes
//
app.use('/', express.static(path.join(rootDir, 'public')), homepageRouter);
app.use('/chat', express.static(path.join(rootDir, 'public')), chatRouter);
//app.use('/survey', express.static(path.join(rootDir, 'public')), surveyRouter);

app.get('/', function (req, res) {
  console.log('INFO: homepage called');
  res.send('homepage');
});

app.listen(port, (req, res) => {
  console.log(`Express Application running on port ${port}`);
});
