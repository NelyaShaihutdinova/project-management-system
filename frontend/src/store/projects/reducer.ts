import {
    GET_PROJECTS_ERROR,
    GET_PROJECTS_REQUEST,
    GET_PROJECTS_SUCCESS,
    ProjectsActionTypes,
    ProjectState,
} from './types.ts';
import {Reducer} from 'redux';

const initialState: ProjectState = {
    projects: null,
    loading: false,
    error: null,
};

export const projectReducer: Reducer<ProjectState, ProjectsActionTypes> = (
    state = initialState,
    action: ProjectsActionTypes
): ProjectState => {
    switch (action.type) {
        case GET_PROJECTS_REQUEST:
            return { ...state, loading: true };
        case GET_PROJECTS_SUCCESS:
            return { ...state, projects: action.payload, loading: false };
        case GET_PROJECTS_ERROR:
            return { ...state, projects: null, error: action.payload };
        default:
            return state;
    }
};
