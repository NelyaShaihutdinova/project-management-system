enum TaskStatus {
    Backlog = 'Backlog',
    InProgress = 'InProgress',
    Done = 'Done',
}

export const statusLabels: Record<TaskStatus, string> = {
    [TaskStatus.Backlog]: 'Бэклог',
    [TaskStatus.InProgress]: 'В процессе',
    [TaskStatus.Done]: 'Готово',
};

enum TaskPriority {
    Low,
    Medium,
    High,
}

export interface TaskData {
    assignee: {
        avatarUrl: string;
        email: string;
        fullName: string;
        id: number;
    };
    boardId: number;
    boardName: string;
    description: string;
    id: number;
    priority: TaskPriority;
    status: TaskStatus;
    title: string;
}

export interface TasksState {
    tasks: {
        data: TaskData[];
    } | null;
    loading: boolean;
    error: string | null;
}

export interface OneTaskState {
    task: { data: TaskData } | null;
    loading: boolean;
    error: string | null;
}

export interface UpdateAnswer {
    answer: { message: string } | null;
}

export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASKS_ERROR = 'GET_TASKS_ERROR';
export const GET_TASK_SUCCESS = 'GET_TASK_SUCCESS';
export const GET_TASKS_BY_PROJECT_SUCCESS = 'GET_TASKS_BY_PROJECT_SUCCESS';
export const UPDATE_TASK_STATUS_SUCCESS = 'UPDATE_TASK_STATUS_SUCCESS';

export interface GetTasksRequestAction {
    type: typeof GET_TASKS_REQUEST;
}

export interface GetTaskByIdSuccessAction {
    type: typeof GET_TASK_SUCCESS;
    payload: { data: TaskData } | null;
}

export interface GetTasksSuccessAction {
    type: typeof GET_TASKS_SUCCESS;
    payload: {
        data: TaskData[];
    } | null;
}

export interface UpdateStatusTaskSuccessAction {
    type: typeof UPDATE_TASK_STATUS_SUCCESS;
    payload: {
        message: string;
    } | null;
}

export interface GetTasksByProjectSuccessAction {
    type: typeof GET_TASKS_BY_PROJECT_SUCCESS;
    payload: {
        data: TaskData[];
    } | null;
}

export interface GetTasksErrorAction {
    type: typeof GET_TASKS_ERROR;
    payload: string;
}

export type TaskState = TasksState | OneTaskState | UpdateAnswer;

export type TasksActionTypes =
    GetTasksRequestAction
    | GetTasksSuccessAction
    | GetTasksErrorAction
    | GetTaskByIdSuccessAction
    | GetTasksByProjectSuccessAction
    | UpdateStatusTaskSuccessAction;
