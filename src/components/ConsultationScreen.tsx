
import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Phone, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

interface ConsultationScreenProps {
  onBack: () => void;
}

const ConsultationScreen = ({ onBack }: ConsultationScreenProps) => {
  const [isOnline, setIsOnline] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: '',
    preferredDate: '',
    preferredTime: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [consultationId, setConsultationId] = useState('');

  const consultationCategories = [
    { id: 'aicon', name: 'AICON 사용문의', color: 'bg-blue-100 text-blue-700' },
    { id: 'requirements', name: '정비사업 요건', color: 'bg-green-100 text-green-700' },
    { id: 'legal', name: '법률/세무', color: 'bg-purple-100 text-purple-700' },
    { id: 'finance', name: '자금조달', color: 'bg-orange-100 text-orange-700' },
    { id: 'procedure', name: '절차/일정', color: 'bg-red-100 text-red-700' },
    { id: 'other', name: '기타 문의', color: 'bg-gray-100 text-gray-700' }
  ];

  const timeSlots = [
    '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.category) {
      const id = 'CONS' + Date.now().toString().slice(-8);
      setConsultationId(id);
      setIsSubmitted(true);
      console.log('Consultation submitted:', { ...formData, id, type: isOnline ? 'online' : 'offline' });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-slate-800 text-white p-4 flex items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-slate-700 mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold">상담 신청 완료</h1>
        </div>

        <div className="p-4">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="text-center p-8">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-800 mb-2">신청이 완료되었습니다!</h2>
              <p className="text-green-700 mb-6">
                {isOnline ? '온라인' : '오프라인'} 상담이 접수되었습니다.
              </p>
              
              <div className="bg-white rounded-lg p-4 mb-6">
                <div className="text-left space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">접수번호:</span>
                    <Badge variant="outline" className="font-mono">{consultationId}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">상담유형:</span>
                    <span>{isOnline ? '온라인 상담' : '오프라인 상담'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">신청자:</span>
                    <span>{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">연락처:</span>
                    <span>{formData.phone}</span>
                  </div>
                  {formData.preferredDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">희망일시:</span>
                      <span>{formData.preferredDate} {formData.preferredTime}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm text-gray-600">
                  담당자가 1-2일 내에 연락드릴 예정입니다.
                </p>
                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      name: '', phone: '', email: '', category: '',
                      preferredDate: '', preferredTime: '', message: ''
                    });
                  }}>
                    추가 상담 신청
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={onBack}>
                    홈으로 돌아가기
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

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
          <h1 className="text-xl font-semibold">전문 상담 신청</h1>
        </div>
        
        <p className="text-slate-300 text-sm">
          재건축 전문가와 1:1 상담을 받아보세요
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-6">
        {/* Online/Offline Toggle */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">상담 방식 선택</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Label htmlFor="consultation-type" className="text-base">
                  {isOnline ? '온라인 상담' : '오프라인 상담'}
                </Label>
                <Badge variant={isOnline ? "default" : "secondary"}>
                  {isOnline ? '화상통화/전화' : '직접 방문'}
                </Badge>
              </div>
              <Switch
                id="consultation-type"
                checked={isOnline}
                onCheckedChange={setIsOnline}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {isOnline 
                ? '화상회의나 전화를 통한 원격 상담입니다.'
                : '사무실 방문을 통한 대면 상담입니다.'
              }
            </p>
          </CardContent>
        </Card>

        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <User className="w-5 h-5 mr-2" />
              연락처 정보
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">이름 *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="성함을 입력해주세요"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">연락처 *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="010-0000-0000"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="example@email.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Consultation Category */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">상담 항목 *</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {consultationCategories.map((category) => (
                <Button
                  key={category.id}
                  type="button"
                  variant={formData.category === category.id ? "default" : "outline"}
                  className={`h-auto p-3 text-left ${
                    formData.category === category.id ? '' : category.color
                  }`}
                  onClick={() => handleInputChange('category', category.id)}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preferred Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              희망 일정
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="date">희망 날짜</Label>
              <Input
                id="date"
                type="date"
                value={formData.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e.target.value)}
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label>희망 시간</Label>
              <div className="grid grid-cols-4 gap-2 mt-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={formData.preferredTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => handleInputChange('preferredTime', time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Additional Message */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">상담 내용</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              placeholder="상담받고 싶은 내용을 자세히 적어주세요..."
              className="min-h-[100px]"
            />
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="pb-6">
          <Button 
            type="submit" 
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-lg font-medium"
            disabled={!formData.name || !formData.phone || !formData.category}
          >
            상담 신청하기
          </Button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            개인정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ConsultationScreen;
