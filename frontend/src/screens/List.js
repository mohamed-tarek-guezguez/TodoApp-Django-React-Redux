import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'
import { listTasks } from '../actions/taskActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import CardComponent from '../components/CardComponent'

const List = ({ history }) => {

    const colors = [
        '#F5365C',
        '#2DCE89',
        '#5E72E4',
        '#11CDEF',
        '#F7E200',
        '#FB6340',
    ]

    const dispatch = useDispatch()

    const taskList = useSelector(state => state.taskList)
    const { error, loading, tasks } = taskList

    const taskCreate = useSelector(state => state.taskCreate)
    const { success: successCreate } = taskCreate

    const taskUpdate = useSelector(state => state.taskUpdate)
    const { success: successUpdate } = taskUpdate

    const taskDelete = useSelector(state => state.taskDelete)
    const { success: successDelete } = taskDelete

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        } else {
            dispatch(listTasks())
        }
    }, [dispatch, history, userInfo, successCreate, successUpdate, successDelete])

    return (
        <>
            <header className="text-center py-5">
                <h1 className="pb-5">TODO LIST</h1>
                <Link className="btn createTodoBtn" to='/create'>
                    Create New Todo
                </Link>
                <br /><br />
                <button className="btn createTodoBtn" onClick={logoutHandler}>Logout</button>
            </header>   
            <section className="container py-5">
                { 
                    loading
                        ? <Loader />
                        : error
                            ? <Message variant="danger">{error}</Message>
                            : (
                                <>
                                    {tasks.length === 0 && <Message variant="danger">No Results Found!</Message>}
                                    <div className="row row-cols-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-3 g-4">
                                        {tasks.map((task, index) => (
                                            <CardComponent 
                                                key={task.id}
                                                myId={task.id}
                                                myColor={colors[index%6]}
                                                myTitle={task.title}
                                                myDescription={task.description}
                                                isCompleted={task.isCompleted}
                                            />
                                        ))}
                                    </div>
                                </>
                            )
                }
            </section>
        </>
    )
}

export default List
