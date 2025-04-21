import {
    CREATE_TASK_SUCCESS,
    GET_TASK_SUCCESS,
    GET_TASKS_BY_PROJECT_SUCCESS,
    GET_TASKS_SUCCESS,
    TASKS_ERROR,
    TASKS_REQUEST,
    TasksActionTypes,
    TaskState,
    UPDATE_TASK_BY_ID_SUCCESS,
    UPDATE_TASK_STATUS_SUCCESS,
} from './types.ts';
import { Reducer } from 'redux';

const initialState: TaskState = {
    tasks: null,
    loading: false,
    error: null,
};

export const taskReducer: Reducer<TaskState, TasksActionTypes> = (
    state: TaskState | undefined = initialState,
    action: TasksActionTypes
): TaskState => {
    switch (action.type) {
        case TASKS_REQUEST:
            return { ...state, loading: true };
        case GET_TASKS_SUCCESS:
            return { ...state, tasks: action.payload, loading: false };
        case GET_TASK_SUCCESS:
            return { ...state, task: action.payload, loading: false };
        case GET_TASKS_BY_PROJECT_SUCCESS:
            return { ...state, projectTasks: action.payload, loading: false };
        case TASKS_ERROR:
            return { ...state, tasks: null, error: action.payload };
        case UPDATE_TASK_STATUS_SUCCESS:
            return { ...state, answer: action.payload, loading: false };
        case UPDATE_TASK_BY_ID_SUCCESS:
            return { ...state, answer: action.payload, loading: false };
        case CREATE_TASK_SUCCESS:
            return { ...state, answerId: action.payload, loading: false };
        default:
            return state;
    }
};
