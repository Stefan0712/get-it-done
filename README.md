# ⏱️ Get It Done

Forget all those complex to-do apps or pomodoro timers with ads. This simple app is meant to boost your productivity by making you interact the least amount of time with your productivity app. Why waste time with a complex app where you have to press tens of buttons to get something done instead of focusing on your work? 

This app is simple. You launch it, you create your project, add tasks and get to work. No planning a month in advance, no spending more time on planning the task than actually doing it, no complex interface. You add the title of the task, the priority, and the optional due date and you're set to go. Start the timer and check your tasks one by one until you are done!

## 📋 Features

1. Clean and simple interface
2. Everything at a glance
3. Simple and always visible Pomodoro timer
4. No learning curve - just do your tasks
5. Everything in under 2 clicks/taps

## 🚀 What can it do?

The core idea is that it's a small and simple app that should improve producivity by reducing the time to manage tasks. With that in mind, it doesn't do much.
You can create projects that are just a way to group tasks in a simple way. Each task can have an unlimited number of tasks, which are created with only a title, due date and due hour,
priority, and if that task should be pinned or not. That's all. The only required input is the title, everything else being optional or already having a default item. You can edit, pin, complete, or delete a task. 

Your screen will be split in two, on the left being the main panel with tasks, history, or home, and on the right being the pomodoro timer that is always shown. You can customize the duration of the focus session, of the short breaks, long breaks, the frequency of long breaks, if you want to include them, and notifications.

## ⚙️ How does it work?

It's just a simple React app that has three main components: the side panel, the main panel, and the Pomodoro timer.

The Side Panel contains a Work Board with all projects and three buttons, one for creating a new project, one for showing settings, and one for maximizing/minimizing the side menu.

The Main Panel contains the Home page, with current date and time, tasks that are due today, and a goal tracker of how many tasks you completed each day in the current week.
The Tasks page contains all tasks of the selected project. They are grouped into three categories: Pinned, Not Completed, and Completed. You can colapse/expand them as you wish. From the same page you can edit, delete, complete, or pin them.
The History page contains all logged Work Sessions. A work session is the total of all focus sessions and breaks. Each log contains the number of each session, when you started and when you finished.

The Pomodoro timer component contains a simple coundown that you can start, stop, or reset. It also handles different sessions (focus sessions, breaks and long breaks). It changes the duration based on them and let you skip them or reset them. All of those settings can be customized to fit you.

The app only uses React and Redux (with persist so data stay saved even after closing the app). It can prompt the user to switch to fullscreen for best experience and show different messages.


## 🤝 Contributing

Contributions are welcome! If you have suggestions, ideas, or bug fixes, feel free to:

Fork this repository. Create a new branch. Submit a pull request.


## 📜 License
This project is licensed under the MIT License, which means you’re free to use, modify, and distribute it as long as you provide attribution.