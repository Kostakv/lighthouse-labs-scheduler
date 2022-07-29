export function getAppointmentsForDay(state, day) {
  const appointments = state.days.find(app => app.name === day);
  if (state.days.length === 0 || appointments === undefined) {
    return [];
  }
  return appointments.appointments.map((id) => state.appointments[id]);

}