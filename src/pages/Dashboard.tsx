import React, { useState } from 'react';
import { Plus, Calendar, Flame, Target } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { HabitCard } from '../components/HabitCard';
import { AddHabitModal } from '../components/AddHabitModal';
import { useHabits } from '../hooks/useHabits';

export const Dashboard: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { addHabit, toggleHabitCompletion, getTodaysHabits } = useHabits();
  
  const todaysHabits = getTodaysHabits();
  const today = new Date().toISOString().split('T')[0];
  
  const completedToday = todaysHabits.filter(habit => habit.completions[today]).length;
  const totalStreak = todaysHabits.reduce((sum, habit) => sum + habit.streak, 0);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                onToggle={() => toggleHabitCompletion(habit.id, today)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Add Habit Modal */}
      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addHabit}
      />
    </div>
  );
};