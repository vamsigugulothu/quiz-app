import logo from './logo.svg';
import './App.css';
import { reducer, initialState } from './store/redux';
import { useEffect, useReducer, useState } from 'react';
import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";

const API_BASE_URL = "https://0h8nti4f08.execute-api.ap-northeast-1.amazonaws.com/getQuestionDetails/getquestiondetails?QuestionID="
const AllQuestion =  ["AreaUnderTheCurve_901","BinomialTheorem_901","DifferentialCalculus2_901"]


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  useEffect(() => {
    dispatch({
      type: "QUESTIONS_REQUEST",
    });
    axios.get(API_BASE_URL+AllQuestion[currentQuestion-1]).then((res)=>{
      if(res.status === 200){
        dispatch({
          type: "QUESTIONS_SUCCESS",
          payload: res.data
        });
      } else{
        dispatch({
          type: "QUESTIONS_FAILURE",
          payload: res.message
        });
      }
    })
  },[currentQuestion])

  const { 
    loading,
    questions,
    errorMessage
  } = state
  const question = questions[0]

  const gotoNext = () => {
    setCurrentQuestion(currentQuestion+1)
  }

  const gotoPrev = () => {
    setCurrentQuestion(currentQuestion-1)
  }

  if(errorMessage){
    return errorMessage.message
  }

  return (
    <>
      <h2>Quiz App</h2>
      <div className='wrapper'>
        <div className="App">
          {loading ? <div style={{ display: 'flex', justifyContent: "center", margin: "auto"}}>loading...</div> :
            <>
              <span style={{ textAlign: "center", marginBottom: "10px"}}>({currentQuestion}/{AllQuestion.length})</span>
              <MathJaxContext>
                <MathJax>{question?.Question}</MathJax>
              </MathJaxContext>
              <div className='button-container'>
                {currentQuestion > 0 && <button disabled={currentQuestion === 1} onClick={gotoPrev}>Prev</button>}
                {currentQuestion < AllQuestion.length + 1 && <button disabled={currentQuestion === AllQuestion?.length} onClick={gotoNext}>Next</button>}
              </div>
            </>
          }
        </div>
      </div>
    </>
  );
}

export default App;
