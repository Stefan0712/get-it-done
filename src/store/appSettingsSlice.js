import { createSlice } from '@reduxjs/toolkit';

// Default settings
const initialState = {
    theme: 'dark',
    language: 'en',
    selectedProject: null,
    selectedTask: null,
    showFullScreenPrompt: true,
    isFullscreen: false,
    isScreenAwakeOn: false,
    showNotifications: true,
    showFullscreenButton: true,
    pomodoroSettings: {
        focusDuration: 25,
        breakDuration: 5,
        longBreakDuration: 30,
        longBreakFrequency: 3,
        includeLongBreaks: true,
        enableNotifications: false,
        autoSkip: false,
        showTimerRing: true,//
        showMinimizedTimerProgress: true,
        sessionEndAnimation: true,
        showMinimizeButton: true,
        showSessionCounter: true,
        showCurrentSession: true,
        showBottomButtons: true

    },
    history: {},
    theme: 'dark',
    isPomodoroMinimized: false,
    isTasksMaximized: false,
    isSwapped: false,
    showMaximizeButton: true,
    showHistoryButton: true,
    showHomeButton: true,
    showAboutButton: true,
    showTasksHistory: true,
    showTasksSummary: true,
    showWorkHistory: true,


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
        updateSetting: (state, action) =>{
            
            const { settingKey, value } = action.payload;
            // Ensure the settingKey is valid 
            if (state.hasOwnProperty(settingKey)) {
                console.log(action.payload)
                state[settingKey] = value;
            }
        },
        updatePomodoroSetting: (state, action) =>{
            const { settingKey, value } = action.payload;
            console.log(settingKey, value)
            if (state.pomodoroSettings.hasOwnProperty(settingKey)) {
                console.log(action.payload)
                state.pomodoroSettings[settingKey] = value;
            }
        },
        resetAppSettings: () => initialState,
    }
});

export const { toggleTheme, setTheme, setLanguage,updatePomodoroSetting, updateSetting, setFocusSessions, toggleScreenAwake, toggleFullscreen, setBreakSessions, toggleSoundAlarm, addToHistory, resetAppSettings,setSelectedProject, updatePomodoroSettings, setSelectedTask } = appSettingsSlice.actions;
export default appSettingsSlice.reducer;
