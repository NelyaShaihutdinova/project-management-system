export interface ProjectData {
    description: string;
    id: number;
    name: string;
    taskCount: number;
}

export interface ProjectState {
    projects: {
        data: ProjectData[];
    };
    loading: boolean;
    error: string | null;
}

export const GET_PROJECTS_REQUEST = 'GET_PROJECTS_REQUEST';
export const GET_PROJECTS_SUCCESS = 'GET_PROJECTS_SUCCESS';
export const GET_PROJECTS_ERROR = 'GET_PROJECTS_ERROR';

export interface GetProjectsRequestAction {
    type: typeof GET_PROJECTS_REQUEST;
}

export interface GetProjectsSuccessAction {
    type: typeof GET_PROJECTS_SUCCESS;
    payload: ProjectData;
}

export interface GetProjectsErrorAction {
    type: typeof GET_PROJECTS_ERROR;
    payload: string;
}

export type ProjectsActionTypes = GetProjectsRequestAction | GetProjectsSuccessAction | GetProjectsErrorAction;
