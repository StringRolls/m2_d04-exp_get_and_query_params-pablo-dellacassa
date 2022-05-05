const mongoose = require("mongoose");
const data = require("../movies.json");
const Movie = require("../configs/Movie.model");

// CONNECT YOUR APP TO THE MONGODB
mongoose
  //                               the name of our database
  //                                   |
  .connect(
    "mongodb+srv://pdellacassa:7deabril-@cluster0.tevzt.mongodb.net/movies?retryWrites=true&w=majority"
  )
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    Movie.deleteMany()
      .then(() => Movie.insertMany(data))
      .catch((err) => console.error(err));
  })
  .catch((err) => console.error("Error connecting to mongo", err));
