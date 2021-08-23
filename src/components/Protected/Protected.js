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

   return (
      <>
      {/* this could be one component */}
      <div className="player-stats-container">
         Total points : {totalPoints}
         <br/>
         Wins: {wins}
         <br/>
         Losses: {losses}
      </div>
      
      {/* this is another component */}
      <div className="game-container">
         <form className="form-div">
            <fieldset className="fieldset-div">
               {/* <legend>Trivia Questions</legend> */}
            
               <br/>
               <div className="question-container">
               {triviaQuestions.map((item, index) => {
                  return(
                     <div key={index} >
                     <br/>
                        <section className="questions">
                           <div className="questions-outerbox">
                              <div className="questions-innerbox">
                                 <p>{index + 1}/5</p>
                                 <p>{item.category}</p>
                                 <p>{item.question}</p>
                              </div>
                           </div>
                           
                           <label>
                              <input 
                                 type="radio" 
                                 name="choice0"
                                 className="inputs" 
                                 value={item.incorrect_answers[0]}
                                 onChange={(e)=> ifCheckedSetCurrentAnswer(e)}
                              />
                              {item.incorrect_answers[0]}
                           </label>
                           <label>
                              <input 
                                 type="radio" 
                                 name="choice0"
                                 className="choices-inputs"
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
            <button className="play-again-button"onClick={() => updatePlayerStats()}>
               Play Again
            </button>
         </form>
      </div>
      

      </>
   )
}

export default Protected;
