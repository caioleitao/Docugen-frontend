
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ClipboardList, GraduationCap, Heart, Award, PenTool } from "lucide-react";

interface TemplatePreviewProps {
  template: {
    id: number;
    name: string;
    description: string;
    fields: number;
    estimatedTime: string;
    type: 'evaluation' | 'educational' | 'progress' | 'test' | 'certificate' | 'therapy' | 'fill';
  };
}

const TemplatePreview = ({ template }: TemplatePreviewProps) => {
  const getIcon = () => {
    switch (template.type) {
      case 'evaluation': return <FileText className="h-4 w-4" />;
      case 'educational': return <GraduationCap className="h-4 w-4" />;
      case 'progress': return <ClipboardList className="h-4 w-4" />;
      case 'test': return <ClipboardList className="h-4 w-4" />;
      case 'therapy': return <Heart className="h-4 w-4" />;
      case 'certificate': return <Award className="h-4 w-4" />;
      case 'fill': return <PenTool className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getPreviewContent = () => {
    switch (template.type) {
      case 'evaluation':
        return (
          <div className="space-y-3 text-xs animate-fade-in">
            <div className="font-semibold text-gray-800 border-b border-gray-200 pb-1">Relatório de Avaliação</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Nome:</span>
                <div className="border-b border-dotted border-gray-300 flex-1 ml-2"></div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data:</span>
                <div className="border-b border-dotted border-gray-300 flex-1 ml-2"></div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avaliação:</span>
                <div className="border-b border-dotted border-gray-300 flex-1 ml-2"></div>
              </div>
              <div className="mt-2">
                <div className="text-gray-600 text-xs mb-1">Observações:</div>
                <div className="space-y-1">
                  <div className="border-b border-dotted border-gray-300 w-full"></div>
                  <div className="border-b border-dotted border-gray-300 w-full"></div>
                  <div className="border-b border-dotted border-gray-300 w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'educational':
        return (
          <div className="space-y-3 text-xs animate-fade-in">
            <div className="font-semibold text-gray-800 border-b border-gray-200 pb-1">Plano Educacional Individual</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Estudante:</span>
                <div className="border-b border-dotted border-gray-300 flex-1 ml-2"></div>
              </div>
              <div className="mt-2">
                <div className="text-gray-600 text-xs mb-1">Objetivos:</div>
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 border border-gray-400"></div>
                    <div className="border-b border-dotted border-gray-300 flex-1"></div>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 border border-gray-400"></div>
                    <div className="border-b border-dotted border-gray-300 flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'test':
        return (
          <div className="space-y-3 text-xs animate-fade-in">
            <div className="font-semibold text-gray-800 border-b border-gray-200 pb-1">Prova - Múltipla Escolha</div>
            <div className="space-y-2">
              <div className="text-gray-700 font-medium">1. Qual é a capital do Brasil?</div>
              <div className="space-y-1 ml-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                  <span className="text-gray-600">a) São Paulo</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                  <span className="text-gray-600">b) Rio de Janeiro</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-gray-400 rounded-full bg-blue-100"></div>
                  <span className="text-gray-600">c) Brasília</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border border-gray-400 rounded-full"></div>
                  <span className="text-gray-600">d) Salvador</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'therapy':
        return (
          <div className="space-y-3 text-xs animate-fade-in">
            <div className="font-semibold text-gray-800 border-b border-gray-200 pb-1">Ficha de Terapia</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Cliente:</span>
                <div className="border-b border-dotted border-gray-300 flex-1 ml-2"></div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sessão:</span>
                <div className="border-b border-dotted border-gray-300 flex-1 ml-2"></div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Humor:</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5].map(i => (
                    <div key={i} className={`w-3 h-3 rounded-full border border-gray-400 ${i <= 3 ? 'bg-yellow-200' : ''}`}></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'fill':
        return (
          <div className="space-y-3 text-xs animate-fade-in">
            <div className="font-semibold text-gray-800 border-b border-gray-200 pb-1">Redação - Preenchimento</div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Tema:</span>
                <div className="border-b border-dotted border-gray-300 flex-1 ml-2"></div>
              </div>
              <div className="mt-3 space-y-2">
                <div className="border-b border-gray-300 w-full h-px"></div>
                <div className="border-b border-gray-300 w-full h-px"></div>
                <div className="border-b border-gray-300 w-full h-px"></div>
                <div className="border-b border-gray-300 w-full h-px"></div>
                <div className="border-b border-gray-300 w-3/4 h-px"></div>
              </div>
            </div>
          </div>
        );
      case 'certificate':
        return (
          <div className="space-y-3 text-xs animate-fade-in">
            <div className="text-center">
              <div className="font-bold text-gray-800 text-sm border-2 border-gray-300 p-2 rounded">
                CERTIFICADO
              </div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-gray-600">Certificamos que</div>
              <div className="border-b border-dotted border-gray-300 w-3/4 mx-auto"></div>
              <div className="text-gray-600 text-xs">participou do curso de</div>
              <div className="border-b border-dotted border-gray-300 w-full"></div>
              <div className="mt-2 text-gray-500 text-xs">Data: ___/___/___</div>
            </div>
          </div>
        );
      default:
        return <div className="text-xs text-gray-500 animate-fade-in">Preview não disponível</div>;
    }
  };

  return (
    <Card className="bg-white/40 backdrop-blur-sm border-white/20 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-102">
      <CardContent className="p-4 h-full min-h-[200px]">
        <div className="flex items-start gap-2 mb-3">
          <div className="text-blue-600">{getIcon()}</div>
          <div className="text-sm font-medium text-blue-700 line-clamp-1">{template.name}</div>
        </div>
        <div className="overflow-hidden h-full">
          {getPreviewContent()}
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplatePreview;
