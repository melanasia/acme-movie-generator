// [ ]Display Movies
// [ ]Create A Movie
// [ ]Delete A Movie
// [ ]Increment / Decrement Star Rating (submit rating?)
// [ ]Show average rating



import { createRoot } from 'react-dom/client';
import React, { Component } from 'react';
import { fetchMovies, createMovie } from './api';


function App() {
  const [movies, setMovies] = React.useState([]);
  
  React.useEffect(() => {
    fetchMovies().then(response => setMovies(response.data));
  }, []);
  
  return (
    <div>
      <main>
        <section>
          <button onClick={() => createMovie()}>Create Movie</button>
        </section>
        <section>
          <h2>Movies ({movies.length})</h2>
          <Movies movies={movies}/>
        </section>
      </main>
    </div>
  );
}


const root = createRoot(document.querySelector('#root'));
root.render(<App />);
