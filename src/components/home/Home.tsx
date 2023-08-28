import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useContextProvider } from '../../context/context-provider';
import { defaultLoginData, endpoints } from '../../constant';

import './home.css'

//home in page to see user signin/signout
const Home: React.FC = () => {
    const [userDetails, setUserDetails] = useState(defaultLoginData); //userData with default value
    const { addPosts, addComments } = useContextProvider(); //add posts and comments function to store data in context

    useEffect(() => {
        const storedUserData = localStorage.getItem('userDetails'); //get user from localstoreage
        if (storedUserData) {
            setUserDetails(JSON.parse(storedUserData)); //setUser data in state variable to rener nav bar correctly
        }
    }, [])

    useEffect(() => {
        getPost(endpoints);
    }, []);

    const getPost = async (api: string[]) => {
        await axios.all(api.map((endpoint) => axios.get(endpoint))).then(
            axios.spread(({ data: posts }, { data: comments }) => {
                addPosts(posts); //add posts in context using axios
                addComments(comments); //add comments in context using axios
            })
        ).catch(error => {
            console.error('Error fetching data:', error);
        })
    }

    const handleSignOut = () => {
        const storedUserData = localStorage.getItem('userDetails');

        if (storedUserData) {
            localStorage.removeItem('userDetails'); //remove the user from localstorage while user click on singout
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