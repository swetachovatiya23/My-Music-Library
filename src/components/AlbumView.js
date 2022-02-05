import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const AlbumView = () => {
    const { id } = useParams()
    const [albumData, setAlbumData] = useState([])
    const justSongs = albumData.map(entry => entry.collectionName === 'song')
    // console.log(justSongs)
    
    useEffect(() => {
        const fetchData = async () => {
            const API_URL = `https://itunes.apple.com/lookup?id=${id}&entity=song`
            const response = await fetch(API_URL)
            const resData = await response.json()
            console.log(resData)
            setAlbumData(resData.results)
        }
        fetchData()
    }, [id])


    const renderSongs = justSongs.map((song, i) => {
        return (
            <div key={i}>
                <p>{song.trackName}</p>
            </div>
        )
    })

    return (
        <div>
            {renderSongs}
        </div>
    )
}

export default AlbumView