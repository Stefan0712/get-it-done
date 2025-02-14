import { createSlice } from '@reduxjs/toolkit';

// Default settings
const initialState = {
    theme: 'dark',
    language: 'en',
    selectedProject: null,
    selectedTask: null,
    showFullscreenPrompt: true,
    isFullscreen: false,
    isScreenAwakeOn: false,
    pomodoroSettings: {
        focusDuration: 25,
        breakDuration: 5,
        longBreakDuration: 30,
        longBreakFrequency: 3,
        includeLongBreaks: true,
        enableNotifications: false,
        autoSkip: false,
    },
    history: {}

};

const appSettingsSlice = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
        setLanguage: (state, action) => {
            state.language = action.payload;
        },
        setFocusSessions: (state, action)=>{
            state.focusSessions = action.payload;
        },
        setBreakSessions: (state, action)=>{
            state.breakSessions = action.payload;
        },
        toggleSoundAlarm: (state)=>{
            state.soundAlarm = !state.soundAlarm;
        },
        setSelectedProject: (state, action)=>{
            state.selectedProject = action.payload;
        },
        updatePomodoroSettings: (state, action)=>{
            state.pomodoroSettings = action.payload;
        },
        setSelectedTask: (state, action) =>{
            state.selectedTask = action.payload;
        },
        addToHistory: (state, action) => {
            const todayDate = new Date().toISOString().split("T")[0];
            // Ensure history object exists
            if (!state.history) {
                state.history = {};
            }
            // Ensure there's an array for today's date
            if (!state.history[todayDate]) {
                state.history[todayDate] = [];
            }
            // Append the new object
            state.history[todayDate].push(action.payload);
        },
        toggleFullscreen: (state, action) =>{
            state.isFullscreen = action.payload
        },
        toggleScreenAwake: (state, action) =>{
            state.isScreenAwakeOn = action.payload
        },
        resetAppSettings: () => initialState,
    }
});

export const { toggleTheme, setTheme, setLanguage, setFocusSessions, toggleScreenAwake, toggleFullscreen, setBreakSessions, toggleSoundAlarm, addToHistory, resetAppSettings,setSelectedProject, updatePomodoroSettings, setSelectedTask } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
