import {
    GET_TASK_SUCCESS,
    GET_TASKS_BY_PROJECT_SUCCESS,
    GET_TASKS_ERROR,
    GET_TASKS_REQUEST,
    GET_TASKS_SUCCESS,
    TasksActionTypes,
    TaskState,
    UPDATE_TASK_STATUS_SUCCESS
} from './types.ts';
import {Reducer} from 'redux';

const initialState: TaskState = {
    tasks: null,
    loading: false,
    error: null,
};

export const taskReducer: Reducer<TaskState, TasksActionTypes> = (
    state = initialState,
    action: TasksActionTypes
): TaskState => {
    switch (action.type) {
        case GET_TASKS_REQUEST:
            return { ...state, loading: true };
        case GET_TASKS_SUCCESS:
            return { ...state, tasks: action.payload, loading: false };
        case GET_TASK_SUCCESS:
            return {...state, task: action.payload, loading: false};
        case GET_TASKS_BY_PROJECT_SUCCESS:
            return {...state, tasks: action.payload, loading: false};
        case GET_TASKS_ERROR:
            return { ...state, tasks: null, error: action.payload };
        case UPDATE_TASK_STATUS_SUCCESS:
            return {...state, answer: action.payload, loading: false};
        default:
            return state;
    }
};
