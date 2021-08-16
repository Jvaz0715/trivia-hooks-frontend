import React, { useContext, useEffect } from "react";
import { NavLink, Link, withRouter } from "react-router-dom";
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
      : "login";
   
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
         <div>
            <Link to="/">Trivia Hooks App</Link>
         </div>

         <div>
            <NavLink exact to={navLinkTitleOne}>
               <button>
                  {navLinkDisplayOne}
               </button>
            </NavLink>
         </div>
            
         <div>
            <NavLink exact to={navLinkTitleTwo}>
               <button
                  onClick={logoutButton}
               >
                  {navLinkDisplayTwo}
               </button>
            </NavLink>
         </div>
      </div>
   )
}

export default withRouter(Navbar);