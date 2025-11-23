import React, { useState } from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { getSauceRecommendation } from '../services/geminiService';
import { Button } from './Button';
import { Translation } from '../types';

interface Props {
  t: Translation['ai'];
  lang: string;
}

export const SauceSommelier: React.FC<Props> = ({ t, lang }) => {
  const [input, setInput] = useState('');
  const [recommendation, setRecommendation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const result = await getSauceRecommendation(input, lang);
    setRecommendation(result);
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-brand-dark to-brand-gray border border-brand-yellow/30 rounded-2xl p-6 my-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-yellow/10 rounded-full blur-xl"></div>
      
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="text-brand-yellow animate-pulse" />
        <h3 className="text-xl font-display text-brand-yellow uppercase">{t.title}</h3>
      </div>
      
      <p className="text-gray-300 mb-4 text-sm">{t.prompt}</p>
      
      <div className="flex gap-2 flex-col sm:flex-row">
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t.placeholder}
          className="flex-1 bg-black/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-yellow"
        />
        <Button onClick={handleAsk} disabled={loading || !input}>
          {loading ? <Loader2 className="animate-spin" /> : t.button}
        </Button>
      </div>

      {recommendation && (
        <div className="mt-4 p-4 bg-brand-yellow/10 border border-brand-yellow/20 rounded-lg animate-fade-in">
          <p className="text-brand-yellow font-bold text-sm mb-1">{t.result}</p>
          <p className="text-white italic">"{recommendation}"</p>
        </div>
      )}
    </div>
  );
};
