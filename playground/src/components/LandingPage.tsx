import {Link} from 'react-router-dom';

function LandingPage() {
    
    function addActive( e: {target: {className: string}}) {
        const showcase = document.querySelector('.showcase')
        if(showcase!.className  === 'showcase active') {
            showcase!.className = 'showcase';
        } else {
            showcase!.className = 'showcase active';
        }
        return (e.target.className === 'toggle active')? 
            e.target.className = 'toggle'
          : e.target.className = 'toggle active'
    }

    return (
        <>
            <section className="showcase">
            <div id="nav">
                    <h2 className="logo">PlayGround</h2>
                    <div className="toggle" onClick={(event: React.MouseEvent<HTMLElement>) => {addActive}}></div>
            </div>
                <video src="/assets/scene2.mp4" loop autoPlay muted></video>
                <div className="overlay"></div>
                <div className="text">
                    <h2>Lets bring</h2> 
                    <h3>communities back!</h3>
                    <p>Covid-19 crippled the world. Everything had come to a sudden stop for over a year. Now that Covid-19 has goten better 
                        the world is now opening back up but for some it may be difficult to now rejoin our communities. Playground is there to make 
                        the stress and worries of all of it slide away.
                    </p>
                    <a href="/login">Explore</a>
                </div>
                <ul className="social">
                   <li>
                        <Link to="#" className="a">
                            <img src="/assets/facebook.png" alt= ""/>
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="a">
                            <img src="/assets/twitter.png" alt= ""/>
                        </Link>
                    </li>
                    <li>
                        <Link to="#" className="a">
                            <img src="/assets/instagram.png" alt= ""/>
                        </Link>
                    </li>
                </ul>
            </section>
            <div className="menu">
                <ul>
                    <li><Link to="/login" className="a">Login</Link></li>
                    <li><Link to="/signUp" className="a">Sign Up</Link></li>
                </ul>
            </div>
            
        </>
    )
}

export default LandingPage;