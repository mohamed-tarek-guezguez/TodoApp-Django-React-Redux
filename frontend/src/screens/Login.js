import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const Login = ({ history }) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    useEffect(() => {
        if (userInfo) {
            history.push('/tasks')
        }
    }, [history, userInfo])

    return (
        <>
        <header className="text-center py-5">
            <h1 className="pb-5">TODO LIST</h1>
            <Link className="btn createTodoBtn" to="/register">
                Register
            </Link>
        </header>
        <center>
            <div className='createForm my-5'>
                {error && <div className='container my-5'><Message variant='danger'>{error}</Message></div>}
                {loading && <div className='container my-5'><Loader /></div>}

                <Form onSubmit={submitHandler}>
                    <h1 className='mb-5'>Sign in</h1>
                    <Form.Group className="mb-3" controlId="formBasicEmail" style={{ textAlign: 'left' }}>
                        <Form.Label className='text-left'>Email address</Form.Label>
                        <Form.Control 
                            required
                            type="email" 
                            placeholder="Enter email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword" style={{ textAlign: 'left' }}>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            required
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        Login
                    </Button>
                </Form>
            </div>
        </center>
        </>
    )
}

export default Login
