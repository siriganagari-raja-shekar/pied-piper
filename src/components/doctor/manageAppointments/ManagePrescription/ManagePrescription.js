import { useEffect, useState } from "react";
import { getAppointmentById } from "../../../../services/appointmentsService";
import { savePrescription } from "../../../../services/prescriptionService";
import { Stack, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './ManagePrescription.scss'
import { getStoredUser } from "../../../../services/authService";


export default function ManagePrescription({ appointmentId }) {
  const [problem, setProblem] = useState("Fever")
  const [meds, setMeds] = useState([]);
  const user = getStoredUser()

  const populateData = async () => {
    const appointment = await getAppointmentById(appointmentId)
    if (appointment.prescription) {
      setMeds(appointment.prescription.meds)
    }
  }

  const [med, setMed] = useState("");
  const [timeOfDayToTake, setTimeOfDayToTake] = useState("")

  const [isEditing, setIsEditing] = useState(false);
  const [currentMed, setCurrentMed] = useState({});

  useEffect(() => {
    populateData()
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(meds));
    console.log(meds)
    savePrescriptionToDB()
  }, [meds]);

  const savePrescriptionToDB = async () => {
    if (meds.length > 0)
      await savePrescription(problem, meds, appointmentId)
  }

  function handleMedInputChange(e) {
    setMed(e.target.value);
  }

  function handleTimeInputChange(e) {
    setTimeOfDayToTake(e.target.value);
  }

  // function to get the value of the edit input and set the new state
  function handleEditInputChange(e) {
    // set the new state value to what's currently in the edit input box
    setCurrentMed({ ...currentMed, name: e.target.value })
  }

  function handleEditTakeInputChange(e) {
    // set the new state value to what's currently in the edit input box
    setCurrentMed({ ...currentMed, timeOfDayToTake: e.target.value })
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    if (med !== "" && timeOfDayToTake != "") {
      setMeds([
        ...meds,
        {
          id: meds.length + 1,
          name: med.trim(),
          timeOfDayToTake: timeOfDayToTake
        }
      ]);
    } else {
      alert("select all fields")
    }

    setMed("")
    setTimeOfDayToTake("")
    e.target.reset()
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();
    // call the handleUpdateTodo function - passing the currentTodo.id and the currentTodo object as arguments
    handleUpdateTodo(currentMed.id, currentMed);
    e.target.reset()
  }

  function handleDeleteClick(id) {
    const removeItem = meds.filter((med) => {
      return med.id !== id;
    });
    setMeds(removeItem);
  }

  // function to edit a todo item
  function handleUpdateTodo(id, updatedMed) {
    // here we are mapping over the todos array - the idea is check if the todo.id matches the id we pass into the function
    // if the id's match, use the second parameter to pass in the updated todo object
    // otherwise just use old todo
    const updatedItem = meds.map((med) => {
      return med.id === id ? updatedMed : med;
    });
    // set editing to false because this function will be used inside a onSubmit function - which means the data was submited and we are no longer editing
    setIsEditing(false);
    // update the todos state with the updated todo
    setMeds(updatedItem);
  }

  // function to handle when the "Edit" button is clicked
  function handleEditClick(med) {
    // set editing to true
    setIsEditing(true);
    // set the currentTodo to the todo item that was clicked
    setCurrentMed({ ...med });

  }

  return (
    <Stack id="manage-prescription-container" direction='vertical' gap={3}>
      <h3>Prescription</h3>
      <Stack direction='horizontal' gap={3}>
        <Stack direction='vertical' id="meds-list" gap={2}>
          {meds.map((med) => (
            <Stack direction='horizontal' key={med.id} className='justify-content-between'>
              <p>{med.name}, {med.timeOfDayToTake}</p>
              {user.role != 'doctor' &&
                <Stack direction='horizontal' gap={3}>
                  <Button onClick={() => handleEditClick(med)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button onClick={() => handleDeleteClick(med.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </Button>
                </Stack>
              }
            </Stack>
          ))}
        </Stack>
        {user.role === 'doctor' &&
          <>{isEditing &&
            <Form onSubmit={handleEditFormSubmit}>
              <Stack direction='vertical' gap={3} >
                <Stack direction='vertical' gap={3} >
                  <Form.Group >
                    <Form.Control
                      name="editTodo"
                      type="text"
                      placeholder="Edit todo"
                      value={currentMed.name}
                      onChange={handleEditInputChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Check
                      label='Morning'
                      name="timetotake"
                      id="morning"
                      type="radio"
                      value="Morning"
                      onChange={handleEditTakeInputChange}
                    />
                    <Form.Check
                      label='Afternoon'
                      name="timetotake"
                      id="afternoon"
                      type="radio"
                      value="Afternoon"
                      onChange={handleEditTakeInputChange}
                    />
                    <Form.Check
                      label='Night'
                      name="timetotake"
                      id="night"
                      type="radio"
                      value="Night"
                      onChange={handleEditTakeInputChange}
                    />
                  </Form.Group>
                </Stack>

                <Stack direction='horizontal' gap={3}>
                  <Button type="submit">Update</Button>
                  <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                </Stack>
              </Stack>
            </Form>
          }</>
        }

        {user.role === 'doctor' &&
          <>{!isEditing &&
            <Form onSubmit={handleFormSubmit} id="medsform">
              <Stack direction='vertical' gap={3} >
                <Form.Group >
                  <Form.Control
                    name="todo"
                    type="text"
                    placeholder="Add new medicine"
                    value={med}
                    onChange={handleMedInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Check
                    label='Morning'
                    name="timetotake"
                    type="radio"
                    value="Morning"
                    onChange={handleTimeInputChange}
                  />
                  <Form.Check
                    label='Afternoon'
                    name="timetotake"
                    type="radio"
                    value="Afternoon"
                    onChange={handleTimeInputChange}
                  />
                  <Form.Check
                    label='Night'
                    name="timetotake"
                    type="radio"
                    value="Night"
                    onChange={handleTimeInputChange}
                  />
                </Form.Group>
                <Button type="submit">Add</Button>
              </Stack>
            </Form>
          }</>
        }
      </Stack>
    </Stack>
  );
}
