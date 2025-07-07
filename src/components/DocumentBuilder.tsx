import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, Type, AlignLeft, AlignCenter, AlignRight, Bold, Italic, Underline, Download, Eye, Printer, Minus, Image, Smile, Hash, Users, Check } from "lucide-react";

interface DocumentElement {
  id: number;
  type: 'text' | 'title' | 'paragraph' | 'h1' | 'h2' | 'line' | 'image' | 'emoji';
  content: string;
  x: number;
  y: number;
  fontSize: number;
  fontWeight: string;
  fontStyle: string;
  textDecoration: string;
  textAlign: 'left' | 'center' | 'right';
  color: string;
  width?: number;
  height?: number;
  src?: string;
}

interface DocumentBuilderProps {
  template: any;
  people: any[];
  onBack: () => void;
}

const COMMON_EMOJIS = ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬'];

const DocumentBuilder: React.FC<DocumentBuilderProps> = ({
  template,
  people,
  onBack
}) => {
  const [elements, setElements] = useState<DocumentElement[]>([{
    id: 1,
    type: 'text',
    content: 'Nome: {{nome}}',
    x: 50,
    y: 50,
    fontSize: 16,
    fontWeight: 'normal',
    fontStyle: 'normal',
    textDecoration: 'none',
    textAlign: 'left',
    color: '#000000'
  }]);
  const [selectedElement, setSelectedElement] = useState<number | null>(1);
  const [selectedPeople, setSelectedPeople] = useState<number[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({
    x: 0,
    y: 0
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleElementClick = (id: number) => {
    setSelectedElement(id);
  };

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    setIsDragging(true);
    setSelectedElement(id);
    const element = elements.find(el => el.id === id);
    if (element) {
      const rect = e.currentTarget.getBoundingClientRect();
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || selectedElement === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasRect = canvas.getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - dragOffset.x;
    const newY = e.clientY - canvasRect.top - dragOffset.y;
    setElements(prev => prev.map(el => el.id === selectedElement ? {
      ...el,
      x: Math.max(0, newX),
      y: Math.max(0, newY)
    } : el));
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateSelectedElement = (updates: Partial<DocumentElement>) => {
    if (selectedElement === null) return;
    setElements(prev => prev.map(el => el.id === selectedElement ? {
      ...el,
      ...updates
    } : el));
  };

  const toggleFormat = (format: 'bold' | 'italic' | 'underline') => {
    const element = elements.find(el => el.id === selectedElement);
    if (!element) return;
    switch (format) {
      case 'bold':
        updateSelectedElement({
          fontWeight: element.fontWeight === 'bold' ? 'normal' : 'bold'
        });
        break;
      case 'italic':
        updateSelectedElement({
          fontStyle: element.fontStyle === 'italic' ? 'normal' : 'italic'
        });
        break;
      case 'underline':
        updateSelectedElement({
          textDecoration: element.textDecoration === 'underline' ? 'none' : 'underline'
        });
        break;
    }
  };

  const setAlignment = (align: 'left' | 'center' | 'right') => {
    updateSelectedElement({
      textAlign: align
    });
  };

  const addElement = (type: DocumentElement['type']) => {
    let newElement: DocumentElement;
    switch (type) {
      case 'line':
        newElement = {
          id: Date.now(),
          type: 'line',
          content: '____________________',
          x: 100,
          y: 100,
          fontSize: 16,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          color: '#000000',
          width: 200
        };
        break;
      case 'image':
        newElement = {
          id: Date.now(),
          type: 'image',
          content: '',
          x: 100,
          y: 100,
          fontSize: 16,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          color: '#000000',
          width: 150,
          height: 100,
          src: '../../public/uploadpngplaceholder.png'
        };
        break;
      case 'emoji':
        newElement = {
          id: Date.now(),
          type: 'emoji',
          content: '😀',
          x: 100,
          y: 100,
          fontSize: 32,
          fontWeight: 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          color: '#000000'
        };
        break;
      default:
        newElement = {
          id: Date.now(),
          type,
          content: type === 'text' ? 'Novo texto' : type === 'title' ? 'Novo título' : type === 'h1' ? 'Título H1' : type === 'h2' ? 'Título H2' : 'Novo parágrafo',
          x: 100,
          y: 100,
          fontSize: type === 'title' || type === 'h1' ? 24 : type === 'h2' ? 20 : 16,
          fontWeight: type === 'title' || type === 'h1' ? 'bold' : type === 'h2' ? '600' : 'normal',
          fontStyle: 'normal',
          textDecoration: 'none',
          textAlign: 'left',
          color: '#000000'
        };
    }
    setElements(prev => [...prev, newElement]);
    setSelectedElement(newElement.id);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        if (selectedElement && e.target?.result) {
          updateSelectedElement({
            src: e.target.result as string
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    if (selectedElement) {
      updateSelectedElement({
        content: emoji
      });
    }
    setShowEmojiPicker(false);
  };

  const togglePersonSelection = (personId: number) => {
    setSelectedPeople(prev => prev.includes(personId) ? prev.filter(id => id !== personId) : [...prev, personId]);
  };

  const selectAllPeople = () => {
    setSelectedPeople(people.map(p => p.id));
  };

  const clearPeopleSelection = () => {
    setSelectedPeople([]);
  };

  const selectedElementData = elements.find(el => el.id === selectedElement);

  const renderElement = (element: DocumentElement) => {
    const baseStyle = {
      left: element.x,
      top: element.y,
      fontSize: element.fontSize,
      fontWeight: element.fontWeight,
      fontStyle: element.fontStyle,
      textDecoration: element.textDecoration,
      textAlign: element.textAlign,
      color: element.color,
      padding: '4px 8px'
    };
    switch (element.type) {
      case 'line':
        return <div key={element.id} className={`absolute cursor-move select-none transition-all duration-200 ${selectedElement === element.id ? 'ring-2 ring-blue-400 ring-offset-2' : 'hover:ring-1 hover:ring-gray-300'}`} style={{
          ...baseStyle,
          width: element.width || 200,
          borderBottom: `2px solid ${element.color}`,
          height: '2px',
          padding: 0
        }} onClick={() => handleElementClick(element.id)} onMouseDown={e => handleMouseDown(e, element.id)} />;
      case 'image':
        return <div key={element.id} className={`absolute cursor-move select-none transition-all duration-200 ${selectedElement === element.id ? 'ring-2 ring-blue-400 ring-offset-2' : 'hover:ring-1 hover:ring-gray-300'}`} style={{
          left: element.x,
          top: element.y,
          width: element.width || 150,
          height: element.height || 100
        }} onClick={() => handleElementClick(element.id)} onMouseDown={e => handleMouseDown(e, element.id)}>
            <img src={element.src} alt="Document element" className="w-full h-full object-cover rounded border" />
          </div>;
      default:
        return <div key={element.id} className={`absolute cursor-move select-none transition-all duration-200 ${selectedElement === element.id ? 'ring-2 ring-blue-400 ring-offset-2' : 'hover:ring-1 hover:ring-gray-300'}`} style={baseStyle} onClick={() => handleElementClick(element.id)} onMouseDown={e => handleMouseDown(e, element.id)}>
            {element.content}
          </div>;
    }
  };

  return <div className="min-h-screen bg-gradient-to-br from-slate-300 to-blue-500 p-2">
      <div className="max-w-7xl mx-auto space-y-3">
        {/* Header */}
        <div className="bg-white/60 backdrop-blur-sm border border-white/30 rounded-lg shadow-sm p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button 
                onClick={onBack} 
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <ArrowRight className="h-4 w-4 mr-2" />
                Continuar
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div>
                <h1 className="text-lg font-semibold text-blue-700">Editor Visual</h1>
                <p className="text-sm text-gray-600">{template?.name}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                {selectedPeople.length} de {people.length} selecionados
              </Badge>
              <Button variant="outline" size="sm" className="hover:bg-white/50">
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg">
                <Download className="h-4 w-4 mr-2" />
                Salvar Identidade
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3 h-[calc(100vh-120px)]">
          {/* Left Sidebar - Tools and People */}
          <div className="col-span-3 space-y-3 overflow-y-auto">
            {/* People Selection */}
            <Card className="bg-white/50 backdrop-blur-sm border-white/30 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-700 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Pessoas ({selectedPeople.length}/{people.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <div className="flex gap-1">
                  <Button variant="outline" size="sm" className="flex-1 text-xs hover:bg-white/50" onClick={selectAllPeople}>
                    Todos
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs hover:bg-white/50" onClick={clearPeopleSelection}>
                    Limpar
                  </Button>
                </div>
                <div className="space-y-1 max-h-40 overflow-y-auto">
                  {people.map(person => <div key={person.id} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all duration-200 ${selectedPeople.includes(person.id) ? 'bg-blue-100 border border-blue-300' : 'bg-white/30 hover:bg-white/50 border border-transparent'}`} onClick={() => togglePersonSelection(person.id)}>
                      <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${selectedPeople.includes(person.id) ? 'bg-blue-500 border-blue-500' : 'border-gray-300'}`}>
                        {selectedPeople.includes(person.id) && <Check className="h-3 w-3 text-white" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {person.name}
                        </div>
                        <div className="text-xs text-gray-600">
                          {person.age} anos • {person.subcategory}
                        </div>
                      </div>
                    </div>)}
                </div>
              </CardContent>
            </Card>

            {/* Elements Toolbar */}
            <Card className="bg-white/50 backdrop-blur-sm border-white/30 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-blue-700">Elementos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 pt-0">
                <Button variant="outline" size="sm" className="w-full justify-start hover:bg-white/50" onClick={() => addElement('text')}>
                  <Type className="h-4 w-4 mr-2" />
                  Texto
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start hover:bg-white/50" onClick={() => addElement('title')}>
                  <Type className="h-4 w-4 mr-2" />
                  Título
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start hover:bg-white/50" onClick={() => addElement('h1')}>
                  <Hash className="h-4 w-4 mr-2" />
                  H1
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start hover:bg-white/50" onClick={() => addElement('h2')}>
                  <Hash className="h-4 w-4 mr-2" />
                  H2
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start hover:bg-white/50" onClick={() => addElement('paragraph')}>
                  <Type className="h-4 w-4 mr-2" />
                  Parágrafo
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start hover:bg-white/50" onClick={() => addElement('line')}>
                  <Minus className="h-4 w-4 mr-2" />
                  Linha
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start hover:bg-white/50" onClick={() => addElement('image')}>
                  <Image className="h-4 w-4 mr-2" />
                  Imagem
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start hover:bg-white/50" onClick={() => addElement('emoji')}>
                  <Smile className="h-4 w-4 mr-2" />
                  Emoji
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Canvas */}
          <div className="col-span-6">
            <Card className="bg-white/50 backdrop-blur-sm border-white/30 shadow-sm h-full">
              <CardContent className="p-0 h-full">
                <div ref={canvasRef} className="relative w-full h-full bg-white rounded-lg cursor-crosshair overflow-hidden" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                  {elements.map(renderElement)}
                  
                  {/* Selection indicator */}
                  {selectedElement && <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
                      Elemento selecionado: {selectedElementData?.type}
                    </div>}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Properties */}
          <div className="col-span-3 overflow-y-auto">
            {selectedElementData ? <Card className="bg-white/50 backdrop-blur-sm border-white/30 shadow-sm sticky top-0">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-blue-700 flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Propriedades
                  </CardTitle>
                  <p className="text-xs text-gray-600">
                    Editando: {selectedElementData.type}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  {/* Formatação para texto */}
                  {selectedElementData.type !== 'line' && selectedElementData.type !== 'image' && <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700">Formatação</label>
                      <div className="flex gap-1">
                        <Button variant={selectedElementData.fontWeight === 'bold' ? 'default' : 'outline'} size="sm" className="flex-1 hover:bg-white/50" onClick={() => toggleFormat('bold')}>
                          <Bold className="h-3 w-3" />
                        </Button>
                        <Button variant={selectedElementData.fontStyle === 'italic' ? 'default' : 'outline'} size="sm" className="flex-1 hover:bg-white/50" onClick={() => toggleFormat('italic')}>
                          <Italic className="h-3 w-3" />
                        </Button>
                        <Button variant={selectedElementData.textDecoration === 'underline' ? 'default' : 'outline'} size="sm" className="flex-1 hover:bg-white/50" onClick={() => toggleFormat('underline')}>
                          <Underline className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>}

                  {/* Alinhamento para texto */}
                  {selectedElementData.type !== 'line' && selectedElementData.type !== 'image' && <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700">Alinhamento</label>
                      <div className="flex gap-1">
                        <Button variant={selectedElementData.textAlign === 'left' ? 'default' : 'outline'} size="sm" className="flex-1 hover:bg-white/50" onClick={() => setAlignment('left')}>
                          <AlignLeft className="h-3 w-3" />
                        </Button>
                        <Button variant={selectedElementData.textAlign === 'center' ? 'default' : 'outline'} size="sm" className="flex-1 hover:bg-white/50" onClick={() => setAlignment('center')}>
                          <AlignCenter className="h-3 w-3" />
                        </Button>
                        <Button variant={selectedElementData.textAlign === 'right' ? 'default' : 'outline'} size="sm" className="flex-1 hover:bg-white/50" onClick={() => setAlignment('right')}>
                          <AlignRight className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>}

                  {/* Tamanho da Fonte */}
                  {selectedElementData.type !== 'line' && selectedElementData.type !== 'image' && <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700">Tamanho</label>
                      <input type="range" min="12" max="48" value={selectedElementData.fontSize} onChange={e => updateSelectedElement({
                  fontSize: parseInt(e.target.value)
                })} className="w-full" />
                      <div className="text-xs text-center text-gray-600">{selectedElementData.fontSize}px</div>
                    </div>}

                  {/* Dimensões para imagem */}
                  {selectedElementData.type === 'image' && <>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-700">Largura</label>
                        <input type="range" min="50" max="400" value={selectedElementData.width || 150} onChange={e => updateSelectedElement({
                    width: parseInt(e.target.value)
                  })} className="w-full" />
                        <div className="text-xs text-center text-gray-600">{selectedElementData.width || 150}px</div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-medium text-gray-700">Altura</label>
                        <input type="range" min="50" max="300" value={selectedElementData.height || 100} onChange={e => updateSelectedElement({
                    height: parseInt(e.target.value)
                  })} className="w-full" />
                        <div className="text-xs text-center text-gray-600">{selectedElementData.height || 100}px</div>
                      </div>
                      <Button variant="outline" size="sm" className="w-full hover:bg-white/50" onClick={() => fileInputRef.current?.click()}>
                        <Image className="h-4 w-4 mr-2" />
                        Alterar Imagem
                      </Button>
                      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    </>}

                  {/* Largura para linha */}
                  {selectedElementData.type === 'line' && <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700">Largura</label>
                      <input type="range" min="50" max="500" value={selectedElementData.width || 200} onChange={e => updateSelectedElement({
                  width: parseInt(e.target.value)
                })} className="w-full" />
                      <div className="text-xs text-center text-gray-600">{selectedElementData.width || 200}px</div>
                    </div>}

                  {/* Cor */}
                  {selectedElementData.type !== 'image' && <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700">Cor</label>
                      <input type="color" value={selectedElementData.color} onChange={e => updateSelectedElement({
                  color: e.target.value
                })} className="w-full h-8 rounded border border-gray-200" />
                    </div>}

                  {/* Conteúdo para texto */}
                  {selectedElementData.type !== 'line' && selectedElementData.type !== 'image' && <div className="space-y-2">
                      <label className="text-xs font-medium text-gray-700">
                        {selectedElementData.type === 'emoji' ? 'Emoji' : 'Texto'}
                      </label>
                      {selectedElementData.type === 'emoji' ? <div className="relative">
                          <Button variant="outline" size="sm" className="w-full justify-center text-2xl h-12" onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
                            {selectedElementData.content}
                          </Button>
                          {showEmojiPicker && <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg p-2 z-10 max-h-32 overflow-y-auto">
                              <div className="grid grid-cols-6 gap-1">
                                {COMMON_EMOJIS.map(emoji => <button key={emoji} className="text-xl hover:bg-gray-100 rounded p-1 transition-colors" onClick={() => handleEmojiSelect(emoji)}>
                                    {emoji}
                                  </button>)}
                              </div>
                            </div>}
                        </div> : <Textarea value={selectedElementData.content} onChange={e => updateSelectedElement({
                  content: e.target.value
                })} className="min-h-[60px] text-xs resize-none" placeholder="Digite o texto aqui..." />}
                    </div>}
                </CardContent>
              </Card> : <Card className="bg-white/50 backdrop-blur-sm border-white/30 shadow-sm">
                <CardContent className="p-6 text-center">
                  <div className="text-gray-500 text-sm">
                    Clique em um elemento no canvas para editá-lo
                  </div>
                </CardContent>
              </Card>}
          </div>
        </div>
      </div>
    </div>;
};

export default DocumentBuilder;
