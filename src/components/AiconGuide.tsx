
import { useState } from 'react';
import { ArrowLeft, Search, BarChart3, Building, Calculator, FileText, Play, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AiconGuideProps {
  onBack: () => void;
}

const AiconGuide = ({ onBack }: AiconGuideProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    {
      id: 'analysis',
      title: '사업성 분석',
      icon: BarChart3,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      functions: [
        { name: '수지분석', description: '예상 수익과 비용 계산', tutorial: '동영상 3분' },
        { name: '자금조달 계획', description: '조합원 분담금 및 대출 계획', tutorial: '동영상 5분' },
        { name: '시장성 검토', description: '인근 시세 및 분양성 분석', tutorial: '이미지 가이드' }
      ]
    },
    {
      id: 'design',
      title: '조감도 생성',
      icon: Building,
      color: 'bg-green-100 text-green-700 border-green-200',
      functions: [
        { name: '3D 조감도', description: '실제와 같은 3차원 시각화', tutorial: '동영상 4분' },
        { name: '평면도 생성', description: '층별 상세 평면도 작성', tutorial: '동영상 6분' },
        { name: '배치도 계획', description: '건물 배치 및 조경 계획', tutorial: '이미지 가이드' }
      ]
    },
    {
      id: 'calculation',
      title: '비례율 분석',
      icon: Calculator,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      functions: [
        { name: '용적률 계산', description: '법정 용적률 대비 계획 용적률', tutorial: '동영상 3분' },
        { name: '건폐율 검토', description: '대지면적 대비 건축면적 비율', tutorial: '이미지 가이드' },
        { name: '조합원 분배', description: '기존 대비 신축 면적 배분', tutorial: '동영상 7분' }
      ]
    },
    {
      id: 'documents',
      title: '서류 작성',
      icon: FileText,
      color: 'bg-orange-100 text-orange-700 border-orange-200',
      functions: [
        { name: '추진위 구성', description: '추진위원회 구성 서류 작성', tutorial: '동영상 8분' },
        { name: '조합설립 서류', description: '조합설립 인가 신청서류', tutorial: '동영상 10분' },
        { name: '사업계획서', description: '정비사업 시행계획서 작성', tutorial: '동영상 12분' }
      ]
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.functions.some(func => 
      func.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      func.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleFunctionClick = (categoryTitle: string, functionName: string) => {
    console.log(`Opening tutorial for ${categoryTitle} - ${functionName}`);
    // Here you would implement the tutorial opening logic
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
          <h1 className="text-xl font-semibold">AICON 사용 가이드</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="기능을 검색해보세요..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {selectedCategory ? (
          // Function Detail View
          <div>
            <Button
              variant="ghost"
              onClick={() => setSelectedCategory(null)}
              className="mb-4 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              카테고리로 돌아가기
            </Button>
            
            {categories
              .find(cat => cat.id === selectedCategory)
              ?.functions.map((func, index) => (
                <Card key={index} className="mb-4">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{func.name}</CardTitle>
                        <CardDescription>{func.description}</CardDescription>
                      </div>
                      <Badge variant="secondary" className="ml-4">
                        {func.tutorial}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleFunctionClick(
                          categories.find(cat => cat.id === selectedCategory)?.title || '',
                          func.name
                        )}
                      >
                        <Play className="w-4 h-4 mr-2" />
                        튜토리얼 보기
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        지금 실행하기
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          // Category Grid View
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">주요 기능별 가이드</h2>
            
            {filteredCategories.map((category) => (
              <Card
                key={category.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setSelectedCategory(category.id)}
              >
                <CardHeader>
                  <div className="flex items-center">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mr-4 ${category.color}`}>
                      <category.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                      <CardDescription>
                        {category.functions.length}개 기능 • 상세 가이드 제공
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.functions.slice(0, 3).map((func, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {func.name}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>검색 결과가 없습니다.</p>
                <p className="text-sm">다른 키워드로 검색해보세요.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AiconGuide;
