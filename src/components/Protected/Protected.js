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
   // const [pointsToAdd, setPointsToAdd] = useState(0);
   // const [winsToAdd, setWinsToAdd] = useState(0);
   // const [lossesToAdd, setLossesToAdd] = useState(0);

   const [currentAnswer, setCurrentAnswer] = useState("");

   const [triviaQuestions, setTriviaQuestions] = useState([]);

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
            totalPoints: Number(totalPoints) + 40,
            wins: Number(wins) + 105,
            losses: Number(losses) + 9950,
         }
      )
      
      console.log(updatedUser);
      getUser()
   }

   async function getTriviaQuestions() {
      let questions = await axios.get(`https://opentdb.com/api.php?amount=10&type=multiple`);
      
      let questionsArray = questions.data.results;
      setTriviaQuestions(questionsArray)
   }
   
   function ifCheckedSetCurrentAnswer(e) {
      setCurrentAnswer(e.target.value);
      console.log(e.target.value)
   }

   function onClickForAnswer(e, item) {
      e.preventDefault();

      console.log(currentAnswer)
      console.log("this is the correct answer: " + item.correct_answer);
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
      {/* <button onClick={()=> updatePlayerStats()}>Update stats!</button> */}

      <div>
         <form>
            <fieldset>
               <legend>Trivia Questions</legend>
               <label>Enter your name</label>
               <input type="text" id="myText" name="fieldName" placeholder="anonymous" value=""/>
               <br/>
               {triviaQuestions.map((item, index) => {
                  return(
                     <div key={index}>
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
                           <button onClick={(e)=>onClickForAnswer(e, item)}>Submit Answer</button>
                           
                        </section>
                        
                     <br/>
                     </div>
                     
                  )
               })}
            </fieldset>
         </form>
      </div>
      

      </>
   )
}

export default Protected;
