
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

interface StepCardProps {
  step: number;
  title: string;
  completed: boolean;
  locked: boolean;
  active: boolean;
  onClick: () => void;
}

const StepCard = ({ step, title, completed, locked, active, onClick }: StepCardProps) => {
  return (
    <Card 
      className={cn(
        "transition-all duration-200 cursor-pointer border bg-white/60 backdrop-blur-sm border-white/30 shadow-sm hover:shadow-md",
        locked && "opacity-50 cursor-not-allowed bg-gray-50/30",
        active && !locked && "ring-1 ring-blue-400 border-blue-200 bg-blue-50/50",
        completed && "bg-green-50/50 border-green-200",
        !locked && !active && "hover:border-blue-200"
      )}
      onClick={locked ? undefined : onClick}
    >
      <CardContent className="flex items-center justify-between p-3">
        <div className="flex items-center gap-2">
          <div className={cn(
            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-colors duration-200",
            completed ? "bg-green-500 text-white" : 
            locked ? "bg-gray-300 text-gray-500" : 
            "bg-blue-500 text-white"
          )}>
            {completed ? <Check className="h-3 w-3" /> : locked ? <Lock className="h-3 w-3" /> : step}
          </div>
          <span className={cn(
            "text-sm font-medium transition-colors duration-200",
            completed ? "text-green-700" : locked ? "text-gray-500" : "text-gray-700"
          )}>
            {title}
          </span>
        </div>
        {completed && (
          <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
            Concluído
          </Badge>
        )}
        {locked && (
          <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-500">
            Bloqueado
          </Badge>
        )}
        {active && !completed && !locked && (
          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
            Ativo
          </Badge>
        )}
      </CardContent>
    </Card>
  );
};

export default StepCard;
