import { useState, useEffect } from 'react';
import { Habit } from '../types';

const STORAGE_KEY = 'elevate-habits';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
  }, [habits]);

  const addHabit = (habit: Omit<Habit, 'id' | 'streak' | 'completions' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      streak: 0,
      completions: {},
      createdAt: new Date().toISOString(),
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const updateHabit = (id: string, updates: Partial<Habit>) => {
    setHabits(prev => prev.map(habit => 
      habit.id === id ? { ...habit, ...updates } : habit
    ));
  };

  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  const toggleHabitCompletion = (id: string, date: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const newCompletions = { ...habit.completions };
        const wasCompleted = newCompletions[date];
        
        if (wasCompleted) {
          delete newCompletions[date];
        } else {
          newCompletions[date] = true;
        }

        // Calculate new streak
        let streak = 0;
        const today = new Date();
        for (let i = 0; i < 365; i++) {
          const checkDate = new Date(today);
          checkDate.setDate(today.getDate() - i);
          const dateStr = checkDate.toISOString().split('T')[0];
          
          if (newCompletions[dateStr]) {
            streak++;
          } else {
            break;
          }
        }

        return {
          ...habit,
          completions: newCompletions,
          streak,
        };
      }
      return habit;
    }));
  };

  const getTodaysHabits = () => {
    const today = new Date().toISOString().split('T')[0];
    const dayOfWeek = new Date().getDay();
    
    return habits.filter(habit => {
      if (habit.frequency === 'daily') return true;
      if (habit.frequency === 'weekly') return dayOfWeek === 0; // Sunday
      if (habit.frequency === 'custom' && habit.customDays) {
        return habit.customDays.includes(dayOfWeek);
      }
      return false;
    });
  };

  return {
    habits,
    addHabit,
    updateHabit,
    deleteHabit,
    toggleHabitCompletion,
    getTodaysHabits,
  };
};