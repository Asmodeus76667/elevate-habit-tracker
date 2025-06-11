import React from 'react';
import { Trophy, Lock, Star, Calendar } from 'lucide-react';
import { Achievement } from '../../types';

interface AchievementCardProps {
  achievement: Achievement;
  isUnlocked: boolean;
  progress?: number;
  unlockedAt?: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  isUnlocked,
  progress = 0,
  unlockedAt,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getRarityColor = (id: string) => {
    if (id.includes('century') || id.includes('master')) {
      return 'from-purple-500 to-pink-500'; // Legendary
    }
    if (id.includes('month') || id.includes('king')) {
      return 'from-yellow-400 to-orange-500'; // Epic
    }
    if (id.includes('week') || id.includes('perfect')) {
      return 'from-blue-400 to-indigo-500'; // Rare
    }
    return 'from-emerald-400 to-teal-500'; // Common
  };

  const getRarityLabel = (id: string) => {
    if (id.includes('century') || id.includes('master')) return 'Legendary';
    if (id.includes('month') || id.includes('king')) return 'Epic';
    if (id.includes('week') || id.includes('perfect')) return 'Rare';
    return 'Common';
  };

  return (
    <div
      className={`
        relative overflow-hidden rounded-xl border transition-all duration-300 hover:scale-105
        ${isUnlocked
          ? `bg-gradient-to-br ${getRarityColor(achievement.id)} p-[1px]`
          : 'border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50'
        }
      `}
    >
      <div className={`
        rounded-xl p-6 h-full
        ${isUnlocked
          ? 'bg-white dark:bg-gray-800'
          : 'bg-gray-50 dark:bg-gray-700/50'
        }
      `}>
        {/* Rarity Badge */}
        {isUnlocked && (
          <div className="absolute top-2 right-2">
            <span className={`
              px-2 py-1 text-xs font-medium rounded-full text-white
              bg-gradient-to-r ${getRarityColor(achievement.id)}
            `}>
              {getRarityLabel(achievement.id)}
            </span>
          </div>
        )}

        {/* Lock Icon for Locked Achievements */}
        {!isUnlocked && (
          <div className="absolute top-2 right-2">
            <Lock className="w-4 h-4 text-gray-400" />
          </div>
        )}

        <div className="flex items-start space-x-4">
          <div className={`
            text-4xl transition-all duration-300
            ${isUnlocked ? 'scale-110' : 'grayscale opacity-50'}
          `}>
            {achievement.emoji}
          </div>
          
          <div className="flex-1">
            <h3 className={`
              font-semibold text-lg mb-2
              ${isUnlocked 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-500 dark:text-gray-400'
              }
            `}>
              {achievement.title}
            </h3>
            
            <p className={`
              text-sm mb-3
              ${isUnlocked 
                ? 'text-gray-600 dark:text-gray-300' 
                : 'text-gray-400 dark:text-gray-500'
              }
            `}>
              {achievement.description}
            </p>

            {/* Progress Bar for Partially Completed Achievements */}
            {!isUnlocked && progress > 0 && (
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Progress</span>
                  <span>{Math.round(progress * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>
            )}

            {/* Unlocked Date */}
            {isUnlocked && unlockedAt && (
              <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
                <Calendar className="w-3 h-3" />
                <span>Unlocked on {formatDate(unlockedAt)}</span>
              </div>
            )}

            {/* Achievement Status */}
            <div className="flex items-center space-x-2 mt-3">
              {isUnlocked ? (
                <>
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                    Achieved
                  </span>
                </>
              ) : (
                <>
                  <Star className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Locked
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Shine Effect for Unlocked Achievements */}
        {isUnlocked && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse" />
        )}
      </div>
    </div>
  );
};