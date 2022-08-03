function getAppointmentsForDay(state, day) {
  const currentDayInfo = state.days.find(app => app.name === day);
  if (!currentDayInfo) {
    return [];
  }
  return currentDayInfo.appointments.map((id) => state.appointments[id]);

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
  const currentDayInfo = state.days.find(app => app.name === day);
  if (!currentDayInfo) {
    return [];
  }
  return currentDayInfo.interviewers.map((id) => state.interviewers[id]);
}



export { getAppointmentsForDay, getInterview, getInterviewersForDay };
