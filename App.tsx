
import React, { useState, useEffect } from 'react';
import { 
  Atom, FlaskConical, Leaf, Skull, Crown, 
  ChevronRight, ArrowLeft, Settings2, Sparkles, Loader, Globe,
  Sun, Moon
} from 'lucide-react';
import { SUBJECTS, UI_TEXT } from './constants';
import { AppView, Subject, QuizConfig, QuizResult, Question, Language } from './types';
import { generateQuizQuestions } from './services/geminiService';
import { soundManager } from './services/soundService';

// Components
import VipDoubts from './components/VipDoubts';
import QuizInterface from './components/QuizInterface';
import ResultsView from './components/ResultsView';

const App = () => {
  const [view, setView] = useState<AppView>(AppView.HOME);
  const [language, setLanguage] = useState<Language>('en');
  // Initialize theme from localStorage or default to dark
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    }
    return 'dark';
  });

  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedChapters, setSelectedChapters] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<Record<string, string[]>>({});
  const [activeTopicSidebar, setActiveTopicSidebar] = useState<string | null>(null);
  
  const [quizConfig, setQuizConfig] = useState<Partial<QuizConfig>>({
    questionCount: 10,
    customPrompt: ''
  });
  const [quizQuestions, setQuizQuestions] = useState<Question[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const t = UI_TEXT[language];

  // -- Effects --
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // -- Handlers --

  const toggleTheme = () => {
    soundManager.play('click');
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const toggleLanguage = () => {
    soundManager.play('click');
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  };

  const handleSubjectSelect = (subject: Subject) => {
    soundManager.play('click');
    setSelectedSubject(subject);
    setSelectedChapters([]);
    setSelectedTopics({});
    setView(AppView.CHAPTER_SELECT);
  };

  const toggleChapter = (chapterId: string) => {
    soundManager.play('click');
    setSelectedChapters(prev => 
      prev.includes(chapterId) 
        ? prev.filter(id => id !== chapterId) 
        : [...prev, chapterId]
    );
  };

  const openTopicSidebar = (e: React.MouseEvent, chapterId: string) => {
    e.stopPropagation();
    soundManager.play('click');
    setActiveTopicSidebar(chapterId);
  };

  const toggleTopic = (chapterId: string, topicId: string) => {
    setSelectedTopics(prev => {
      const chapterTopics = prev[chapterId] || [];
      const newChapterTopics = chapterTopics.includes(topicId)
        ? chapterTopics.filter(t => t !== topicId)
        : [...chapterTopics, topicId];
      
      return { ...prev, [chapterId]: newChapterTopics };
    });
  };

  const startQuizGeneration = async () => {
    if (!selectedSubject || selectedChapters.length === 0) return;
    
    soundManager.play('start');
    setIsLoading(true);

    try {
      const chapterNames = selectedSubject.chapters
        .filter(c => selectedChapters.includes(c.id))
        .map(c => c.name);

      const topicNames: string[] = [];
      Object.entries(selectedTopics).forEach(([chapId, tIds]) => {
        const chap = selectedSubject.chapters.find(c => c.id === chapId);
        if(chap) {
           (tIds as string[]).forEach(tId => {
             const t = chap.topics.find(top => top.id === tId);
             if(t) topicNames.push(t.name);
           });
        }
      });

      const questions = await generateQuizQuestions(
        selectedSubject.id,
        chapterNames,
        topicNames,
        quizConfig.questionCount || 10,
        quizConfig.customPrompt || '',
        language
      );

      setQuizQuestions(questions);
      setView(AppView.QUIZ_RUNNING);
    } catch (error) {
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full px-4 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-brand-400 to-brand-700 dark:from-brand-300 dark:via-brand-100 dark:to-white mb-4">
          NEET.ai
        </h1>
        <p className="text-slate-600 dark:text-slate-400 text-lg max-w-lg mx-auto">
          Advanced AI-powered practice environment tailored for medical aspirants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-12">
        {SUBJECTS.map((subject) => {
          const Icon = {
            'Atom': Atom,
            'FlaskConical': FlaskConical,
            'Leaf': Leaf,
            'Skull': Skull
          }[subject.icon] || Atom;

          return (
            <button
              key={subject.id}
              onClick={() => handleSubjectSelect(subject)}
              className="group relative bg-white dark:bg-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500/50 rounded-2xl p-8 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-brand-500/10 text-left overflow-hidden"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${subject.color} opacity-5 rounded-bl-full transition-opacity group-hover:opacity-10`} />
              <Icon className={`w-12 h-12 mb-4 bg-gradient-to-br ${subject.color} text-white p-2 rounded-xl`} />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">{subject.name}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">{subject.chapters.length} Chapters • High Yield</p>
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0 translate-x-4">
                <ChevronRight className="w-6 h-6 text-brand-600 dark:text-brand-400" />
              </div>
            </button>
          );
        })}
      </div>

      <button 
        onClick={() => { soundManager.play('click'); setView(AppView.VIP_DOUBTS); }}
        className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full font-bold text-white shadow-lg hover:shadow-orange-500/25 hover:scale-105 transition-all"
      >
        <Crown className="w-5 h-5 fill-current" />
        {t.accessVip}
      </button>
    </div>
  );

  const renderChapterSelect = () => {
    if (!selectedSubject) return null;

    return (
      <div className="w-full max-w-4xl mx-auto px-4 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => { soundManager.play('click'); setView(AppView.HOME); }}
            className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-slate-500 dark:text-slate-400" />
          </button>
          <div>
            <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white">{t.selectChapters}</h2>
            <p className="text-slate-500 dark:text-slate-400">{t.from} {selectedSubject.name}</p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-2 space-y-3 mb-8">
          {selectedSubject.chapters.map(chapter => {
             const isSelected = selectedChapters.includes(chapter.id);
             const selectedTopicCount = (selectedTopics[chapter.id] || []).length;
             
             return (
              <div 
                key={chapter.id}
                className={`group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer
                  ${isSelected 
                    ? 'bg-brand-50/50 dark:bg-brand-900/20 border-brand-500/50' 
                    : 'bg-white dark:bg-slate-800/30 border-slate-200 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-500'}
                `}
                onClick={() => toggleChapter(chapter.id)}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors
                    ${isSelected ? 'bg-brand-500 border-brand-500' : 'border-slate-300 dark:border-slate-600 group-hover:border-slate-400'}
                  `}>
                    {isSelected && <Sparkles className="w-3 h-3 text-white" />}
                  </div>
                  <div>
                    <h4 className={`font-medium ${isSelected ? 'text-brand-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{chapter.name}</h4>
                    {selectedTopicCount > 0 && (
                      <span className="text-xs text-brand-600 dark:text-brand-400">{selectedTopicCount} topics selected</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={(e) => openTopicSidebar(e, chapter.id)}
                  className="p-2 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors z-10"
                >
                  {t.selectTopics}
                </button>
              </div>
             );
          })}
        </div>
        
        <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
           <button
             disabled={selectedChapters.length === 0}
             onClick={() => { soundManager.play('click'); setView(AppView.QUIZ_SETUP); }}
             className={`w-full py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2
               ${selectedChapters.length > 0 
                 ? 'bg-brand-500 hover:bg-brand-400 text-white shadow-lg shadow-brand-500/20' 
                 : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'}
             `}
           >
             {t.continueSetup} <ChevronRight className="w-5 h-5" />
           </button>
        </div>

        {/* Topic Sidebar Overlay */}
        {activeTopicSidebar && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
              onClick={() => setActiveTopicSidebar(null)}
            />
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full border-l border-slate-200 dark:border-slate-700 shadow-2xl p-6 overflow-y-auto animate-slide-in-right">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedSubject.chapters.find(c => c.id === activeTopicSidebar)?.name}
                </h3>
                <button 
                  onClick={() => setActiveTopicSidebar(null)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full"
                >
                  <ChevronRight className="w-6 h-6 text-slate-500 dark:text-slate-400" />
                </button>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">Select Specific Topics</p>
                {selectedSubject.chapters
                  .find(c => c.id === activeTopicSidebar)
                  ?.topics.map(topic => {
                    const isTopicSelected = (selectedTopics[activeTopicSidebar] || []).includes(topic.id);
                    return (
                      <label 
                        key={topic.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer transition-colors"
                      >
                        <input 
                          type="checkbox"
                          className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-brand-500 focus:ring-brand-500 bg-slate-50 dark:bg-slate-700"
                          checked={isTopicSelected}
                          onChange={() => {
                            soundManager.play('click');
                            toggleTopic(activeTopicSidebar, topic.id);
                            if (!selectedChapters.includes(activeTopicSidebar)) {
                               toggleChapter(activeTopicSidebar);
                            }
                          }}
                        />
                        <span className={isTopicSelected ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}>{topic.name}</span>
                      </label>
                    );
                  })
                }
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderQuizSetup = () => (
    <div className="w-full max-w-2xl mx-auto px-4 animate-fade-in-up">
      <div className="mb-8">
        <button 
          onClick={() => { soundManager.play('click'); setView(AppView.CHAPTER_SELECT); }}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <h2 className="text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">{t.configure}</h2>
        <p className="text-slate-500 dark:text-slate-400">{t.customize}</p>
      </div>

      <div className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl p-6 md:p-8 space-y-8 backdrop-blur-sm">
        
        {/* Question Count */}
        <div>
          <div className="flex justify-between mb-4">
            <label className="text-slate-700 dark:text-slate-200 font-medium flex items-center gap-2">
              <Settings2 className="w-4 h-4 text-brand-500 dark:text-brand-400" /> {t.numQuestions}
            </label>
            <span className="text-brand-600 dark:text-brand-400 font-bold text-xl">{quizConfig.questionCount}</span>
          </div>
          <input 
            type="range" 
            min="5" 
            max="50" 
            step="5"
            value={quizConfig.questionCount}
            onChange={(e) => setQuizConfig({...quizConfig, questionCount: parseInt(e.target.value)})}
            className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
          <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-2">
            <span>5</span>
            <span>25</span>
            <span>50</span>
          </div>
        </div>

        {/* Custom Prompt */}
        <div>
          <label className="block text-slate-700 dark:text-slate-200 font-medium mb-3">
             {t.customInst}
          </label>
          <textarea
            value={quizConfig.customPrompt}
            onChange={(e) => setQuizConfig({...quizConfig, customPrompt: e.target.value})}
            placeholder={t.customPlaceholder}
            className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-xl p-4 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-brand-500 outline-none h-32 resize-none"
          />
        </div>

        <button
          onClick={startQuizGeneration}
          disabled={isLoading}
          className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white shadow-xl shadow-brand-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <>
              <Loader className="w-6 h-6 animate-spin" />
              {t.generating}
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-current" />
              {t.startQuiz}
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-brand-500/30 selection:text-brand-700 dark:selection:text-brand-200 overflow-x-hidden transition-colors duration-300">
      {/* Background ambient light */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-teal-500/5 dark:bg-teal-500/10 rounded-full blur-[100px]" />
      </div>

      <nav className="relative z-10 w-full p-6 flex justify-between items-center border-b border-slate-200 dark:border-white/5 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md sticky top-0">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView(AppView.HOME)}>
           <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
             <span className="font-display font-bold text-white text-xl">N</span>
           </div>
           <span className="font-display font-bold text-xl tracking-tight text-slate-900 dark:text-white">NEET.ai</span>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Language Toggle */}
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors text-slate-600 dark:text-slate-300"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm font-medium">{language === 'en' ? 'English' : 'हिंदी'}</span>
          </button>
        </div>
      </nav>

      <main className="relative z-10 container mx-auto py-8 flex flex-col items-center min-h-[calc(100vh-80px)]">
        {view === AppView.HOME && renderHome()}
        {view === AppView.CHAPTER_SELECT && renderChapterSelect()}
        {view === AppView.QUIZ_SETUP && renderQuizSetup()}
        {view === AppView.QUIZ_RUNNING && (
          <QuizInterface 
            questions={quizQuestions} 
            language={language}
            onComplete={(res) => {
              setQuizResult(res);
              setView(AppView.RESULTS);
            }} 
          />
        )}
        {view === AppView.RESULTS && quizResult && (
          <ResultsView 
            result={quizResult} 
            language={language}
            onHome={() => {
              soundManager.play('click');
              setView(AppView.HOME);
            }}
            onRetry={() => {
              soundManager.play('click');
              setView(AppView.QUIZ_SETUP);
            }}
          />
        )}
        {view === AppView.VIP_DOUBTS && (
          <VipDoubts onBack={() => {
            soundManager.play('click');
            setView(AppView.HOME);
          }} />
        )}
      </main>
    </div>
  );
};

export default App;
