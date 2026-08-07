import React, { useState } from 'react';
import { UserProgress, DailyLesson } from '../types';
import {
  Trophy,
  Flame,
  CheckCircle,
  Clock,
  RotateCcw,
  Target,
  Sparkles,
  Download,
  Upload,
  Layers,
  BarChart2,
  Calendar,
  CheckSquare,
  ArrowRight,
} from 'lucide-react';

interface ProgressDashboardProps {
  progress: UserProgress;
  lessons: DailyLesson[];
  onSelectDay: (day: number) => void;
  onUpdateTargetTimeline: (timeline: '3_months' | '6_months' | '1_year') => void;
  onImportData: (data: UserProgress) => void;
  onReviewSpacedItem: (problemId: string) => void;
}

export const ProgressDashboard: React.FC<ProgressDashboardProps> = ({
  progress,
  lessons,
  onSelectDay,
  onUpdateTargetTimeline,
  onImportData,
  onReviewSpacedItem,
}) => {
  const [importText, setImportText] = useState('');
  const [showSyncModal, setShowSyncModal] = useState(false);

  const completedCount = progress.completedDays.length;
  const totalCount = lessons.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100) || 0;

  // Phase breakdown count
  const phase1Lessons = lessons.filter((l) => l.phaseId === 'phase1');
  const phase2Lessons = lessons.filter((l) => l.phaseId === 'phase2');
  const phase3Lessons = lessons.filter((l) => l.phaseId === 'phase3');

  const phase1Done = phase1Lessons.filter((l) => progress.completedDays.includes(l.dayNumber)).length;
  const phase2Done = phase2Lessons.filter((l) => progress.completedDays.includes(l.dayNumber)).length;
  const phase3Done = phase3Lessons.filter((l) => progress.completedDays.includes(l.dayNumber)).length;

  const exportDataJson = JSON.stringify(progress, null, 2);

  const handleImportSubmit = () => {
    try {
      const parsed = JSON.parse(importText);
      if (parsed && typeof parsed.streak === 'number') {
        onImportData(parsed);
        setShowSyncModal(false);
        alert('Progress synced successfully across devices!');
      } else {
        alert('Invalid backup data format.');
      }
    } catch (err) {
      alert('Failed to parse JSON backup text.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Top Mastery Overview Header */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mb-2">
              <Trophy className="w-4 h-4" />
              <span>DSA Mastery Tracker & Roadmap</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
              {progressPercent}% Curriculum Completed
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-1 font-medium">
              You have completed <span className="text-indigo-600 dark:text-indigo-400 font-bold">{completedCount}</span> out of {totalCount} daily concepts & problems.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            {/* Streak Card */}
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/40 text-center">
              <div className="flex items-center justify-center space-x-1 text-amber-600 dark:text-amber-400 font-black text-xl">
                <Flame className="w-5 h-5 fill-amber-500" />
                <span>{progress.streak} Days</span>
              </div>
              <span className="text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider">Active Streak</span>
            </div>

            {/* Sync Progress Button */}
            <button
              onClick={() => setShowSyncModal(true)}
              className="flex items-center space-x-2 px-4 py-3 rounded-2xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 text-xs font-bold transition-all"
            >
              <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Sync Data</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-3 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700 p-0.5">
            <div
              className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Target Timeline Planner Selector */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
          <Target className="w-4 h-4" />
          <span>Set Your Personal Target Timeline</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => onUpdateTargetTimeline('3_months')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              progress.targetTimeline === '3_months'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 font-bold shadow-sm'
                : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            <div className="text-sm font-bold">3 Months Blitz</div>
            <div className="text-xs opacity-80 mt-1">1-2 problems daily (Aggressive Prep)</div>
          </button>

          <button
            onClick={() => onUpdateTargetTimeline('6_months')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              progress.targetTimeline === '6_months'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 font-bold shadow-sm'
                : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            <div className="text-sm font-bold">6 Months Balanced</div>
            <div className="text-xs opacity-80 mt-1">1 concept daily (Recommended)</div>
          </button>

          <button
            onClick={() => onUpdateTargetTimeline('1_year')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              progress.targetTimeline === '1_year'
                ? 'bg-indigo-50 dark:bg-indigo-950/60 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 font-bold shadow-sm'
                : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            <div className="text-sm font-bold">1 Year Deep Mastery</div>
            <div className="text-xs opacity-80 mt-1">Steady pace + deep code scratch</div>
          </button>
        </div>
      </div>

      {/* Phase Progression Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Phase 1 Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Phase 1: Foundation
            </span>
            <span className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400">
              {phase1Done}/{phase1Lessons.length}
            </span>
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-base tracking-tight">
            Language & Complexity Base
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            Big O Notation, basic arrays, dictionaries, and implementing structures from scratch.
          </p>
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <div
              className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full"
              style={{ width: `${(phase1Done / (phase1Lessons.length || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Phase 2 Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Phase 2: Logical Order
            </span>
            <span className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400">
              {phase2Done}/{phase2Lessons.length}
            </span>
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-base tracking-tight">
            Linear to Non-Linear
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            Binary Search, Trees, Heaps, Graph BFS/DFS, and Dynamic Programming foundations.
          </p>
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <div
              className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full"
              style={{ width: `${(phase2Done / (phase2Lessons.length || 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Phase 3 Card */}
        <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Phase 3: Problem Patterns
            </span>
            <span className="text-xs font-mono font-bold text-neutral-500 dark:text-neutral-400">
              {phase3Done}/{phase3Lessons.length}
            </span>
          </div>
          <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-base tracking-tight">
            Patterns over Memorization
          </h3>
          <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
            Two Pointers, Sliding Window, Monotonic Stack, Fast & Slow pointers.
          </p>
          <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden border border-neutral-200 dark:border-neutral-700">
            <div
              className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full"
              style={{ width: `${(phase3Done / (phase3Lessons.length || 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Spaced Repetition Review Schedule Queue */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
            <RotateCcw className="w-4 h-4" />
            <span>Spaced Repetition Review Queue</span>
          </div>
          <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400">
            {progress.spacedRepetitionQueue.length} Items Scheduled
          </span>
        </div>

        {progress.spacedRepetitionQueue.length === 0 ? (
          <div className="p-6 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 text-center text-xs text-neutral-500 dark:text-neutral-400 font-mono">
            No items in review queue yet. Solve problems to automatically populate spaced repetition reminders!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {progress.spacedRepetitionQueue.map((item) => (
              <div
                key={item.problemId}
                className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                    Day {item.dayNumber}
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-bold uppercase tracking-wider">
                    Review #{item.reviewCount}
                  </span>
                </div>
                <h4 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm">
                  {item.problemTitle}
                </h4>
                <div className="text-xs text-neutral-500 dark:text-neutral-400">
                  Next Review: <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">{item.nextReviewDate}</span>
                </div>
                <button
                  onClick={() => {
                    onReviewSpacedItem(item.problemId);
                    onSelectDay(item.dayNumber);
                  }}
                  className="w-full mt-2 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-1"
                >
                  <span>Review Problem Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Days Matrix Grid */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-base tracking-tight">
          30-Day Curriculum Map
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5">
          {lessons.map((l) => {
            const isDone = progress.completedDays.includes(l.dayNumber);
            return (
              <button
                key={l.dayNumber}
                onClick={() => onSelectDay(l.dayNumber)}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  isDone
                    ? 'bg-green-50 dark:bg-green-950/60 border-green-200 dark:border-green-800 text-green-900 dark:text-green-200 font-bold shadow-sm'
                    : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:border-neutral-300 dark:hover:border-neutral-700'
                }`}
              >
                <div className="text-xs font-bold">Day {l.dayNumber}</div>
                <div className="text-[10px] truncate text-neutral-500 dark:text-neutral-400 mt-0.5" title={l.title}>
                  {l.topic.split(':')[0]}
                </div>
                {isDone && <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400 mx-auto mt-1" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sync Backup Modal */}
      {showSyncModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 max-w-lg w-full space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 flex items-center space-x-2">
              <Download className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Cross-Device Data Sync</span>
            </h3>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
              Copy this JSON backup text from your laptop or phone, and paste it into PyAlgo Daily on your other device to keep your streak and completed problems in sync!
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Your Current Export Backup:</label>
              <textarea
                readOnly
                value={exportDataJson}
                className="w-full h-28 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 font-mono text-xs text-indigo-600 dark:text-indigo-400 focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-neutral-700 dark:text-neutral-300">Import Backup from another device:</label>
              <textarea
                value={importText}
                onChange={(e) => setImportText(e.target.value)}
                placeholder="Paste backup JSON here..."
                className="w-full h-24 p-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 font-mono text-xs text-neutral-900 dark:text-neutral-100 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowSyncModal(false)}
                className="px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                Close
              </button>
              <button
                onClick={handleImportSubmit}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-xs shadow-md shadow-indigo-100 dark:shadow-none"
              >
                Restore Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
