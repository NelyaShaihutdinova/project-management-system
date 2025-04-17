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

export interface TaskState {
    tasks: {
        data: TaskData[];
    } | null;
    loading: boolean;
    error: string | null;
}

export const GET_TASKS_REQUEST = 'GET_TASKS_REQUEST';
export const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
export const GET_TASKS_ERROR = 'GET_TASKS_ERROR';

export interface GetTasksRequestAction {
    type: typeof GET_TASKS_REQUEST;
}

export interface GetTasksSuccessAction {
    type: typeof GET_TASKS_SUCCESS;
    payload: {
        data: TaskData[];
    } | null;
}

export interface GetTasksErrorAction {
    type: typeof GET_TASKS_ERROR;
    payload: string;
}

export type TasksActionTypes = GetTasksRequestAction | GetTasksSuccessAction | GetTasksErrorAction;
