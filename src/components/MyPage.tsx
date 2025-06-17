
import { useState } from 'react';
import { ArrowLeft, MessageCircle, Calendar, Clock, User, Phone, Bell, BellOff, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface MyPageProps {
  onBack: () => void;
}

const MyPage = ({ onBack }: MyPageProps) => {
  const [notifications, setNotifications] = useState(true);

  // Mock data
  const recentQuestions = [
    {
      id: 1,
      question: "접도율이 뭐예요?",
      timestamp: "2024-06-15 14:30",
      answered: true
    },
    {
      id: 2,
      question: "AICON에서 사업수지 분석은 어디서 하나요?",
      timestamp: "2024-06-14 10:15",
      answered: true
    },
    {
      id: 3,
      question: "재건축 추진위원회 구성 방법은?",
      timestamp: "2024-06-13 16:45",
      answered: true
    }
  ];

  const consultations = [
    {
      id: "CONS12345678",
      type: "온라인",
      category: "AICON 사용문의",
      status: "예약완료",
      scheduledDate: "2024-06-20",
      scheduledTime: "14:00",
      requestDate: "2024-06-15"
    },
    {
      id: "CONS12345679",
      type: "오프라인",
      category: "정비사업 요건",
      status: "상담완료",
      scheduledDate: "2024-06-10",
      scheduledTime: "15:00",
      requestDate: "2024-06-08"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case '예약완료':
        return 'bg-blue-100 text-blue-700';
      case '상담완료':
        return 'bg-green-100 text-green-700';
      case '취소':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-slate-800 text-white p-4">
        <div className="flex items-center mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-slate-700 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">마이페이지</h1>
        </div>
        
        <div className="flex items-center">
          <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center mr-4">
            <User className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-medium">사용자님</h2>
            <p className="text-sm text-slate-300">재건축 도우미를 이용해주셔서 감사합니다</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Notifications Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Bell className="w-5 h-5 mr-2" />
              알림 설정
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="text-base">상담 일정 리마인드</Label>
                <p className="text-sm text-gray-600">상담 예정일 1일 전 알림을 받습니다</p>
              </div>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent Questions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              나의 질문 내역
            </CardTitle>
            <CardDescription>최근 AI에게 질문한 내용들입니다</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentQuestions.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{item.question}</p>
                    <p className="text-xs text-gray-500 mt-1">{item.timestamp}</p>
                  </div>
                  <div className="flex items-center ml-4">
                    {item.answered && (
                      <Badge variant="secondary" className="text-xs mr-2">답변완료</Badge>
                    )}
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
            
            {recentQuestions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>아직 질문한 내역이 없습니다.</p>
                <p className="text-sm">AI에게 궁금한 점을 물어보세요!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Consultation Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              상담 접수 현황
            </CardTitle>
            <CardDescription>신청한 상담의 진행 상황을 확인하세요</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultations.map((consultation) => (
                <Card key={consultation.id} className="border-l-4 border-l-blue-500">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {consultation.type}
                          </Badge>
                          <Badge className={`text-xs ${getStatusColor(consultation.status)}`}>
                            {consultation.status}
                          </Badge>
                        </div>
                        <h3 className="font-medium text-gray-800">{consultation.category}</h3>
                      </div>
                      <p className="text-xs text-gray-500">#{consultation.id}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">신청일</p>
                        <p className="font-medium">{consultation.requestDate}</p>
                      </div>
                      {consultation.status === '예약완료' && (
                        <div>
                          <p className="text-gray-600">예정일시</p>
                          <p className="font-medium text-blue-600">
                            {consultation.scheduledDate} {consultation.scheduledTime}
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {consultation.status === '예약완료' && (
                      <div className="mt-3 p-2 bg-blue-50 rounded-lg">
                        <div className="flex items-center text-blue-700 text-sm">
                          <Clock className="w-4 h-4 mr-2" />
                          상담 예정일이 다가오고 있습니다
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {consultations.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>신청한 상담이 없습니다.</p>
                <p className="text-sm">전문가 상담을 신청해보세요!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4 pb-6">
          <Button variant="outline" className="h-12" onClick={onBack}>
            새로운 질문하기
          </Button>
          <Button variant="outline" className="h-12" onClick={onBack}>
            상담 신청하기
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
