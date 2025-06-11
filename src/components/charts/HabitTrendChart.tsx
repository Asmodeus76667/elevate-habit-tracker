import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Habit } from '../../types';

interface HabitTrendChartProps {
  habits: Habit[];
  selectedHabit?: string;
  timeRange: 'week' | 'month' | 'year';
}

export const HabitTrendChart: React.FC<HabitTrendChartProps> = ({
  habits,
  selectedHabit,
  timeRange,
}) => {
  const generateTrendData = () => {
    const today = new Date();
    const periods = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 365;
    const data = [];

    const filteredHabits = selectedHabit 
      ? habits.filter(h => h.id === selectedHabit)
      : habits;

    for (let i = periods - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const dayOfWeek = date.getDay();

      let completed = 0;
      let total = 0;

      filteredHabits.forEach(habit => {
        const shouldTrack = 
          habit.frequency === 'daily' ||
          (habit.frequency === 'weekly' && dayOfWeek === 0) ||
          (habit.frequency === 'custom' && habit.customDays?.includes(dayOfWeek));

        if (shouldTrack && new Date(habit.startDate) <= date) {
          total++;
          if (habit.completions[dateStr]) {
            completed++;
          }
        }
      });

      data.push({
        date: dateStr,
        completed,
        total,
        percentage: total > 0 ? (completed / total) * 100 : 0,
        label: timeRange === 'week' 
          ? date.toLocaleDateString('en-US', { weekday: 'short' })
          : timeRange === 'month'
          ? date.getDate().toString()
          : date.toLocaleDateString('en-US', { month: 'short' }),
      });
    }

    return data;
  };

  const trendData = generateTrendData();
  const maxPercentage = Math.max(...trendData.map(d => d.percentage));
  
  // Calculate trend direction
  const firstHalf = trendData.slice(0, Math.floor(trendData.length / 2));
  const secondHalf = trendData.slice(Math.floor(trendData.length / 2));
  
  const firstHalfAvg = firstHalf.reduce((sum, d) => sum + d.percentage, 0) / firstHalf.length;
  const secondHalfAvg = secondHalf.reduce((sum, d) => sum + d.percentage, 0) / secondHalf.length;
  
  const trendDirection = secondHalfAvg > firstHalfAvg + 5 ? 'up' : 
                        secondHalfAvg < firstHalfAvg - 5 ? 'down' : 'stable';

  const getTrendIcon = () => {
    switch (trendDirection) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-red-600" />;
      default:
        return <Minus className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTrendText = () => {
    const change = Math.abs(secondHalfAvg - firstHalfAvg);
    switch (trendDirection) {
      case 'up':
        return `+${change.toFixed(1)}% improvement`;
      case 'down':
        return `-${change.toFixed(1)}% decline`;
      default:
        return 'Stable performance';
    }
  };

  const getTrendColor = () => {
    switch (trendDirection) {
      case 'up':
        return 'text-emerald-600 dark:text-emerald-400';
      case 'down':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Completion Trend
        </h3>
        <div className="flex items-center space-x-2">
          {getTrendIcon()}
          <span className={`text-sm font-medium ${getTrendColor()}`}>
            {getTrendText()}
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Chart */}
        <div className="flex items-end space-x-1 h-48 mb-4">
          {trendData.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className="w-full bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-sm transition-all duration-300 hover:from-indigo-600 hover:to-indigo-500 cursor-pointer"
                style={{
                  height: `${maxPercentage > 0 ? (point.percentage / maxPercentage) * 100 : 0}%`,
                  minHeight: point.percentage > 0 ? '4px' : '0px',
                }}
                title={`${point.label}: ${point.completed}/${point.total} (${point.percentage.toFixed(1)}%)`}
              />
            </div>
          ))}
        </div>

        {/* X-axis labels */}
        <div className="flex space-x-1">
          {trendData.map((point, index) => (
            <div key={index} className="flex-1 text-center">
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {point.label}
              </span>
            </div>
          ))}
        </div>

        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 h-48 flex flex-col justify-between text-xs text-gray-500 dark:text-gray-400 -ml-8">
          <span>100%</span>
          <span>75%</span>
          <span>50%</span>
          <span>25%</span>
          <span>0%</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(trendData.reduce((sum, d) => sum + d.percentage, 0) / trendData.length)}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Average
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {Math.round(Math.max(...trendData.map(d => d.percentage)))}%
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Best Day
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {trendData.filter(d => d.percentage === 100).length}
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Perfect Days
          </div>
        </div>
      </div>
    </div>
  );
};