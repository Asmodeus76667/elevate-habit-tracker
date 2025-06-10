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
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}