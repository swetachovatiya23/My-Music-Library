import './App.css';
import React, { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import AlbumView from './components/AlbumView'
import ArtistView from './components/ArtistView'
import Gallery from './components/Gallery'
import SearchBar from './components/SearchBar'


function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [data, setData] = useState([])
  let [message, setMessage] = useState('Search for Music!')

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`

      //getting link
      const fetchData = async () => {
        const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}`)
        const resData = await response.json()
        if(resData.results.length > 0) {
          setData(resData.results)
        } else {
          setMessage('Not Found')
        }
      }
      fetchData()
    }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  return (
    <div className="App">
      {message}
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={
            <div>
              <SearchBar handleSearch={handleSearch} />
              <Gallery data={data} />
            </div>
          }/>
          <Route path="/album/:artist/:id" element={
            <AlbumView/>
          }/>
          <Route path="/artist/:artist" element={
            <ArtistView/>
          }/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;