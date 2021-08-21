import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {taskDetails as taskDetailsAction, updateTask } from '../actions/taskActions'
import { useDispatch, useSelector } from 'react-redux'
import { TASK_DETAILS_RESET } from '../constants/taskConstants'

const Update = ({ history, match }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [isCompleted, setIsCompleted] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const taskDetails = useSelector(state => state.taskDetails)
    const { error, loading, task } = taskDetails

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (title === '') {
            alert('Title Required')
        } else {
            dispatch(updateTask(
                match.params.id,
                title,
                description,
                isCompleted,
            ))
            setTitle('')
            setDescription('')
            setIsCompleted(false)
            history.push('/tasks')
        }
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        }
        if (!task || !task.title) {
            dispatch({type: TASK_DETAILS_RESET})
            dispatch(taskDetailsAction(match.params.id))
        } else {
            setTitle(task.title)
            setDescription(task.description)
            setIsCompleted(task.isCompleted)
        }
    }, [dispatch, task, match.params.id, history, userInfo])

    return (
        <>
            <header className="text-center py-5">
                <h1 className="pb-5">TODO LIST</h1>
                <Link className="btn createTodoBtn" to="/tasks">
                    Go Back
                </Link>
            </header>
            <section className="container py-5 d-flex justify-content-center">
                {
                    loading
                        ? <Loader />
                        : error
                            ? <Message variant='danger'>{error}</Message>
                            : (
                                <Form className="createForm" onSubmit={submitHandler}>
                                    <Form.Group className="mb-4" controlId="exampleFrom.ControlInput1">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Title"
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-5" controlId="exampleFrom.ControlTextarea1">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-5" controlId="formBasicCheckbox">
                                        <Form.Check
                                            type="checkbox"
                                            label="isCompleted"
                                            checked={isCompleted}
                                            onChange={(e) => setIsCompleted(!isCompleted)}
                                        />
                                    </Form.Group>
                                    <div className="text-center">
                                        <button type="submit" className="btn submitBtn">Submit</button>
                                    </div>
                                </Form>
                            )
                }
            </section>
        </>
    )
}

export default Update
