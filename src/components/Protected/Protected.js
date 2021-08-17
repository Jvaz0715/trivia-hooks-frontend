import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import jwtDecode from 'jwt-decode';

import "./Protected.css";


function Protected() {

   // const [totalPoints, setTotalPoints] = useState("");
   const [totalPoints, setTotalPoints] = useState("");
   const [wins, setWins] = useState("");
   const [losses, setLosses] = useState("");

   // using this to test if update on front end works well
   const [pointsToAdd, setPointsToAdd] = useState(0);
   const [winsToAdd, setWinsToAdd] = useState(0);
   const [lossesToAdd, setLossesToAdd] = useState(0);

   let jwtCookie = Cookies.get("jwt-cookie")
   let decodedJwtCookie = jwtDecode(jwtCookie)

   
   useEffect(() => {
      getUser()
   }, )

   async function getUser() {
      let foundUser = await axios.get(`http://localhost:3001/api/users/get-user/${decodedJwtCookie.id}`);
      
      // console.log(foundUser.data.foundUser.totalPoints);
      setTotalPoints(foundUser.data.foundUser.totalPoints)
      setWins(foundUser.data.foundUser.wins)
      setLosses(foundUser.data.foundUser.losses)
   };

   async function updatePlayerStats() {
      let updatedUser = await axios.put(
         `http://localhost:3001/api/users/update-player-stats/${decodedJwtCookie.id}`,
         {
            totalPoints: Number(totalPoints) + 8,
            wins: Number(wins) + 21,
            losses: Number(losses) + 1990,
         }
      )
      
      console.log(updatedUser);
      getUser()
   }

   return (
      <>
      <div className="player-stats-container">
         Your total points : {totalPoints}
         <br/>
         Wins: {wins}
         <br/>
         Losses: {losses}
      </div>
      {/* testing to make sure frontend update works */}
      <button onClick={()=> updatePlayerStats()}>Update stats!</button>

      </>
   )
}

export default Protected;
