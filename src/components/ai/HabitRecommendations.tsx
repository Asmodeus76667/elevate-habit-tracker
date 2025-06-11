import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Clock, Target, Lightbulb } from 'lucide-react';
import { Button } from '../ui/Button';
import { Habit } from '../../types';

interface HabitRecommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  emoji: string;
  confidence: number;
  reasoning: string;
  suggestedTime?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface HabitRecommendationsProps {
  habits: Habit[];
  onAddRecommendation: (recommendation: HabitRecommendation) => void;
}

export const HabitRecommendations: React.FC<HabitRecommendationsProps> = ({
  habits,
  onAddRecommendation,
}) => {
  const [recommendations, setRecommendations] = useState<HabitRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    generateRecommendations();
  }, [habits]);

  const generateRecommendations = () => {
    setIsLoading(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const newRecommendations = getSmartRecommendations(habits);
      setRecommendations(newRecommendations);
      setIsLoading(false);
    }, 1500);
  };

  const getSmartRecommendations = (userHabits: Habit[]): HabitRecommendation[] => {
    const existingCategories = new Set(userHabits.map(h => h.category));
    const existingHabits = new Set(userHabits.map(h => h.name.toLowerCase()));
    
    const allRecommendations: HabitRecommendation[] = [
      // Health & Fitness
      {
        id: 'drink-water',
        title: 'Drink 8 glasses of water',
        description: 'Stay hydrated throughout the day for better energy and focus',
        category: 'Health & Fitness',
        emoji: '💧',
        confidence: 0.95,
        reasoning: 'Hydration is fundamental to all other health habits',
        suggestedTime: '08:00',
        difficulty: 'easy',
      },
      {
        id: 'morning-walk',
        title: '15-minute morning walk',
        description: 'Start your day with light exercise and fresh air',
        category: 'Health & Fitness',
        emoji: '🚶',
        confidence: 0.88,
        reasoning: 'Morning exercise boosts energy and mood for the entire day',
        suggestedTime: '07:00',
        difficulty: 'easy',
      },
      {
        id: 'meditation',
        title: '10-minute meditation',
        description: 'Practice mindfulness to reduce stress and improve focus',
        category: 'Mindfulness',
        emoji: '🧘',
        confidence: 0.92,
        reasoning: 'Meditation complements physical health habits perfectly',
        suggestedTime: '06:30',
        difficulty: 'medium',
      },
      // Learning
      {
        id: 'read-book',
        title: 'Read for 20 minutes',
        description: 'Expand your knowledge and vocabulary daily',
        category: 'Learning',
        emoji: '📚',
        confidence: 0.85,
        reasoning: 'Reading enhances cognitive function and reduces stress',
        suggestedTime: '21:00',
        difficulty: 'easy',
      },
      {
        id: 'learn-language',
        title: 'Practice a new language',
        description: 'Spend 15 minutes learning a foreign language',
        category: 'Learning',
        emoji: '🗣️',
        confidence: 0.78,
        reasoning: 'Language learning improves cognitive flexibility',
        suggestedTime: '19:00',
        difficulty: 'medium',
      },
      // Productivity
      {
        id: 'plan-day',
        title: 'Plan tomorrow today',
        description: 'Spend 10 minutes planning the next day',
        category: 'Productivity',
        emoji: '📋',
        confidence: 0.90,
        reasoning: 'Planning ahead reduces decision fatigue and increases productivity',
        suggestedTime: '22:00',
        difficulty: 'easy',
      },
      {
        id: 'deep-work',
        title: '2-hour deep work session',
        description: 'Focus on your most important task without distractions',
        category: 'Productivity',
        emoji: '🎯',
        confidence: 0.82,
        reasoning: 'Deep work sessions maximize productivity and skill development',
        suggestedTime: '09:00',
        difficulty: 'hard',
      },
      // Creative
      {
        id: 'journal',
        title: 'Journal',
        description: 'Reflect on your day and thoughts for 10 minutes',
        category: 'Creative',
        emoji: '✍️',
        confidence: 0.87,
        reasoning: 'Journaling improves self-awareness and emotional processing',
        suggestedTime: '22:30',
        difficulty: 'easy',
      },
      {
        id: 'creative-practice',
        title: 'Creative practice',
        description: 'Spend 30 minutes on a creative hobby',
        category: 'Creative',
        emoji: '🎨',
        confidence: 0.75,
        reasoning: 'Creative activities reduce stress and improve problem-solving',
        suggestedTime: '18:00',
        difficulty: 'medium',
      },
    ];

    // Filter out existing habits and prioritize based on user's current habits
    const filtered = allRecommendations.filter(rec => 
      !existingHabits.has(rec.title.toLowerCase())
    );

    // Boost confidence for categories user doesn't have yet
    const boosted = filtered.map(rec => ({
      ...rec,
      confidence: existingCategories.has(rec.category) 
        ? rec.confidence 
        : rec.confidence + 0.1
    }));

    // Sort by confidence and return top 3
    return boosted
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 3);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-emerald-600 bg-emerald-100 dark:bg-emerald-900/30';
      case 'medium': return 'text-amber-600 bg-amber-100 dark:bg-amber-900/30';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-4">
          <Brain className="w-5 h-5 text-purple-600 animate-pulse" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Recommendations
          </h3>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            AI Recommendations
          </h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={generateRecommendations}
          className="text-purple-600 hover:text-purple-700"
        >
          <Lightbulb className="w-4 h-4 mr-1" />
          Refresh
        </Button>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-purple-300 dark:hover:border-purple-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{rec.emoji}</span>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {rec.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {rec.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs rounded-full ${getDifficultyColor(rec.difficulty)}`}>
                  {rec.difficulty}
                </span>
                <div className="text-right">
                  <div className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {Math.round(rec.confidence * 100)}% match
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
              <span className="flex items-center">
                <Target className="w-3 h-3 mr-1" />
                {rec.category}
              </span>
              {rec.suggestedTime && (
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {rec.suggestedTime}
                </span>
              )}
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-3 mb-3">
              <p className="text-sm text-purple-800 dark:text-purple-200">
                <strong>Why this habit?</strong> {rec.reasoning}
              </p>
            </div>

            <Button
              size="sm"
              onClick={() => onAddRecommendation(rec)}
              className="w-full"
            >
              Add This Habit
            </Button>
          </div>
        ))}
      </div>

      {recommendations.length === 0 && (
        <div className="text-center py-8">
          <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400">
            You're doing great! Keep up with your current habits.
          </p>
        </div>
      )}
    </div>
  );
};