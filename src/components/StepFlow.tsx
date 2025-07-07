import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, FileText, Settings, Download, Plus, Eye, Printer, ArrowRight, ArrowLeft, CheckCircle, Sparkles } from "lucide-react";
import PersonCard from "./PersonCard";
import TemplateCard from "./TemplateCard";
import TemplatePreview from "./TemplatePreview";
import IdentityManager from "./IdentityManager";

interface StepFlowProps {
  people: any[];
  setPeople: (people: any[]) => void;
  selectedTemplate: any;
  setSelectedTemplate: (template: any) => void;
  onBuildDocument: () => void;
  currentStep: number;
  setCurrentStep: (step: number) => void;
}

const StepFlow = ({ people, setPeople, selectedTemplate, setSelectedTemplate, onBuildDocument, currentStep, setCurrentStep }: StepFlowProps) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const templates = [
    {
      id: 1,
      name: "Relatório de Avaliação",
      description: "Documento completo de avaliação personalizada",
      fields: 8,
      estimatedTime: "5 min",
      type: 'evaluation' as const
    },
    {
      id: 2,
      name: "Plano Educacional Individual",
      description: "PEI personalizado para estudantes",
      fields: 12,
      estimatedTime: "8 min",
      type: 'educational' as const
    },
    {
      id: 3,
      name: "Ficha de Progresso Terapêutico",
      description: "Acompanhamento de sessões e evolução",
      fields: 10,
      estimatedTime: "6 min",
      type: 'therapy' as const
    },
    {
      id: 4,
      name: "Prova Múltipla Escolha",
      description: "Avaliação com questões objetivas personalizáveis",
      fields: 15,
      estimatedTime: "10 min",
      type: 'test' as const
    },
    {
      id: 5,
      name: "Ficha de Preenchimento",
      description: "Redação ou atividade para completar",
      fields: 6,
      estimatedTime: "4 min",
      type: 'fill' as const
    },
    {
      id: 6,
      name: "Certificado de Participação",
      description: "Documento de reconhecimento",
      fields: 4,
      estimatedTime: "2 min",
      type: 'certificate' as const
    }
  ];

  const completionPercentage = Math.min(
    (people.length > 0 ? 25 : 0) +
    (selectedTemplate ? 25 : 0) +
    (currentStep >= 3 ? 25 : 0) +
    (currentStep >= 4 ? 25 : 0),
    100
  );

  const canProceedToStep = (step: number) => {
    switch (step) {
      case 1: return true;
      case 2: return people.length > 0;
      case 3: return people.length > 0 && selectedTemplate;
      case 4: return people.length > 0 && selectedTemplate;
      default: return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < 4 && canProceedToStep(currentStep + 1)) {
      setIsTransitioning(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStep(currentStep + 1);
      setIsTransitioning(false);
    }
  };

  const handlePrevious = async () => {
    if (currentStep > 1) {
      setIsTransitioning(true);
      await new Promise(resolve => setTimeout(resolve, 300));
      setCurrentStep(currentStep - 1);
      setIsTransitioning(false);
    }
  };

  const addSamplePerson = () => {
    const samples = [
      { id: Date.now(), name: "Maria Santos", age: 10, category: "Estudante", subcategory: "TDAH", lastUpdate: "hoje" },
      { id: Date.now() + 1, name: "João Silva", age: 15, category: "Estudante", subcategory: "Dislexia", lastUpdate: "1 dia" },
      { id: Date.now() + 2, name: "Ana Costa", age: 25, category: "Paciente", subcategory: "Terapia", lastUpdate: "2 dias" }
    ];
    const newPerson = samples[Math.floor(Math.random() * samples.length)];
    setPeople([...people, { ...newPerson, id: Date.now() + Math.random() }]);
  };

  const generateDocuments = () => {
    console.log(`Gerando ${people.length} documentos usando template: ${selectedTemplate.name}`);
    // Aqui seria implementada a lógica real de geração
    alert(`✅ ${people.length} documentos gerados com sucesso!`);
  };

  return (
    <div className="space-y-4">
      {/* Progress Header with Enhanced Animations */}
      <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-500">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="text-sm font-bold text-gray-700">Etapa {currentStep} de 4</span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                </div>
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 text-xs font-medium">
                  {completionPercentage}%
                </Badge>
              </div>
              <Progress value={completionPercentage} className="w-64 h-3 transition-all duration-1000" />
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="hover:bg-white/70 hover:scale-105 transition-all duration-200 disabled:opacity-30"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleNext}
                disabled={!canProceedToStep(currentStep + 1) || currentStep === 4}
                className="hover:bg-white/70 hover:scale-105 transition-all duration-200 disabled:opacity-30"
              >
                Próximo
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <span className="text-sm font-medium text-gray-700 animate-fade-in">
              {currentStep === 1 && "Cadastrando pessoas..."}
              {currentStep === 2 && "Selecionando template..."}
              {currentStep === 3 && "Personalizando campos..."}
              {currentStep === 4 && "Preparando documentos..."}
            </span>
            {currentStep === 4 && <Sparkles className="h-4 w-4 text-purple-500" />}
          </div>
        </CardContent>
      </Card>

      {/* Step Content with Smooth Transitions */}
      <div className={`transition-all duration-500 ${isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
        <div className="grid lg:grid-cols-3 gap-4">
          {/* Step 1 - People */}
          {currentStep === 1 && (
            <div className="lg:col-span-3 animate-fade-in">
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2">
                  <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2 text-blue-700 text-base">
                            <Users className="h-5 w-5" />
                            Pessoas Cadastradas
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            {people.length === 0 ? "Adicione pessoas para começar" : `${people.length} ${people.length === 1 ? 'pessoa cadastrada' : 'pessoas cadastradas'}`}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={addSamplePerson}
                          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-200 shadow-lg"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Adicionar
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 pt-0">
                      {people.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 animate-fade-in">
                          <Users className="h-12 w-12 mx-auto mb-3 opacity-50" />
                          <p className="text-sm">Nenhuma pessoa cadastrada ainda</p>
                          <p className="text-xs text-gray-400 mt-1">Clique em "Adicionar" para começar</p>
                        </div>
                      ) : (
                        <div className="grid gap-3 animate-fade-in">
                          {people.map((person, index) => (
                            <div key={person.id} className="animate-slide-in-right" style={{ animationDelay: `${index * 100}ms` }}>
                              <PersonCard person={person} />
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  <IdentityManager />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 - Template Selection */}
          {currentStep === 2 && (
            <>
              <div className="lg:col-span-2 animate-fade-in">
                <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 h-fit">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-blue-700 text-base">
                      <FileText className="h-5 w-5" />
                      Templates Disponíveis
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Escolha um template para personalizar
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid gap-3">
                      {templates.map((template, index) => (
                        <div key={template.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                          <TemplateCard 
                            template={template} 
                            selected={selectedTemplate?.id === template.id}
                            onSelect={() => setSelectedTemplate(template)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-blue-700 text-base flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Preview
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Visualização do template selecionado
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {selectedTemplate ? (
                      <div className="animate-scale-in">
                        <TemplatePreview template={selectedTemplate} />
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-400 animate-fade-in">
                        <FileText className="h-12 w-12 mx-auto mb-3 opacity-30" />
                        <p className="text-sm">Selecione um template</p>
                        <p className="text-xs mt-1">para ver a visualização</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Step 3 - Customize */}
          {currentStep === 3 && selectedTemplate && (
            <div className="lg:col-span-3 animate-fade-in">
              <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-purple-700 text-base">
                    <Settings className="h-5 w-5" />
                    Personalizar Template
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    Configure os campos e elementos do documento
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 animate-scale-in">
                      <TemplatePreview template={selectedTemplate} />
                    </div>
                    <div className="space-y-3 animate-fade-in" style={{ animationDelay: '300ms' }}>
                      <Button 
                        onClick={onBuildDocument} 
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full hover:scale-105 transition-all duration-200 shadow-lg"
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Abrir Editor Visual
                      </Button>
                      <div className="text-xs text-gray-600 space-y-2 bg-gray-50/50 p-3 rounded-lg">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {selectedTemplate.fields} campos editáveis
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          Tempo estimado: {selectedTemplate.estimatedTime}
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          {people.length} documentos serão gerados
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Step 4 - Generate */}
          {currentStep === 4 && selectedTemplate && people.length > 0 && (
            <div className="lg:col-span-3 animate-fade-in">
              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200/70 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-green-700 text-base">
                    <Download className="h-5 w-5" />
                    Pronto para Gerar!
                  </CardTitle>
                  <p className="text-sm text-green-600">
                    Gerar {people.length} documentos personalizados usando o template "{selectedTemplate.name}"
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid lg:grid-cols-3 gap-4">
                    <div className="lg:col-span-2 animate-scale-in">
                      <TemplatePreview template={selectedTemplate} />
                    </div>
                    <div className="space-y-3 animate-fade-in" style={{ animationDelay: '200ms' }}>
                      <Button 
                        onClick={generateDocuments}
                        className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 w-full hover:scale-105 transition-all duration-200 shadow-lg"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Gerar ({people.length})
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-green-300 text-green-700 hover:bg-green-50 w-full hover:scale-105 transition-all duration-200 shadow-sm"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                      <Button 
                        variant="outline" 
                        className="border-green-300 text-green-700 hover:bg-green-50 w-full hover:scale-105 transition-all duration-200 shadow-sm"
                      >
                        <Printer className="h-4 w-4 mr-2" />
                        Imprimir
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StepFlow;
