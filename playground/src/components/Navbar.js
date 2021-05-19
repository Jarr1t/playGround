import { useEffect,useState } from 'react'
import {Link, useHistory} from 'react-router-dom'

function Navbar(){
  const [userProfile,setUserProfile] = useState({})
  let history = useHistory()
  useEffect(()=> {
    const user = localStorage.getItem('user')
    if(user) {
    const options = {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: user
    }
    fetch('http://localhost:5000/verifySession',options)
    .then(response => response.json())
    .then(data => {
      if(!data.Auth) {
        history.push('/')
      }else {
        delete data.User.first_name
        delete data.User.last_name
        delete data.User.email
        const content = Buffer.from(data.User.user_image.data)
        const string64 = content.toString('base64')
        setUserProfile((prev) => ({...prev,id:data.User.id, user_image: `data:image/png;base64,${string64}`}))
      }
    })
    }else {
      history.push('/')
    }
  },[history])
    return (
      <>
        <nav id={"navbar"}>
          <Link to={"/parks"}>
          <h3>Home</h3>
          </Link>
          <Link to={`/users/${userProfile.id}`}>
          <img  src={userProfile.user_image} alt={"Oh no"} style={{height:"35px"}}></img>
          </Link>
        </nav>
      </>
    )
}

export default Navbar