import {
    CreateTaskSuccessAction,
    GetTaskByIdSuccessAction,
    GetTasksByProjectSuccessAction,
    GetTasksSuccessAction,
    TaskData,
    TaskPriority,
    TasksActionTypes,
    TasksErrorAction,
    TasksRequestAction,
    TaskStatus,
    UpdateStatusTaskSuccessAction,
    UpdateTaskSuccessAction,
} from './types.ts';
import { Dispatch } from 'redux';
import axios from 'axios';
import { SERVER_API_URL } from '../../App.tsx';
import { ProjectData } from '../projects/types.ts';

const tasksRequest = (): TasksRequestAction => ({
    type: 'TASKS_REQUEST',
});

const getTasksSuccess = (tasks: { data: TaskData[] } | null): GetTasksSuccessAction => ({
    type: 'GET_TASKS_SUCCESS',
    payload: tasks,
});

const tasksError = (error: string): TasksErrorAction => ({
    type: 'TASKS_ERROR',
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

const updateTasksByIdSuccess = (answer: { message: string } | null): UpdateTaskSuccessAction => ({
    type: 'UPDATE_TASK_BY_ID_SUCCESS',
    payload: answer,
});

const createTaskSuccess = (answer: { id: number } | null): CreateTaskSuccessAction => ({
    type: 'CREATE_TASK_SUCCESS',
    payload: answer,
});

export const getTasks = () => {
    return async (dispatch: Dispatch<TasksActionTypes>) => {
        dispatch(tasksRequest());
        try {
            const response = await axios.get(`${SERVER_API_URL}/tasks`);
            const data = response.data;
            dispatch(getTasksSuccess(data));
        } catch (error: any) {
            dispatch(tasksError(error.message));
        }
    };
};

export const getTaskById = (id: number) => {
    return async (dispatch: Dispatch<TasksActionTypes>) => {
        dispatch(tasksRequest());
        try {
            const response = await axios.get(`${SERVER_API_URL}/tasks/${id}`);
            const data = response.data;
            dispatch(getTaskByIdSuccess(data));
        } catch (error: any) {
            dispatch(tasksError(error.message));
        }
    };
};

export const getTaskByProject = (id: string) => {
    return async (dispatch: Dispatch<TasksActionTypes>) => {
        dispatch(tasksRequest());
        try {
            const response = await axios.get(`${SERVER_API_URL}/boards/${id}`);
            const data = response.data;
            dispatch(getTasksByProjectSuccess(data));
        } catch (error: any) {
            dispatch(tasksError(error.message));
        }
    };
};

export const updateTaskByStatus = (id: string, status: string) => {
    return async (dispatch: Dispatch<TasksActionTypes>) => {
        dispatch(tasksRequest());
        try {
            const body = { status: status };
            const response = await axios.put(`${SERVER_API_URL}/tasks/${id}`, body);
            const data = response.data;
            dispatch(updateTasksByStatusSuccess(data.message));
        } catch (error: any) {
            dispatch(tasksError(error.message));
        }
    };
};

export const updateTaskById = (
    id: number | undefined,
    assigneeId: number | undefined,
    description: string | undefined,
    priority: TaskPriority | undefined,
    status: TaskStatus | undefined,
    title: string | undefined
) => {
    return async (dispatch: Dispatch<TasksActionTypes>) => {
        dispatch(tasksRequest());
        try {
            const body = {
                assigneeId: assigneeId,
                description: description,
                priority: priority,
                status: status,
                title: title,
            };
            const response = await axios.put(`${SERVER_API_URL}/tasks/update/${id}`, body);
            const data = response.data;
            dispatch(updateTasksByIdSuccess(data.message));
        } catch (error: any) {
            dispatch(tasksError(error.message));
        }
    };
};

export const createTask = (
    assigneeId: number | undefined,
    boardId: ProjectData | undefined,
    description: string | undefined,
    priority: TaskPriority | undefined,
    title: string | undefined
) => {
    return async (dispatch: Dispatch<TasksActionTypes>) => {
        dispatch(tasksRequest());
        try {
            const body = {
                assigneeId: assigneeId,
                boardId: boardId,
                description: description,
                priority: priority,
                title: title,
            };
            const response = await axios.post(`${SERVER_API_URL}/tasks/create`, body);
            const data = response.data;
            dispatch(createTaskSuccess(data.message));
        } catch (error: any) {
            dispatch(tasksError(error.message));
        }
    };
};
