import React from 'react';
import { TrendingUp, TrendingDown, Calendar, Clock, Target, Zap } from 'lucide-react';
import { Habit } from '../../types';

interface HabitInsightsProps {
  habits: Habit[];
}

interface Insight {
  type: 'success' | 'warning' | 'info';
  icon: React.ReactNode;
  title: string;
  description: string;
  value?: string;
}

export const HabitInsights: React.FC<HabitInsightsProps> = ({ habits }) => {
  const generateInsights = (): Insight[] => {
    const insights: Insight[] = [];
    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Calculate completion rates for the last 30 days
    const completionRates = habits.map(habit => {
      let completed = 0;
      let total = 0;

      for (let d = new Date(thirtyDaysAgo); d <= today; d.setDate(d.getDate() + 1)) {
        const dateStr = d.toISOString().split('T')[0];
        const dayOfWeek = d.getDay();
        
        const shouldTrack = 
          habit.frequency === 'daily' ||
          (habit.frequency === 'weekly' && dayOfWeek === 0) ||
          (habit.frequency === 'custom' && habit.customDays?.includes(dayOfWeek));

        if (shouldTrack && new Date(habit.startDate) <= d) {
          total++;
          if (habit.completions[dateStr]) {
            completed++;
          }
        }
      }

      return {
        habit,
        rate: total > 0 ? completed / total : 0,
        completed,
        total,
      };
    });

    // Best performing habit
    const bestHabit = completionRates.reduce((best, current) => 
      current.rate > best.rate ? current : best
    );

    if (bestHabit.rate > 0.8) {
      insights.push({
        type: 'success',
        icon: <TrendingUp className="w-5 h-5" />,
        title: 'Consistency Champion',
        description: `${bestHabit.habit.emoji} ${bestHabit.habit.name} is your most consistent habit`,
        value: `${Math.round(bestHabit.rate * 100)}% completion rate`,
      });
    }

    // Struggling habit
    const strugglingHabit = completionRates.find(h => h.rate < 0.3 && h.total > 7);
    if (strugglingHabit) {
      insights.push({
        type: 'warning',
        icon: <TrendingDown className="w-5 h-5" />,
        title: 'Needs Attention',
        description: `${strugglingHabit.habit.emoji} ${strugglingHabit.habit.name} could use some focus`,
        value: `${Math.round(strugglingHabit.rate * 100)}% completion rate`,
      });
    }

    // Streak insights
    const longestStreak = Math.max(...habits.map(h => h.streak));
    if (longestStreak >= 7) {
      const streakHabit = habits.find(h => h.streak === longestStreak);
      insights.push({
        type: 'success',
        icon: <Zap className="w-5 h-5" />,
        title: 'Streak Master',
        description: `${streakHabit?.emoji} ${streakHabit?.name} has an amazing streak`,
        value: `${longestStreak} days`,
      });
    }

    // Weekly pattern analysis
    const weeklyData = Array(7).fill(0).map((_, day) => {
      let completed = 0;
      let total = 0;

      habits.forEach(habit => {
        const shouldTrack = 
          habit.frequency === 'daily' ||
          (habit.frequency === 'weekly' && day === 0) ||
          (habit.frequency === 'custom' && habit.customDays?.includes(day));

        if (shouldTrack) {
          for (let i = 0; i < 4; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(today.getDate() - (today.getDay() - day) - (i * 7));
            const dateStr = checkDate.toISOString().split('T')[0];
            
            if (habit.completions[dateStr]) completed++;
            total++;
          }
        }
      });

      return { day, rate: total > 0 ? completed / total : 0 };
    });

    const bestDay = weeklyData.reduce((best, current) => 
      current.rate > best.rate ? current : best
    );

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    if (bestDay.rate > 0.7) {
      insights.push({
        type: 'info',
        icon: <Calendar className="w-5 h-5" />,
        title: 'Peak Performance Day',
        description: `${dayNames[bestDay.day]} is your most productive day`,
        value: `${Math.round(bestDay.rate * 100)}% completion rate`,
      });
    }

    // Time-based insights (mock data for demonstration)
    const morningHabits = habits.filter(h => h.reminderTime && h.reminderTime < '12:00').length;
    const eveningHabits = habits.filter(h => h.reminderTime && h.reminderTime >= '18:00').length;

    if (morningHabits > eveningHabits) {
      insights.push({
        type: 'info',
        icon: <Clock className="w-5 h-5" />,
        title: 'Morning Person',
        description: 'You prefer building habits in the morning',
        value: `${morningHabits} morning habits`,
      });
    }

    // Goal achievement insight
    const totalHabits = habits.length;
    if (totalHabits >= 5) {
      insights.push({
        type: 'success',
        icon: <Target className="w-5 h-5" />,
        title: 'Habit Builder',
        description: 'You\'re building a comprehensive routine',
        value: `${totalHabits} active habits`,
      });
    }

    return insights.slice(0, 6); // Limit to 6 insights
  };

  const insights = generateInsights();

  const getInsightStyle = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-800 dark:text-emerald-200';
      case 'warning':
        return 'border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200';
      case 'info':
        return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200';
      default:
        return 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 text-gray-800 dark:text-gray-200';
    }
  };

  if (insights.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Habit Insights
        </h3>
        <div className="text-center py-8">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            Keep tracking your habits to unlock personalized insights!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
        Habit Insights
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`
              p-4 rounded-lg border transition-all duration-200 hover:shadow-md
              ${getInsightStyle(insight.type)}
            `}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 mt-1">
                {insight.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-medium mb-1">
                  {insight.title}
                </h4>
                <p className="text-sm opacity-90 mb-2">
                  {insight.description}
                </p>
                {insight.value && (
                  <div className="text-sm font-semibold">
                    {insight.value}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};