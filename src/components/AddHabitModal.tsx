import React, { useState } from 'react';
import { Modal } from './ui/Modal';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Habit } from '../types';

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (habit: Omit<Habit, 'id' | 'streak' | 'completions' | 'createdAt'>) => void;
}

const EMOJI_OPTIONS = [
  '💪', '📚', '🏃', '💧', '🧘', '🎯', '✍️', '🎨', '🎵', '🌱',
  '🏋️', '🥗', '💻', '🛏️', '☀️', '🚶', '📱', '🧹', '💼', '❤️'
];

const CATEGORIES = [
  'Health & Fitness',
  'Learning',
  'Productivity',
  'Mindfulness',
  'Creative',
  'Social',
  'Personal Care',
  'Other'
];

export const AddHabitModal: React.FC<AddHabitModalProps> = ({
  isOpen,
  onClose,
  onAdd,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    emoji: '🎯',
    frequency: 'daily' as 'daily' | 'weekly' | 'custom',
    customDays: [] as number[],
    category: 'Health & Fitness',
    startDate: new Date().toISOString().split('T')[0],
    reminderEnabled: false,
    reminderTime: '09:00',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    onAdd({
      name: formData.name.trim(),
      emoji: formData.emoji,
      frequency: formData.frequency,
      customDays: formData.frequency === 'custom' ? formData.customDays : undefined,
      category: formData.category,
      startDate: formData.startDate,
      reminderEnabled: formData.reminderEnabled,
      reminderTime: formData.reminderEnabled ? formData.reminderTime : undefined,
    });

    // Reset form
    setFormData({
      name: '',
      emoji: '🎯',
      frequency: 'daily',
      customDays: [],
      category: 'Health & Fitness',
      startDate: new Date().toISOString().split('T')[0],
      reminderEnabled: false,
      reminderTime: '09:00',
    });
    
    onClose();
  };

  const toggleCustomDay = (day: number) => {
    setFormData(prev => ({
      ...prev,
      customDays: prev.customDays.includes(day)
        ? prev.customDays.filter(d => d !== day)
        : [...prev.customDays, day].sort()
    }));
  };

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Habit">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Habit Name"
          value={formData.name}
          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          placeholder="e.g., Drink 8 glasses of water"
          required
        />

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Choose Emoji
          </label>
          <div className="grid grid-cols-10 gap-2">
            {EMOJI_OPTIONS.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, emoji }))}
                className={`
                  p-2 text-lg rounded-lg transition-all duration-200
                  ${formData.emoji === emoji
                    ? 'bg-indigo-100 dark:bg-indigo-900 ring-2 ring-indigo-500'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }
                `}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Frequency
          </label>
          <div className="space-y-2">
            {[
              { value: 'daily', label: 'Daily' },
              { value: 'weekly', label: 'Weekly (Sundays)' },
              { value: 'custom', label: 'Custom Days' },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="frequency"
                  value={option.value}
                  checked={formData.frequency === option.value}
                  onChange={(e) => setFormData(prev => ({ 
                    ...prev, 
                    frequency: e.target.value as typeof prev.frequency 
                  }))}
                  className="mr-2 text-indigo-600"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {option.label}
                </span>
              </label>
            ))}
          </div>
        </div>

        {formData.frequency === 'custom' && (
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Days
            </label>
            <div className="flex flex-wrap gap-2">
              {weekDays.map((day, index) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleCustomDay(index)}
                  className={`
                    px-3 py-1 text-sm rounded-lg transition-all duration-200
                    ${formData.customDays.includes(index)
                      ? 'bg-indigo-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  {day}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          >
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Start Date"
          type="date"
          value={formData.startDate}
          onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
        />

        <div className="space-y-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="reminderEnabled"
              checked={formData.reminderEnabled}
              onChange={(e) => setFormData(prev => ({ ...prev, reminderEnabled: e.target.checked }))}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="reminderEnabled" className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Enable daily reminders
            </label>
          </div>
          
          {formData.reminderEnabled && (
            <Input
              label="Reminder Time"
              type="time"
              value={formData.reminderTime}
              onChange={(e) => setFormData(prev => ({ ...prev, reminderTime: e.target.value }))}
            />
          )}
        </div>

        <div className="flex space-x-3 pt-4">
          <Button type="submit" className="flex-1">
            Add Habit
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
};