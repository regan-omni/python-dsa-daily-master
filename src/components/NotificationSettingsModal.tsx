import React, { useState } from 'react';
import { Bell, Clock, Sparkles, X, Check, Volume2 } from 'lucide-react';

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  enabled: boolean;
  time: string;
  onSave: (enabled: boolean, time: string) => void;
}

export const NotificationSettingsModal: React.FC<NotificationSettingsModalProps> = ({
  isOpen,
  onClose,
  enabled,
  time,
  onSave,
}) => {
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [notificationTime, setNotificationTime] = useState(time || '09:00');
  const [testSent, setTestSent] = useState(false);

  if (!isOpen) return null;

  const handleToggle = async () => {
    if (!isEnabled && 'Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setIsEnabled(true);
      } else {
        alert('Browser notification permission was denied.');
      }
    } else {
      setIsEnabled(!isEnabled);
    }
  };

  const handleTestNotification = () => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('PyAlgo Daily Reminder', {
        body: '🔥 Time for your daily Python DSA concept & practice problem! Keep your streak alive.',
        icon: '/manifest.json',
      });
      setTestSent(true);
      setTimeout(() => setTestSent(false), 3000);
    } else {
      alert('Please enable Web Notifications in browser settings first.');
    }
  };

  const handleSave = () => {
    onSave(isEnabled, notificationTime);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 max-w-md w-full space-y-6 shadow-xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
            <Bell className="w-4 h-4" />
            <span>Daily Study Notifications</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Reminders for Consistency
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
            Set your daily notification schedule to build a habitual 15-minute Python DSA routine.
          </p>
        </div>

        <div className="space-y-4">
          {/* Notification Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
            <div>
              <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                Daily Study Reminders
              </div>
              <div className="text-xs text-neutral-500 dark:text-neutral-400">
                Sends a local browser notification daily
              </div>
            </div>

            <button
              onClick={handleToggle}
              className={`w-12 h-6 rounded-full transition-colors p-1 flex items-center ${
                isEnabled ? 'bg-indigo-600 dark:bg-indigo-500 justify-end' : 'bg-neutral-300 dark:bg-neutral-700 justify-start'
              }`}
            >
              <div className="w-4 h-4 rounded-full bg-white shadow-md" />
            </button>
          </div>

          {/* Time Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-neutral-800 dark:text-neutral-200 flex items-center space-x-1.5">
              <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>Preferred Notification Time:</span>
            </label>
            <input
              type="time"
              value={notificationTime}
              onChange={(e) => setNotificationTime(e.target.value)}
              className="w-full p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 font-mono text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          {/* Test Notification Button */}
          <button
            onClick={handleTestNotification}
            className="w-full py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 text-xs font-bold transition-all flex items-center justify-center space-x-2"
          >
            <Volume2 className="w-4 h-4" />
            <span>{testSent ? 'Test Notification Triggered!' : 'Send Test Notification'}</span>
          </button>
        </div>

        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-100 dark:shadow-none"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
