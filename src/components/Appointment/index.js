import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";


export default function Appointment(props){
  const interview = props.interview
  
  if(interview){
    return (
      <div>
      <article className="appointment"></article>
      <Header time={props.time} />
      <Show 
        student={props.interview.student}
        interviewer={props.interview.interviewer}
      />
      </div>
    )
  }
  else {
    return (
    <div>
      <Header time={props.time}/>
      <Empty />
    </div>
    )
  }

  
  
}
