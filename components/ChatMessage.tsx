'use client'

import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { User, Bot, Copy, Check } from 'lucide-react'
import { useState } from 'react'

interface ChatMessageProps {
  message: {
    role: 'function' | 'system' | 'user' | 'assistant' | 'tool' | 'data'
    content: string
    id: string
  }
  isLoading?: boolean
}

export default function ChatMessage({ message, isLoading }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex w-full py-6 ${
        isUser ? 'bg-white' : 'bg-gray-50'
      } border-b border-gray-100`}
    >
      <div className="mx-auto flex w-full max-w-4xl px-4">
        {/* Avatar */}
        <div className="flex-shrink-0 mr-4">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
            isUser 
              ? 'bg-green-600 text-white' 
              : 'bg-gray-800 text-white'
          }`}>
            {isUser ? (
              <User size={16} />
            ) : (
              <Bot size={16} />
            )}
          </div>
        </div>

        {/* Message Content */}
        <div className="flex-1 min-w-0">
          <div className="text-sm font-medium text-gray-900 mb-1">
            {isUser ? 'You' : 'Assistant'}
          </div>
          
          {isLoading ? (
            <div className="flex items-center space-x-1">
              <div className="typing-indicator w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="typing-indicator w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="typing-indicator w-2 h-2 bg-gray-400 rounded-full"></div>
            </div>
          ) : (
            <div className="prose prose-sm max-w-none">
              {isUser ? (
                <p className="text-gray-800 whitespace-pre-wrap">{message.content}</p>
              ) : (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({ node, inline, className, children, ...props }) {
                      const match = /language-(\w+)/.exec(className || '')
                      return !inline && match ? (
                        <div className="relative">
                          <div className="flex items-center justify-between px-4 py-2 bg-gray-800 text-gray-200 text-xs rounded-t-lg">
                            <span>{match[1]}</span>
                            <button
                              onClick={() => copyToClipboard(String(children).replace(/\n$/, ''))}
                              className="flex items-center space-x-1 hover:text-white transition-colors"
                            >
                              {copied ? <Check size={14} /> : <Copy size={14} />}
                              <span>{copied ? 'Copied!' : 'Copy'}</span>
                            </button>
                          </div>
                          <SyntaxHighlighter
                            style={oneDark}
                            language={match[1]}
                            PreTag="div"
                            className="!mt-0 !rounded-t-none"
                            {...props}
                          >
                            {String(children).replace(/\n$/, '')}
                          </SyntaxHighlighter>
                        </div>
                      ) : (
                        <code
                          className="bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded text-sm"
                          {...props}
                        >
                          {children}
                        </code>
                      )
                    },
                    p: ({ children }) => <p className="mb-3 last:mb-0 text-gray-800 leading-relaxed">{children}</p>,
                    ul: ({ children }) => <ul className="mb-3 ml-4 space-y-1">{children}</ul>,
                    ol: ({ children }) => <ol className="mb-3 ml-4 space-y-1">{children}</ol>,
                    li: ({ children }) => <li className="text-gray-800">{children}</li>,
                    h1: ({ children }) => <h1 className="text-xl font-semibold mb-3 text-gray-900">{children}</h1>,
                    h2: ({ children }) => <h2 className="text-lg font-semibold mb-2 text-gray-900">{children}</h2>,
                    h3: ({ children }) => <h3 className="text-base font-semibold mb-2 text-gray-900">{children}</h3>,
                    blockquote: ({ children }) => (
                      <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 my-3">
                        {children}
                      </blockquote>
                    ),
                  }}
                >
                  {message.content}
                </ReactMarkdown>
              )}
            </div>
          )}
        </div>

        {/* Copy button for entire message */}
        {!isLoading && (
          <button
            onClick={() => copyToClipboard(message.content)}
            className="opacity-0 group-hover:opacity-100 transition-opacity ml-4 p-2 hover:bg-gray-200 rounded-lg"
            title="Copy message"
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
          </button>
        )}
      </div>
    </motion.div>
  )
} 