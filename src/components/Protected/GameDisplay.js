import React, { useContext } from "react";
import { GameDisplayContext } from "./context/context";

function GameDisplay() {
   const {
      triviaQuestions,
      ifCheckedSetCurrentAnswer,
      onClickForAnswer,
      updatePlayerStats,
   } = useContext(GameDisplayContext);

   return (
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
                                 className="inputs" 
                                 value={item.incorrect_answers[1]}
                                 onChange={(e)=> ifCheckedSetCurrentAnswer(e)}
                              />
                              {item.incorrect_answers[1]}
                           </label>
                           <label>
                              <input 
                                 type="radio" 
                                 name="choice0"
                                 className="inputs" 
                                 value={item.incorrect_answers[2]}
                                 onChange={(e)=> ifCheckedSetCurrentAnswer(e)}
                              />
                              {item.incorrect_answers[2]}
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
                           <button className="answer-buttons"disabled={false} onClick={(e)=>onClickForAnswer(e, item)}>Answer</button>
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
   );
};

export default GameDisplay;