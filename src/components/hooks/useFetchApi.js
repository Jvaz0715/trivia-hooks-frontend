import {
   useState,
   useEffect,
   useContext
} from "react";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

function useFetchAPI(url) {
   const baseURL =
      process.env.NODE_ENV === "development"
         ? "http://localhost:3001/api"
         : "DEPLOYED LOCATION";

   const [isLoading, setIsLoading] = useState(false);
   const [response, setResponse] = useState(null);
   const [error, setError] = useState(null);
   const [options, setOptions] = useState({});
   const [isMessageOpen, setIsMessageOpen] = useState(false);
   const [successMessage, setSuccessMessage] = useState(null);

   const {
      dispatch
   } = useContext(AuthContext);

   function handleMessageOpen() {
      setIsMessageOpen(true);
   }

   function handleMessageClose() {
      setError(null);
      setResponse(null);
      setIsMessageOpen(false);
      setSuccessMessage(null);
   }

   function handleAPICallButtonSubmit(options = {}) {
      setOptions(options);
      setIsLoading(true);
   }

   async function handleAPIFetchCall() {
      const requestOptionObj = {
         ...options,
         withCredentials: true,
         credentials: "include",
         ...{
            headers: {
               authorization: null,
            },
         },
      };

      try {
         let response = await axios(baseURL + url, requestOptionObj);
         console.log(response);

         if (response.data.message === "user created") {
            setResponse(response.data.message);
            setIsLoading(false);
            handleMessageOpen();
            setSuccessMessage(response.data.message);
         } else {
            setIsLoading(false);
            dispatch({
               type: "LOGIN",
               user: {
                  email: response.data.user.email,
                  username: response.data.user.username,
               },
            });
         }
      } catch(e) {
         setError(e.response.data.message);
         setIsLoading(false);
         handleMessageOpen();
      }
   };

   useEffect(() => {
      if (isLoading) {
         return;
      }

      handleAPIFetchCall();

   }, [isLoading, url, options, baseURL]);

   return [
      {
         isLoading,
         response,
         error,
         setError,
         setResponse
      },
      handleAPICallButtonSubmit,
      isMessageOpen,
      handleMessageOpen,
      handleMessageClose,
      successMessage,
   ];
}

export default useFetchAPI;