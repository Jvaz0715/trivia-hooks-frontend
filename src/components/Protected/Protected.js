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
      // let questions = await axios.get(`https://opentdb.com/api.php?amount=5&type=multiple`);
      // let questionsArray = questions.data.results;

      let questionsArray = [{
         "category": "Geography",
         "type": "multiple",
         "difficulty": "medium",
         "question": "In which English county is Stonehenge?",
         "correct_answer": "Wiltshire",
         "incorrect_answers": [
            "Somerset",
            "Cumbria",
            "Herefordshire"
         ]
      },
      {
         "category": "Art",
         "type": "multiple",
         "difficulty": "medium",
         "question": "Which artist&rsquo;s studio was known as &#039;The Factory&#039;?",
         "correct_answer": "Andy Warhol",
         "incorrect_answers": [
            "Roy Lichtenstein",
            "David Hockney",
            "Peter Blake"
         ]
      },
      {
         "category": "Science & Nature",
         "type": "multiple",
         "difficulty": "hard",
         "question": "What is the molecular formula of Glucose?",
         "correct_answer": "C6H12O6",
         "incorrect_answers": [
            "C2H4O2",
            "K+",
            "CH4"
         ]
      },
      {
         "category": "History",
         "type": "multiple",
         "difficulty": "medium",
         "question": "The Herero genocide was perpetrated in Africa by which of the following colonial nations?",
         "correct_answer": "Germany",
         "incorrect_answers": [
            "Britain",
            "Belgium",
            "France"
         ]
      },
      {
         "category": "Geography",
         "type": "multiple",
         "difficulty": "medium",
         "question": "Which one of these countries borders with Poland?",
         "correct_answer": "Lithuania",
         "incorrect_answers": [
            "France",
            "Norway",
            "Netherlands"
         ]
      },
      {
         "category": "Entertainment: Music",
         "type": "multiple",
         "difficulty": "easy",
         "question": "In 2006, which band released their debut album &quot;A Fever You Can&#039;t Sweat Out&quot;?",
         "correct_answer": "Panic! At the Disco",
         "incorrect_answers": [
            "Twenty One Pilots",
            "My Chemical Romance",
            "Fall Out Boy"
         ]
      },
      {
         "category": "Entertainment: Video Games",
         "type": "multiple",
         "difficulty": "medium",
         "question": "In &quot;Call Of Duty: Zombies&quot;, completing which map&#039;s main easter egg will reward you with the achievement, &quot;High Maintenance&quot;?",
         "correct_answer": "Die Rise",
         "incorrect_answers": [
            "Mob Of The Dead",
            "Origins",
            "Ascension"
         ]
      },
      {
         "category": "Entertainment: Japanese Anime & Manga",
         "type": "multiple",
         "difficulty": "medium",
         "question": "In the &quot;To Love-Ru&quot; series, how many Trans-weapons were created?",
         "correct_answer": "3",
         "incorrect_answers": [
            "1",
            "2",
            "4"
         ]
      },
      {
         "category": "Entertainment: Japanese Anime & Manga",
         "type": "multiple",
         "difficulty": "medium",
         "question": "In &quot;JoJo&#039;s Bizzare Adventure: Stardust Crusaders&quot;, what is the last name of the protagonist Jotaro?",
         "correct_answer": "Kujo",
         "incorrect_answers": [
            "Cujoh",
            "Joestar",
            "Higashikata"
         ]
      },
      {
         "category": "General Knowledge",
         "type": "multiple",
         "difficulty": "easy",
         "question": "Foie gras is a French delicacy typically made from what part of a duck or goose?",
         "correct_answer": "Liver",
         "incorrect_answers": [
            "Heart",
            "Stomach",
            "Intestines"
         ]
      }];

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
         Your total points : {totalPoints}
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
