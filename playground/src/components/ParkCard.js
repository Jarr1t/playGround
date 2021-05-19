import Card from 'react-bootstrap/Card'
import { useEffect, useState } from 'react'

import {Link} from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
function Parkcard(props){
    const {Park ,search} = props
    const [rating, setRating] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/getRatings')
        .then(res => res.json())
        .then(data => setRating(data))
    }, [])
    const currentParkRating = rating.filter(parks => parks.park_id === Park.id)
    console.log(currentParkRating)
    const cleanRate = []
    const locaRate = []
    const amenRate = []
    currentParkRating.forEach(rating => {
        cleanRate.push(rating.cleanliness_rating)
        locaRate.push(rating.location_rating)
        amenRate.push(rating.amenities_rating)
    })
    let overAllClean = 5
    let overAllLoca = 5
    let overAllAmen = 5
    if(cleanRate.length !== 0){
    overAllClean = Math.floor((cleanRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)
    overAllLoca = Math.floor((locaRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)
    overAllAmen = Math.floor((amenRate.reduce((acc,cur) => acc + cur, 0)) / currentParkRating.length)        
    }
    return (
            <Card className="park_cards" style={{ width: '18rem' }}>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/Logo_of_the_New_York_City_Department_of_Parks_%26_Recreation.svg/1200px-Logo_of_the_New_York_City_Department_of_Parks_%26_Recreation.svg.png" />
                <Card.Body>
                <Link to={`/parks/${Park.id}`}>
                    <Card.Title onClick={e => search('')}>{Park.park_name}</Card.Title>
                </Link>
                    <Card.Text>
                        {Park.park_location}
                    </Card.Text>
                    <Card.Subtitle>
                        {Park.subcategory}
                        <br/>
                        <h3>Cleanliness: {overAllClean}</h3>
                        <h3>Location: {overAllLoca}</h3>
                        <h3>Amenities: {overAllAmen}</h3>
                        <Icon link name='heart outline' onClick={e => e.target.classList.value = 'heart link icon'}/>
                    </Card.Subtitle>
                </Card.Body>
            </Card>
    )
}

export default Parkcard