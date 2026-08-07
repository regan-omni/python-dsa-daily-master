import React, { useState } from 'react';
import { DailyLesson } from '../types';
import {
  HelpCircle,
  Sparkles,
  X,
  Loader2,
  CheckCircle2,
  Send,
  BookOpen,
  Award,
} from 'lucide-react';

interface ActiveRecallModalProps {
  lesson: DailyLesson;
  isOpen: boolean;
  onClose: () => void;
}

export const ActiveRecallModal: React.FC<ActiveRecallModalProps> = ({
  lesson,
  isOpen,
  onClose,
}) => {
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (!explanation.trim()) return;
    setIsLoading(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'active-recall',
          conceptName: `${lesson.title} (${lesson.topic})`,
          userExplanation: explanation,
        }),
      });
      const data = await res.json();
      setFeedback(data.text || data.error || 'Evaluation completed.');
    } catch (err: any) {
      setFeedback('Error evaluating explanation: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>Active Recall & Spaced Memory Test</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            Explain "{lesson.title}"
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
            Rule: To truly master DSA, explain the logic in your own words without looking at code. Describe the key data structure, time complexity, and edge cases.
          </p>
        </div>

        {!feedback ? (
          <div className="space-y-4">
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              placeholder="e.g. For Two Sum, instead of checking every pair in O(N²), we iterate through array once and store seen numbers in a hash map... Time complexity is O(N)..."
              className="w-full h-36 p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y leading-relaxed"
            />

            <button
              onClick={handleSubmit}
              disabled={isLoading || !explanation.trim()}
              className="w-full py-3.5 rounded-2xl bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-100 dark:shadow-none transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Evaluating with Gemini AI...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Grade My Recall Explanation</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
                <Award className="w-4 h-4" />
                <span>AI Tutor Recall Assessment</span>
              </div>
              <div className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 whitespace-pre-wrap leading-relaxed max-h-64 overflow-y-auto font-normal">
                {feedback}
              </div>
            </div>

            <div className="flex items-center justify-end space-x-3">
              <button
                onClick={() => {
                  setFeedback(null);
                  setExplanation('');
                }}
                className="px-4 py-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 text-xs font-bold hover:bg-neutral-200 dark:hover:bg-neutral-700"
              >
                Try Again
              </button>
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 dark:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-100 dark:shadow-none"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
