import React, { useState, useEffect } from 'react';
import { Problem } from '../types';
import { runPythonCode, TestResult } from '../services/pyodideRunner';
import {
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle,
  XCircle,
  HelpCircle,
  Cpu,
  Clock,
  Code2,
  ChevronDown,
  ChevronUp,
  Copy,
  Terminal,
  Loader2,
  Check,
} from 'lucide-react';

interface CodePlaygroundProps {
  problem: Problem;
  dayNumber: number;
  onCompleteDay: (dayNumber: number, problemId: string) => void;
  isCompleted: boolean;
  savedCode?: string;
  onSaveCode?: (code: string) => void;
}

export const CodePlayground: React.FC<CodePlaygroundProps> = ({
  problem,
  dayNumber,
  onCompleteDay,
  isCompleted,
  savedCode,
  onSaveCode,
}) => {
  const [code, setCode] = useState(savedCode || problem.starterCode);
  const [isRunning, setIsRunning] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<string>('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [allPassed, setAllPassed] = useState<boolean | null>(null);
  const [execTime, setExecTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'tests' | 'console' | 'solution'>('tests');

  // AI Hint State
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [aiMode, setAiMode] = useState<'hint' | 'review' | null>(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(problem.starterCode);
    }
  }, [problem.id, savedCode]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setConsoleLogs('');
    setAiMode(null);

    const result = await runPythonCode(code, problem.testCases);

    setIsRunning(false);
    setConsoleLogs(result.logs);
    setTestResults(result.testResults);
    setAllPassed(result.overallPassed);
    setExecTime(result.executionTimeMs);

    if (onSaveCode) {
      onSaveCode(code);
    }

    if (result.overallPassed && result.testResults.length > 0) {
      onCompleteDay(dayNumber, problem.id);
    }
  };

  const handleResetCode = () => {
    setCode(problem.starterCode);
    setAllPassed(null);
    setTestResults([]);
    setConsoleLogs('');
  };

  const handleRequestAiHint = async () => {
    setIsAiLoading(true);
    setAiMode('hint');
    setAiResponse('');

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'socratic-hint',
          problemTitle: problem.title,
          userCode: code,
        }),
      });
      const data = await res.json();
      setAiResponse(data.text || data.error || 'No hint generated.');
    } catch (err: any) {
      setAiResponse('Error requesting AI hint: ' + err.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleRequestAiCodeReview = async () => {
    setIsAiLoading(true);
    setAiMode('review');
    setAiResponse('');

    try {
      const res = await fetch('/api/gemini/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'code-review',
          problemTitle: problem.title,
          userCode: code,
        }),
      });
      const data = await res.json();
      setAiResponse(data.text || data.error || 'No review generated.');
    } catch (err: any) {
      setAiResponse('Error requesting AI review: ' + err.message);
    } finally {
      setIsAiLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white dark:bg-neutral-900 p-6 rounded-3xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div>
          <div className="flex items-center space-x-3 mb-1">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Day {dayNumber} Challenge
            </span>
            <span
              className={`px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                problem.difficulty === 'Easy'
                  ? 'bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800'
                  : problem.difficulty === 'Medium'
                  ? 'bg-yellow-50 dark:bg-amber-950/60 text-yellow-800 dark:text-amber-300 border border-yellow-200 dark:border-amber-800'
                  : 'bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800'
              }`}
            >
              {problem.difficulty}
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            {problem.title}
          </h2>
        </div>

        <div className="flex items-center space-x-2">
          {isCompleted && (
            <div className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 text-xs font-bold uppercase tracking-wider">
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <span>Solved</span>
            </div>
          )}

          <button
            onClick={handleRunCode}
            disabled={isRunning}
            className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm shadow-lg shadow-indigo-100 dark:shadow-none transition-all active:scale-95 disabled:opacity-50"
          >
            {isRunning ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running Pyodide...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>Run Solution</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split View: Left = Description, Right = Code & Terminal */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Problem Details & Constraints (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
              Problem Description
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed font-sans font-normal">
              {problem.description}
            </p>

            {/* Examples */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Examples
              </h4>
              {problem.examples.map((ex, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-100 dark:border-neutral-800 font-mono text-xs space-y-1"
                >
                  <div>
                    <span className="text-neutral-500 dark:text-neutral-400 font-sans font-medium">Input: </span>
                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">{ex.input}</span>
                  </div>
                  <div>
                    <span className="text-neutral-500 dark:text-neutral-400 font-sans font-medium">Output: </span>
                    <span className="text-green-700 dark:text-green-400 font-bold">{ex.output}</span>
                  </div>
                  {ex.explanation && (
                    <div className="text-neutral-500 dark:text-neutral-400 font-sans text-xs italic pt-1">
                      {ex.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Constraints */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                Constraints
              </h4>
              <ul className="list-disc list-inside text-xs font-mono text-neutral-600 dark:text-neutral-400 space-y-1">
                {problem.constraints.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </div>

            {/* Python Tips */}
            <div className="p-4 rounded-2xl bg-yellow-50 dark:bg-amber-950/40 border border-yellow-100 dark:border-amber-800/40 space-y-1.5">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-yellow-800 dark:text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-yellow-600 dark:text-amber-400" />
                <span>Python Efficiency Tips</span>
              </div>
              <ul className="text-xs text-yellow-900 dark:text-amber-200 space-y-1 list-disc list-inside">
                {problem.pythonTips.map((tip, idx) => (
                  <li key={idx}>{tip}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Code Editor + Runner Output (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between bg-white dark:bg-neutral-900 px-5 py-3.5 rounded-t-3xl border-t border-x border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center space-x-2">
              <Code2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span className="text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200">
                solution.py
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleRequestAiHint}
                disabled={isAiLoading}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold transition-all"
              >
                <HelpCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>AI Hint</span>
              </button>

              <button
                onClick={handleRequestAiCodeReview}
                disabled={isAiLoading}
                className="flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-bold transition-all"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                <span>AI Review</span>
              </button>

              <button
                onClick={handleResetCode}
                title="Reset to Starter Code"
                className="p-1.5 rounded-xl text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Textarea Code Editor */}
          <div className="relative">
            <textarea
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                if (onSaveCode) onSaveCode(e.target.value);
              }}
              spellCheck={false}
              className="w-full h-80 p-4 bg-neutral-900 dark:bg-black font-mono text-xs sm:text-sm text-indigo-300 dark:text-indigo-200 border-x border-b border-neutral-800 dark:border-neutral-800 rounded-b-3xl focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y leading-relaxed"
              placeholder="# Write your Python solution here..."
            />
          </div>

          {/* AI Tutor Popup Panel */}
          {aiMode && (
            <div className="bg-white dark:bg-neutral-900 border border-indigo-200 dark:border-indigo-800 rounded-3xl p-5 space-y-3 relative shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-wider">
                  <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span>
                    {aiMode === 'hint' ? 'AI Socratic Hints' : 'AI Code Review & Big O'}
                  </span>
                </div>
                <button
                  onClick={() => setAiMode(null)}
                  className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 text-xs font-bold"
                >
                  Close
                </button>
              </div>

              {isAiLoading ? (
                <div className="flex items-center space-x-2 text-xs text-indigo-600 dark:text-indigo-400 py-3 font-semibold">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>PyAlgo Coach is analyzing your Python code...</span>
                </div>
              ) : (
                <div className="text-xs text-neutral-700 dark:text-neutral-300 font-sans leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto bg-neutral-50 dark:bg-neutral-950 p-4 rounded-2xl border border-neutral-200 dark:border-neutral-800">
                  {aiResponse}
                </div>
              )}
            </div>
          )}

          {/* Execution & Test Cases Panel */}
          <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-4 shadow-sm">
            {/* Tabs Bar */}
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-3">
              <div className="flex items-center space-x-4 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('tests')}
                  className={`flex items-center space-x-1.5 pb-2 border-b-2 transition-all ${
                    activeTab === 'tests'
                      ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <Cpu className="w-3.5 h-3.5" />
                  <span>Test Results ({testResults.length})</span>
                </button>

                <button
                  onClick={() => setActiveTab('console')}
                  className={`flex items-center space-x-1.5 pb-2 border-b-2 transition-all ${
                    activeTab === 'console'
                      ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Console Output</span>
                </button>

                <button
                  onClick={() => setActiveTab('solution')}
                  className={`flex items-center space-x-1.5 pb-2 border-b-2 transition-all ${
                    activeTab === 'solution'
                      ? 'border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Official Solution</span>
                </button>
              </div>

              {execTime > 0 && (
                <div className="flex items-center space-x-1 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                  <Clock className="w-3.5 h-3.5 text-orange-500" />
                  <span>{execTime}ms</span>
                </div>
              )}
            </div>

            {/* Test Results Output */}
            {activeTab === 'tests' && (
              <div className="space-y-3">
                {testResults.length === 0 ? (
                  <div className="text-center py-6 text-xs text-neutral-400 font-mono">
                    Click "Run Solution" to execute test cases in Pyodide.
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider">
                        Overall Result:
                      </span>
                      {allPassed ? (
                        <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-green-50 dark:bg-green-950/60 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800 text-xs font-bold">
                          <CheckCircle className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                          <span>All Test Cases Passed!</span>
                        </span>
                      ) : (
                        <span className="flex items-center space-x-1 px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 text-xs font-bold">
                          <XCircle className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                          <span>Some Test Cases Failed</span>
                        </span>
                      )}
                    </div>

                    <div className="space-y-2 max-h-56 overflow-y-auto">
                      {testResults.map((tr) => (
                        <div
                          key={tr.testCaseIndex}
                          className={`p-3.5 rounded-2xl border text-xs font-mono space-y-1 ${
                            tr.passed
                              ? 'bg-green-50/60 dark:bg-green-950/40 border-green-200 dark:border-green-800 text-green-900 dark:text-green-200'
                              : 'bg-red-50/60 dark:bg-red-950/40 border-red-200 dark:border-red-800 text-red-900 dark:text-red-200'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold">
                            <span>Test Case #{tr.testCaseIndex}</span>
                            <span>{tr.passed ? 'PASSED' : 'FAILED'}</span>
                          </div>
                          <div>Input: {tr.input}</div>
                          <div>Expected: {tr.expected}</div>
                          <div>Actual: {tr.actual}</div>
                          {tr.error && (
                            <div className="text-red-600 dark:text-red-400 text-xs mt-1 font-bold">
                              Error: {tr.error}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Console Logs Tab */}
            {activeTab === 'console' && (
              <div className="font-mono text-xs text-indigo-300 dark:text-indigo-200 bg-neutral-900 dark:bg-black p-4 rounded-2xl min-h-28 max-h-56 overflow-y-auto whitespace-pre-wrap">
                {consoleLogs || '# No stdout logs recorded.'}
              </div>
            )}

            {/* Official Solution Tab */}
            {activeTab === 'solution' && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    Idiomatic Python Solution:
                  </span>
                  <button
                    onClick={() => copyToClipboard(problem.solutionCode)}
                    className="flex items-center space-x-1 text-xs text-indigo-600 dark:text-indigo-400 font-bold hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="font-mono text-xs text-indigo-300 dark:text-indigo-200 bg-neutral-900 dark:bg-black p-4 rounded-2xl overflow-x-auto border border-neutral-800 leading-relaxed">
                  {problem.solutionCode}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
