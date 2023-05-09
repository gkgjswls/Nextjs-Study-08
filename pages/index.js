import { useRef } from "react"


export default function Home() {
  const emailInputRef = useRef()
  const feedbackInputRef = useRef()

  const submitFormHandler = (e) =>{
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value
    const enteredFeedback = feedbackInputRef.current.value
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
    <div>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input type='email' id='email' ref={emailInputRef}></input>
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback</label>
          <textarea rows="5" id='feedback' ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
    </div>
  )
}
