import { createSlice } from '@reduxjs/toolkit';

// Default settings
const initialState = {
    theme: 'dark',
    language: 'en',
    focusSessions: 4,
    breakSessions: 3,
    soundAlarm: false,
    selectedProject: null,
    selectedTask: null,
    pomodoroSettings: {
        focusDuration: 25,
        breakDuration: 5,
        longBreakDuration: 30,
        longBreakFrequency: 3,
        includeLongBreaks: true,
        enableNotifications: false,
        autoSkip: false
    }

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
        resetAppSettings: () => initialState,
    }
});

export const { toggleTheme, setTheme, setLanguage, setFocusSessions, setBreakSessions, toggleSoundAlarm, resetAppSettings,setSelectedProject, updatePomodoroSettings, setSelectedTask } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
