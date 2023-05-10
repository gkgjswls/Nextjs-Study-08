import { useState } from "react";
import { buildFeedbackPath,extractFeedback } from "./api/feedback";

const FeedbackPage = (props) =>{
  const [feedbackData, setFeedbackData] = useState(               );

  const loadFeedbackHandler = (e,id) =>{
    e.preventDefault();
    fetch('/api/'+ id)
    .then(res => res.json())
    .then(data => setFeedbackData(data.feedback))
  }
  return (
  <>
    {feedbackData && <p>{feedbackData.email}</p>}
    {/* {feedbackData? <p>{feedbackData.email}</p> : null} */}
    <ul>
      {props.feedbackItems.map(item => <li key={item.id}>{item.text}<button onClick={(e,id)=>loadFeedbackHandler(e,item.id)}>Show Detail</button></li>)}
    </ul>
  </>
  )
}

export default FeedbackPage;

export const getStaticProps = async() =>{
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath)


  return {
    props: {feedbackItems: data}
  }
}