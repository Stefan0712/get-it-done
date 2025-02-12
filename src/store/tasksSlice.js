import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  completedTasksByDay: [], // Stores completed tasks per day
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const { id, title, color } = action.payload;
      state.tasks.push({ id, title, color, isCompleted: false });
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      if (task && task.isCompleted) {
        // If task is completed, decrease the count before deleting
        const today = new Date().toISOString().split("T")[0];
        const existingDay = state.completedTasksByDay.find(d => d.date === today);
        if (existingDay) existingDay.count = Math.max(0, existingDay.count - 1);
      }
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload);
      if (!task) return;

      const today = new Date().toISOString().split("T")[0];
      const existingDay = state.completedTasksByDay.find(d => d.date === today);

      if (task.isCompleted) {
        // Unmark task
        task.isCompleted = false;
        if (existingDay) {
          existingDay.count = Math.max(0, existingDay.count - 1);
        }
      } else {
        // Mark task as completed
        task.isCompleted = true;
        if (existingDay) {
          existingDay.count += 1;
        } else {
          state.completedTasksByDay.push({ date: today, count: 1 });
        }
      }
    },
    resetTasks: () => initialState,
  },
});

export const { addTask, deleteTask, toggleTaskCompletion, resetTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
