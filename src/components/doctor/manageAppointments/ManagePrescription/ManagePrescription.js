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

  function handleEditInputChange(e) {
    setCurrentMed({ ...currentMed, name: e.target.value })
  }

  function handleEditTakeInputChange(e) {
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
    handleUpdateTodo(currentMed.id, currentMed);
    e.target.reset()
  }

  function handleDeleteClick(id) {
    const removeItem = meds.filter((med) => {
      return med.id !== id;
    });
    setMeds(removeItem);
  }

  function handleUpdateTodo(id, updatedMed) {
    const updatedItem = meds.map((med) => {
      return med.id === id ? updatedMed : med;
    });
    setIsEditing(false);
    setMeds(updatedItem);
  }

  function handleEditClick(med) {
    setIsEditing(true);
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
              {user.role === 'doctor' &&
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
