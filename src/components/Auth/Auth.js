import React from "react";

import useChangeInputConfig from "../hooks/useInput";
import useFetchAPI from "../hooks/useFetchApi";
import checkAuthCookie from "../hooks/checkAuthCookie";

import "./Auth.css"

function Auth(props) {
   let isLoginRoute = props.match.path === "/login";
   let buttonTitle = isLoginRoute ? "Login" : "Sign up";
   let apiURL = isLoginRoute ? "/users/login" : "/users/create-user";

   const { checkIfCookieExists } = checkAuthCookie();


   const [
      { /*isLoading,*/ response, /*error,*/ setResponse },
      handleAPICallButtonSubmit,
      // isMessageOpen,
      // handleMessageClose,
      // successMessage
   ] = useFetchAPI(apiURL)
   
   const [
      email,
      handleEmailChange,
      isEmailError,
      emailErrorMessage,
      isEmailDisabled,
      clearEmailInput,
   ] = useChangeInputConfig("email");

   const [
      username,
      handleUsernameChange,
      isUsernameError,
      usernameErrorMessage,
      isUsernameDisabled,
      clearUsernameInput,
   ] = useChangeInputConfig("username");

   const [
      password,
      handlePasswordChange,
      isPasswordError,
      passwordErrorMessage,
      isPasswordDisabled,
      clearPasswordInput,
   ] = useChangeInputConfig("password");
   
   function handleOnSubmit(e) {
      e.preventDefault();

      const user = isLoginRoute
         ? { email, password }
         : { email, username, password };

      handleAPICallButtonSubmit({
         method: "post",
         data: {
            ...user,
         },
      });
   }

   if (response === "user created") {
      clearEmailInput();
      clearUsernameInput();
      clearPasswordInput();
      setResponse(null);
   }

   if (checkIfCookieExists()) {
      props.history.push("/protected");
   }

   return (
      <div>
         <div className="form-container">
         {/* {successMessage && successMessage()}
         {error && emailErrorMessage()} */}
         <form onSubmit={handleOnSubmit} className="form">
            <label>Email</label>
            <input 
               name="email"
               value={email}
               onChange={handleEmailChange}
            />
            {isEmailError && emailErrorMessage}

            {!isLoginRoute && (
               <>
                  <label>Username</label>
                  <input
                     name = "username"
                     value = {username}
                  onChange = {handleUsernameChange}
                  /> 
                  {isUsernameError && usernameErrorMessage}
               </>
               
            )}
            <label>Password</label>
            <input 
               name="password"
               type="password"
               value={password}
               onChange={handlePasswordChange}
            />
            {isPasswordError && passwordErrorMessage}

            <button
               type="submit"
               disabled={
                  isLoginRoute
                     ? isEmailDisabled || isPasswordDisabled
                     :isEmailDisabled || isPasswordDisabled ||
                     isUsernameDisabled
               }
            >
               {buttonTitle}
            </button>

         </form>
         </div>
      </div>
      
   )
}

export default Auth;