import React, { useState } from 'react';
import {
  Smartphone,
  Share2,
  PlusSquare,
  MoreVertical,
  Download,
  X,
  CheckCircle,
  Apple,
  Globe,
  Zap,
} from 'lucide-react';

interface PwaInstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PwaInstallModal: React.FC<PwaInstallModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [platform, setPlatform] = useState<'ios' | 'android'>('ios');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900/40 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 p-6 sm:p-8 max-w-xl w-full space-y-6 shadow-xl relative my-8">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest">
            <Smartphone className="w-4 h-4" />
            <span>Cross-Platform Setup (iOS & Android)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">
            How to Install PyAlgo Daily on iPhone & Android
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-medium">
            The best option for seamless learning across iOS and Android is a <strong className="text-indigo-600 dark:text-indigo-400 font-bold">Progressive Web App (PWA)</strong>. It requires zero App Store downloads, works natively on both OSes, includes an in-browser Python runner, and lets you sync progress instantly!
          </p>
        </div>

        {/* Platform Selector Tabs */}
        <div className="flex items-center space-x-2 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-2xl border border-neutral-200 dark:border-neutral-700">
          <button
            onClick={() => setPlatform('ios')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              platform === 'ios'
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md shadow-indigo-100 dark:shadow-none'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            <Apple className="w-4 h-4" />
            <span>iPhone / iPad (iOS Safari)</span>
          </button>

          <button
            onClick={() => setPlatform('android')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-xl text-xs font-bold transition-all ${
              platform === 'android'
                ? 'bg-indigo-600 dark:bg-indigo-500 text-white shadow-md shadow-indigo-100 dark:shadow-none'
                : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Android (Chrome)</span>
          </button>
        </div>

        {/* Step-by-Step Instructions */}
        {platform === 'ios' ? (
          <div className="space-y-3 bg-neutral-50 dark:bg-neutral-950 p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm flex items-center space-x-2">
              <Apple className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>iOS Safari Setup (3 Steps):</span>
            </h3>

            <ol className="space-y-3 list-decimal list-inside text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              <li className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                Open this app URL in <strong className="text-indigo-600 dark:text-indigo-400 font-bold">Safari</strong> on your iPhone or iPad.
              </li>
              <li className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center space-x-2">
                <span>Tap the <strong className="text-indigo-600 dark:text-indigo-400 font-bold">Share Button</strong></span>
                <Share2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 inline shrink-0" />
                <span>at the bottom toolbar.</span>
              </li>
              <li className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center space-x-2">
                <span>Scroll down and tap <strong className="text-indigo-600 dark:text-indigo-400 font-bold">"Add to Home Screen"</strong></span>
                <PlusSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400 inline shrink-0" />.
              </li>
            </ol>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 italic pt-1">
              PyAlgo Daily will now appear on your iPhone home screen like a native app with full offline Python support!
            </p>
          </div>
        ) : (
          <div className="space-y-3 bg-neutral-50 dark:bg-neutral-950 p-4 sm:p-5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-sm text-neutral-700 dark:text-neutral-300">
            <h3 className="font-bold text-neutral-900 dark:text-neutral-100 text-sm flex items-center space-x-2">
              <Globe className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>Android Chrome Setup (2 Steps):</span>
            </h3>

            <ol className="space-y-3 list-decimal list-inside text-neutral-700 dark:text-neutral-300 leading-relaxed font-normal">
              <li className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center space-x-2">
                <span>Open this app URL in <strong className="text-indigo-600 dark:text-indigo-400 font-bold">Google Chrome</strong> and tap the <strong className="text-indigo-600 dark:text-indigo-400 font-bold">3-dots menu</strong></span>
                <MoreVertical className="w-4 h-4 text-indigo-600 dark:text-indigo-400 inline shrink-0" />.
              </li>
              <li className="p-3 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center space-x-2">
                <span>Tap <strong className="text-indigo-600 dark:text-indigo-400 font-bold">"Install app"</strong> or <strong className="text-indigo-600 dark:text-indigo-400 font-bold">"Add to Home screen"</strong></span>
                <Download className="w-4 h-4 text-indigo-600 dark:text-indigo-400 inline shrink-0" />.
              </li>
            </ol>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 italic pt-1">
              Chrome will prompt to install PyAlgo Daily directly to your app drawer.
            </p>
          </div>
        )}

        {/* Sync Tip */}
        <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
          <div className="font-bold text-indigo-700 dark:text-indigo-300 flex items-center space-x-1.5">
            <Zap className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>How to continue learning across iPhone & Android:</span>
          </div>
          <p className="leading-relaxed font-normal">
            Use the <strong className="text-indigo-700 dark:text-indigo-300 font-bold">"Sync Data"</strong> button on the Roadmap tab to generate a 1-click JSON backup snippet. Paste it between devices whenever you switch!
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-2xl bg-indigo-600 dark:bg-indigo-500 hover:bg-indigo-700 dark:hover:bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-100 dark:shadow-none transition-all"
        >
          Got It, Let's Start Learning!
        </button>
      </div>
    </div>
  );
};
