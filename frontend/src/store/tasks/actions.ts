import {
    GetTaskByIdSuccessAction, GetTasksByProjectSuccessAction,
    GetTasksErrorAction,
    GetTasksRequestAction,
    GetTasksSuccessAction,
    TaskData,
    TasksActionTypes, UpdateStatusTaskSuccessAction,
} from './types.ts';
import { Dispatch } from 'redux';
import axios from 'axios';
import { SERVER_API_URL } from '../../App.tsx';

const getTasksRequest = (): GetTasksRequestAction => ({
    type: 'GET_TASKS_REQUEST',
});

const getTasksSuccess = (tasks: { data: TaskData[] } | null): GetTasksSuccessAction => ({
    type: 'GET_TASKS_SUCCESS',
    payload: tasks,
});

const getTasksError = (error: string): GetTasksErrorAction => ({
    type: 'GET_TASKS_ERROR',
    payload: error,
});

const getTaskByIdSuccess = (task: { data: TaskData } | null): GetTaskByIdSuccessAction => ({
    type: 'GET_TASK_SUCCESS',
    payload: task,
});

const getTasksByProjectSuccess = (tasks: { data: TaskData[] } | null): GetTasksByProjectSuccessAction => ({
    type: 'GET_TASKS_BY_PROJECT_SUCCESS',
    payload: tasks,
});

const updateTasksByStatusSuccess = (answer: { message: string } | null): UpdateStatusTaskSuccessAction => ({
    type: 'UPDATE_TASK_STATUS_SUCCESS',
    payload: answer,
});

export const getTasks = () => {
    return async (dispatch: Dispatch<TasksActionTypes>) => {
        dispatch(getTasksRequest());
        try {
            const response = await axios.get(`${SERVER_API_URL}/tasks`);
            const data = response.data;
            dispatch(getTasksSuccess(data));
        } catch (error: any) {
            dispatch(getTasksError(error.message));
        }
    };
};

export const getTaskById = (id: string) => {
    return async (dispatch: Dispatch<TasksActionTypes>) => {
        dispatch(getTasksRequest());
        try {
            const response = await axios.get(`${SERVER_API_URL}/tasks/${id}`);
            const data = response.data;
            dispatch(getTaskByIdSuccess(data));
        } catch (error: any) {
            dispatch(getTasksError(error.message));
        }
    };
};

export const getTaskByProject = (id: string) => {
    return async (dispatch: Dispatch<TasksActionTypes>) => {
        dispatch(getTasksRequest());
        try {
            const response = await axios.get(`${SERVER_API_URL}/boards/${id}`);
            const data = response.data;
            dispatch(getTasksByProjectSuccess(data));
        } catch (error: any) {
            dispatch(getTasksError(error.message));
        }
    };
};

export const updateTaskByStatus = (id: string, status: string) => {
    return async (dispatch: Dispatch<TasksActionTypes>) => {
        dispatch(getTasksRequest());
        try {
            const body = {status: status};
            const response = await axios.put(`${SERVER_API_URL}/tasks/${id}`, body);
            const data = response.data;
            dispatch(updateTasksByStatusSuccess(data.message));
        } catch (error: any) {
            dispatch(getTasksError(error.message));
        }
    };
};
