
import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, CheckCircle2, Clock, Send } from 'lucide-react';
import { Question, QuizResult, Language } from '../types';
import { soundManager } from '../services/soundService';
import { UI_TEXT } from '../constants';

interface QuizInterfaceProps {
  questions: Question[];
  language: Language;
  onComplete: (result: QuizResult) => void;
}

const QuizInterface: React.FC<QuizInterfaceProps> = ({ questions, language, onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>(new Array(questions.length).fill(-1));
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  
  // Touch handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;
  
  const t = UI_TEXT[language];

  useEffect(() => {
    soundManager.play('start');
  }, []);

  const currentQuestion = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    const newAnswers = [...answers];
    newAnswers[currentIndex] = index;
    setAnswers(newAnswers);
    soundManager.play('click');
  };

  const changeQuestion = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= questions.length) return;
    setSlideDirection(newIndex > currentIndex ? 'right' : 'left');
    setCurrentIndex(newIndex);
  };

  const handleFinishQuiz = () => {
    soundManager.play('tada');
    const correctCount = answers.reduce((acc, ans, idx) => {
      return acc + (ans === questions[idx].correctAnswerIndex ? 1 : 0);
    }, 0);

    onComplete({
      totalQuestions: questions.length,
      correctAnswers: correctCount,
      questions: questions,
      userAnswers: answers
    });
  };

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e: React.TouchEvent) => setTouchEnd(e.targetTouches[0].clientX);
  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentIndex < questions.length - 1) changeQuestion(currentIndex + 1);
    if (isRightSwipe && currentIndex > 0) changeQuestion(currentIndex - 1);
  };

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Header / Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center text-sm font-semibold text-slate-400 mb-2 tracking-wider uppercase">
          <span>{language === 'hi' ? 'प्रश्न' : 'Question'} {currentIndex + 1} / {questions.length}</span>
          <div className="flex gap-2">
             <span className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full text-slate-300 border border-slate-700">
               <Clock className="w-3 h-3"/> Test Mode
             </span>
          </div>
        </div>
        
        {/* Progress Grid */}
        <div className="flex gap-1 mb-4 overflow-x-auto pb-2 scrollbar-hide">
          {questions.map((_, idx) => (
            <button 
              key={idx}
              onClick={() => changeQuestion(idx)}
              className={`h-1.5 min-w-[1.5rem] flex-1 rounded-full transition-all ${
                idx === currentIndex ? 'bg-brand-400 scale-110' : 
                answers[idx] !== -1 ? 'bg-brand-800' : 'bg-slate-800'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Card */}
      <div 
        className="relative min-h-[400px]"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div 
          key={currentIndex} 
          className={`bg-slate-800/80 border border-slate-700 rounded-2xl p-6 md:p-8 shadow-2xl backdrop-blur-md animate-slide-in-${slideDirection}`}
        >
          {/* Question Text */}
          <h3 className="text-xl md:text-2xl font-display font-semibold text-slate-100 mb-8 leading-relaxed">
            <span className="text-brand-500 mr-2">{currentIndex + 1}.</span>
            {currentQuestion.text}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, idx) => {
              const isSelected = answers[currentIndex] === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group
                    ${isSelected 
                      ? 'border-brand-500 bg-brand-500/10 text-brand-100 shadow-brand-500/10 shadow-lg' 
                      : 'border-slate-700 bg-slate-800/50 hover:bg-slate-700/50 hover:border-slate-500 text-slate-300'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold border transition-colors ${
                      isSelected ? 'border-brand-500 text-brand-500 bg-brand-500/20' : 'border-slate-600 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="text-base">{option}</span>
                  </div>
                  {isSelected && <CheckCircle2 className="w-5 h-5 text-brand-500" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="mt-8 flex justify-between items-center gap-4">
        <button
          onClick={() => changeQuestion(currentIndex - 1)}
          disabled={currentIndex === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
            currentIndex === 0 
              ? 'bg-slate-800/50 text-slate-600 cursor-not-allowed' 
              : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'
          }`}
        >
          <ChevronLeft className="w-5 h-5" /> {t.prev}
        </button>

        <div className="text-slate-500 text-sm hidden md:block">
           {t.swipe}
        </div>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleFinishQuiz}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:shadow-emerald-500/20 hover:scale-105 transition-all"
          >
            {t.submit} <Send className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={() => changeQuestion(currentIndex + 1)}
            className="flex items-center gap-2 px-8 py-3 rounded-xl font-semibold bg-brand-600 text-white hover:bg-brand-500 shadow-lg shadow-brand-500/20 transition-all hover:translate-x-1"
          >
            {t.next} <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizInterface;
