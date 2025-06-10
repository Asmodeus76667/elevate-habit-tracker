import React from 'react';
import { Palette, Database, Download, Upload } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ThemeToggle } from '../components/ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

export const Settings: React.FC = () => {
  const { theme } = useTheme();

  const handleExportData = () => {
    const habits = localStorage.getItem('elevate-habits');
    if (habits) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(habits);
      const downloadAnchorNode = document.createElement('a');
      downloadAnchorNode.setAttribute("href", dataStr);
      downloadAnchorNode.setAttribute("download", "elevate-habits-backup.json");
      document.body.appendChild(downloadAnchorNode);
      downloadAnchorNode.click();
      downloadAnchorNode.remove();
    } else {
      alert('No habit data found to export.');
    }
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        localStorage.setItem('elevate-habits', JSON.stringify(data));
        alert('Data imported successfully! Please refresh the page to see your imported habits.');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all your habit data? This action cannot be undone.')) {
      localStorage.removeItem('elevate-habits');
      alert('All habit data has been cleared. Please refresh the page.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Customize your Elevate experience
        </p>
      </div>

      <div className="space-y-8">
        {/* Appearance Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-6">
            <Palette className="w-5 h-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Appearance
            </h2>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-900 dark:text-white">
                Theme
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Choose between light and dark mode
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {theme}
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Data Management Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-2 mb-6">
            <Database className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Data Management
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Export Data
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Download a backup of your habits and progress
                </p>
              </div>
              <Button variant="outline" onClick={handleExportData} icon={Download}>
                Export
              </Button>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Import Data
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Restore your habits from a backup file
                </p>
              </div>
              <div>
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                  id="import-file"
                />
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('import-file')?.click()}
                  icon={Upload}
                >
                  Import
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Clear All Data
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Permanently delete all your habit data
                </p>
              </div>
              <Button
                variant="outline"
                onClick={handleClearData}
                className="text-red-600 border-red-300 hover:bg-red-50 hover:border-red-400 dark:text-red-400 dark:border-red-600 dark:hover:bg-red-900/20"
              >
                Clear Data
              </Button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <TrendingUp className="w-8 h-8 text-indigo-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">Elevate</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Version 1.0.0
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              Built with ❤️ for habit enthusiasts everywhere
            </p>
            <div className="pt-4">
              <p className="text-xs text-gray-400 dark:text-gray-600">
                All your data is stored locally in your browser. No account required.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};