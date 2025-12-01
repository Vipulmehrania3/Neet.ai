import React, { useState, useRef } from 'react';
import { Upload, X, Send, Loader2, Image as ImageIcon } from 'lucide-react';
import { resolveDoubt } from '../services/geminiService';
import { soundManager } from '../services/soundService';

interface VipDoubtsProps {
  onBack: () => void;
}

const VipDoubts: React.FC<VipDoubtsProps> = ({ onBack }) => {
  const [prompt, setPrompt] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        soundManager.play('click');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!prompt && !image) return;
    
    setIsLoading(true);
    soundManager.play('start');
    
    try {
      const result = await resolveDoubt(image, prompt);
      setResponse(result);
      soundManager.play('success');
    } catch (error) {
      setResponse("Failed to get a response. Please try again.");
      soundManager.play('error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    setPrompt('');
    setResponse(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    soundManager.play('click');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 animate-fade-in-up">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">
          VIP Doubts
        </h2>
        <button 
          onClick={onBack}
          className="text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
            
            {/* Image Drop/Preview */}
            <div 
              className={`relative border-2 border-dashed rounded-xl h-48 flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden
                ${image ? 'border-amber-500/50 bg-slate-900' : 'border-slate-600 hover:border-slate-400 hover:bg-slate-700/30'}`}
              onClick={() => !image && fileInputRef.current?.click()}
            >
              {image ? (
                <>
                  <img src={image} alt="Preview" className="h-full w-full object-contain" />
                  <button 
                    onClick={(e) => { e.stopPropagation(); setImage(null); }}
                    className="absolute top-2 right-2 p-1 bg-black/60 rounded-full hover:bg-red-500/80 transition-colors"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                </>
              ) : (
                <div className="text-center p-4">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-300">Click to upload image</p>
                  <p className="text-xs text-slate-500 mt-1">Supports crop automatically</p>
                </div>
              )}
              <input 
                ref={fileInputRef}
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload}
              />
            </div>

            {/* Prompt Input */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Ask your question
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your question here or upload a photo of the problem..."
                className="w-full bg-slate-900/50 border border-slate-600 rounded-xl p-3 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none h-32"
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={handleClear}
                className="px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                disabled={isLoading || (!prompt && !image)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all
                  ${isLoading || (!prompt && !image) 
                    ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-orange-500/25 active:scale-95'}`}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                {isLoading ? 'Solving...' : 'Ask AI'}
              </button>
            </div>
          </div>
        </div>

        {/* Response Section */}
        <div className="h-full min-h-[400px]">
          <div className="h-full bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm overflow-y-auto">
            {response ? (
              <div className="prose prose-invert prose-sm max-w-none">
                <h3 className="text-amber-400 font-display text-lg mb-4 flex items-center gap-2">
                  <div className="w-2 h-8 bg-amber-500 rounded-full"></div>
                  Solution
                </h3>
                <div className="whitespace-pre-wrap text-slate-200 leading-relaxed">
                  {response}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 opacity-50">
                <ImageIcon className="w-16 h-16 mb-4" />
                <p>Solution will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VipDoubts;