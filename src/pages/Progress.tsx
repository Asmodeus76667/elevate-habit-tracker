import React, { useState } from 'react';
import { Calendar, BarChart3, TrendingUp } from 'lucide-react';
import { useHabits } from '../hooks/useHabits';

export const Progress: React.FC = () => {
  const { habits } = useHabits();
  const [selectedHabit, setSelectedHabit] = useState<string>('all');

  // Generate calendar heatmap data
  const generateHeatmapData = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 364); // Show last 365 days

    const days = [];
    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      let completions = 0;
      let total = 0;

      const filteredHabits = selectedHabit === 'all' 
        ? habits 
        : habits.filter(h => h.id === selectedHabit);

      filteredHabits.forEach(habit => {
        const dayOfWeek = d.getDay();
        const shouldTrack = 
          habit.frequency === 'daily' ||
          (habit.frequency === 'weekly' && dayOfWeek === 0) ||
          (habit.frequency === 'custom' && habit.customDays?.includes(dayOfWeek));

        if (shouldTrack && new Date(habit.startDate) <= d) {
          total++;
          if (habit.completions[dateStr]) {
            completions++;
          }
        }
      });

      const intensity = total === 0 ? 0 : completions / total;
      days.push({
        date: dateStr,
        intensity,
        completions,
        total,
      });
    }

    return days;
  };

  const heatmapData = generateHeatmapData();

  const getIntensityColor = (intensity: number) => {
    if (intensity === 0) return 'bg-gray-100 dark:bg-gray-800';
    if (intensity < 0.25) return 'bg-emerald-100 dark:bg-emerald-900/30';
    if (intensity < 0.5) return 'bg-emerald-200 dark:bg-emerald-800/50';
    if (intensity < 0.75) return 'bg-emerald-300 dark:bg-emerald-700/70';
    return 'bg-emerald-500 dark:bg-emerald-600';
  };

  // Calculate weekly stats
  const getWeeklyStats = () => {
    const weeks = [];
    const today = new Date();
    
    for (let i = 0; i < 12; i++) {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - (i + 1) * 7);
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);

      let completed = 0;
      let total = 0;

      for (let d = new Date(weekStart); d <= weekEnd; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const dayData = heatmapData.find(day => day.date === dateStr);
        if (dayData) {
          completed += dayData.completions;
          total += dayData.total;
        }
      }

      weeks.push({
        week: `Week of ${weekStart.toLocaleDateString()}`,
        completed,
        total,
        percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
      });
    }

    return weeks.reverse();
  };

  const weeklyStats = getWeeklyStats();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Progress Overview
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Visualize your habit consistency and track improvements
        </p>
      </div>

      {/* Habit Filter */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Filter by habit
        </label>
        <select
          value={selectedHabit}
          onChange={(e) => setSelectedHabit(e.target.value)}
          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        >
          <option value="all">All Habits</option>
          {habits.map((habit) => (
            <option key={habit.id} value={habit.id}>
              {habit.emoji} {habit.name}
            </option>
          ))}
        </select>
      </div>

      {habits.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700">
          <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No progress to show
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Start tracking habits to see your progress here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Heatmap Calendar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-6">
              <Calendar className="w-5 h-5 text-indigo-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Year Overview
              </h2>
            </div>
            
            <div className="overflow-x-auto">
              <div className="grid grid-cols-53 gap-1 min-w-full">
                {heatmapData.map((day, index) => (
                  <div
                    key={day.date}
                    className={`w-3 h-3 rounded-sm ${getIntensityColor(day.intensity)}`}
                    title={`${day.date}: ${day.completions}/${day.total} habits completed`}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between mt-4 text-sm text-gray-600 dark:text-gray-400">
                <span>Less</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800 rounded-sm" />
                  <div className="w-3 h-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-sm" />
                  <div className="w-3 h-3 bg-emerald-200 dark:bg-emerald-800/50 rounded-sm" />
                  <div className="w-3 h-3 bg-emerald-300 dark:bg-emerald-700/70 rounded-sm" />
                  <div className="w-3 h-3 bg-emerald-500 dark:bg-emerald-600 rounded-sm" />
                </div>
                <span>More</span>
              </div>
            </div>
          </div>

          {/* Weekly Stats Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2 mb-6">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Weekly Progress
              </h2>
            </div>
            
            <div className="space-y-4">
              {weeklyStats.map((week, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className="w-32 text-sm text-gray-600 dark:text-gray-400 truncate">
                    {week.week}
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${week.percentage}%` }}
                    />
                  </div>
                  <div className="text-sm font-medium text-gray-900 dark:text-white w-16 text-right">
                    {week.percentage}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 w-16">
                    {week.completed}/{week.total}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};