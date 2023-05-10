import { useRef, useState } from "react"
import classes from './index.module.css'

export default function Home() {
  const [feedback, setFeedback] = useState([]);
  const [modal,setModal] = useState(false)
  const emailInputRef = useRef()
  const feedbackInputRef = useRef()

  const submitFormHandler = (e) =>{
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value
    const enteredFeedback = feedbackInputRef.current.value
    console.log(enteredEmail)
    console.log(enteredFeedback)
 
    const reqBody = {email: enteredEmail, feedback: enteredFeedback}
    fetch('/api/feedback',{
      method: 'POST',
      body: JSON.stringify(reqBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response)=>response.json())
    .then(console.log)
  }
  const getFeedbackHandler = (e) =>{

    e.preventDefault();
    if(modal){
      setModal(!modal)
    }
    fetch('/api/feedback')
    .then((response)=>response.json())
    .then((data)=>setFeedback(data.feedback))
    .then(setModal(!modal))
  }
  return (
    <div className={classes.body}>
      <form onSubmit={submitFormHandler} className={classes.FormWrapper}>
        <div className={classes.Email}>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInputRef}></input>
        </div>
        <div className={classes.Feedback}>
          <label htmlFor='feedback'>Your Feedback</label>
          <textarea rows="8" id='feedback' ref={feedbackInputRef}></textarea>
        </div>
        <button className={classes.btn}>Send Feedback</button>
      </form>
      <hr/>
      <button className={classes.btn} onClick={getFeedbackHandler}>Show Feedback</button>
      {modal? <ul>
        {feedback.map((feedback)=> <li key={feedback.id}>{feedback.text}</li>)}
      </ul> : null}
      
    </div>

  )
}
