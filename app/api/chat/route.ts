import { openai } from '@ai-sdk/openai'
import { streamText } from 'ai'

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  try {
    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ 
          error: 'OpenAI API key not found. Please add OPENAI_API_KEY to your .env.local file.' 
        }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const { messages } = await req.json()

    const result = await streamText({
      model: openai('gpt-4o-mini'),
      messages,
      system: `You are a helpful, knowledgeable, and friendly AI assistant. You provide clear, accurate, and well-formatted responses. When writing code, always include explanations and follow best practices. Use markdown formatting for better readability.`,
      temperature: 0.7,
      maxTokens: 2000,
    })

    return result.toDataStreamResponse()
  } catch (error) {
    console.error('Chat API Error:', error)
    
    // Handle specific OpenAI errors
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return new Response(
          JSON.stringify({ 
            error: 'Invalid OpenAI API key. Please check your .env.local file and ensure OPENAI_API_KEY is correct.' 
          }),
          { 
            status: 401,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
      
      if (error.message.includes('quota')) {
        return new Response(
          JSON.stringify({ 
            error: 'OpenAI API quota exceeded. Please check your OpenAI account usage.' 
          }),
          { 
            status: 429,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
    }
    
    return new Response(
      JSON.stringify({ 
        error: 'Failed to process your request. Please try again or check your OpenAI API configuration.' 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
} 