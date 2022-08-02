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
  const interviewers = state.days.find(app => app.name === day);
  if (!interviewers) {
    return [];
  }
  console.log('These are the interviewers',interviewers.interviewers);
  return interviewers.interviewers;

}



export { getAppointmentsForDay, getInterview, getInterviewersForDay };
