// These components will be making separate API calls from the app
// component to serve specific data about our artist
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ArtistView = () => {
    const { id } = useParams()
    const [artistData, setArtistData] = useState([])
    const history = useNavigate()
    const justAlbums = artistData.map(entry => {
        return [entry.collectionId, entry.collectionName]
    })
    console.log(justAlbums)
    useEffect(() => {
        const API_URL = `https://itunes.apple.com/lookup?id=${id}&entity=song`
        const fetchData = async () => {
            const response = await fetch(API_URL)
            const resData = await response.json()
            console.log(resData)
            setArtistData(resData.results)
        }
        fetchData()
    }, [id])

    const renderAlbums = justAlbums.map(function (album, i) {
        console.log(album)
        return (
            <div key={i}>
                <p>{album[1]}</p>
            </div>
        )
    })

    const testSomething = () => {
        return (
            <div>
                <button onClick={() => history(-1)}>Go back</button>
                <button onClick={() => history('/')}>Home</button>
            </div>
        )
    }
    console.log(testSomething)
    return (
        <div>
            <h2>The id passed was: {id}</h2>
            <p>Artist Data Goes Here!</p>
            {renderAlbums}
            {testSomething()}
        </div>
    )
}

export default ArtistView