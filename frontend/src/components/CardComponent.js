import React from 'react'
import { Card, Col } from 'react-bootstrap'
import { TASK_DETAILS_RESET } from '../constants/taskConstants';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { taskDetails, updateTask, deleteTask } from '../actions/taskActions';

const CardComponent = ({ myId, myColor, myTitle, myDescription, isCompleted }) => {

    const dispatch = useDispatch()
    let history = useHistory()

    const isCompletedHandler = () => {
        dispatch(updateTask(
            myId, 
            myTitle, 
            myDescription, 
            !isCompleted
        ))
    }

    const updateHandler = () => {
        dispatch({type: TASK_DETAILS_RESET})
        dispatch(taskDetails(myId))
        history.push(`/update/${myId}/`)
    }

    const deleteHandler = () => {
        dispatch(deleteTask(myId))
    }

    return (
        <Col>
            <Card
                style={{ 
                    borderTop: `3px solid ${myColor}`,
                    opacity: `${isCompleted ? 0.5 : 1}`
                }}
                className="rounded h-100"
            >
                <Card.Body>
                    <div className="d-flex justify-content-between">
                        <Card.Title
                            className="text-dark"
                            style={{ textDecoration: `${isCompleted ? 'line-through' : ''}` }}
                        >
                            {myTitle}
                        </Card.Title>
                        <i 
                            className="fas fa-eye"
                            style={{ color: myColor, cursor: 'pointer' }}
                            onClick={() => isCompletedHandler()}
                        ></i>
                    </div>
                    <Card.Text
                        className="text-dark"
                        style={{ textDecoration: `${isCompleted ? 'line-through' : ''}` }}
                    >
                        {myDescription}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-end">
                    <button className="btn" onClick={() => updateHandler()}>
                        <i className="fas fa-pen" style={{ color: myColor }}></i>
                    </button>

                    <button className="btn" onClick={() => deleteHandler()}>
                        <i className="fas fa-trash-alt" style={{ color: myColor }}></i>
                    </button>
                </Card.Footer>
            </Card>
        </Col>
    )
}

export default CardComponent
