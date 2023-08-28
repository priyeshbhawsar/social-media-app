import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { defaultLoginData } from '../../constant';
import './home.css'

const Home: React.FC = () => {
    const [userDetails, setUserDetails] = useState(defaultLoginData);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userDetails');
        if (storedUserData) {
            setUserDetails(JSON.parse(storedUserData));
        }
    }, [])

    const handleSignOut = () => {
        const storedUserData = localStorage.getItem('userDetails');

        if (storedUserData) {
            localStorage.removeItem('userDetails');
            setUserDetails(defaultLoginData);
        }
    }

    return (
        <div>
            <div className="topnav">
                <Link className="active" to="/">Home</Link>
                {userDetails.email && userDetails.password ?
                    <>
                        <Link className="active" to="/dashboard">Dashboard</Link>
                        <div className="topnav-right">
                            <Link to="/" onClick={handleSignOut}>SignOut</Link>
                        </div>
                    </>
                    :
                    <div className="topnav-right">
                        <Link to="/signin">Sign In</Link>
                    </div>
                }
            </div>
            <div className="landing-page">
                <header className="header">
                    <h1>Welcome To Home Page</h1>
                </header>
                <footer className="footer">
                    <p>&copy; {new Date().getFullYear()} ITWox . All rights reserved.</p>
                </footer>
            </div>
        </div>
    )
}

export default Home