import React from 'react';
import { Trophy, Star, Award, Target } from 'lucide-react';
import { useHabits } from '../hooks/useHabits';
import { useAchievements } from '../hooks/useAchievements';
import { AchievementCard } from '../components/gamification/AchievementCard';

export const Achievements: React.FC = () => {
  const { habits } = useHabits();
  const { achievements, unlockedAchievements, getProgress } = useAchievements(habits);
  
  const progress = getProgress();

  const getAchievementProgress = (achievement: any) => {
    // Calculate progress for locked achievements
    if (unlockedAchievements.some(unlocked => unlocked.id === achievement.id)) {
      return 1; // Fully completed
    }

    // Mock progress calculation based on achievement type
    switch (achievement.id) {
      case 'first-habit':
        return Math.min(habits.length / 1, 1);
      case 'habit-collector':
        return Math.min(habits.length / 5, 1);
      case 'habit-master':
        return Math.min(habits.length / 10, 1);
      case 'first-streak':
        const maxStreak = Math.max(...habits.map(h => h.streak), 0);
        return Math.min(maxStreak / 3, 1);
      case 'week-warrior':
        return Math.min(Math.max(...habits.map(h => h.streak), 0) / 7, 1);
      case 'month-master':
        return Math.min(Math.max(...habits.map(h => h.streak), 0) / 30, 1);
      case 'century-club':
        return Math.min(Math.max(...habits.map(h => h.streak), 0) / 100, 1);
      default:
        return 0;
    }
  };

  const categorizeAchievements = () => {
    const categories = {
      'Getting Started': achievements.filter(a => 
        ['first-habit', 'habit-collector', 'habit-master'].includes(a.id)
      ),
      'Streak Master': achievements.filter(a => 
        ['first-streak', 'week-warrior', 'month-master', 'century-club'].includes(a.id)
      ),
      'Consistency': achievements.filter(a => 
        ['perfect-day', 'consistency-king'].includes(a.id)
      ),
    };
    return categories;
  };

  const categories = categorizeAchievements();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Achievements
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Track your progress and unlock rewards for building great habits
        </p>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl p-6 mb-8 border border-yellow-200 dark:border-yellow-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Achievement Progress
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {progress.unlocked} of {progress.total} achievements unlocked
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900 dark:text-white">
              {progress.percentage}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Complete
            </div>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Achievement Categories */}
      <div className="space-y-8">
        {Object.entries(categories).map(([categoryName, categoryAchievements]) => (
          <div key={categoryName}>
            <div className="flex items-center space-x-2 mb-6">
              <Award className="w-5 h-5 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {categoryName}
              </h2>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {categoryAchievements.filter(a => 
                  unlockedAchievements.some(unlocked => unlocked.id === a.id)
                ).length} / {categoryAchievements.length}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryAchievements.map((achievement) => {
                const isUnlocked = unlockedAchievements.some(unlocked => unlocked.id === achievement.id);
                const unlockedAchievement = unlockedAchievements.find(unlocked => unlocked.id === achievement.id);
                const progress = getAchievementProgress(achievement);
                
                return (
                  <AchievementCard
                    key={achievement.id}
                    achievement={achievement}
                    isUnlocked={isUnlocked}
                    progress={progress}
                    unlockedAt={unlockedAchievement?.unlockedAt}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {habits.length === 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-12 text-center shadow-sm border border-gray-100 dark:border-gray-700 mt-8">
          <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            Start Your Achievement Journey
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Create your first habit to begin unlocking achievements and tracking your progress.
          </p>
        </div>
      )}
    </div>
  );
};