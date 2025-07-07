
import { useState } from "react";
import { FileText } from "lucide-react";
import StepFlow from "@/components/StepFlow";
import DocumentBuilder from "@/components/DocumentBuilder";

const Index = () => {
  const [people, setPeople] = useState([{
    id: 1,
    name: "Ana Silva",
    age: 8,
    category: "Estudante",
    subcategory: "Educação Especial",
    lastUpdate: "2 dias"
  }, {
    id: 2,
    name: "João Santos",
    age: 12,
    category: "Estudante",
    subcategory: "TDAH",
    lastUpdate: "1 semana"
  }]);
  
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showDocumentBuilder, setShowDocumentBuilder] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleBuildDocument = () => {
    setShowDocumentBuilder(true);
  };

  const handleBackFromBuilder = () => {
    setShowDocumentBuilder(false);
    // Retorna para a etapa 3 (personalização) em vez da etapa 1
    setCurrentStep(3);
  };

  if (showDocumentBuilder) {
    return (
      <DocumentBuilder 
        template={selectedTemplate} 
        people={people} 
        onBack={handleBackFromBuilder} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-300 to-blue-500 p-3">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Integrated Header */}
        <div className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm p-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Docugen
              </h1>
            </div>
            <div className="text-gray-700">
              Automatize a criação de documentos personalizados para qualquer contexto
            </div>
          </div>
        </div>

        {/* Main Flow */}
        <StepFlow 
          people={people}
          setPeople={setPeople}
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
          onBuildDocument={handleBuildDocument}
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
        />
      </div>
    </div>
  );
};

export default Index;
