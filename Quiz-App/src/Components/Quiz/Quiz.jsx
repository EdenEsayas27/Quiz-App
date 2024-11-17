import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../Utils/axois'
import { useNavigate } from 'react-router-dom';
function Quiz() {
    const {category ,type,difficulty} = useParams();
    const [Quiz , setQuiz] = useState([]);
    const[SelectedAnswers ,setSelectedAnswers] = useState({});
    const [currentQuestionIndex ,setCurrentQuestionIndex] = useState(0);
    const [score ,setScore] = useState(0);
    const [isCorrect,SetIsCorrect] = useState(null);
    const [SubmittedQuestions, setSubmittedQuestions] = useState({});
    const [quizCompleted , setQuizCompleted] = useState(false);
    const navigate = useNavigate();
    const shuffledArray = (array) =>{
        return array.sort(()=>Math.random()-0.5)
    }
    const handleOptionChange = (questionIndex, answer) => {
        setSelectedAnswers((prev) => ({
            ...prev,
            [questionIndex]: answer, // Track the selected answer for the specific question
        }));
        SetIsCorrect(null)
    };
    const handelPrev=()=>{
        if(currentQuestionIndex>0){
            setCurrentQuestionIndex((prev)=>prev-1)
        }
        SetIsCorrect(null) 
    }
    const handelNext=()=>{
        if(currentQuestionIndex<Quiz.length-1){
            setCurrentQuestionIndex((prev)=>prev+1)
        }
        SetIsCorrect(null)
    }
    const handelSubmit = () =>{
        const correct_answer=Quiz[currentQuestionIndex].correct_answer
        
        if(SelectedAnswers[currentQuestionIndex]===correct_answer && !SubmittedQuestions[currentQuestionIndex] ){
            setScore((prev)=>prev+1)
        }
        setSubmittedQuestions((prev)=>({
            ...prev,
             [currentQuestionIndex] : true,
        }))
        SetIsCorrect( SelectedAnswers[currentQuestionIndex]===correct_answer) 
        if (currentQuestionIndex === Quiz.length - 1) {
            setQuizCompleted(true);
        }
    }
   const handelNavigateToCatagories =()=>{
         navigate("/catagories");
    }
    const handelRestartQuiz = () =>{
         window.location.reload();
    }
    useEffect(()=>{
        axios.get(`api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}`).then(
            (res)=> {
                const AllQuestion = res.data.results.map((question)=>{
                const  allAnswer = shuffledArray([...question.incorrect_answers ,question.correct_answer])
                return{...question ,allAnswer}

            }) 
            setQuiz(AllQuestion);}
        
        ).catch((err)=>{
            console.log("error happpend", err);
        })
    },[difficulty,type,category])
   
  return (
    <div>
        {Quiz.length > 0 ? 
        ( (
            <div >
                <p dangerouslySetInnerHTML={{ __html: Quiz[currentQuestionIndex].question }} />
                <div>
                    
                    {Quiz[currentQuestionIndex].allAnswer.map((answer ,j)=>(
                        <label key={j}>
                        <input type='radio' 
                        value={answer} 
                        name={`question_${currentQuestionIndex}`}
                        checked={SelectedAnswers[currentQuestionIndex]=== answer} 
                        onChange={()=> handleOptionChange(currentQuestionIndex,answer)} />
                        {answer}
                        </label>
                    ))}
                   {isCorrect !== null && (
                            <p>{isCorrect ? ('Correct') : (`Incorrect the correct answer is ${Quiz[currentQuestionIndex].correct_answer}  `)}</p>
                        )}
                   
                </div>
                <div>
            <button onClick={()=>handelPrev()} disabled={currentQuestionIndex===0}> prev </button>
            <button onClick={()=>handelNext()} disabled={currentQuestionIndex===Quiz.length-1}> next </button>
            <button onClick={()=>handelSubmit()}disabled={SelectedAnswers[currentQuestionIndex]===undefined || SubmittedQuestions[currentQuestionIndex]}>submit</button>
            {quizCompleted && <p>Your final score is {score} out of {Quiz.length}</p>}
            {quizCompleted && <div> <button onClick={handelRestartQuiz}>Restart Quiz</button>   <button onClick={handelNavigateToCatagories}>Back To Categories</button></div>}
         </div>
            </div>
         ) ):(<p>no question found </p>)
         
        }
       

      
    </div>
  )
}

export default Quiz
