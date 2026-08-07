import React from 'react';
import { DailyLesson } from '../types';
import {
  BookOpen,
  Code2,
  Zap,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Clock,
  Layers,
  Lightbulb,
} from 'lucide-react';

interface DailyConceptViewProps {
  lesson: DailyLesson;
  totalLessons: number;
  onSelectDay: (day: number) => void;
  onStartPractice: () => void;
  onStartActiveRecall: () => void;
  isCompleted: boolean;
}

export const DailyConceptView: React.FC<DailyConceptViewProps> = ({
  lesson,
  totalLessons,
  onSelectDay,
  onStartPractice,
  onStartActiveRecall,
  isCompleted,
}) => {
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      {/* Top Banner & Header */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 uppercase tracking-wider">
              Day {lesson.dayNumber} of {totalLessons}
            </span>
            <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700 uppercase tracking-wider">
              {lesson.phaseName}
            </span>
            {isCompleted && (
              <span className="flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-bold bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 uppercase tracking-wider">
                <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                <span>Completed</span>
              </span>
            )}
          </div>

          {/* Navigation Prev/Next */}
          <div className="flex items-center space-x-2">
            <button
              disabled={lesson.dayNumber <= 1}
              onClick={() => onSelectDay(lesson.dayNumber - 1)}
              className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 disabled:opacity-40 disabled:pointer-events-none transition-all border border-neutral-200 dark:border-neutral-700"
              title="Previous Day"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider">
              Day {lesson.dayNumber}
            </span>
            <button
              disabled={lesson.dayNumber >= totalLessons}
              onClick={() => onSelectDay(lesson.dayNumber + 1)}
              className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200 disabled:opacity-40 disabled:pointer-events-none transition-all border border-neutral-200 dark:border-neutral-700"
              title="Next Day"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {lesson.title}
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-sm sm:text-base font-medium mt-1">
            Topic: <span className="text-indigo-600 dark:text-indigo-400 font-bold">{lesson.topic}</span>
          </p>
        </div>

        {/* Action Callouts */}
        <div className="pt-2 flex flex-wrap gap-3">
          <button
            onClick={onStartPractice}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-100 dark:shadow-none transition-all transform active:scale-95"
          >
            <Code2 className="w-4 h-4" />
            <span>Start Challenge ({lesson.problem.difficulty})</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onStartActiveRecall}
            className="flex items-center space-x-2 px-5 py-3 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700 text-xs sm:text-sm font-bold transition-all"
          >
            <HelpCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>Active Recall Quiz</span>
          </button>
        </div>
      </div>

      {/* Main Concept Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Deep Explanation */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
              <BookOpen className="w-4 h-4" />
              <span>Core Algorithmic Concept</span>
            </div>
            <p className="text-neutral-700 dark:text-neutral-300 leading-relaxed text-sm sm:text-base font-normal">
              {lesson.conceptSummary}
            </p>
          </div>

          {/* Python High-Leverage Idioms for this Concept */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
              <Lightbulb className="w-4 h-4" />
              <span>Python Pro Tips & Shortcuts</span>
            </div>
            <ul className="space-y-3">
              {lesson.pythonTricks.map((trick, i) => (
                <li
                  key={i}
                  className="p-4 rounded-2xl bg-yellow-50 dark:bg-amber-950/40 border border-yellow-100 dark:border-amber-800/40 text-xs sm:text-sm text-yellow-900 dark:text-amber-200 leading-relaxed font-medium"
                >
                  <div className="font-bold text-yellow-800 dark:text-amber-300 mb-1 flex items-center space-x-1.5">
                    <Zap className="w-3.5 h-3.5 text-yellow-600 dark:text-amber-400 fill-yellow-600 dark:fill-amber-400" />
                    <span>Efficiency Hack #{i + 1}</span>
                  </div>
                  <span>{trick}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Col: Complexity & Problem Preview */}
        <div className="space-y-6">
          {/* Big O Complexity Card */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 text-neutral-400 dark:text-neutral-500 font-bold text-xs uppercase tracking-widest">
              <Clock className="w-4 h-4 text-orange-500" />
              <span>Complexity Target</span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              {lesson.bigOExplanation}
            </p>
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-500 dark:text-neutral-400 font-sans font-medium">Time:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{lesson.problem.timeComplexity}</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-500 dark:text-neutral-400 font-sans font-medium">Space:</span>
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">{lesson.problem.spaceComplexity}</span>
            </div>
          </div>

          {/* Daily Problem Card Preview */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Today's Challenge
              </span>
              <span
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  lesson.problem.difficulty === 'Easy'
                    ? 'bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                    : lesson.problem.difficulty === 'Medium'
                    ? 'bg-yellow-50 dark:bg-amber-950/60 text-yellow-800 dark:text-amber-300 border border-yellow-200 dark:border-amber-800'
                    : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
                }`}
              >
                {lesson.problem.difficulty}
              </span>
            </div>

            <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-lg tracking-tight">
              {lesson.problem.title}
            </h3>

            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-3">
              {lesson.problem.description}
            </p>

            <button
              onClick={onStartPractice}
              className="w-full flex items-center justify-center space-x-2 py-3 rounded-xl bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-bold text-xs transition-all shadow-sm"
            >
              <span>Launch Practice Editor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
