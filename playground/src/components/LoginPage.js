// import Logo from "./Logo"
import UserInput  from "./UserInput"
import PlayGroundContext from '../context/PlayGroundContext'
import {useContext,useEffect,useState} from 'react'
import { Form, Card } from 'react-bootstrap'
import { Button } from 'semantic-ui-react'
import {Link,useHistory} from 'react-router-dom'

function LoginPage() {
  const [validated, setValidated] = useState(false);
    let history = useHistory();
    const context = useContext(PlayGroundContext)
    const {email,password,setEmail,setPassword} = context
    function handleSubmit(e) {
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
      }
        e.preventDefault()
        const formData = {
           email,
           password
        }
          setValidated(true);
  if(email !== '' && password !== '') {
        const option = {
            mode:'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(formData)
        }
        fetch("http://localhost:5000/login", option)
        .then(response => response.json())
        .then(data => {
            if(data.Auth){
                localStorage.setItem("user", JSON.stringify({Token:data.Token,User:data.User}))
                setEmail('')
                setPassword('')
                history.push('/parks')
            }else {
              setEmail('')
              setPassword('')
              setValidated(true);
            }
        })
  }
    }
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
            history.push('/login')
          }else {
              history.push('/parks')
          }
        })
        }else {
          history.push('/login')
        }
      },[history])
    return (
    <div className="welcomeImage">
       <div className="signUpPage">
       <Card id="signUpCard" style={{ width: '25rem', borderRadius:'20px', padding:'10px' }}>
            <h1>Lets bring communities back!</h1>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <UserInput type="email" value={email} setValue={setEmail} id="loginEmail" label="Email" message="invalid credentials"/>
                <UserInput type="password" value={password} setValue={setPassword} id="loginPassword" label="Password" message="invalid credentials"/>
                <Button className="loginSignUpButtonPage" primary>Login</Button>
            </Form>
            <br/>
                <span>Don't have an account?<Link to={'/signUp'} onClick={() => {setEmail('');setPassword('')}}> Sign Up 
                </Link>
                </span>
            </Card>  
       </div>
    </div>
   )
}

export default LoginPage
