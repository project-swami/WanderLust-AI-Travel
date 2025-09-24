import { Message } from 'ai';
import { Bot, User } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex space-x-3 animate-slide-up',
        isUser ? 'justify-end' : 'justify-start'
      )}
    >
      {!isUser && (
        <div className="wanderlens-gradient p-2 rounded-full h-8 w-8 flex-shrink-0">
          <Bot className="h-4 w-4 text-white" />
        </div>
      )}
      
      <div
        className={cn(
          'max-w-[80%] rounded-lg p-3 shadow-sm',
          isUser
            ? 'bg-blue-500 text-white ml-12'
            : 'bg-white border border-gray-200'
        )}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
      </div>
      
      {isUser && (
        <div className="bg-gray-100 p-2 rounded-full h-8 w-8 flex-shrink-0">
          <User className="h-4 w-4 text-gray-600" />
        </div>
      )}
    </div>
  );
}