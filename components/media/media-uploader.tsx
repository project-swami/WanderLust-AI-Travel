'use client';

import { useState, useRef } from 'react';
import { Upload, Link, X, Image, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface UploadedFile {
  id: string;
  name: string;
  type: string;
  url: string;
}

export function MediaUploader() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const url = URL.createObjectURL(file);
      const uploadedFile: UploadedFile = {
        id: Date.now() + Math.random().toString(),
        name: file.name,
        type: file.type,
        url,
      };
      setUploadedFiles(prev => [...prev, uploadedFile]);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleUrlAdd = () => {
    if (!urlInput.trim()) return;

    const uploadedFile: UploadedFile = {
      id: Date.now().toString(),
      name: urlInput.split('/').pop() || 'URL Resource',
      type: 'url',
      url: urlInput,
    };

    setUploadedFiles(prev => [...prev, uploadedFile]);
    setUrlInput('');
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file && file.type !== 'url') {
        URL.revokeObjectURL(file.url);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="space-y-4">
      <Tabs defaultValue="file" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="file">Upload File</TabsTrigger>
          <TabsTrigger value="url">Add URL</TabsTrigger>
        </TabsList>
        
        <TabsContent value="file" className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload Images or Documents</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
              <input
                id="file-upload"
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
              <Button
                variant="ghost"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Click to upload or drag and drop
              </Button>
              <p className="text-xs text-gray-500 mt-1">
                Images, PDFs, or documents up to 10MB
              </p>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="url" className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="url-input">Add from URL</Label>
            <div className="flex space-x-2">
              <Input
                id="url-input"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="wanderlens-input"
              />
              <Button 
                onClick={handleUrlAdd}
                disabled={!urlInput.trim()}
                className="wanderlens-button px-4"
              >
                <Link className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Uploaded Files Display */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Uploaded Media</Label>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {uploadedFiles.map(file => (
              <div
                key={file.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border"
              >
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  {getFileIcon(file.type)}
                  <span className="text-sm text-gray-700 truncate">
                    {file.name}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(file.id)}
                  className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}