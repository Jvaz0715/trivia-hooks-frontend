import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from "js-cookie";
import jwtDecode from 'jwt-decode';

import PlayerStats from "./PlayerStats";
import GameDisplay from './GameDisplay';

import {
   GameDisplayContext,
   PlayerStatsContext
} from './context/context';

import "./Protected.css";

function Protected() {

   // const [totalPoints, setTotalPoints] = useState("");
   const [totalPoints, setTotalPoints] = useState("");
   const [wins, setWins] = useState("");
   const [losses, setLosses] = useState("");

   // using this to test if update on front end works well
   const [pointsToAdd, setPointsToAdd] = useState(0)
   // const [winsToAdd, setWinsToAdd] = useState(0);
   // const [lossesToAdd, setLossesToAdd] = useState(0);

   const [triviaQuestions, setTriviaQuestions] = useState([]);
   const [currentAnswer, setCurrentAnswer] = useState("");

   let jwtCookie = Cookies.get("jwt-cookie")
   let decodedJwtCookie = jwtDecode(jwtCookie)

   useEffect(() => {
      getUser()
      getTriviaQuestions()
   }, [])

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
            totalPoints: Number(totalPoints) + Number(pointsToAdd),
         }
      )
      getUser()
      getTriviaQuestions()
   }

   async function getTriviaQuestions() {
      let questions = await axios.get(`https://opentdb.com/api.php?amount=5&type=multiple`);
      let questionsArray = questions.data.results;

      setTriviaQuestions(questionsArray)
   }
   
   function ifCheckedSetCurrentAnswer(e) {
      setCurrentAnswer(e.target.value);
   }

   function onClickForAnswer(e, item) {
      e.preventDefault();
      if(currentAnswer === item.correct_answer) {
         setPointsToAdd(Number(pointsToAdd) + 10)
         e.target.className = `${e.target.className} correct-answer`
      }
      e.target.disabled = true;

   }

   const gameDisplayContext = {
      triviaQuestions,
      ifCheckedSetCurrentAnswer,
      onClickForAnswer,
      updatePlayerStats,
   };

   return (
      <div>
         <div className="player-stats-container">
         Total points : {totalPoints}
         <br/>
         Wins: {wins}
         <br/>
         Losses: {losses}
      </div>

      <GameDisplayContext.Provider value={gameDisplayContext}>
         <GameDisplay />
      </GameDisplayContext.Provider>
      </div>      
   )
}

export default Protected;
