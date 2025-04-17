import { projectReducer } from './projects/reducer.ts';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    projects: projectReducer,
});
