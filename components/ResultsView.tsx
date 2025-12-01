
import React from 'react';
import { QuizResult, Language } from '../types';
import { RefreshCcw, Home, Target, Award, BookOpen } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { UI_TEXT } from '../constants';

interface ResultsViewProps {
  result: QuizResult;
  language: Language;
  onHome: () => void;
  onRetry: () => void;
}

const ResultsView: React.FC<ResultsViewProps> = ({ result, language, onHome, onRetry }) => {
  const t = UI_TEXT[language];
  const percentage = Math.round((result.correctAnswers / result.totalQuestions) * 100);
  
  const data = [
    { name: 'Correct', value: result.correctAnswers },
    { name: 'Incorrect', value: result.totalQuestions - result.correctAnswers },
  ];

  const COLORS = ['#10b981', '#ef4444'];

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up w-full px-4">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-display font-bold mb-2 text-slate-900 dark:text-white">{t.complete}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t.performance}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <div className="col-span-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-lg dark:shadow-none">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-400 to-emerald-400" />
          <div className="w-32 h-32 mb-4 relative">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
             </ResponsiveContainer>
             <div className="absolute inset-0 flex items-center justify-center flex-col">
               <span className="text-2xl font-bold text-slate-800 dark:text-white">{percentage}%</span>
             </div>
          </div>
          <h3 className="text-slate-600 dark:text-slate-300 font-medium">{t.accuracy}</h3>
        </div>

        {/* Stats Cards */}
        <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
           <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-sm dark:shadow-none">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{t.totalQ}</p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white">{result.totalQuestions}</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                  <BookOpen className="w-6 h-6" />
                </div>
              </div>
           </div>
           
           <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col justify-between shadow-sm dark:shadow-none">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-1">{t.correct}</p>
                  <p className="text-3xl font-bold text-emerald-500 dark:text-emerald-400">{result.correctAnswers}</p>
                </div>
                <div className="p-3 bg-emerald-100 dark:bg-emerald-500/10 rounded-xl text-emerald-600 dark:text-emerald-400">
                  <Target className="w-6 h-6" />
                </div>
              </div>
           </div>
           
           <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 flex flex-col justify-between col-span-2 shadow-sm dark:shadow-none">
              <div className="flex items-center gap-4">
                 <div className="p-3 bg-amber-100 dark:bg-amber-500/10 rounded-xl text-amber-600 dark:text-amber-400">
                    <Award className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm">{t.verdict}</p>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">
                      {percentage >= 80 ? t.excellent : 
                       percentage >= 50 ? t.good : 
                       t.needsWork}
                    </p>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Review Section */}
      <div className="space-y-4 mb-10">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t.review}</h3>
        {result.questions.map((q, idx) => {
          const userAns = result.userAnswers[idx];
          const isCorrect = userAns === q.correctAnswerIndex;
          
          return (
            <div key={q.id} className={`p-4 rounded-xl border ${isCorrect ? 'border-emerald-500/30 bg-emerald-50 dark:bg-emerald-500/5' : 'border-red-500/30 bg-red-50 dark:bg-red-500/5'}`}>
              <div className="flex gap-3">
                <span className={`min-w-[24px] h-6 rounded-full flex items-center justify-center text-xs font-bold ${isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                  {idx + 1}
                </span>
                <div className="flex-1">
                  <p className="text-slate-800 dark:text-slate-200 font-medium mb-2">{q.text}</p>
                  <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                    <span className="mr-2">{t.yourAns} <span className={isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}>{q.options[userAns] || 'Skipped'}</span></span>
                    {!isCorrect && <span className="text-emerald-600 dark:text-emerald-400"> | {t.correctIs} {q.options[q.correctAnswerIndex]}</span>}
                  </div>
                  <p className="text-xs text-slate-500 italic border-l-2 border-slate-300 dark:border-slate-600 pl-2">
                    {q.explanation}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center">
        <button 
          onClick={onHome}
          className="px-6 py-3 rounded-xl font-semibold bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-600 transition-all flex items-center gap-2"
        >
          <Home className="w-5 h-5" />
          {t.home}
        </button>
        <button 
          onClick={onRetry}
          className="px-6 py-3 rounded-xl font-semibold bg-brand-600 text-white hover:bg-brand-500 transition-all shadow-lg shadow-brand-500/20 flex items-center gap-2"
        >
          <RefreshCcw className="w-5 h-5" />
          {t.practiceAgain}
        </button>
      </div>
    </div>
  );
};

export default ResultsView;
