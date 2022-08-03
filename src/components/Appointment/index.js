import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const DELETING = 'DELETING';
const EDIT = 'EDIT';


export default function Appointment(props) {

  let student = '';
  let interviewer = {};
  const interview = props.interview;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  async function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    await props.bookInterview(props.id, interview);
    transition(SHOW);

  }

  async function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING);
    await props.cancelInterview(props.id, interview);
    transition(EMPTY);
  }

  return (

    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {
        mode === SHOW && (
          <Show
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            onDelete={() => transition(DELETE)}
            onEdit={() => transition(EDIT)}
          />
        )
      }

      {
        mode === CREATE && (
          <Form
            interviewers={props.interviewers}
            onCancel={() => back()}
            onSave={save}
          />
        )
      }

      {
        mode === SAVING && (
          <Status
            message={'Saving Interview...'}
          />
        )
      }

      {
        mode === DELETING && (
          <Status
          message={'Deleting'}
          />
        )
      }

      {
        mode === EDIT && (
          <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => back()}
          onSave={save}
          />
        )
      }

      {
        mode === DELETE && (
          <Confirm
            onCancel={() => back()}
            onConfirm={deleteInterview}
            student={props.interview.student}
            interviewer={props.interview.interviewer}
            message={'Are you sure you want to delete?'}
          />
        )
      }
    </article>
  );


}
