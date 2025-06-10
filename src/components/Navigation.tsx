import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, CheckSquare, Home, Settings, TrendingUp, Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/dashboard', icon: Home, label: 'Dashboard' },
    { to: '/habits', icon: CheckSquare, label: 'Habits' },
    { to: '/progress', icon: BarChart3, label: 'Progress' },
    { to: '/settings', icon: Settings, label: 'Settings' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 sticky top-0 z-40 backdrop-blur-sm bg-white/95 dark:bg-gray-800/95">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" />
              <span className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Elevate</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex space-x-1">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={toggleMobileMenu}>
          <div 
            className="fixed right-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Elevate</span>
                </div>
                <button
                  onClick={toggleMobileMenu}
                  className="p-1 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-4 space-y-2">
              {navItems.map(({ to, icon: Icon, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={toggleMobileMenu}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200 w-full ${
                      isActive
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};