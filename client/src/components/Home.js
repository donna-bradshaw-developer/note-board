import React from 'react';
import { Link } from 'react-router-dom'
import noteImage from "./media/brandi-redd-122054-unsplash.jpg"

const Home = () => {
    return (
        <div id="home">
            <img src={ noteImage } alt="Posted Notes" />
            <div id = "home-right">
                <h1 className="title">My Board</h1>
                <span><Link to="/register">Sign Up</Link></span>
                <span><Link to="/login">Log In</Link></span>
            </div>
        </div>
    );
};

export default Home;