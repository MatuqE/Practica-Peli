import React, { useState } from 'react'
import withresults from '../mocks/with-results.json'
import withoutResults from '../mocks/without-results.json'

// const url = `https://www.omdbapi.com/?apikey=4287ad07&s={movies}`
// const resp = await fetch( url );
// const { data } = await resp.json()
// const url = `https://api.giphy.com/v1/gifs/search?api_key=XZ9PRtpvYIB4epydUWn0PL4irYZNgUFt&q=${category}&limit=10`;
// const resp = await fetch( url );
// const { data } = await resp.json()

export  function useMovies({ search }) {
  const [responseMovies, setResponseMovies] = useState([])

    const movies = responseMovies.Search

    const mappedMovies = movies?.map (movie =>({
        id: movie.imdbID,
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster
    }))

    const getMovies = () =>{
      if(search){
        fetch(`https://www.omdbapi.com/?apikey=4287ad07&s=${search}`)
        .then(resp => resp.json())
        .then(json =>{
          setResponseMovies(json)
        })
      }else
      {
        setResponseMovies(withoutResults)
      }
    }

  return { movies : mappedMovies, getMovies}
}

export default useMovies