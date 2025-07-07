
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Clock, Settings, CheckCircle, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
  template: {
    id: number;
    name: string;
    description: string;
    fields: number;
    estimatedTime: string;
  };
  selected: boolean;
  onSelect: () => void;
}

const TemplateCard = ({ template, selected, onSelect }: TemplateCardProps) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-300 cursor-pointer hover:shadow-lg bg-white/70 backdrop-blur-sm border-white/40 shadow-md hover:scale-105 group",
        selected && "ring-2 ring-blue-400 border-blue-200 bg-gradient-to-r from-blue-50/80 to-purple-50/80 shadow-lg scale-105"
      )}
      onClick={onSelect}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110",
              selected ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg" : "bg-gray-100 text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600"
            )}>
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-sm font-semibold transition-colors duration-200 group-hover:text-blue-700">
                {template.name}
              </CardTitle>
              <CardDescription className="text-xs mt-1 text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                {template.description}
              </CardDescription>
            </div>
          </div>
          {selected && (
            <div className="animate-scale-in">
              <CheckCircle className="h-5 w-5 text-green-500 animate-pulse" />
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <div className="flex items-center gap-1 transition-colors duration-200 group-hover:text-blue-600">
              <Settings className="h-3 w-3" />
              {template.fields} campos
            </div>
            <div className="flex items-center gap-1 transition-colors duration-200 group-hover:text-purple-600">
              <Clock className="h-3 w-3" />
              {template.estimatedTime}
            </div>
          </div>
          <Button 
            variant={selected ? "default" : "outline"} 
            size="sm"
            className={cn(
              "transition-all duration-300 text-xs font-medium hover:scale-105",
              selected ? 
                "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg" : 
                "hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
            )}
          >
            {selected ? (
              <div className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                Selecionado
              </div>
            ) : (
              "Selecionar"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TemplateCard;
