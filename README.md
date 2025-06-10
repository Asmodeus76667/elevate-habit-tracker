# 🚀 Elevate - Daily Habit Tracker

<div align="center">
  <img src="demo.jpg" alt="Elevate Habit Tracker - Beautiful React app for tracking daily habits with progress visualization" width="100%" height="200" style="object-fit: cover; border-radius: 10px;">
  
  <p align="center">
    <strong>Track your habits, elevate your life</strong>
  </p>
  
  <p align="center">
    A beautiful, intuitive habit tracker built with React and TypeScript to help you build lasting routines and achieve your goals.
  </p>

  <p align="center">
    <a href="#-features">Features</a> •
    <a href="#-demo">Demo</a> •
    <a href="#-installation">Installation</a> •
    <a href="#-usage">Usage</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-license">License</a>
  </p>
</div>

---

## ✨ Features

### 🎯 **Smart Habit Tracking**
- **Flexible Scheduling**: Daily, weekly, or custom frequency habits
- **Visual Progress**: Beautiful heatmap calendar showing your consistency
- **Streak Tracking**: Motivational streak counters to keep you going
- **Category Organization**: Organize habits by Health, Learning, Productivity, and more

### 📊 **Progress Analytics**
- **Year Overview**: 365-day heatmap visualization of your habit consistency
- **Weekly Statistics**: Track your progress with detailed weekly breakdowns
- **Completion Rates**: See your success percentages at a glance
- **Habit Filtering**: Focus on specific habits or view overall progress

### 🎨 **Beautiful Design**
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Dark/Light Mode**: Seamless theme switching for any preference
- **Responsive Design**: Perfect experience on desktop, tablet, and mobile
- **Micro-interactions**: Delightful hover states and transitions

### 🔧 **User Experience**
- **No Account Required**: Works offline with local storage
- **Data Export/Import**: Backup and restore your habit data
- **Quick Actions**: One-click habit completion and management
- **Emoji Support**: Personalize habits with your favorite emojis

## 🌟 Demo

Experience Elevate live: [**Try Demo**](https://elevatehabits.vercel.app)

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/rugveddanej/elevate-habit-tracker.git
   cd elevate-habit-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to see Elevate in action!

### Build for Production

```bash
npm run build
npm run preview
```

## 📖 Usage

### Getting Started

1. **Create Your First Habit**
   - Click "Add Habit" on the dashboard
   - Choose a name, emoji, and frequency
   - Select a category and start date

2. **Track Daily Progress**
   - Mark habits as complete with a single click
   - Watch your streaks grow day by day
   - View your progress on the beautiful dashboard

3. **Analyze Your Progress**
   - Visit the Progress page for detailed analytics
   - Use the heatmap to identify patterns
   - Filter by specific habits to focus your analysis

4. **Customize Your Experience**
   - Switch between light and dark themes
   - Export your data for backup
   - Organize habits by categories

### Habit Frequencies

- **Daily**: Track every day
- **Weekly**: Track once per week (Sundays)
- **Custom**: Choose specific days of the week

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe development experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Vite** - Lightning-fast build tool and development server

### Icons & UI
- **Lucide React** - Beautiful, customizable icons
- **Custom Components** - Reusable UI components built from scratch

### State Management
- **React Context** - For theme and authentication state
- **Custom Hooks** - Encapsulated logic for habit management
- **Local Storage** - Persistent data storage without backend

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing and optimization

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (Button, Input, Modal)
│   ├── HabitCard.tsx   # Individual habit display
│   ├── Navigation.tsx  # App navigation
│   └── ThemeToggle.tsx # Theme switching
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state
│   └── ThemeContext.tsx # Theme management
├── hooks/              # Custom React hooks
│   └── useHabits.ts    # Habit management logic
├── pages/              # Application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Habits.tsx      # Habit management
│   ├── Progress.tsx    # Analytics and progress
│   └── Settings.tsx    # User preferences
├── types/              # TypeScript type definitions
└── utils/              # Utility functions
```

## 🎨 Design Philosophy

Elevate follows Apple-level design aesthetics with:

- **Minimalism**: Clean interfaces that focus on content
- **Consistency**: Unified design language throughout the app
- **Accessibility**: High contrast ratios and keyboard navigation
- **Performance**: Smooth animations and fast interactions
- **Responsiveness**: Seamless experience across all devices

## 🔒 Privacy & Data

- **Local Storage**: All data stays on your device
- **No Tracking**: No analytics or user tracking
- **Export Control**: Full control over your data with export/import
- **Open Source**: Transparent codebase you can audit

## 🤝 Contributing

This is a personal project and **contributions are not currently accepted**. However, you're welcome to:

- 🐛 Report bugs by opening an issue
- 💡 Suggest features through discussions
- ⭐ Star the repository if you find it useful
- 🍴 Fork the project for your own modifications

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Design Inspiration**: Modern productivity apps and minimalist design principles
- **Icons**: [Lucide](https://lucide.dev/) for beautiful, consistent iconography
- **Community**: React and TypeScript communities for excellent tooling

---

<div align="center">
  <p>Built with ❤️ for habit enthusiasts everywhere</p>
  
  <p>
    <a href="https://github.com/rugveddanej/elevate-habit-tracker/stargazers">⭐ Star this repo</a> •
    <a href="https://github.com/rugveddanej/elevate-habit-tracker/issues">🐛 Report Bug</a> •
    <a href="https://github.com/rugveddanej/elevate-habit-tracker/discussions">💬 Discussions</a>
  </p>
</div>