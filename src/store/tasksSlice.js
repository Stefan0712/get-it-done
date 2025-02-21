import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  completedTasksByDay: [], // Stores completed tasks per day
  deleted: []
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const todayRawDate = new Date();
      const todayDate = todayRawDate.toISOString().split("T")[0];
      const data = action.payload;
      state.tasks.push({ id: data.id, title: data.title, priority: data.priority, isCompleted: false, isPinned: data.isPinned || false, date: todayDate, dueDate: data.dueDate || null, dueHour: data.dueHour });
    },
    deleteTask: (state, action) => {
      const taskId = action.payload;
      const task = state.tasks.find(t => t.id === taskId);
      state.deleted.push(task);
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
    togglePin: (state, action) =>{
      const id = action.payload;
      const task = state.tasks.find((item) => item.id === id);
      if (task) {
        task.isPinned = !task.isPinned;
      }
    },
    updateTask: (state, action) =>{
      const { id, ...updatedTaskData } = action.payload;
      const taskIndex = state.tasks.findIndex(task => task.id === id);
      
      if (taskIndex !== -1) {
          state.tasks[taskIndex] = { ...state.tasks[taskIndex], ...updatedTaskData };
      }
    },
    resetTasks: () => initialState,
  },
});

export const { addTask, deleteTask, toggleTaskCompletion, togglePin, updateTask, resetTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
