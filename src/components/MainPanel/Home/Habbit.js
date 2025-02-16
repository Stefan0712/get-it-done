import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from './Home.module.css';

const CurrentWeek = () => {
  const completedTasks = useSelector((state) => state.tasks.completedTasksByDay);
  const todayRawDate = new Date();
  const todayDate = todayRawDate.toISOString().split("T")[0];

  // Function to get the start of the current week (Monday)
  const getMonday = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sun) to 6 (Sat)
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Adjust if today is Sunday
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    return monday;
  };

  // Generate the week's data
  const generateWeekData = () => {
    const monday = getMonday();
    const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return weekdays.map((day, index) => {
      const date = new Date(monday);
      date.setDate(monday.getDate() + index);
      const dateString = date.toISOString().split("T")[0]; // YYYY-MM-DD

      // Get completed tasks for this day
      const completedCount = (completedTasks && completedTasks.find((d) => d.date === dateString))?.count || 0;

      return {date: dateString, weekDay: day, value: completedCount };
    });
  };

  // State for the current week's data
  const [weekData, setWeekData] = useState([]);

  useEffect(() => {
    setWeekData(generateWeekData());
  }, [completedTasks]); // Update when tasks change

  return (
    <div className={styles.habbit}>
      <h4>Tasks History</h4>
      <div className={styles['habbit-container']}>
        {weekData.map((day) => (
          <div key={day.weekDay} className={`${styles['week-day']} ${todayDate === day.date ? styles['selected-day'] : ''}`}>
            <p className={styles['week-day-value']}>{day.value}</p>
            <p className={styles['week-day-name']}>{day.weekDay}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeek;
