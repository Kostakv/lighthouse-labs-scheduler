import React from "react";
import "components/Appointment/styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = 'SAVING';
const DELETE = 'DELETE';
const DELETING = 'DELETING';
const EDIT = 'EDIT';
const ERROR_SAVE = 'ERROR_SAVE';
const ERROR_DELETE = 'ERROR_DELETE';


export default function Appointment(props) {

  let student = '';
  let interviewer = {};
  const interview = props.interview;

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );


  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(error => transition(ERROR_SAVE, true));

  }

  function deleteInterview(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(DELETING,true);
    props.cancelInterview(props.id, interview)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
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
        mode === ERROR_DELETE && (
          <Error
            onClose={back}
            message={'Error when deleting interview...'}
          />
        )
      }

      {
        mode === ERROR_SAVE && (
          <Error
            onClose={back}
            message={'Error when saving interview...'}
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
