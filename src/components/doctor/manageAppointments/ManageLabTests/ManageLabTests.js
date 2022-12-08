import { useEffect, useState } from "react";
import { getAppointmentById } from "../../../../services/appointmentsService";
import { savePrescription } from "../../../../services/prescriptionService";
import { Stack, Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { saveLabTest } from "../../../../services/LabTestsService";
import './ManageLabTests.scss'
import { formatDate } from "../../../../services/utils";
import { getStoredUser } from "../../../../services/authService";

export default function ManageLabTests({ appointmentId }) {
  const user = getStoredUser()
  const [tests, setTests] = useState([]);
  const populateData = async () => {
    let appointment = await getAppointmentById(appointmentId)
    if (appointment.labs) {
      setTests(appointment.labs)
    }
  }

  const [test, setTest] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentTest, setCurrentTest] = useState({});

  useEffect(() => {
    populateData()
  }, [])

  useEffect(() => {
    savePrescriptionToDB()
  }, [tests]);

  const savePrescriptionToDB = async () => {
    if (tests.length > 0)
      await saveLabTest(tests, appointmentId)
  }

  function handleTestInputChange(e) {
    setTest(e.target.value);
  }


  // function to get the value of the edit input and set the new state
  function handleEditTestInputChange(e) {
    // set the new state value to what's currently in the edit input box
    setCurrentTest({ ...currentTest, testType: e.target.value })
  }


  function handleFormSubmit(e) {
    e.preventDefault();
    if (test !== "") {
      setTests([
        ...tests,
        {
          id: tests.length + 1,
          testType: test.trim(),
          time: new Date()
        }
      ]);
    } else {
      alert("select all fields")
    }

    setTest("")
    e.target.reset()
  }

  function handleEditFormSubmit(e) {
    e.preventDefault();
    handleUpdateTest(currentTest.id, currentTest);
    e.target.reset()
  }

  function handleDeleteClick(id) {
    const removeItem = tests.filter((test) => {
      return test.id !== id;
    });
    setTests(removeItem);
  }

  // function to edit a todo item
  function handleUpdateTest(id, updatedTest) {
    // here we are mapping over the todos array - the idea is check if the todo.id matches the id we pass into the function
    // if the id's match, use the second parameter to pass in the updated todo object
    // otherwise just use old todo
    const updatedItem = tests.map((test) => {
      return test.id === id ? updatedTest : test;
    });
    // set editing to false because this function will be used inside a onSubmit function - which means the data was submited and we are no longer editing
    setIsEditing(false);
    // update the todos state with the updated todo
    setTests(updatedItem);
  }

  // function to handle when the "Edit" button is clicked
  function handleEditClick(test) {
    // set editing to true
    setIsEditing(true);
    // set the currentTodo to the todo item that was clicked
    setCurrentTest({ ...test });

  }

  return (
    <Stack id="manage-prescription-container" direction='vertical' gap={3}>
      <h3>Lab tests</h3>
      <Stack direction='horizontal' gap={3} id='lab-con'>
        <Stack direction='vertical' id="meds-list" gap={2}>
          {tests.map((test) => (
            <Stack direction='horizontal' key={test.id} className='justify-content-between'>
              <p>{test.testType}, {formatDate(test.time, "Do MMM YY")}</p>
              {user.role === 'doctor' &&
                <Stack direction='horizontal' gap={3}>
                  <Button onClick={() => handleEditClick(test)}>
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </Button>
                  <Button onClick={() => handleDeleteClick(test.id)}>
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
              <Form.Group >
                <Form.Control
                  name="editTodo"
                  type="text"
                  placeholder="Edit todo"
                  value={currentTest.testType}
                  onChange={handleEditTestInputChange}
                />
              </Form.Group>

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
                  placeholder="Add lab test"
                  value={test}
                  onChange={handleTestInputChange}
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
