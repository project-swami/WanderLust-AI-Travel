'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Link as LinkIcon, X, Image, Video, FileText, Loader2 } from 'lucide-react';
import { sleep } from '../lib/utils';
import { mockAnalyzeSantorini } from '../lib/fixtures';

interface MediaFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string;
}

interface MediaUploaderProps {
  onAnalysisComplete?: (result: any) => void;
  className?: string;
}

export function MediaUploader({ onAnalysisComplete, className = '' }: MediaUploaderProps) {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [urlInput, setUrlInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const processFiles = (selectedFiles: File[]) => {
    selectedFiles.forEach(file => {
      const mediaFile: MediaFile = {
        id: Date.now() + Math.random().toString(),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      };
      setFiles(prev => [...prev, mediaFile]);
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      processFiles(Array.from(selectedFiles));
    }
  };

  const handleUrlAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    
    const urlFile: MediaFile = {
      id: Date.now().toString(),
      name: urlInput.split('/').pop() || 'URL Resource',
      type: 'url',
      size: 0,
      url: urlInput.trim(),
    };
    setFiles(prev => [...prev, urlFile]);
    setUrlInput('');
  };

  const removeFile = (id: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file && file.type !== 'url') {
        URL.revokeObjectURL(file.url);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleAnalyzeMedia = async () => {
    if (files.length === 0 && !urlInput.trim()) return;
    
    setIsProcessing(true);
    
    try {
      // Simulate processing delay
      await sleep(1200);
      
      // Use mock analysis result
      const analyzeData = {
        success: true,
        ...mockAnalyzeSantorini,
        mediaId: `media_${Date.now()}`,
      };
      
      if (onAnalysisComplete) {
        onAnalysisComplete(analyzeData);
      }
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="h-4 w-4" />;
    if (type.startsWith('video/')) return <Video className="h-4 w-4" />;
    if (type === 'url') return <LinkIcon className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '';
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const hasMedia = files.length > 0 || urlInput.trim();

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Drag & Drop Area */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
        <div 
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*,video/*,.pdf,.doc,.docx"
            onChange={handleFileUpload}
            className="hidden"
            aria-label="Upload media files"
          />
          <Upload className={`h-12 w-12 mx-auto mb-4 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
          <h3 className="text-lg font-semibold text-gray-900 mb-2 leading-relaxed">
            {isDragOver ? 'Drop files here' : 'Drop files here or click to browse'}
          </h3>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Support for JPG, PNG, MP4, MOV, PDF up to 50MB each
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-500 text-white font-sans font-semibold tracking-tight px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            type="button"
          >
            Choose Files
          </button>
        </div>

        {/* URL Input Form */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <label htmlFor="url-input" className="block font-sans font-semibold tracking-tight text-gray-900 mb-3">
            Or paste a URL
          </label>
          <form onSubmit={handleUrlAdd} className="flex space-x-3">
            <input
              id="url-input"
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/travel-photo.jpg"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              aria-describedby="url-help"
            />
            <button
              type="submit"
              disabled={!urlInput.trim()}
              className="bg-gray-100 text-gray-700 font-sans font-semibold tracking-tight px-4 py-3 rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              aria-label="Add URL"
            >
              <LinkIcon className="h-5 w-5" />
            </button>
          </form>
          <p id="url-help" className="text-xs text-gray-500 mt-2">
            Paste a link to an image, video, or travel blog post
          </p>
        </div>
      </div>

      {/* Uploaded Files */}
      {files.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h4 className="font-sans font-semibold tracking-tight text-gray-900 mb-4 leading-relaxed">
            Media Files ({files.length})
          </h4>
          
          <div className="space-y-3 max-h-48 overflow-y-auto">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  {getFileIcon(file.type)}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-sans font-semibold tracking-tight text-gray-900">{file.name}</p>
                    {file.size > 0 && (
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label={`Remove ${file.name}`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Analyze Button */}
      {hasMedia && (
        <div className="text-center">
          <button
            onClick={handleAnalyzeMedia}
            disabled={isProcessing}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-sans font-bold tracking-tight px-8 py-4 rounded-2xl hover:shadow-lg transition-all duration-200 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center space-x-3">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Analyzing Media...</span>
              </span>
            ) : (
              'Analyze Media'
            )}
          </button>
        </div>
      )}
    </div>
  );
}