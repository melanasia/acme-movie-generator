import React from 'react';

export default function Movies({movies}) {
    return (
      <ul>
        {movies.map(movie => {
          return (
            <li key={movie.id}>
              {movie.name}
            </li>
          )
        })}
      </ul>
  );
}