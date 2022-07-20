const { conn, Movie, Rating } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

const faker = require('@faker-js/faker');

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));


const getMovie = async (movieId) => {
   let movie = await Movie.findByPk(movieId);
   
   let ratings = await Rating.findAll({
     where: {
       movieId: movieId
     }
   });
   
   let totalScore = ratings.reduce((total, rating) => {
     total + rating.score
   }, 0);
   let averageRating = totalScore / ratings.length;
   movie['averageRating'] = averageRating;
   
   return movie;
}

app.post('/api/create-movie', async(req, res, next)=> {
  try {
    let movieName = faker.commerce.catchPhrase();
    res.status(201).send(await Movie.create({'name': movieName}));
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/movies', async(req, res, next)=> {
  try {
    res.send(await Movie.findAll());
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/movie', async(req, res, next)=> {
  try {
    const id = req.params.id;
    if (isNaN(id)) {
        res.sendStatus(400)
        return;
    }
    res.send(await getMovie(id));
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/movies/submit-rating', async(req, res, next)=> {
  try {
    await Rating.create(req.body);
    res.status(201).send(await getMovie(req.body.movieId));
  }
  catch(ex){
    next(ex);
  }
});

app.delete('/api/movies/:id', async (req, res, next) => {
    try {
        const id = parseInt(req.params.id)
        if (isNaN(id)){
            res.sendStatus(400)
            return;
        }
        const movie = await Movie.findByPk(req.params.id)
        if (movie == null){
            res.sendStatus(404)
            return;
        } 
        await movie.destroy()
    res.sendStatus(204);
    }
    catch(ex){
        next(ex);
    }
})

app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ err });
});



const init = async()=> {
  try {
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
}

init();
