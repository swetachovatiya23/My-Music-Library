import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const AlbumView = () => {
    const { artist, id } = useParams()
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
    }, [artist, id])

    const albumData = artistData.filter(entry => entry.collectionId == id)
    const justSongs = albumData.filter(entry => entry.kind === 'song')

    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p>{song.trackName}</p>
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
            {navButtons()}
            {renderSongs}
        </div>
    )
}

export default AlbumView