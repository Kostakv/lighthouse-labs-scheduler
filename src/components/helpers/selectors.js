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

export { getAppointmentsForDay, getInterview };
