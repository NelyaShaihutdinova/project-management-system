export enum TaskStatus {
    Backlog = 'Backlog',
    InProgress = 'InProgress',
    Done = 'Done',
}

export const statusLabels: Record<TaskStatus, string> = {
    [TaskStatus.Backlog]: 'Бэклог',
    [TaskStatus.InProgress]: 'В процессе',
    [TaskStatus.Done]: 'Готово',
};

export enum TaskPriority {
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
    tasks: { data: TaskData[] } | null;
    loading: boolean;
    error: string | null;
}

export interface TasksByProjectState {
    projectTasks: { data: TaskData[] } | null;
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

export interface CreateAnswerId {
    answerId: { id: number } | null;
}

export const TASKS_REQUEST = 'TASKS_REQUEST';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const TASKS_ERROR = 'TASKS_ERROR';
export const GET_TASK_SUCCESS = 'GET_TASK_SUCCESS';
export const GET_TASKS_BY_PROJECT_SUCCESS = 'GET_TASKS_BY_PROJECT_SUCCESS';
export const UPDATE_TASK_STATUS_SUCCESS = 'UPDATE_TASK_STATUS_SUCCESS';
export const UPDATE_TASK_BY_ID_SUCCESS = 'UPDATE_TASK_BY_ID_SUCCESS';
export const CREATE_TASK_SUCCESS = 'CREATE_TASK_SUCCESS';

export interface TasksRequestAction {
    type: typeof TASKS_REQUEST;
}

export interface GetTaskByIdSuccessAction {
    type: typeof GET_TASK_SUCCESS;
    payload: { data: TaskData } | null;
}

export interface GetTasksSuccessAction {
    type: typeof GET_TASKS_SUCCESS;
    payload: { data: TaskData[] } | null;
}

export interface UpdateStatusTaskSuccessAction {
    type: typeof UPDATE_TASK_STATUS_SUCCESS;
    payload: { message: string } | null;
}

export interface UpdateTaskSuccessAction {
    type: typeof UPDATE_TASK_BY_ID_SUCCESS;
    payload: { message: string } | null;
}

export interface CreateTaskSuccessAction {
    type: typeof CREATE_TASK_SUCCESS;
    payload: { id: number } | null;
}

export interface GetTasksByProjectSuccessAction {
    type: typeof GET_TASKS_BY_PROJECT_SUCCESS;
    payload: { data: TaskData[] } | null;
}

export interface TasksErrorAction {
    type: typeof TASKS_ERROR;
    payload: string;
}

export type TaskState = TasksState | OneTaskState | UpdateAnswer | CreateAnswerId | TasksByProjectState;

export type TasksActionTypes =
    | TasksRequestAction
    | GetTasksSuccessAction
    | TasksErrorAction
    | GetTaskByIdSuccessAction
    | GetTasksByProjectSuccessAction
    | UpdateStatusTaskSuccessAction
    | UpdateTaskSuccessAction
    | CreateTaskSuccessAction;
