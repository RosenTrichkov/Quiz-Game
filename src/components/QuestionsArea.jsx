import React, { useState } from "react";
import { resultInitialState } from "./Flags";
import ReactCountryFlag from "react-country-flag";

function QuestionsArea({questions}) {

const [currentQuestion, setCurrentQuestion] = useState(Math.floor(Math.random()*questions.length));

const [answerIndex, setAnswerIndex] = useState(null);

const [answer, setAnswer] = useState(null);

const [result,setResult] = useState(resultInitialState);

const [showResult, setShowResult] = useState(false);

const [askedQuestions, setAskedQuestions] = useState([]);

const {question, choices, correct, image, color} = questions[currentQuestion];


function answerClick(answer,index){
  setAnswerIndex(index)
  if(answer === correct){
    setAnswer(true)
  }
  else {
    setAnswer(false)
  }
}

function onClickNext(){

console.log(askedQuestions.indexOf(questions[currentQuestion]))

console.log(askedQuestions);

  setAnswerIndex(null)
  setResult((prev)=>
  answer?{
    ...prev,
    score: prev.score + 5,
    correctAnswers: prev.correctAnswers + 1,
  }
:
{
  ...prev,
  wrongAnswers: prev.wrongAnswers + 1,
});


if(askedQuestions.length < 9){
  if(askedQuestions.indexOf(questions[currentQuestion]) === -1){
    askedQuestions.push(questions[currentQuestion]);
    setCurrentQuestion(Math.floor(Math.random()*questions.length));
  };   
  }

else {
  setShowResult(true);
}

if(answer){
  alert("Well Done!")
}

else{
  alert("Wrong, correct answer is " + correct + "!")
}
}

if(askedQuestions.indexOf(questions[currentQuestion]) !== -1){
   setCurrentQuestion(Math.floor(Math.random()*questions.length))
}

function TryAgain(){
  setResult(resultInitialState)
  setShowResult(false)
  setAskedQuestions([])
  setCurrentQuestion(Math.floor(Math.random()*questions.length))
}

document.body.style.backgroundImage = color;

  return (
  <div>
   { !showResult ? (<form className="questionArea"> <h2>{question}</h2>
          <div className={askedQuestions.length < 9?"smallNum":"largeNum"}>
        <span>{askedQuestions.length + 1}</span>
        <span>/{(questions.length/questions.length)*10}</span></div>
        < ReactCountryFlag className="flag" countryCode={image}
        svg
        style={{
            marginLeft:"250px",
            marginTop:"-20px",
           // fontSize:"11em",
            //lineHeight:"11em",
            width:"180px",
            height: "180px",
        }}
        aria-label=''/>
        
        <ul className="options-list">
         { choices.map((answer, index) =>(
            <li
            onClick={()=> answerClick(answer,index)}
            key={answer}
            className={answerIndex === index ?"selected-answer":"option"}>
              {answer}
            </li>
          ))}
        </ul>
        
       <div>
        <button onClick ={onClickNext} disabled={answerIndex === null}
        >{askedQuestions.length === 9 ?"Finish":"Submit"}
        </button>
        </div> </form> )
        
        :  <form className="FinishScreen"> <div className="FinalResult">
         <h3>Result:</h3>
        <p>Total Questions: <span>{askedQuestions.length + 1}</span></p>
        <p>Total Score: <span>{result.score}</span></p>
         <p>Correct Answers: <span>{result.correctAnswers}</span></p>
         <p>Wrong Answers: <span>{result.wrongAnswers}</span></p>
         <button onClick={TryAgain}>Try Again</button>
         </div> </form>}

  </div>
  );
  
}

export default QuestionsArea;