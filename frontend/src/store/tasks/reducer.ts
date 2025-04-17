import { GET_TASKS_ERROR, GET_TASKS_REQUEST, GET_TASKS_SUCCESS, TasksActionTypes, TaskState } from './types.ts';
import { Reducer } from 'redux';

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
        case GET_TASKS_ERROR:
            return { ...state, tasks: null, error: action.payload };
        default:
            return state;
    }
};
