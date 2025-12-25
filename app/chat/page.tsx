"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Send, 
  Scale, 
  Loader2, 
  Bot, 
  User,
  Trash2,
  ArrowLeft,
  Sparkles,
  Mic,
  MicOff,
  Upload,
  FileText,
  X,
  CheckCircle2
} from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import ReactMarkdown from "react-markdown"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  documents?: string[]
}

interface UploadedDocument {
  id: string
  name: string
  size: number
  type: string
  content?: string
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean
  interimResults: boolean
  lang: string
  onresult: (event: SpeechRecognitionEvent) => void
  onerror: (event: SpeechRecognitionErrorEvent) => void
  onend: () => void
  start: () => void
  stop: () => void
  abort: () => void
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList
  resultIndex: number
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string
  message: string
}

interface SpeechRecognitionResultList {
  length: number
  item(index: number): SpeechRecognitionResult
  [index: number]: SpeechRecognitionResult
}

interface SpeechRecognitionResult {
  length: number
  item(index: number): SpeechRecognitionAlternative
  [index: number]: SpeechRecognitionAlternative
  isFinal: boolean
}

interface SpeechRecognitionAlternative {
  transcript: string
  confidence: number
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  
  // Document analysis state
  const [documentAnalysis, setDocumentAnalysis] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisError, setAnalysisError] = useState<string | null>(null)
  const [analyzedFileName, setAnalyzedFileName] = useState<string | null>(null)
  const documentFileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    // Auto-focus textarea on mount
    textareaRef.current?.focus()
  }, [])

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition() as SpeechRecognition
      recognition.continuous = false
      recognition.interimResults = true
      recognition.lang = 'en-US'

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('')
        setInput(transcript)
      }

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true)
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
      setIsListening(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files || files.length === 0) return

    setIsUploading(true)
    const newDocs: UploadedDocument[] = []

    for (const file of Array.from(files)) {
      try {
        // Read file content
        const text = await readFileAsText(file)
        
        const doc: UploadedDocument = {
          id: Date.now().toString() + Math.random(),
          name: file.name,
          size: file.size,
          type: file.type,
          content: text
        }
        newDocs.push(doc)
      } catch (error) {
        console.error('Error reading file:', error)
        setError('Failed to read file. Please try again.')
      }
    }

    setUploadedDocs(prev => [...prev, ...newDocs])
    setIsUploading(false)
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const readFileAsText = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => resolve(e.target?.result as string)
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  // Document analysis handler
  const handleDocumentAnalysis = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check file type
    const validTypes = [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/pdf",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/webp"
    ]
    const validExtensions = [".docx", ".txt", ".pdf", ".png", ".jpg", ".jpeg", ".webp"]
    const isValidType = validTypes.includes(file.type) || 
                       validExtensions.some(ext => file.name.toLowerCase().endsWith(ext))

    if (!isValidType) {
      setAnalysisError("Please upload a .txt, .docx, .pdf, or image file")
      return
    }

    setIsAnalyzing(true)
    setAnalysisError(null)
    setDocumentAnalysis(null)
    setAnalyzedFileName(file.name)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/analyze-document", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to analyze document")
      }

      const data = await response.json()
      setDocumentAnalysis(data.analysis)
    } catch (err) {
      setAnalysisError(err instanceof Error ? err.message : "Failed to analyze document")
      console.error("Document analysis error:", err)
    } finally {
      setIsAnalyzing(false)
      // Clear file input
      if (documentFileInputRef.current) {
        documentFileInputRef.current.value = ""
      }
    }
  }

  const removeDocument = (id: string) => {
    setUploadedDocs(prev => prev.filter(doc => doc.id !== id))
  }

  const handleSend = async () => {
    if ((!input.trim() && uploadedDocs.length === 0) || isLoading) return

    let messageContent = input.trim()
    
    // Include document content if documents are uploaded
    if (uploadedDocs.length > 0) {
      const docSummary = uploadedDocs.map(doc => 
        `\n\n[Document: ${doc.name}]\n${doc.content?.substring(0, 2000)}...`
      ).join('\n\n')
      messageContent = `${messageContent}\n\n${docSummary}`
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageContent,
      timestamp: new Date(),
      documents: uploadedDocs.map(doc => doc.name)
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get response")
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
      
      // Clear uploaded documents after sending
      setUploadedDocs([])
    } catch (err) {
      setError("Failed to get response. Please try again.")
      console.error("Chat error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([])
    setError(null)
    setUploadedDocs([])
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0f]">
      {/* Header */}
      <header className="glass border-b border-blue-500/30 sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2 text-gray-300 hover:text-white hover:bg-blue-500/10">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
                  <Scale className="h-6 w-6 text-blue-400 relative z-10" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold text-white neon-blue">LexAI</span>
                  <span className="text-xs text-blue-300/80">Indian Legal Advisor</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="glass-light border-emerald-500/30 text-emerald-300">
                <Sparkles className="h-3 w-3 mr-1 animate-pulse-glow" />
                GPT-4o
              </Badge>
              {messages.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearChat}
                  className="gap-2 glass-light border-blue-500/30 text-gray-300 hover:text-white hover:border-blue-400/50"
                >
                  <Trash2 className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Split Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Chat Section */}
        <div className="flex-1 flex flex-col overflow-hidden lg:border-r border-blue-500/30">
          <div className="flex-1 overflow-y-auto" ref={scrollAreaRef}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-4xl">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center">
                <div className="relative mb-6 animate-float">
                  <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full" />
                  <div className="w-20 h-20 rounded-full glass-card flex items-center justify-center relative z-10">
                    <Scale className="h-10 w-10 text-blue-400" />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-white neon-blue mb-4">
                  Welcome to LexAI
                </h2>
                <p className="text-lg text-gray-300 mb-2 max-w-2xl">
                  Your Ultimate Indian Legal Advisor
                </p>
                <p className="text-gray-400 mb-8 max-w-xl">
                  Ask me anything about Indian laws, acts, sections, case laws, or legal procedures. 
                  I can help you understand your rights, draft legal documents, and guide you through legal processes.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
                  {[
                    { title: "Tenant Rights", desc: "Security deposit issues", query: "What are my rights if my landlord refuses to return my security deposit?" },
                    { title: "Consumer Rights", desc: "File a complaint", query: "How to file a consumer complaint?" },
                    { title: "IPC Section", desc: "Section 498A explained", query: "What is Section 498A of IPC?" },
                    { title: "RTI Application", desc: "Draft RTI request", query: "How to draft an RTI application?" }
                  ].map((prompt, idx) => (
                    <Card 
                      key={idx}
                      className="p-4 glass-card border-blue-500/20 hover:border-blue-400/40 hover-glow hover-lift transition-all cursor-pointer group"
                      onClick={() => setInput(prompt.query)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-lg glass-light flex items-center justify-center shrink-0 group-hover:bg-blue-500/20 transition-colors">
                          <User className="h-4 w-4 text-blue-400" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-white text-sm mb-1">{prompt.title}</p>
                          <p className="text-xs text-gray-400">{prompt.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-4 animate-fade-in",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center shrink-0 border border-blue-500/30">
                        <Bot className="h-5 w-5 text-blue-400" />
                      </div>
                    )}
                    <Card
                      className={cn(
                        "max-w-[85%] md:max-w-[75%] p-4",
                        message.role === "user"
                          ? "glass-card border-blue-500/30 bg-blue-500/10"
                          : "glass-card border-blue-500/20"
                      )}
                    >
                      {message.role === "assistant" ? (
                        <div className="prose prose-sm max-w-none prose-invert">
                          <ReactMarkdown
                            components={{
                              h1: ({ children }) => (
                                <h1 className="text-xl font-bold text-white mb-2 neon-blue">{children}</h1>
                              ),
                              h2: ({ children }) => (
                                <h2 className="text-lg font-bold text-white mb-2 mt-4 neon-blue">{children}</h2>
                              ),
                              h3: ({ children }) => (
                                <h3 className="text-base font-bold text-blue-300 mb-2 mt-3">{children}</h3>
                              ),
                              p: ({ children }) => (
                                <p className="text-gray-300 mb-3 leading-relaxed">{children}</p>
                              ),
                              ul: ({ children }) => (
                                <ul className="list-disc list-inside mb-3 space-y-1 text-gray-300">{children}</ul>
                              ),
                              ol: ({ children }) => (
                                <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-300">{children}</ol>
                              ),
                              li: ({ children }) => (
                                <li className="text-gray-300">{children}</li>
                              ),
                              strong: ({ children }) => (
                                <strong className="font-semibold text-white">{children}</strong>
                              ),
                              a: ({ href, children }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-400 hover:text-blue-300 underline"
                                >
                                  {children}
                                </a>
                              ),
                              hr: () => <hr className="my-4 border-blue-500/30" />,
                              code: ({ children }) => (
                                <code className="glass-light px-1 py-0.5 rounded text-sm text-blue-300">
                                  {children}
                                </code>
                              ),
                              pre: ({ children }) => (
                                <pre className="glass-light p-3 rounded overflow-x-auto mb-3">
                                  {children}
                                </pre>
                              ),
                            }}
                          >
                            {message.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <div>
                          <p className="text-gray-200">{message.content.split('\n\n[Document:')[0]}</p>
                          {message.documents && message.documents.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {message.documents.map((doc, idx) => (
                                <Badge key={idx} variant="outline" className="glass-light border-blue-500/30 text-blue-300 text-xs">
                                  <FileText className="h-3 w-3 mr-1" />
                                  {doc}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                      <p className={cn(
                        "text-xs mt-2",
                        message.role === "user" ? "text-gray-400" : "text-gray-500"
                      )}>
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </Card>
                    {message.role === "user" && (
                      <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center shrink-0 border border-blue-500/30 bg-blue-500/10">
                        <User className="h-5 w-5 text-blue-400" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex gap-4 justify-start">
                    <div className="w-10 h-10 rounded-full glass-card flex items-center justify-center shrink-0 border border-blue-500/30">
                      <Bot className="h-5 w-5 text-blue-400" />
                    </div>
                    <Card className="glass-card border-blue-500/20 p-4">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                        <span className="text-gray-300">LexAI is thinking...</span>
                      </div>
                    </Card>
                  </div>
                )}
                {error && (
                  <div className="flex gap-4 justify-start">
                    <Card className="glass-card border-red-500/30 bg-red-500/10 p-4">
                      <p className="text-red-400 text-sm">{error}</p>
                    </Card>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Uploaded Documents Display */}
        {uploadedDocs.length > 0 && (
          <div className="border-t border-blue-500/30 glass-light px-4 py-3">
            <div className="container mx-auto max-w-4xl">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="h-4 w-4 text-blue-400" />
                <span className="text-sm font-medium text-gray-300">Uploaded Documents:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {uploadedDocs.map((doc) => (
                  <Badge
                    key={doc.id}
                    variant="outline"
                    className="glass-light border-blue-500/30 text-gray-300 pr-2"
                  >
                    <FileText className="h-3 w-3 mr-1 text-blue-400" />
                    {doc.name}
                    <button
                      onClick={() => removeDocument(doc.id)}
                      className="ml-2 hover:text-red-400 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="border-t border-blue-500/30 glass">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 max-w-4xl">
            <div className="flex gap-3 items-end">
              {/* File Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading || isUploading}
                className="glass-light border-blue-500/30 text-gray-300 hover:text-white hover:border-blue-400/50 h-[60px] px-4"
              >
                {isUploading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Upload className="h-5 w-5" />
                )}
              </Button>

              {/* Voice Input Button */}
              <Button
                variant="outline"
                size="sm"
                onClick={isListening ? stopListening : startListening}
                disabled={isLoading || !recognitionRef.current}
                className={cn(
                  "glass-light border-blue-500/30 h-[60px] px-4 transition-all",
                  isListening
                    ? "border-red-500/50 text-red-400 hover:border-red-400/70 animate-pulse-glow"
                    : "text-gray-300 hover:text-white hover:border-blue-400/50"
                )}
              >
                {isListening ? (
                  <MicOff className="h-5 w-5" />
                ) : (
                  <Mic className="h-5 w-5" />
                )}
              </Button>

              {/* Text Input */}
              <div className="flex-1">
                <Textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask your legal question here... (Press Enter to send, Shift+Enter for new line)"
                  className="min-h-[60px] max-h-[200px] resize-none glass-light border-blue-500/30 text-gray-200 placeholder:text-gray-500 focus:border-blue-400/50 focus:ring-blue-500/20"
                  disabled={isLoading}
                />
              </div>

              {/* Send Button */}
              <Button
                onClick={handleSend}
                disabled={(!input.trim() && uploadedDocs.length === 0) || isLoading}
                size="lg"
                className="gradient-neon-blue text-white h-[60px] px-6 hover:shadow-lg hover:shadow-blue-500/50 hover-lift transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              LexAI can respond in English, Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Gujarati, Punjabi, Marathi, and Urdu
              {recognitionRef.current && " • Click microphone to speak"}
            </p>
          </div>
        </div>
        </div>

        {/* Document Analysis Section */}
        <div className="w-full lg:w-96 flex flex-col lg:border-l border-t lg:border-t-0 border-blue-500/30 glass">
          <div className="p-4 border-b border-blue-500/30">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-400" />
              Document Analysis
              <Badge variant="outline" className="text-xs glass-light border-emerald-500/30 text-emerald-300">
                OCR
              </Badge>
            </h3>
            <p className="text-xs text-gray-400 mb-4">
              Upload documents or images for AI-powered analysis with OCR
            </p>
            <input
              ref={documentFileInputRef}
              type="file"
              accept=".txt,.docx,.pdf,.png,.jpg,.jpeg,.webp,image/*"
              onChange={handleDocumentAnalysis}
              className="hidden"
            />
            <Button
              onClick={() => documentFileInputRef.current?.click()}
              disabled={isAnalyzing}
              className="w-full gradient-neon-blue text-white hover:shadow-lg hover:shadow-blue-500/50"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </>
              )}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {analysisError && (
              <Card className="glass-card border-red-500/30 bg-red-500/10 p-4 mb-4">
                <p className="text-red-400 text-sm">{analysisError}</p>
              </Card>
            )}

            {documentAnalysis ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="outline" className="glass-light border-blue-500/30 text-blue-300">
                    <FileText className="h-3 w-3 mr-1" />
                    {analyzedFileName}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setDocumentAnalysis(null)
                      setAnalyzedFileName(null)
                      setAnalysisError(null)
                    }}
                    className="text-gray-400 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="prose prose-sm max-w-none prose-invert">
                  <ReactMarkdown
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-xl font-bold text-white mb-2 neon-blue">{children}</h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-lg font-bold text-white mb-2 mt-4 neon-blue">{children}</h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-base font-bold text-blue-300 mb-2 mt-3">{children}</h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-gray-300 mb-3 leading-relaxed text-sm">{children}</p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside mb-3 space-y-1 text-gray-300 text-sm">{children}</ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside mb-3 space-y-1 text-gray-300 text-sm">{children}</ol>
                      ),
                      li: ({ children }) => (
                        <li className="text-gray-300 text-sm">{children}</li>
                      ),
                      strong: ({ children }) => (
                        <strong className="font-semibold text-white">{children}</strong>
                      ),
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:text-blue-300 underline"
                        >
                          {children}
                        </a>
                      ),
                      hr: () => <hr className="my-4 border-blue-500/30" />,
                      code: ({ children }) => (
                        <code className="glass-light px-1 py-0.5 rounded text-xs text-blue-300">
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className="glass-light p-3 rounded overflow-x-auto mb-3 text-xs">
                          {children}
                        </pre>
                      ),
                    }}
                  >
                    {documentAnalysis}
                  </ReactMarkdown>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center py-8">
                <div className="w-16 h-16 rounded-full glass-card flex items-center justify-center mb-4">
                  <FileText className="h-8 w-8 text-blue-400" />
                </div>
                <p className="text-gray-400 text-sm mb-2">No document analyzed yet</p>
                <p className="text-gray-500 text-xs mb-3">
                  Upload documents or scanned images for AI analysis
                </p>
                <div className="flex flex-wrap justify-center gap-1">
                  <Badge variant="outline" className="text-xs glass-light border-blue-500/20 text-gray-400">.pdf</Badge>
                  <Badge variant="outline" className="text-xs glass-light border-blue-500/20 text-gray-400">.docx</Badge>
                  <Badge variant="outline" className="text-xs glass-light border-blue-500/20 text-gray-400">.txt</Badge>
                  <Badge variant="outline" className="text-xs glass-light border-blue-500/20 text-gray-400">.png</Badge>
                  <Badge variant="outline" className="text-xs glass-light border-blue-500/20 text-gray-400">.jpg</Badge>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
