const express = require('express');

const hbs = require('hbs');

require('dotenv').config();
require("./configs/database.config");

const Movie = require('./configs/Movie.model')
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');

app.use(express.static('public'));

// URL params
app.get('/store/clothes/:season/:singleClothing', (req, res) => {
  // /store/clothes/summer/tshirt
  console.log('---------------------------------');
  console.log('The URL params are:', req.params);
  console.log('The value for the param "season" is: ', req.params.season);
  console.log(
    'The value for the param "singleClothing" is',
    req.params.singleClothing
  );
  console.log('---------------------------------');

  // send "params" to the details-page.hbs
  res.render('details-page', req.params);
});


// Query strings form results
app.get('/movie/search', (req, res) => {
  const searchString = req.query.title
  Movie.find({ title: { $regex: searchString, $options: "i" } })
  .then((movieTitles)=> {
    console.log(movieTitles)
    res.render('results-page', {movieTitles})}
  )
  .catch((err) => console.log);
});

// Shop index page
app.get('/', (req, res) => {
  res.render('movies-page');
});

app.listen(process.env.PORT, () =>
  console.log(`Running on port: ${process.env.PORT}`)
);
