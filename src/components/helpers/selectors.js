function getAppointmentsForDay(state, day) {
  const appointments = state.days.find(app => app.name === day);
  if (!appointments) {
    return [];
  }
  return appointments.appointments.map((id) => state.appointments[id]);

}

function getInterview(state, interview) {
  if (interview) {
    const interviewer = state.interviewers[interview.interviewer];
    return { interviewer, student: interview.student };
  }

  else {
    return null;
  }

}

function getInterviewersForDay(state, day) {
  let interviewerArray = [];
  
  for (let dayObj of state.days) {

    if(dayObj.name === day) {

      let interviewerIds = dayObj.interviewers
      for (let interviewerId of interviewerIds) {

        if(state.interviewers[interviewerId]) {

          interviewerArray.push(state.interviewers[interviewerId]);
        }
      }
    }  
  }

  return interviewerArray;
}



export { getAppointmentsForDay, getInterview, getInterviewersForDay };
