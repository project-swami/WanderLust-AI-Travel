'use client';

import { useState, useRef, useEffect } from 'react';
import { useChat } from 'ai/react';
import { Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ChatMessage } from './chat-message';
import { generateMockItinerary } from '@/lib/mock-data';
import type { Itinerary } from '@/types/itinerary';

interface ChatInterfaceProps {
  onNewItinerary: (itinerary: Itinerary) => void;
  onGeneratingChange: (generating: boolean) => void;
}

export function ChatInterface({
  onNewItinerary,
  onGeneratingChange,
}: ChatInterfaceProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: '/api/chat',
      onResponse: async () => {
        setIsGenerating(true);
        onGeneratingChange(true);
        
        // Simulate itinerary generation delay
        setTimeout(() => {
          const newItinerary = generateMockItinerary();
          onNewItinerary(newItinerary);
          setIsGenerating(false);
          onGeneratingChange(false);
        }, 2000);
      },
    });

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    handleSubmit(e);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-900">Chat with AI</h3>
        {isGenerating && (
          <div className="flex items-center space-x-2 text-sm text-blue-600">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Generating itinerary...</span>
          </div>
        )}
      </div>

      <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
        <div className="space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-8">
              <div className="text-gray-500 text-sm mb-4">
                Start planning your perfect trip!
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <p>Try: "Plan a 3-day trip to Tokyo"</p>
                <p>Or: "What are the best beaches in Bali?"</p>
              </div>
            </div>
          )}
          
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={onSubmit} className="flex space-x-2 pt-4 border-t border-gray-200">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about destinations, activities, or travel tips..."
          className="wanderlens-input flex-1"
          disabled={isLoading}
        />
        <Button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="wanderlens-button px-4"
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
}