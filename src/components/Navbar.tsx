import React from 'react';
import {
  Flame,
  BookOpen,
  Code2,
  Trophy,
  Lightbulb,
  Smartphone,
  Bell,
  Sun,
  Moon,
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'concept' | 'editor' | 'progress' | 'tricks';
  setActiveTab: (tab: 'concept' | 'editor' | 'progress' | 'tricks') => void;
  streak: number;
  completedCount: number;
  totalCount: number;
  onOpenPwaGuide: () => void;
  onOpenNotifications: () => void;
  notificationsEnabled: boolean;
  selectedDay: number;
  setSelectedDay: (day: number) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  streak,
  completedCount,
  totalCount,
  onOpenPwaGuide,
  onOpenNotifications,
  notificationsEnabled,
  selectedDay,
  setSelectedDay,
  theme,
  onToggleTheme,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-xl shadow-sm">
              A
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-lg text-neutral-900 dark:text-neutral-100 tracking-tight">
                  ALGO-DAILY
                </span>
                <span className="hidden sm:inline-block px-2.5 py-0.5 text-[10px] font-bold rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800 uppercase tracking-wider">
                  Python 3.12
                </span>
              </div>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-medium uppercase tracking-wider hidden sm:block">
                Daily DSA & Competitive Programming Coach
              </p>
            </div>
          </div>

          {/* Nav Tabs - Desktop */}
          <nav className="hidden md:flex items-center space-x-1 bg-neutral-100 dark:bg-neutral-950 p-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800">
            <button
              onClick={() => setActiveTab('concept')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'concept'
                  ? 'bg-white dark:bg-neutral-800 text-indigo-700 dark:text-indigo-400 shadow-sm border border-neutral-200/80 dark:border-neutral-700'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Daily Concept</span>
            </button>

            <button
              onClick={() => setActiveTab('editor')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'editor'
                  ? 'bg-white dark:bg-neutral-800 text-indigo-700 dark:text-indigo-400 shadow-sm border border-neutral-200/80 dark:border-neutral-700'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Python Editor</span>
            </button>

            <button
              onClick={() => setActiveTab('progress')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'progress'
                  ? 'bg-white dark:bg-neutral-800 text-indigo-700 dark:text-indigo-400 shadow-sm border border-neutral-200/80 dark:border-neutral-700'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Roadmap & Matrix</span>
            </button>

            <button
              onClick={() => setActiveTab('tricks')}
              className={`flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'tricks'
                  ? 'bg-white dark:bg-neutral-800 text-indigo-700 dark:text-indigo-400 shadow-sm border border-neutral-200/80 dark:border-neutral-700'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <Lightbulb className="w-4 h-4" />
              <span>Python Tricks</span>
            </button>
          </nav>

          {/* Status Badges & Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Day Selector Pill */}
            <div className="flex items-center space-x-1.5 bg-neutral-100 dark:bg-neutral-950 px-2.5 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-300">
              <span className="text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider text-[10px]">Day:</span>
              <select
                value={selectedDay}
                onChange={(e) => setSelectedDay(Number(e.target.value))}
                className="bg-transparent text-indigo-700 dark:text-indigo-400 font-bold focus:outline-none cursor-pointer"
              >
                {Array.from({ length: totalCount }, (_, i) => i + 1).map((d) => (
                  <option key={d} value={d} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                    Day {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Streak Counter */}
            <div
              title={`${streak} Day Learning Streak`}
              className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200/80 dark:border-orange-800/60 text-orange-600 dark:text-orange-400 font-bold text-xs sm:text-sm"
            >
              <Flame className="w-4 h-4 text-orange-500 fill-orange-500" />
              <span>{streak} Days 🔥</span>
            </div>

            {/* Dark Mode / Light Mode Toggle */}
            <button
              onClick={onToggleTheme}
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
              className="p-2 rounded-xl border transition-all bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-amber-300 hover:text-neutral-900 dark:hover:text-amber-200"
            >
              {theme === 'light' ? <Moon className="w-4 h-4 text-neutral-700" /> : <Sun className="w-4 h-4 text-amber-400" />}
            </button>

            {/* Notifications Toggle */}
            <button
              onClick={onOpenNotifications}
              title="Daily Study Reminders"
              className={`p-2 rounded-xl border transition-all ${
                notificationsEnabled
                  ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400'
                  : 'bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
              }`}
            >
              <Bell className="w-4 h-4" />
            </button>

            {/* PWA Mobile App Guide Button */}
            <button
              onClick={onOpenPwaGuide}
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-xs font-bold transition-all shadow-sm"
            >
              <Smartphone className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden sm:inline">iOS & Android</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-lg border-t border-neutral-200 dark:border-neutral-800 px-2 py-2">
        <div className="grid grid-cols-4 gap-1 text-center">
          <button
            onClick={() => setActiveTab('concept')}
            className={`flex flex-col items-center py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'concept'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span>Concept</span>
          </button>

          <button
            onClick={() => setActiveTab('editor')}
            className={`flex flex-col items-center py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'editor'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            <Code2 className="w-5 h-5 mb-0.5" />
            <span>Practice</span>
          </button>

          <button
            onClick={() => setActiveTab('progress')}
            className={`flex flex-col items-center py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'progress'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            <Trophy className="w-5 h-5 mb-0.5" />
            <span>Roadmap</span>
          </button>

          <button
            onClick={() => setActiveTab('tricks')}
            className={`flex flex-col items-center py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'tricks'
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/80'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            <Lightbulb className="w-5 h-5 mb-0.5" />
            <span>Tricks</span>
          </button>
        </div>
      </div>
    </header>
  );
};

