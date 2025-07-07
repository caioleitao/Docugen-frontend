
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { User, Building2, Briefcase, Mail, Plus, Check, Trash2, Edit } from "lucide-react";
import { Identity, useIdentity } from "@/hooks/useIdentity";

const IdentityManager = () => {
  const { identities, selectedIdentity, saveIdentity, deleteIdentity, selectIdentity } = useIdentity();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    institution: '',
    role: '',
    contact: '',
    logoUrl: '',
    signature: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveIdentity = () => {
    if (formData.name && formData.institution && formData.role) {
      saveIdentity(formData);
      setFormData({
        name: '',
        institution: '',
        role: '',
        contact: '',
        logoUrl: '',
        signature: ''
      });
      setIsCreateDialogOpen(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      institution: '',
      role: '',
      contact: '',
      logoUrl: '',
      signature: ''
    });
  };

  return (
    <Card className="bg-white/50 backdrop-blur-sm border-white/30 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm text-purple-700 flex items-center gap-2">
              <User className="h-4 w-4" />
              Identidade Salvadas
            </CardTitle>
            <p className="text-xs text-gray-600 mt-1">
              {selectedIdentity ? 'Identidade ativa será usada em todos os documentos' : 'Escolha sua identidade para personalizar documentos'}
            </p>
          </div>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              {/*
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg" onClick={resetForm}>
                <Plus className="h-3 w-3 mr-1" />
                Nova
              </Button>
              */}
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle className="text-purple-700">Criar Nova Identidade</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="institution" className="text-sm font-medium">Instituição *</Label>
                  <Input
                    id="institution"
                    value={formData.institution}
                    onChange={(e) => handleInputChange('institution', e.target.value)}
                    placeholder="Nome da instituição"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-medium">Cargo/Função *</Label>
                  <Input
                    id="role"
                    value={formData.role}
                    onChange={(e) => handleInputChange('role', e.target.value)}
                    placeholder="Seu cargo ou função"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact" className="text-sm font-medium">Contato</Label>
                  <Input
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => handleInputChange('contact', e.target.value)}
                    placeholder="Email ou telefone"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signature" className="text-sm font-medium">Assinatura/Observações</Label>
                  <Textarea
                    id="signature"
                    value={formData.signature}
                    onChange={(e) => handleInputChange('signature', e.target.value)}
                    placeholder="Informações adicionais para os documentos"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <Button 
                    onClick={handleSaveIdentity}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    disabled={!formData.name || !formData.institution || !formData.role}
                  >
                    Salvar Identidade
                  </Button>
                  <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        {selectedIdentity && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg p-3">
            <div className="flex items-start justify-between mb-2">
              <Badge className="bg-purple-100 text-purple-700 text-xs">Ativa</Badge>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => selectIdentity(selectedIdentity)}
                className="h-6 px-2 text-xs"
              >
                <Edit className="h-3 w-3" />
              </Button>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <User className="h-3 w-3 text-purple-600" />
                <span className="font-medium">{selectedIdentity.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Building2 className="h-3 w-3" />
                <span>{selectedIdentity.institution}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <Briefcase className="h-3 w-3" />
                <span>{selectedIdentity.role}</span>
              </div>
              {selectedIdentity.contact && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Mail className="h-3 w-3" />
                  <span>{selectedIdentity.contact}</span>
                </div>
              )}
            </div>
          </div>
        )}

        {identities.length > 0 && (
          <div className="space-y-2">
            <Label className="text-xs font-medium text-gray-700">Identidades Salvas ({identities.length})</Label>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {identities.map((identity) => (
                <div
                  key={identity.id}
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedIdentity?.id === identity.id 
                      ? 'bg-purple-100 border border-purple-300' 
                      : 'bg-white/50 hover:bg-white/70 border border-transparent'
                  }`}
                >
                  <div className="flex-1 min-w-0" onClick={() => selectIdentity(identity)}>
                    <div className="text-sm font-medium text-gray-900 truncate">
                      {identity.name}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {identity.institution} • {identity.role}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 ml-2">
                    {selectedIdentity?.id === identity.id && (
                      <Check className="h-4 w-4 text-purple-600" />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteIdentity(identity.id)}
                      className="h-6 w-6 p-0 hover:bg-red-100 hover:text-red-600"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {identities.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <User className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Nenhuma identidade encontrada.</p>
            <p className="text-xs text-gray-400 mt-1">Salve uma identidade no Editor Visual para personalizar seus documentos :D</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default IdentityManager;
