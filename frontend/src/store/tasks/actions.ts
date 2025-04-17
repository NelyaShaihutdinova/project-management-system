import {
    GetTasksErrorAction,
    GetTasksRequestAction,
    GetTasksSuccessAction,
    TaskData,
    TasksActionTypes,
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
