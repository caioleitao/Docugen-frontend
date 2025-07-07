
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, FileText, MoreHorizontal } from "lucide-react";

interface PatientCardProps {
  patient: {
    id: number;
    name: string;
    age: number;
    condition: string;
    lastUpdate: string;
  };
}

const PatientCard = ({ patient }: PatientCardProps) => {
  return (
    <Card className="transition-all duration-200 hover:shadow-md border-l-4 border-l-blue-500">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h3 className="font-semibold text-gray-900">{patient.name}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {patient.age} anos
                </div>
                <Badge variant="outline" className="text-xs">
                  {patient.condition}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                Última atualização: {patient.lastUpdate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              <FileText className="h-4 w-4 mr-1" />
              Ver Docs
            </Button>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientCard;
