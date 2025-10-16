# PathWise - AI Career Counseling Platform

PathWise is a modern, AI-powered career counseling platform that helps professionals discover their career path, get personalized guidance, and make informed decisions about their future. Built with Next.js 14, TypeScript, and Supabase.

## ✨ Features

- **🤖 AI-Powered Career Guidance** - Get personalized career advice using advanced AI technology
- **💬 Interactive Chat Interface** - Natural conversations with our AI career counselor
- **📊 Career Analytics** - Track your career progress and development over time
- **🔐 Secure Authentication** - Built with Supabase Auth for secure user management
- **📱 Responsive Design** - Seamless experience across desktop, tablet, and mobile
- **🌙 Dark/Light Theme** - Beautiful theme switching with smooth animations
- **💾 Session Management** - Save and revisit your career conversations
- **⚡ Real-time Streaming** - Live AI responses with typing indicators

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Beautiful, accessible UI components
- **Lucide React** - Modern icon library

### Backend & Database
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **tRPC** - End-to-end typesafe APIs
- **Drizzle ORM** - Type-safe database queries

### AI & Chat
- **React Markdown** - Rich text rendering for AI responses
- **Streaming Responses** - Real-time AI message streaming
- **Message History** - Persistent conversation storage

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Supabase account

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pathwise.git
   cd pathwise
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Run the database migrations (see Database Setup section)
   - Copy your project URL and anon key to the environment variables

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄️ Database Setup

The application uses Supabase with Drizzle ORM. Database schema is defined in `lib/db/schema.ts`.

### Running Migrations

```bash
# Generate migration files (when you make schema changes)
npx drizzle-kit generate

# Apply migrations to your Supabase database
npx drizzle-kit push

# Or use the migrate command for production
npx drizzle-kit migrate
```

### Database Schema

The application includes the following main tables:
- **users** - User profiles and authentication data (synced with Supabase Auth)
- **chat_sessions** - Career counseling conversation sessions
- **chat_messages** - Individual messages within sessions

**Note:** The database schema is managed through Drizzle ORM migrations. The `lib/db/schema.ts` file defines the current schema, and migrations are automatically generated when you make changes.

## 📁 Project Structure

```
pathwise/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup page
│   ├── dashboard/         # User dashboard
│   ├── chat/              # Chat interface page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── common/            # Shared components
│   │   ├── auth/          # Authentication components
│   │   └── Navbar.tsx     # Navigation bar
│   ├── landing/           # Landing page sections
│   ├── chat/              # Chat interface components
│   └── ui/                # Reusable UI components
├── lib/                   # Utility libraries
│   ├── auth.ts            # Authentication service
│   ├── db/                # Database configuration
│   ├── routers/           # tRPC routers
│   └── utils.ts           # Utility functions
├── hooks/                 # Custom React hooks
├── schemas/               # TypeScript schemas
└── drizzle/               # Database migrations
```

## 🎨 UI Components

PathWise uses a comprehensive design system built on Shadcn/ui:

- **Forms** - Login, signup, and chat input forms
- **Cards** - Dashboard cards and chat messages
- **Buttons** - Various button styles and states
- **Skeletons** - Loading states for better UX
- **Dialogs** - Modals and confirmation dialogs
- **Sidebar** - Chat session navigation
- **Theme Toggle** - Dark/light mode switching

## 🔐 Authentication

PathWise uses Supabase Auth for secure user authentication:

- **Email/Password** - Traditional authentication
- **Session Management** - Automatic token refresh
- **Route Protection** - Protected dashboard and chat routes
- **Auth Guards** - Automatic redirects for unauthenticated users

## 💬 Chat Features

The AI career counseling chat includes:

- **Real-time Messaging** - Instant AI responses
- **Message History** - Persistent conversation storage
- **Session Management** - Multiple conversation threads
- **Markdown Support** - Rich text formatting for AI responses
- **Typing Indicators** - Visual feedback during AI responses
- **Message Streaming** - Smooth, real-time message delivery

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [Supabase](https://supabase.com/) - Backend and database
- [Shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide](https://lucide.dev/) - Icons

## 📞 Support

If you have any questions or need help, please:

- Open an issue on GitHub
- Contact us at support@pathwise.com
- Check our [documentation](https://docs.pathwise.com)

---

**Built with ❤️ for career development**