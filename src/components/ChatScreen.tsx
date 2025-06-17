
import { useState } from 'react';
import { ArrowLeft, Send, User, Bot, BookOpen, Gavel, Settings, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ChatScreenProps {
  onBack: () => void;
}

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  links?: string[];
  summary?: string;
}

const ChatScreen = ({ onBack }: ChatScreenProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: '안녕하세요! 재건축 관련 궁금한 점을 언제든 물어보세요. 아래 예시를 참고하시거나 직접 질문해주세요.',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickQuestions = [
    { icon: BookOpen, text: '용어 질문', color: 'bg-blue-100 text-blue-700' },
    { icon: Gavel, text: '법률 판례', color: 'bg-purple-100 text-purple-700' },
    { icon: Settings, text: 'AICON 기능', color: 'bg-green-100 text-green-700' },
    { icon: Calendar, text: '상담 신청', color: 'bg-orange-100 text-orange-700' },
  ];

  const exampleQuestions = [
    "접도율이 뭐예요?",
    "AICON에서 사업수지 분석은 어디서 하나요?",
    "온·오프 상담 어떻게 신청하나요?"
  ];

  const handleSend = () => {
    if (inputValue.trim()) {
      const userMessage: Message = {
        id: messages.length + 1,
        type: 'user',
        content: inputValue,
        timestamp: new Date(),
      };

      const botResponse: Message = {
        id: messages.length + 2,
        type: 'bot',
        content: `"${inputValue}"에 대해 답변드리겠습니다. 접도율은 건축물의 대지가 도로에 접한 길이의 비율을 의미하며, 재건축 시 중요한 검토 사항 중 하나입니다. 건축법상 접도율 기준을 충족해야 건축허가를 받을 수 있습니다.`,
        timestamp: new Date(),
        links: ['관련 법령 보기', '유사 판례 검색'],
        summary: '접도율은 대지가 도로에 접한 길이의 비율로, 재건축 허가의 필수 검토사항입니다.'
      };

      setMessages([...messages, userMessage, botResponse]);
      setInputValue('');
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 text-white p-4 flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="text-white hover:bg-slate-700 mr-3"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-xl font-semibold">AI 재건축 상담</h1>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.type === 'user' ? 'bg-blue-600 ml-2' : 'bg-gray-600 mr-2'
              }`}>
                {message.type === 'user' ? (
                  <User className="w-4 h-4 text-white" />
                ) : (
                  <Bot className="w-4 h-4 text-white" />
                )}
              </div>
              <Card className={message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-white'}>
                <CardContent className="p-3">
                  <p className="text-sm">{message.content}</p>
                  {message.summary && (
                    <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">
                      💡 {message.summary}
                    </Badge>
                  )}
                  {message.links && (
                    <div className="mt-2 space-x-2">
                      {message.links.map((link, index) => (
                        <Button key={index} variant="outline" size="sm" className="text-xs">
                          🔍 {link}
                        </Button>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Questions */}
      <div className="p-4 bg-white border-t">
        <p className="text-sm text-gray-600 mb-2">빠른 질문 예시:</p>
        <div className="flex gap-2 mb-3 overflow-x-auto">
          {exampleQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="whitespace-nowrap text-xs"
              onClick={() => handleQuickQuestion(question)}
            >
              {question}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2 mb-4">
          {quickQuestions.map((item, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className={`${item.color} border-none font-medium`}
            >
              <item.icon className="w-4 h-4 mr-1" />
              {item.text}
            </Button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="궁금한 점을 자유롭게 질문해주세요..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
