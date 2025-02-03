import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsSlice';
import tasksReducer from './tasksSlice';
import appSettingsReducer from './appSettingsSlice';


const store = configureStore({
    reducer: {
        projects: projectsReducer,
        tasks: tasksReducer,
        appSettings: appSettingsReducer
    }
});

export default store;
