import React, { useState, useEffect } from 'react';
import { dsaCurriculum } from './data/dsaCurriculum';
import { UserProgress } from './types';
import { Navbar } from './components/Navbar';
import { DailyConceptView } from './components/DailyConceptView';
import { CodePlayground } from './components/CodePlayground';
import { ProgressDashboard } from './components/ProgressDashboard';
import { PythonTricksView } from './components/PythonTricksView';
import { PwaInstallModal } from './components/PwaInstallModal';
import { ActiveRecallModal } from './components/ActiveRecallModal';
import { NotificationSettingsModal } from './components/NotificationSettingsModal';

const DEFAULT_PROGRESS: UserProgress = {
  streak: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedDays: [],
  completedProblemIds: [],
  spacedRepetitionQueue: [],
  userNotes: {},
  targetTimeline: '6_months',
  notificationTime: '09:00',
  notificationsEnabled: false,
  codeSnippets: {},
};

export default function App() {
  const [progress, setProgress] = useState<UserProgress>(() => {
    try {
      const saved = localStorage.getItem('pyalgo_progress_v1');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved progress', e);
    }
    return DEFAULT_PROGRESS;
  });

  const [activeTab, setActiveTab] = useState<'concept' | 'editor' | 'progress' | 'tricks'>('concept');
  const [selectedDay, setSelectedDay] = useState<number>(1);

  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const savedTheme = localStorage.getItem('pyalgo_theme');
      if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
      }
    } catch (e) {
      console.error('Failed to read theme preference', e);
    }
    return 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem('pyalgo_theme', theme);
    } catch (e) {
      console.error('Failed to save theme preference', e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Modals
  const [showPwaGuide, setShowPwaGuide] = useState(false);
  const [showActiveRecall, setShowActiveRecall] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Save progress to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pyalgo_progress_v1', JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress', e);
    }
  }, [progress]);

  // Daily streak check
  useEffect(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    if (progress.lastActiveDate !== todayStr) {
      const lastDate = new Date(progress.lastActiveDate);
      const todayDate = new Date(todayStr);
      const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        // Consecutive day
        setProgress((prev) => ({
          ...prev,
          lastActiveDate: todayStr,
        }));
      } else if (diffDays > 1) {
        // Streak reset if missed more than 1 day
        setProgress((prev) => ({
          ...prev,
          streak: 1,
          lastActiveDate: todayStr,
        }));
      }
    }
  }, []);

  const currentLesson = dsaCurriculum.find((l) => l.dayNumber === selectedDay) || dsaCurriculum[0];
  const isCurrentDayCompleted = progress.completedDays.includes(selectedDay);

  const handleCompleteDay = (dayNum: number, problemId: string) => {
    const todayStr = new Date().toISOString().split('T')[0];

    // Compute spaced repetition dates (+3 days, +7 days, +30 days)
    const addDays = (d: number) => {
      const dt = new Date();
      dt.setDate(dt.getDate() + d);
      return dt.toISOString().split('T')[0];
    };

    setProgress((prev) => {
      const isAlreadyCompleted = prev.completedDays.includes(dayNum);
      const newCompletedDays = isAlreadyCompleted ? prev.completedDays : [...prev.completedDays, dayNum];
      const newProblemIds = prev.completedProblemIds.includes(problemId)
        ? prev.completedProblemIds
        : [...prev.completedProblemIds, problemId];

      const newStreak = isAlreadyCompleted ? prev.streak : prev.streak + 1;

      // Add to Spaced Repetition Queue if not exists
      const hasSpacedItem = prev.spacedRepetitionQueue.some((i) => i.problemId === problemId);
      const newSpacedQueue = hasSpacedItem
        ? prev.spacedRepetitionQueue
        : [
            ...prev.spacedRepetitionQueue,
            {
              problemId,
              problemTitle: currentLesson.problem.title,
              dayNumber: dayNum,
              lastCompletedDate: todayStr,
              nextReviewDate: addDays(3),
              reviewCount: 1,
            },
          ];

      return {
        ...prev,
        streak: newStreak,
        lastActiveDate: todayStr,
        completedDays: newCompletedDays,
        completedProblemIds: newProblemIds,
        spacedRepetitionQueue: newSpacedQueue,
      };
    });
  };

  const handleSaveCodeSnippet = (code: string) => {
    setProgress((prev) => ({
      ...prev,
      codeSnippets: {
        ...prev.codeSnippets,
        [currentLesson.problem.id]: code,
      },
    }));
  };

  const handleTryTrickInEditor = (codeSnippet: string) => {
    setProgress((prev) => ({
      ...prev,
      codeSnippets: {
        ...prev.codeSnippets,
        [currentLesson.problem.id]: codeSnippet,
      },
    }));
    setActiveTab('editor');
  };

  const handleReviewSpacedItem = (problemId: string) => {
    const target = dsaCurriculum.find((l) => l.problem.id === problemId);
    if (target) {
      setSelectedDay(target.dayNumber);
      setActiveTab('editor');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        streak={progress.streak}
        completedCount={progress.completedDays.length}
        totalCount={dsaCurriculum.length}
        onOpenPwaGuide={() => setShowPwaGuide(true)}
        onOpenNotifications={() => setShowNotifications(true)}
        notificationsEnabled={progress.notificationsEnabled}
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {activeTab === 'concept' && (
          <DailyConceptView
            lesson={currentLesson}
            totalLessons={dsaCurriculum.length}
            onSelectDay={setSelectedDay}
            onStartPractice={() => setActiveTab('editor')}
            onStartActiveRecall={() => setShowActiveRecall(true)}
            isCompleted={isCurrentDayCompleted}
          />
        )}

        {activeTab === 'editor' && (
          <CodePlayground
            problem={currentLesson.problem}
            dayNumber={selectedDay}
            onCompleteDay={handleCompleteDay}
            isCompleted={isCurrentDayCompleted}
            savedCode={progress.codeSnippets[currentLesson.problem.id]}
            onSaveCode={handleSaveCodeSnippet}
          />
        )}

        {activeTab === 'progress' && (
          <ProgressDashboard
            progress={progress}
            lessons={dsaCurriculum}
            onSelectDay={(day) => {
              setSelectedDay(day);
              setActiveTab('concept');
            }}
            onUpdateTargetTimeline={(tl) => setProgress((prev) => ({ ...prev, targetTimeline: tl }))}
            onImportData={(data) => setProgress(data)}
            onReviewSpacedItem={handleReviewSpacedItem}
          />
        )}

        {activeTab === 'tricks' && (
          <PythonTricksView onTryInEditor={handleTryTrickInEditor} />
        )}
      </main>

      {/* Modals */}
      <PwaInstallModal isOpen={showPwaGuide} onClose={() => setShowPwaGuide(false)} />

      <ActiveRecallModal
        lesson={currentLesson}
        isOpen={showActiveRecall}
        onClose={() => setShowActiveRecall(false)}
      />

      <NotificationSettingsModal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        enabled={progress.notificationsEnabled}
        time={progress.notificationTime}
        onSave={(enabled, time) =>
          setProgress((prev) => ({
            ...prev,
            notificationsEnabled: enabled,
            notificationTime: time,
          }))
        }
      />
    </div>
  );
}
