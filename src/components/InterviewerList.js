import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props){
  console.log('props: ',props.interviewers[0].avatar)
  const interviewers = props.interviewers;
  const listInterviewers = interviewers.map((viewer) => {
    return (
      <InterviewerListItem
      key={viewer.id}
      name={viewer.name}
      avatar={viewer.avatar}
      selected={viewer.id === props.interviewer}
      setInterviewer={() => props.setInterviewer(viewer.id)}
    />
  );
    });


  return (
    <section className="interviewers">
     <h4 className="interviewers__header text--light">Interviewer</h4>
     <ul className="interviewers__list">
       {listInterviewers}
     </ul>
    </section>
  )
}