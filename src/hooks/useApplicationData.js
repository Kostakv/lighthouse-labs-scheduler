import { useState, useEffect } from "react";
import axios from "axios";
export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  function getUpdatedDays(appointments) {

    //Finds first element matching day.name (returns object)
    const currentDayInfo = state.days.find(day => day.name === state.day);
    // Returns current day index value
    const currentDayIndex = state.days.findIndex(day => day.name === state.day);

    // looping through appointment id the day object returning all appointments that have null interviews

    const currentDaySpots = currentDayInfo.appointments.filter((appointmentId)=>appointments[appointmentId].interview === null).length

    // creates a shallow copy of the state.days
    const updatedDays = [...state.days]

    updatedDays[currentDayIndex] = {...currentDayInfo, spots: currentDaySpots}

    return updatedDays;
  }


  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, { interview }).then((response) => {
      setState({
        ...state,
        appointments,
        days: getUpdatedDays(appointments)
      });

    })

  }


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...state,
        appointments,
        days: getUpdatedDays(appointments)
      });

    })

  }



  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {

      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
    });
  }, []);

  return { setDay, cancelInterview, bookInterview, state };
}


