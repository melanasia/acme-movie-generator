
// data access from the client to the server
// how we're getting data from the server

const axios = require('axios');

const fetchMovies = ()=> {
  return axios.get('/api/movies');
}

const createMovie = () => {
    return axios.post('/api/create-movie');
}

export {
  fetchMovies
}