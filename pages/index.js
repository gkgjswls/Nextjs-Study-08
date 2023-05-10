import { useRef } from "react"
import classes from './index.module.css'

export default function Home() {
  const emailInputRef = useRef()
  const feedbackInputRef = useRef()

  const submitFormHandler = (e) =>{
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value
    const enteredFeedback = feedbackInputRef.current.value
    if(enteredEmail || enteredFeedback === ''){

      return window.alert('필요한 정보가 전부 입력되지않았습니다.')
    }
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
    </div>
  )
}
