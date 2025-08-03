# Next.js Chat App 🚀

A modern, responsive chat interface built with Next.js, TypeScript, and Tailwind CSS. Features beautiful animations, markdown support with syntax highlighting, and seamless integration with OpenAI's GPT models.

![Chat App Screenshot](https://via.placeholder.com/800x400/10a37f/ffffff?text=Chat+Interface+Screenshot)

## ✨ Features

- 🎨 **Beautiful UI**: Modern, responsive design inspired by ChatGPT
- 🔄 **Real-time Streaming**: Streaming responses from OpenAI
- 📝 **Markdown Support**: Full markdown rendering with syntax highlighting
- 📋 **Copy Functionality**: Copy messages and code blocks with one click  
- 🎭 **Smooth Animations**: Framer Motion animations for enhanced UX
- 📱 **Mobile Responsive**: Works perfectly on all device sizes
- 🎯 **TypeScript**: Full type safety throughout the application
- ⚡ **Performance**: Optimized with Next.js 14 and modern React patterns

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed on your machine
- An OpenAI API key ([Get one here](https://platform.openai.com/api-keys))

### Installation

1. **Clone or download this repository:**
   ```bash
   git clone https://github.com/yourusername/nextjs-chat-app.git
   cd nextjs-chat-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   
   Then edit `.env.local` and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_api_key_here
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your chat app!

## 📁 Project Structure

Understanding the Next.js app structure:

```
nextjs-chat-app/
├── app/                    # Next.js App Router (13+)
│   ├── api/               # API routes
│   │   └── chat/
│   │       └── route.ts   # Chat API endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx          # Home page component
├── components/            # Reusable React components
│   └── ChatMessage.tsx   # Individual message component
├── package.json          # Dependencies and scripts
├── tailwind.config.ts    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── next.config.js        # Next.js configuration
```

### Key Files Explained

- **`app/page.tsx`**: The main chat interface component
- **`app/api/chat/route.ts`**: Backend API that communicates with OpenAI
- **`components/ChatMessage.tsx`**: Renders individual chat messages
- **`app/layout.tsx`**: Defines the overall page structure and metadata
- **`app/globals.css`**: Global styles and CSS variables

## 🎯 Understanding the Code

### React Hooks Used

This app demonstrates several important React concepts:

```typescript
// State management for messages and UI
const [messages, setMessages] = useState([])
const [isLoading, setIsLoading] = useState(false)

// Ref for auto-scrolling to new messages
const messagesEndRef = useRef<HTMLDivElement>(null)

// Effect for side effects (scrolling when messages change)
useEffect(() => {
  scrollToBottom()
}, [messages])
```

### API Integration

The chat functionality uses the **AI SDK** to stream responses:

```typescript
// The useChat hook handles all the complexity
const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
```

### TypeScript Benefits

Notice how TypeScript helps with:
- **Type safety**: Props are typed with interfaces
- **IntelliSense**: Better autocomplete in your editor
- **Error prevention**: Catches bugs at compile time

## 🛠️ Customization Guide

### Changing the AI Model

Edit `app/api/chat/route.ts`:

```typescript
const result = await streamText({
  model: openai('gpt-4'),  // Change to gpt-4, gpt-3.5-turbo, etc.
  messages,
  system: `Your custom system prompt here`,
  temperature: 0.7,  // Adjust creativity (0-1)
  maxTokens: 2000,   // Adjust response length
})
```

### Styling and Theme

The app uses **Tailwind CSS**. Key customization points:

1. **Colors**: Edit the color classes throughout the components
2. **CSS Variables**: Modify `app/globals.css` for theme colors
3. **Tailwind Config**: Extend `tailwind.config.ts` for custom colors/fonts

### Adding New Features

Want to add features? Here are some ideas:

- **Chat History**: Store conversations in localStorage
- **File Upload**: Allow image/document uploads
- **Dark Mode**: Toggle between light and dark themes
- **Multiple Conversations**: Support multiple chat threads

## 📚 Learning Resources

### Next.js Fundamentals

- **App Router**: This project uses Next.js 13+ App Router
- **API Routes**: Server-side code in the `app/api/` directory
- **Components**: React components for UI building blocks
- **Layouts**: Shared UI elements across pages

### Key Concepts Demonstrated

1. **Client Components**: Interactive React components (marked with `'use client'`)
2. **Server Components**: Components that render on the server
3. **API Routes**: Backend endpoints for handling requests
4. **Environment Variables**: Secure configuration management

### JavaScript/TypeScript Concepts

- **Async/Await**: Handling asynchronous operations
- **Destructuring**: Extracting values from objects/arrays
- **Arrow Functions**: Modern function syntax
- **Optional Chaining**: Safe property access (`obj?.property`)
- **Template Literals**: String interpolation with backticks

## 🔧 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint for code quality
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repo to [Vercel](https://vercel.com)
3. Add your `OPENAI_API_KEY` in Vercel's environment variables
4. Deploy! ✨

### Deploy to Other Platforms

This app can deploy to any platform that supports Node.js:
- **Netlify**
- **Railway**
- **Render**
- **AWS/Azure/GCP**

## 🤝 Contributing

Feel free to fork this project and make it your own! Some improvement ideas:

- Add user authentication
- Implement chat persistence
- Add support for different AI providers
- Create a mobile app version
- Add voice chat capabilities

## 📄 License

MIT License - feel free to use this project for learning or as a foundation for your own apps!

## 🆘 Troubleshooting

### Common Issues

**"API key not found" error:**
- Make sure you created `.env.local` (not `.env`)
- Verify your API key is valid
- Restart the development server after adding the key

**Styling issues:**
- Try running `npm run build` to check for build errors
- Make sure Tailwind classes are spelled correctly

**TypeScript errors:**
- Run `npm run lint` to see specific issues
- Check that all imports are correct

## 🎓 Next Steps

Once you have this running, try:

1. **Modify the system prompt** to change the AI's personality
2. **Add new UI components** for additional features
3. **Integrate other APIs** for enhanced functionality
4. **Deploy your app** and share it with friends!

---

Happy coding! 🎉 If you build something cool with this, we'd love to see it! 