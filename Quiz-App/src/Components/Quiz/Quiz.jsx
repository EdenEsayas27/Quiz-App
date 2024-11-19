import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../../Utils/axois'
import { useNavigate } from 'react-router-dom';
import classes from './Quiz.module.css'
import {FadeLoader} from 'react-spinners';
function Quiz() {
    const {category ,type,difficulty} = useParams();
    const [Quiz , setQuiz] = useState([]);
    const[SelectedAnswers ,setSelectedAnswers] = useState({});
    const [currentQuestionIndex ,setCurrentQuestionIndex] = useState(0);
    const [score ,setScore] = useState(0);
    const [isCorrect,SetIsCorrect] = useState(null);
    const [SubmittedQuestions, setSubmittedQuestions] = useState({});
    const [quizCompleted , setQuizCompleted] = useState(false);
    const [isloading ,setIsLoading] = useState(false);
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
         navigate("/categories");
       
    }
    const handelRestartQuiz = () =>{
         window.location.reload();
      
    }
    useEffect(()=>{
        setIsLoading(true);
        axios.get(`api.php?amount=5&category=${category}&difficulty=${difficulty}&type=${type}`).then(
            (res)=> {
                const AllQuestion = res.data.results.map((question)=>{
                const  allAnswer = shuffledArray([...question.incorrect_answers ,question.correct_answer])
                return{...question ,allAnswer}
                

            }) 
            setIsLoading(false)
            setQuiz(AllQuestion);
           }
        
        ).catch((err)=>{
            console.log("error happpend", err);
            setIsLoading(false)
        })
    },[difficulty,type,category])
   
  return (
    <div className={classes.centered}>
    <div className={classes.container}>
        <div className={classes.Quiz_title}><h2>Charm Quiz</h2>
          <hr/></div>
       { isloading ? (
                <div style={{marginTop:'70px'}}><FadeLoader/></div> // Display loading message until quiz data is fetched
                
            ) : Quiz.length > 0 ? 
        ( (
            <div className={classes.quizContainer}>
                <p className={classes.question} dangerouslySetInnerHTML={{ __html: Quiz[currentQuestionIndex].question }} />
                <div className={classes.options}>
                    
                    {Quiz[currentQuestionIndex].allAnswer.map((answer ,j)=>(
                        <label key={j}>
                        <input type='radio' 
                        value={answer} 
                        name={`question_${currentQuestionIndex}`}
                        checked={SelectedAnswers[currentQuestionIndex]=== answer} 
                        onChange={()=> handleOptionChange(currentQuestionIndex,answer)} />
                        <span dangerouslySetInnerHTML={{ __html:  answer }} />
                        </label>
                      
                    ))  
                    }
                   {isCorrect !== null && (
                            <p className={isCorrect ? classes.correct : classes.incorrect}>{isCorrect ? ('Correct') : (`Incorrect the correct answer is ${Quiz[currentQuestionIndex].correct_answer}  `)}</p>
                        )}
                   
                </div>
         
              {!quizCompleted && (
             <div  className={classes.actions}>
            <button className={classes.navButton} onClick={()=>handelPrev()} disabled={currentQuestionIndex===0}> prev </button>
            <button   className={classes.submitButton} onClick={()=>handelSubmit()}disabled={SelectedAnswers[currentQuestionIndex]===undefined || SubmittedQuestions[currentQuestionIndex]}>submit</button>
            <button  className={classes.navButton} onClick={()=>handelNext()} disabled={currentQuestionIndex===Quiz.length-1}> next </button>
            </div> )}
            {quizCompleted &&(<div className={classes.results}><p>Your final score is {score} out of {Quiz.length}</p></div>) }
            {quizCompleted && <div> <button   className={classes.resultButton} onClick={handelRestartQuiz}>Restart Quiz</button>   <button  className={classes.resultButton} onClick={handelNavigateToCatagories}>Back To Categories</button></div>}
           
        
            </div>
         ) ):(<p >  </p>)
        
         }
       

      
    </div>
    </div>
  )
}

export default Quiz
