import React, {  useState, useEffect, useRef  } from 'react'
import { useMovies} from './hooks/useMovies.jsx'
import './App.css'
import { Movies } from './components/Movies'

function useSearch(){
  const[search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current){
      isFirstInput.current = search === ''
      return
    }
  
    if(search === ''){
          setError('No se puede buscar una pelicula vacia')
          return
    }
  
    if(search.length<3){
      setError('La busqeda debe tener al menos 3 carateres')
      return
    }
  
    if(search.match(/^\d+$/)){
      setError('No se puede buscar una pelicula con un numero')
      return
    }
      setError(null)
  }, [search])
  return{ search, updateSearch, error}
}

export function App() {
  
  const { search, updateSearch, error} = useSearch()
  const { movies : mappedMovies, getMovies} = useMovies({ search})  

// forma sin controlar del form con js
const handleSubmit = (event) => {
    event.preventDefault()
    getMovies()
}

//forma controlada del form
const handleChange = (event) =>{
    updateSearch(event.target.value) 
  }
  // use efect de la query del form para validar



  return (
    <div className='page'>
        <header>
            <h1>Buscador de peliculas</h1>
            <form className='form' onSubmit={handleSubmit} >
                <input 
                  style={{
                    border: '1px solid transparent',
                    borderColor: error? 'red' : 'transparent'           
                  }} onChange={handleChange} value={search} name='query' placeholder='Avenger, Star Wars' />
                <button type='submit'>Buscar</button>
            </form>
            {error && <p style={{ color: 'red'}}>{error}</p>}
        </header>

        <main>
            <Movies movies={ mappedMovies } />
        </main>
    </div>
  )
}

export default App