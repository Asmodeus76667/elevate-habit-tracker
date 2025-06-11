import React, { useState } from 'react';
import { BarChart3, Calendar, TrendingUp, Brain } from 'lucide-react';
import { useHabits } from '../hooks/useHabits';
import { HabitInsights } from '../components/analytics/HabitInsights';
import { HabitTrendChart } from '../components/charts/HabitTrendChart';
import { HabitRecommendations } from '../components/ai/HabitRecommendations';

export const Analytics: React.FC = () => {
  const { habits, addHabit } = useHabits();
  const [selectedHabit, setSelectedHabit] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const handleAddRecommendation = (recommendation: any) => {
    addHabit({
      name: recommendation.title,
      emoji: recommendation.emoji,
      frequency: 'daily',
      category: recommendation.category,
      startDate: new Date().toISOString().split('T')[0],
      reminderEnabled: true,
      reminderTime: recommendation.suggestedTime || '09:00',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Advanced Analytics
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Deep insights into your habit patterns and AI-powered recommendations
        </p>
      </div>

      {habits.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No analytics available
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start tracking habits to unlock powerful analytics and insights.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by habit
              </label>
              <select
                value={selectedHabit}
                onChange={(e) => setSelectedHabit(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Habits</option>
                {habits.map((habit) => (
                  <option key={habit.id} value={habit.id}>
                    {habit.emoji} {habit.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Time range
              </label>
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value as 'week' | 'month' | 'year')}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="week">Last 7 days</option>
                <option value="month">Last 30 days</option>
                <option value="year">Last 365 days</option>
              </select>
            </div>
          </div>

          {/* Trend Chart */}
          <HabitTrendChart
            habits={habits}
            selectedHabit={selectedHabit === 'all' ? undefined : selectedHabit}
            timeRange={timeRange}
          />

          {/* Insights and Recommendations Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Habit Insights */}
            <HabitInsights habits={habits} />

            {/* AI Recommendations */}
            <HabitRecommendations
              habits={habits}
              onAddRecommendation={handleAddRecommendation}
            />
          </div>
        </div>
      )}
    </div>
  );
};