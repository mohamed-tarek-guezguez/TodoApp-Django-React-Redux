import axios from 'axios'
import {
    TASK_LIST_REQUEST,
    TASK_LIST_SUCCESS,
    TASK_LIST_FAIL,

    TASK_DETAILS_REQUEST,
    TASK_DETAILS_SUCCESS,
    TASK_DETAILS_FAIL,

    TASK_CREATE_REQUEST,
    TASK_CREATE_SUCCESS,
    TASK_CREATE_FAIL,

    TASK_UPDATE_REQUEST,
    TASK_UPDATE_SUCCESS,
    TASK_UPDATE_FAIL,

    TASK_DELETE_REQUEST,
    TASK_DELETE_SUCCESS,
    TASK_DELETE_FAIL,
} from '../constants/taskConstants';

export const listTasks = () => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_LIST_REQUEST })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`/api/task-list/`, config)

        dispatch({ 
            type: TASK_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ 
            type: TASK_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const taskDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_DETAILS_REQUEST })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`/api/task-details/${id}`, config)

        dispatch({ 
            type: TASK_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ 
            type: TASK_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const createTask = (title, description) => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_CREATE_REQUEST })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post(
            `/api/task-create/`,
            {
                "user": userInfo.username,
                "title": title,
                "description": description
            }, 
            config
        )

        dispatch({ 
            type: TASK_CREATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ 
            type: TASK_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const updateTask = (id, title, description, isCompleted) => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_UPDATE_REQUEST })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.put(
            `/api/task-update/${id}/`,
            {
                "title": title,
                "description": description,
                "isCompleted": isCompleted
            }, 
            config
        )

        dispatch({ 
            type: TASK_UPDATE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ 
            type: TASK_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}

export const deleteTask = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: TASK_DELETE_REQUEST })

        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.delete(
            `/api/task-delete/${id}/`,
            config
        )

        dispatch({ 
            type: TASK_DELETE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({ 
            type: TASK_DELETE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}