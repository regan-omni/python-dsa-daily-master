import React, { useState } from 'react';
import { pythonTricks } from '../data/pythonTricks';
import { PythonTrick } from '../types';
import {
  Lightbulb,
  Search,
  Copy,
  Check,
  Zap,
  Code2,
  Clock,
  Sparkles,
} from 'lucide-react';

interface PythonTricksViewProps {
  onTryInEditor: (codeSnippet: string) => void;
}

export const PythonTricksView: React.FC<PythonTricksViewProps> = ({
  onTryInEditor,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    'All',
    'Standard Library',
    'Data Structures',
    'Algorithms',
    'Bitwise',
    'Speed & Memory',
    'Syntax Magic',
  ];

  const filteredTricks = pythonTricks.filter((trick) => {
    const matchesCategory =
      selectedCategory === 'All' || trick.category === selectedCategory;
    const matchesSearch =
      trick.title.toLowerCase().includes(search.toLowerCase()) ||
      trick.explanation.toLowerCase().includes(search.toLowerCase()) ||
      trick.code.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Header Banner */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 sm:p-8 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
        <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
          <Lightbulb className="w-4 h-4" />
          <span>Python High-Leverage Competitive Programming Library</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
          Python Tricks & Algorithmic Idioms
        </h1>
        <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm mt-1 max-w-2xl font-medium">
          Master built-in Python modules, time-saving syntax idioms, bitwise hacks, and memory optimizations to pass coding interviews and win competitive programming contests.
        </p>

        {/* Search & Category Filter Bar */}
        <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-400 dark:text-neutral-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Python tricks, e.g., defaultdict, bisect, bitwise..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md shadow-indigo-100 dark:shadow-none'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tricks Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTricks.map((trick) => (
          <div
            key={trick.id}
            className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 uppercase tracking-wider">
                  {trick.category}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono flex items-center space-x-1 font-semibold">
                  <Zap className="w-3.5 h-3.5 text-yellow-600 dark:text-amber-400 fill-yellow-600 dark:fill-amber-400" />
                  <span>CP Shortcut</span>
                </span>
              </div>

              <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-lg tracking-tight">
                {trick.title}
              </h3>

              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal">
                {trick.explanation}
              </p>

              {/* Code Snippet Box */}
              <div className="relative group">
                <pre className="font-mono text-xs text-indigo-300 dark:text-indigo-200 bg-neutral-900 dark:bg-black p-4 rounded-2xl overflow-x-auto border border-neutral-800 leading-relaxed">
                  {trick.code}
                </pre>
                <button
                  onClick={() => handleCopyCode(trick.id, trick.code)}
                  className="absolute top-2.5 right-2.5 p-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-all"
                  title="Copy Python snippet"
                >
                  {copiedId === trick.id ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 space-y-1 text-xs">
                <div className="font-bold text-neutral-800 dark:text-neutral-200">
                  When to use: <span className="font-normal text-neutral-600 dark:text-neutral-400">{trick.whenToUse}</span>
                </div>
                <div className="font-bold text-indigo-600 dark:text-indigo-400">
                  Impact: <span className="font-normal text-neutral-600 dark:text-neutral-400">{trick.timeSavingNote}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onTryInEditor(trick.code)}
              className="mt-2 w-full py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-700 text-white font-bold text-xs transition-all flex items-center justify-center space-x-2"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Test Trick in Playground</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
