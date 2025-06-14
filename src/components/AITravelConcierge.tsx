
import React, { useState } from 'react';
import { MessageCircle, X, Send, Mic, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AITravelConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI travel guide for Zimbabwe. What kind of adventure are you looking for?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputMessage),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
    
    setInputMessage('');
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    if (input.includes('victoria falls')) {
      return "Victoria Falls is spectacular! I recommend visiting during April-June for the best water flow. Would you like me to suggest helicopter tours or walking trails?";
    } else if (input.includes('safari') || input.includes('wildlife')) {
      return "For an amazing safari experience, Hwange National Park has the largest elephant population in Zimbabwe. Mana Pools offers incredible walking safaris. What's your budget range?";
    } else if (input.includes('culture') || input.includes('history')) {
      return "Great Zimbabwe ruins are perfect for history lovers! I can also recommend traditional Shona sculpture galleries in Harare. Interested in cultural festivals?";
    } else {
      return "That sounds interesting! Based on your preferences, I'd recommend starting with Victoria Falls, then exploring our national parks. What type of accommodation do you prefer?";
    }
  };

  const toggleVoice = () => {
    setIsListening(!isListening);
    // Voice recognition would be implemented here
  };

  return (
    <>
      {/* Floating AI Avatar Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 hover:from-orange-600 hover:via-red-600 hover:to-pink-600 shadow-2xl animate-pulse"
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </Button>
      </div>

      {/* AI Chat Interface */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 h-[500px] z-50 bg-black/90 backdrop-blur-xl border border-orange-500/30 shadow-2xl">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-orange-500/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">AI Travel Guide</h3>
                  <p className="text-orange-300 text-xs">Your Zimbabwe Expert</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-orange-500/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.isUser
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                        : 'bg-gray-800 text-gray-100 border border-orange-500/20'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-orange-500/30">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about Zimbabwe..."
                  className="bg-gray-800 border-orange-500/30 text-white placeholder:text-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={toggleVoice}
                  variant="outline"
                  size="sm"
                  className={`border-orange-500/30 ${
                    isListening ? 'bg-red-500/20 text-red-400' : 'text-orange-400'
                  }`}
                >
                  <Mic className="h-4 w-4" />
                </Button>
                <Button
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};

export default AITravelConcierge;
