// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'


const ArtistView = () => {
    const { artist } = useParams()
    const [ artistData, setArtistData ] = useState([])
    const navigate = useNavigate();
    
    useEffect(() => {
        const API_URL = `https://itunes.apple.com/lookup?id=${artist}&entity=song`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            setArtistData(resData.results)
        }
        fetchData()
    },[artist])

    let seen_albums = []
    let add = false
    const justAlbums = artistData.filter(entry => {
        add = !(entry.collection in seen_albums)
        seen_albums.push(entry.collectionId)
        return add
    })
    const renderAlbums = justAlbums.map((album, i) => {
        return (
            <div key={i}>
                <Link to={`/album/${artist}/${album.collectionId}`}>
                    <p>{album.collectionName}</p>
                </Link>
            </div>
        )
    })

    const navButtons = () => {
        return(
            <div>
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={() => navigate('/')}>Home</button>
            </div>
        )
    }

    return (
        <div>
            <h2>The id passed was: {artist}</h2>
            {artistData.length > 0 ? <h2>{artistData[0].artistName}</h2> : <h2>Loading...</h2>}
            {navButtons()}
            {renderAlbums}
        </div>
    )
}

export default ArtistView