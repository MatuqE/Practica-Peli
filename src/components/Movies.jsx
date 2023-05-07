import React from 'react'

function ListOfMovies({ movies , query }) {

    
  return (
    <>
      <ul className='movies'>
          {
            movies.map(movie =>
                <li className='movies' key={movie.id}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <img src={movie.poster} alt={movie.title} />
                </li>
            )
          }
      </ul>
    </>
  )
}

function NoMoviesResult() {
  return (
    <p>No se encontraron Personajes</p>
  )
}

export function Movies( {movies} ) {    
    const hasMovies = movies ?.length > 0
  return (
    <>
        {
            hasMovies 
            ? (
                <ListOfMovies movies={movies} />
            )
            : (
                <NoMoviesResult/>
            )
            
        }
    </>
  )
}
