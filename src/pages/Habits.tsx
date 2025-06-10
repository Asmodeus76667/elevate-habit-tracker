import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Calendar } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AddHabitModal } from '../components/AddHabitModal';
import { useHabits } from '../hooks/useHabits';

export const Habits: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { habits, addHabit, deleteHabit } = useHabits();

  const getFrequencyText = (habit: any) => {
    if (habit.frequency === 'daily') return 'Daily';
    if (habit.frequency === 'weekly') return 'Weekly';
    if (habit.frequency === 'custom' && habit.customDays) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      return habit.customDays.map((day: number) => days[day]).join(', ');
    }
    return 'Custom';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Your Habits
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Manage and organize all your habits
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

      {habits.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No habits yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Create your first habit to start tracking your progress.
          </p>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            icon={Plus}
          >
            Create Your First Habit
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          {habits.map((habit) => (
            <div
              key={habit.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{habit.emoji}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {habit.name}
                    </h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {getFrequencyText(habit)}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {habit.category}
                      </span>
                      <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        {habit.streak} day streak
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Edit2}
                    onClick={() => {
                      // TODO: Implement edit functionality
                      console.log('Edit habit:', habit.id);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Trash2}
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this habit?')) {
                        deleteHabit(habit.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addHabit}
      />
    </div>
  );
};