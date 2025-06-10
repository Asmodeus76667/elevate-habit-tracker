import React from 'react';
import { Check, Flame } from 'lucide-react';
import { Habit } from '../types';

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
  isCompleted: boolean;
}

export const HabitCard: React.FC<HabitCardProps> = ({
  habit,
  onToggle,
  isCompleted,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-2xl">{habit.emoji}</div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100">
              {habit.name}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <Flame className="w-4 h-4 text-orange-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {habit.streak} day streak
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={onToggle}
          className={`
            w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-200 
            ${isCompleted
              ? 'bg-emerald-500 border-emerald-500 text-white scale-110'
              : 'border-gray-300 dark:border-gray-600 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
            }
          `}
        >
          {isCompleted && <Check className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
};