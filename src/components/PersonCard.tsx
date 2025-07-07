
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Calendar, FileText, MoreHorizontal } from "lucide-react";

interface PersonCardProps {
  person: {
    id: number;
    name: string;
    age: number;
    category: string;
    subcategory: string;
    lastUpdate: string;
  };
}

const PersonCard = ({ person }: PersonCardProps) => {
  return (
    <Card className="transition-all duration-200 hover:shadow-md border-l-2 border-l-blue-500 bg-white/60 backdrop-blur-sm border-white/30 shadow-sm">
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-blue-600" />
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-gray-900">{person.name}</h3>
              <div className="flex items-center gap-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {person.age} anos
                </div>
                <Badge variant="outline" className="text-xs bg-white/50">
                  {person.category}
                </Badge>
                <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                  {person.subcategory}
                </Badge>
              </div>
              <p className="text-xs text-gray-500">
                Última atualização: {person.lastUpdate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50/50 transition-colors">
              <FileText className="h-3 w-3 mr-1" />
              Docs
            </Button>
            <Button variant="ghost" size="sm" className="hover:bg-gray-50/50 transition-colors">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonCard;
