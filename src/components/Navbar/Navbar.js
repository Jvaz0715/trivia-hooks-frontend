import React, { useContext, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import {withRouter} from "react-router-dom";
import Cookies from "js-cookie";
import {AuthContext} from "../../context/AuthContext";
import CheckAuthCookie from "../hooks/checkAuthCookie";
import axios from "axios";

import "./Navbar.css";

function Navbar(props) {
   const { logUserIn } = CheckAuthCookie();

   useEffect(() => {
      logUserIn();
   }, []);

   const {
      state: { user },
      dispatch,
   } = useContext(AuthContext);

   const isUserLoggedIn = user ? true : false;
   const navLinkTitleOne = isUserLoggedIn 
      ? "/profile" 
      : "/login";
   
   const navLinkDisplayOne = isUserLoggedIn
      ? `${user.email}`
      :"login";

   const navLinkTitleTwo = isUserLoggedIn
      ? "/logout"
      : "/sign-up";

   const navLinkDisplayTwo = isUserLoggedIn
      ? "Logout"
      : "Sign up";
   
   const logoutButton = isUserLoggedIn
      ? logout
      : () => {};

   async function logout() {
      try {
         await axios.get("http://localhost:3001/api/users/logout");

         dispatch({
            type: "LOG_OUT",
         });

         Cookies.remove("jwt-cookie");
         props.history.push("/login");
      } catch (e) {

      }
   };

   return (
      <div>
         <div className="navbar-container">
            <div className="nav-left">
               <Link to="/" className="nav-logo">Hooked on Trivia</Link>
            </div>

            <div className="nav-right">
               
               <div>
                  <NavLink exact to={navLinkTitleOne}>
                     <button className="nav-buttons">
                        {navLinkDisplayOne}
                     </button>
                  </NavLink>
               </div>
            
               <div>
                  <NavLink exact to={navLinkTitleTwo}>
                     <button
                        onClick={logoutButton}
                        className="nav-buttons"
                     >
                        {navLinkDisplayTwo}
                     </button>
                  </NavLink>
               </div>

            </div>

            
         </div>
      </div>
   )
}

export default withRouter(Navbar);