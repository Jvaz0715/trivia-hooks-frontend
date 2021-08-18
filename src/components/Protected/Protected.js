import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies, { set } from "js-cookie";
import jwtDecode from 'jwt-decode';

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
      console.log(e.target.value)
   }

   function onClickForAnswer(e, item) {
      e.preventDefault();
      // console.log(currentAnswer)
      // console.log("this is the correct answer: " + item.correct_answer);
      if(currentAnswer === item.correct_answer) {
         setPointsToAdd(Number(pointsToAdd) + 10)
      }
      e.target.disabled = true;

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
   
      <div className="game-container">
         <form className="form-div">
            <fieldset className="fieldset-div">
               <legend>Trivia Questions</legend>
            
               <br/>
         
         


               <div className="question-container">
               {triviaQuestions.map((item, index) => {
                  return(
                     <div key={index} >
                     <br/>
                        <section id="radio1" className="questions" >
                           <p>Question {index + 1}) {item.question}</p>
                           <label>
                              <input 
                                 type="radio" 
                                 name="choice0" 
                                 value={item.incorrect_answers[0]}
                                 onChange={(e)=> ifCheckedSetCurrentAnswer(e)}
                              />
                              {item.incorrect_answers[0]}
                           </label>
                           <label>
                              <input 
                                 type="radio" 
                                 name="choice0" 
                                 value={item.correct_answer}
                                 onChange={(e)=> ifCheckedSetCurrentAnswer(e)}
                              />
                              {item.correct_answer}
                           </label>
                           <button disabled={false} onClick={(e)=>onClickForAnswer(e, item)}>Submit Answer</button>
                        </section>
                        
                     <br/>
                     </div>   
                  )
               })}
               < br/>
            </div>
            </fieldset>
            <button onClick={() => updatePlayerStats()}>
               Play Again
            </button>
         </form>
      </div>
      

      </>
   )
}

export default Protected;
