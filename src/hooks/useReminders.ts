import { useEffect } from 'react';
import { Habit } from '../types';
import { useNotifications } from '../contexts/NotificationContext';

export const useReminders = (habits: Habit[]) => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const today = now.toISOString().split('T')[0];
      const dayOfWeek = now.getDay();

      habits.forEach(habit => {
        if (!habit.reminderEnabled || !habit.reminderTime) return;

        // Check if it's time for this habit's reminder
        if (habit.reminderTime === currentTime) {
          // Check if habit should be tracked today
          const shouldTrackToday = 
            habit.frequency === 'daily' ||
            (habit.frequency === 'weekly' && dayOfWeek === 0) ||
            (habit.frequency === 'custom' && habit.customDays?.includes(dayOfWeek));

          if (shouldTrackToday && !habit.completions[today]) {
            addNotification({
              type: 'info',
              title: 'Habit Reminder',
              message: `Time to ${habit.name} ${habit.emoji}`,
              duration: 10000,
              action: {
                label: 'Mark Complete',
                onClick: () => {
                  // This would trigger the habit completion
                  // We'll need to pass this function from the parent component
                },
              },
            });
          }
        }
      });
    };

    // Check reminders every minute
    const interval = setInterval(checkReminders, 60000);
    
    // Check immediately
    checkReminders();

    return () => clearInterval(interval);
  }, [habits, addNotification]);

  const requestNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  };

  const scheduleNotification = (habit: Habit) => {
    if (!habit.reminderEnabled || !habit.reminderTime) return;

    const [hours, minutes] = habit.reminderTime.split(':').map(Number);
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hours, minutes, 0, 0);

    // If the time has passed today, schedule for tomorrow
    if (reminderTime <= now) {
      reminderTime.setDate(reminderTime.getDate() + 1);
    }

    const timeUntilReminder = reminderTime.getTime() - now.getTime();

    setTimeout(() => {
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`Habit Reminder: ${habit.name}`, {
          body: `Time to ${habit.name} ${habit.emoji}`,
          icon: '/vite.svg',
          tag: `habit-${habit.id}`,
        });
      }
    }, timeUntilReminder);
  };

  return {
    requestNotificationPermission,
    scheduleNotification,
  };
};