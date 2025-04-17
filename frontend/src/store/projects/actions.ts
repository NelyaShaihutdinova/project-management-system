import {
    GetProjectsErrorAction,
    GetProjectsRequestAction,
    GetProjectsSuccessAction,
    ProjectData,
    ProjectsActionTypes,
} from './types.ts';
import { Dispatch } from 'redux';
import axios from 'axios';
import { SERVER_API_URL } from '../../App.tsx';

const getProjectsRequest = (): GetProjectsRequestAction => ({
    type: 'GET_PROJECTS_REQUEST',
});

const getProjectsSuccess = (projects: ProjectData): GetProjectsSuccessAction => ({
    type: 'GET_PROJECTS_SUCCESS',
    payload: projects,
});

const getProjectsError = (error: string): GetProjectsErrorAction => ({
    type: 'GET_PROJECTS_ERROR',
    payload: error,
});

export const getProjects = () => {
    return async (dispatch: Dispatch<ProjectsActionTypes>) => {
        dispatch(getProjectsRequest());
        try {
            const response = await axios.get(`${SERVER_API_URL}/boards`);
            const data = response.data;
            dispatch(getProjectsSuccess(data));
        } catch (error: any) {
            dispatch(getProjectsError(error.message));
        }
    };
};
