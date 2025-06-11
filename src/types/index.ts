export interface Habit {
  id: string;
  name: string;
  emoji: string;
  frequency: 'daily' | 'weekly' | 'custom';
  customDays?: number[]; // 0-6 for Sunday-Saturday
  startDate: string;
  category: string;
  streak: number;
  completions: { [date: string]: boolean };
  createdAt: string;
  reminderTime?: string; // HH:MM format
  reminderEnabled?: boolean;
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'achievement';
  title: string;
  message: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  createdAt: number;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  removeNotification: (id: string) => void;
  clearAllNotifications: () => void;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  emoji: string;
  condition: (habits: Habit[]) => boolean;
  unlockedAt?: string;
}