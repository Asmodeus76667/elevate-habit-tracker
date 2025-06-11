import React, { useState } from 'react';
import { Plus, Calendar, Flame, Target, Trophy } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { HabitCard } from '../components/HabitCard';
import { AddHabitModal } from '../components/AddHabitModal';
import { useHabits } from '../hooks/useHabits';
import { useNotifications } from '../contexts/NotificationContext';
import { useAchievements } from '../hooks/useAchievements';
import { useReminders } from '../hooks/useReminders';

export const Dashboard: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { habits, addHabit, toggleHabitCompletion, getTodaysHabits } = useHabits();
  const { addNotification } = useNotifications();
  const { getProgress } = useAchievements(habits);
  const { requestNotificationPermission } = useReminders(habits);
  
  const todaysHabits = getTodaysHabits();
  const today = new Date().toISOString().split('T')[0];
  
  const completedToday = todaysHabits.filter(habit => habit.completions[today]).length;
  const totalStreak = todaysHabits.reduce((sum, habit) => sum + habit.streak, 0);
  const achievementProgress = getProgress();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleAddHabit = (habitData: any) => {
    addHabit(habitData);
    
    addNotification({
      type: 'success',
      title: 'Habit Created!',
      message: `${habitData.emoji} ${habitData.name} has been added to your routine.`,
      duration: 4000,
    });

    // Request notification permission if reminders are enabled
    if (habitData.reminderEnabled) {
      requestNotificationPermission();
    }
  };

  const handleToggleHabit = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return;

    const wasCompleted = habit.completions[today];
    toggleHabitCompletion(habitId, today);

    if (!wasCompleted) {
      // Habit was just completed
      addNotification({
        type: 'success',
        title: 'Great job!',
        message: `${habit.emoji} ${habit.name} completed for today!`,
        duration: 3000,
      });

      // Check if this completes all habits for today
      const otherTodayHabits = todaysHabits.filter(h => h.id !== habitId);
      const allOthersCompleted = otherTodayHabits.every(h => h.completions[today]);
      
      if (otherTodayHabits.length > 0 && allOthersCompleted) {
        setTimeout(() => {
          addNotification({
            type: 'achievement',
            title: 'Perfect Day!',
            message: '🌟 You completed all your habits today!',
            duration: 6000,
          });
        }, 1000);
      }
    } else {
      // Habit was uncompleted
      addNotification({
        type: 'info',
        title: 'Habit unmarked',
        message: `${habit.emoji} ${habit.name} unmarked for today.`,
        duration: 2000,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Good morning! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {formatDate(new Date())}
          </p>
        </div>
        <Button
          onClick={() => setIsAddModalOpen(true)}
          icon={Plus}
          size="lg"
        >
          Add Habit
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center">
              <Target className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Today's Progress</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {completedToday}/{todaysHabits.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900 rounded-xl flex items-center justify-center">
              <Flame className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Streaks</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {totalStreak} days
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-xl flex items-center justify-center">
              <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Habits</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {todaysHabits.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900 rounded-xl flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Achievements</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {achievementProgress.unlocked}/{achievementProgress.total}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Habits */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Today's Habits
        </h2>
        
        {todaysHabits.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No habits for today
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Start building your routine by adding your first habit.
            </p>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              icon={Plus}
            >
              Add Your First Habit
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {todaysHabits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                isCompleted={!!habit.completions[today]}
                onToggle={() => handleToggleHabit(habit.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Habit Modal */}
      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddHabit}
      />
    </div>
  );
};