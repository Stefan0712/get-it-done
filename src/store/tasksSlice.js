import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = [];

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            const { title, color } = action.payload;
            state.push({ id: uuidv4(), title, color, isCompleted: false });
        },
        deleteTask: (state, action) => {
            return state.filter(task => task.id !== action.payload);
        },
        toggleTaskCompletion: (state, action) => {
            const task = state.find(t => t.id === action.payload);
            if (task) {
                task.isCompleted = !task.isCompleted;
            }
        }
    }
});

export const { addTask, deleteTask, toggleTaskCompletion } = tasksSlice.actions;
export default tasksSlice.reducer;
