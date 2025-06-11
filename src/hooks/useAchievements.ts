import { useState, useEffect } from 'react';
import { Achievement, Habit } from '../types';
import { useNotifications } from '../contexts/NotificationContext';

const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first-habit',
    title: 'Getting Started',
    description: 'Created your first habit',
    emoji: '🌱',
    condition: (habits) => habits.length >= 1,
  },
  {
    id: 'habit-collector',
    title: 'Habit Collector',
    description: 'Created 5 different habits',
    emoji: '📚',
    condition: (habits) => habits.length >= 5,
  },
  {
    id: 'habit-master',
    title: 'Habit Master',
    description: 'Created 10 different habits',
    emoji: '🏆',
    condition: (habits) => habits.length >= 10,
  },
  {
    id: 'first-streak',
    title: 'Streak Starter',
    description: 'Achieved your first 3-day streak',
    emoji: '🔥',
    condition: (habits) => habits.some(habit => habit.streak >= 3),
  },
  {
    id: 'week-warrior',
    title: 'Week Warrior',
    description: 'Maintained a 7-day streak',
    emoji: '⚡',
    condition: (habits) => habits.some(habit => habit.streak >= 7),
  },
  {
    id: 'month-master',
    title: 'Month Master',
    description: 'Achieved a 30-day streak',
    emoji: '💎',
    condition: (habits) => habits.some(habit => habit.streak >= 30),
  },
  {
    id: 'century-club',
    title: 'Century Club',
    description: 'Reached a 100-day streak',
    emoji: '👑',
    condition: (habits) => habits.some(habit => habit.streak >= 100),
  },
  {
    id: 'perfect-day',
    title: 'Perfect Day',
    description: 'Completed all habits in a single day',
    emoji: '⭐',
    condition: (habits) => {
      const today = new Date().toISOString().split('T')[0];
      const todayHabits = habits.filter(habit => {
        const dayOfWeek = new Date().getDay();
        return habit.frequency === 'daily' ||
               (habit.frequency === 'weekly' && dayOfWeek === 0) ||
               (habit.frequency === 'custom' && habit.customDays?.includes(dayOfWeek));
      });
      return todayHabits.length > 0 && todayHabits.every(habit => habit.completions[today]);
    },
  },
  {
    id: 'consistency-king',
    title: 'Consistency King',
    description: 'Completed habits for 7 consecutive days',
    emoji: '👑',
    condition: (habits) => {
      if (habits.length === 0) return false;
      
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateStr = checkDate.toISOString().split('T')[0];
        const dayOfWeek = checkDate.getDay();
        
        const dayHabits = habits.filter(habit => {
          return habit.frequency === 'daily' ||
                 (habit.frequency === 'weekly' && dayOfWeek === 0) ||
                 (habit.frequency === 'custom' && habit.customDays?.includes(dayOfWeek));
        });
        
        if (dayHabits.length === 0) continue;
        if (!dayHabits.every(habit => habit.completions[dateStr])) {
          return false;
        }
      }
      return true;
    },
  },
];

const STORAGE_KEY = 'elevate-achievements';

export const useAchievements = (habits: Habit[]) => {
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  
  const { addNotification } = useNotifications();

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(unlockedAchievements));
  }, [unlockedAchievements]);

  useEffect(() => {
    const checkAchievements = () => {
      ACHIEVEMENTS.forEach(achievement => {
        const isAlreadyUnlocked = unlockedAchievements.some(unlocked => unlocked.id === achievement.id);
        
        if (!isAlreadyUnlocked && achievement.condition(habits)) {
          const unlockedAchievement = {
            ...achievement,
            unlockedAt: new Date().toISOString(),
          };
          
          setUnlockedAchievements(prev => [...prev, unlockedAchievement]);
          
          // Show achievement notification
          addNotification({
            type: 'achievement',
            title: 'Achievement Unlocked!',
            message: `${achievement.emoji} ${achievement.title}: ${achievement.description}`,
            duration: 8000,
          });
        }
      });
    };

    checkAchievements();
  }, [habits, unlockedAchievements, addNotification]);

  const getProgress = () => {
    return {
      unlocked: unlockedAchievements.length,
      total: ACHIEVEMENTS.length,
      percentage: Math.round((unlockedAchievements.length / ACHIEVEMENTS.length) * 100),
    };
  };

  return {
    achievements: ACHIEVEMENTS,
    unlockedAchievements,
    getProgress,
  };
};