import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            const { title, color } = action.payload;
            state.push({ id: uuidv4(), title, color, tasks: [] });
        },
        deleteProject: (state, action) => {
            return state.filter(project => project.id !== action.payload);
        },
        addTaskToProject: (state, action) => {
            const { projectId, taskId } = action.payload;
            const project = state.find(p => p.id === projectId);
            if (project) {
                project.tasks.push(taskId);
            }
        },
        resetProjects: () => initialState,
    },
});

export const { addProject, deleteProject, addTaskToProject, resetProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
