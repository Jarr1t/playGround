import Card from 'react-bootstrap/Card'

function LargeEventsCard(props:{ event:{title: string, startdate: string, location: string, starttime:string, endtime:string, image: string}}){
    const title = props.event.title
    const startdate = props.event.startdate
    const location = props.event.location
    const starttime = props.event.starttime
    const endtime = props.event.endtime
    const image = props.event.image
    return (
        <div style={{ display: 'flex', margin:'15px', justifyContent:'center'}}>
            <Card className="eventCard" style={{ fontFamily: "Poppins, sans-serif", width: '30rem', margin: '0px'}}>
                <div>
                    <h2>{title}</h2>
                    <h5>Date: {startdate}</h5>
                    <h5>Meeting Spot: {location}</h5>
                    <h5>Times: {starttime} - {endtime}</h5>
                </div>
            </Card>    
            <img style={{ height: '15rem', width:'25rem'}}src={image} alt=""/>
        </div>
    )
}

export default LargeEventsCard