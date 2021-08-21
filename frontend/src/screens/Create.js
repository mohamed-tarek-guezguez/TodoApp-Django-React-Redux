import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import { createTask } from '../actions/taskActions';

const Create = ({ history }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createTask(title, description))
        setTitle('')
        setDescription('')
        history.push('/tasks')
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        }
    }, [history, userInfo])

    return (
        <>
            <header className="text-center py-5">
                <h1 className="pb-5">TODO LIST</h1>
                <Link className="btn createTodoBtn" to="/tasks">
                    Go Back
                </Link>
            </header>
            <section className="container py-5 d-flex justify-content-center">
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
                    <div className="text-center">
                        <button type="submit" className="btn submitBtn">Submit</button>
                    </div>
                </Form>
            </section>
        </>
    )
}

export default Create
