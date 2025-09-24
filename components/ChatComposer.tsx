'use client';

import { useState } from 'react';
import { Send, Loader2, Sparkles, MessageCircle } from 'lucide-react';

interface ChatComposerProps {
  onSend: (message: string) => void;
  isLoading?: boolean;
  hasResults?: boolean;
  placeholder?: string;
}

export function ChatComposer({ 
  onSend, 
  isLoading = false, 
  hasResults = false,
  placeholder = "Ask about your itinerary or request changes..." 
}: ChatComposerProps) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading || !hasResults) return;
    
    onSend(message.trim());
    setMessage('');
  };

  const handleChipClick = (chipText: string) => {
    if (!hasResults || isLoading) return;
    onSend(chipText);
  };
  const suggestions = [
    "Cheaper dupes",
    "Eco-first", 
    "Make it kid-friendly",
    "Accessible stays"
  ];

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-6 shadow-sm transition-opacity duration-200 ${
      !hasResults ? 'opacity-50' : 'opacity-100'
    }`}>
      <div className="flex items-center space-x-2 mb-6">
        <MessageCircle className={`h-5 w-5 ${hasResults ? 'text-blue-500' : 'text-gray-400'}`} />
        <h3 className={`font-sans font-semibold tracking-tight leading-relaxed ${hasResults ? 'text-gray-900' : 'text-gray-500'}`}>
          Refine Your Itinerary
        </h3>
      </div>

      {/* Quick Suggestions */}
      <div className="flex flex-wrap gap-2 mb-6">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => handleChipClick(suggestion)}
            disabled={!hasResults || isLoading}
            className={`text-sm font-sans font-medium tracking-tight px-4 py-2 rounded-full border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              hasResults && !isLoading
                ? 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700'
                : 'bg-gray-50 border-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            aria-label={`Quick suggestion: ${suggestion}`}
          >
            {suggestion}
          </button>
        ))}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <label htmlFor="chat-input" className="sr-only">
          Chat message
        </label>
        <input
          id="chat-input"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={placeholder}
          disabled={isLoading || !hasResults}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-colors leading-relaxed"
        />
        <button
          type="submit"
          disabled={!message.trim() || isLoading || !hasResults}
          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-3 rounded-xl hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Send message"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Send className="h-5 w-5" />
          )}
        </button>
      </form>
      
      {!hasResults && (
        <p className="text-xs text-gray-500 mt-3 text-center leading-relaxed">
          Upload and analyze media first to start chatting
        </p>
      )}
    </div>
  );
}