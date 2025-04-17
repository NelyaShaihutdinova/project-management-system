import { projectReducer } from './projects/reducer.ts';
import { combineReducers } from 'redux';
import { taskReducer } from './tasks/reducer.ts';

export const rootReducer = combineReducers({
    projects: projectReducer,
    tasks: taskReducer,
});
