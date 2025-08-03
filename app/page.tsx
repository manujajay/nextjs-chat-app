'use client'

import { useChat } from 'ai/react'
import ChatMessage from '@/components/ChatMessage'
import { Send, MessageSquare, Sparkles, Code, Book, HelpCircle, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const suggestions = [
  {
    icon: <Code className="w-5 h-5" />,
    title: "Code Help",
    description: "Write a Python function to sort a list"
  },
  {
    icon: <Book className="w-5 h-5" />,
    title: "Explain",
    description: "How does machine learning work?"
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: "Creative",
    description: "Write a short story about time travel"
  },
  {
    icon: <HelpCircle className="w-5 h-5" />,
    title: "Problem Solve",
    description: "Help me debug this code issue"
  }
]

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [showApiKeyWarning, setShowApiKeyWarning] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Check if error is related to API key
    if (error && (error.message.includes('API key') || error.message.includes('OPENAI_API_KEY'))) {
      setShowApiKeyWarning(true)
    }
  }, [error])

  const handleSuggestionClick = (description: string) => {
    const event = {
      target: { value: description }
    } as React.ChangeEvent<HTMLInputElement>
    handleInputChange(event)
  }

  return (
    <div className="flex flex-col h-screen w-full bg-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-green-600 rounded-lg">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-xl font-semibold text-gray-900">AI Chat Assistant</h1>
        </div>
        <div className="text-sm text-gray-500">
          Powered by OpenAI
        </div>
      </header>

      {/* API Key Warning */}
      {showApiKeyWarning && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>OpenAI API Key Required:</strong> Please add your OpenAI API key to a <code className="bg-yellow-100 px-1 rounded">.env.local</code> file. 
                See the README for setup instructions.
              </p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setShowApiKeyWarning(false)}
                className="text-yellow-400 hover:text-yellow-600"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {messages.length === 0 ? (
          /* Welcome Screen */
          <div className="flex flex-col items-center justify-center h-full p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-6">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                  How can I help you today?
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  I'm an AI assistant ready to help with coding, writing, analysis, and more.
                </p>
              </div>

              {/* Suggestion Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {suggestions.map((suggestion, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    onClick={() => handleSuggestionClick(suggestion.description)}
                    className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-all duration-200 hover:shadow-md group"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 p-2 bg-white rounded-lg border group-hover:border-green-200 transition-colors">
                        {suggestion.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">
                          {suggestion.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          /* Chat Messages */
          <div className="h-full overflow-y-auto">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <ChatMessage 
                message={{
                  id: 'loading',
                  role: 'assistant',
                  content: ''
                }} 
                isLoading={true}
              />
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex items-end space-x-3">
              <div className="flex-1 relative">
                <textarea
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Message AI Assistant..."
                  disabled={isLoading}
                  rows={1}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed resize-none text-gray-900 placeholder-gray-500"
                  style={{
                    minHeight: '52px',
                    maxHeight: '120px'
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSubmit(e as any)
                    }
                  }}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 bottom-3 p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </form>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  )
} 