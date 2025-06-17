
import { useState } from 'react';
import { MessageCircle, BookOpen, Settings, Calendar, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ChatScreen from '@/components/ChatScreen';
import AiconGuide from '@/components/AiconGuide';
import ConsultationScreen from '@/components/ConsultationScreen';
import MyPage from '@/components/MyPage';

const Index = () => {
  const [activeScreen, setActiveScreen] = useState('home');

  const recentQuestions = [
    "접도율이 뭐예요?",
    "재건축 추진위원회 구성 방법은?",
    "AICON에서 사업수지 분석 어디서 하나요?",
    "정비사업 조합설립 절차가 궁금해요",
    "용적률 계산 방법을 알려주세요"
  ];

  const renderScreen = () => {
    switch (activeScreen) {
      case 'chat':
        return <ChatScreen onBack={() => setActiveScreen('home')} />;
      case 'aicon':
        return <AiconGuide onBack={() => setActiveScreen('home')} />;
      case 'consultation':
        return <ConsultationScreen onBack={() => setActiveScreen('home')} />;
      case 'mypage':
        return <MyPage onBack={() => setActiveScreen('home')} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            {/* Header */}
            <div className="bg-slate-800 text-white p-6 pb-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">재건축 도우미</h1>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveScreen('mypage')}
                  className="text-white hover:bg-slate-700"
                >
                  <User className="w-5 h-5" />
                </Button>
              </div>
              
              <div className="text-center">
                <h2 className="text-xl font-semibold mb-2">무엇이 궁금하신가요?</h2>
                <p className="text-slate-300 text-sm">AI가 재건축 관련 질문에 답변해드립니다</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="px-4 -mt-4 pb-20">
              {/* AI Chat Start Button */}
              <Card className="mb-6 shadow-lg border-0">
                <CardContent className="p-4">
                  <Button
                    onClick={() => setActiveScreen('chat')}
                    className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-medium text-lg"
                  >
                    <MessageCircle className="w-6 h-6 mr-3" />
                    AI와 채팅 시작하기
                  </Button>
                </CardContent>
              </Card>

              {/* Service Cards */}
              <div className="grid gap-4 mb-8">
                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-blue-600"
                  onClick={() => setActiveScreen('chat')}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <BookOpen className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">재건축 질문하기</CardTitle>
                        <CardDescription>용어, 법률, 판례 등 전문 지식</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-green-500"
                  onClick={() => setActiveScreen('aicon')}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                        <Settings className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">AICON 사용법</CardTitle>
                        <CardDescription>자사 솔루션 이용 가이드</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                <Card 
                  className="cursor-pointer hover:shadow-lg transition-shadow border-l-4 border-l-orange-500"
                  onClick={() => setActiveScreen('consultation')}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                        <Calendar className="w-6 h-6 text-orange-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">상담 신청하기</CardTitle>
                        <CardDescription>온라인·오프라인 전문 상담</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>

              {/* Recent Questions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Search className="w-5 h-5 mr-2 text-slate-600" />
                    최근 많이 묻는 질문
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {recentQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="ghost"
                        className="w-full justify-start text-left h-auto p-3 hover:bg-slate-50"
                        onClick={() => setActiveScreen('chat')}
                      >
                        <div className="text-sm text-slate-700">Q. {question}</div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Floating Chat Button */}
            <div className="fixed bottom-6 right-6">
              <Button
                onClick={() => setActiveScreen('chat')}
                className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
              >
                <MessageCircle className="w-6 h-6" />
              </Button>
            </div>
          </div>
        );
    }
  };

  return renderScreen();
};

export default Index;
