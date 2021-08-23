import React from 'react';
import { Link } from 'react-router-dom';

import checkAuthCookie from "../hooks/checkAuthCookie";
import "./Home.css";

function Home() {
   const { checkIfCookieExists } = checkAuthCookie();
   let isLoggedIn = checkIfCookieExists();
   return (
      <div className="home">
         {!isLoggedIn && (
            <>
               <Link to="/sign-up" >Sign up</Link> or <Link to="/login">Login</Link>
               
            </>
         )}
         {isLoggedIn && (
            <>
               <Link to="/protected">Play Now</Link>
            </>
         )}
      </div>
   )
}

export default Home;
