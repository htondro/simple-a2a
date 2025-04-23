# Simple A2A: Agent-to-Agent Communication in Next.js | Open Source

[![Next.js](https://img.shields.io/badge/Next.js-15.3.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

> A modern, lightweight implementation of the Agent-to-Agent (A2A) communication protocol built with Next.js and TypeScript. This project provides a streamlined approach to agent communication, focusing on essential features while maintaining extensibility.

## 🌟 Key Features

- 🤖 **A2A Protocol Implementation**: 
  - Simplified yet powerful agent-to-agent communication
  - JSON-RPC 2.0 based protocol
  - Standardized request/response format
  - Extensible message structure

- 🚀 **Modern Tech Stack**:
  - Next.js 15 with App Router
  - React 19 and TypeScript
  - Vercel AI SDK for LLM integration
  - Assistant UI for chat interface

- 🎨 **UI Components**:
  - Beautiful and responsive design
  - Powered by Radix UI
  - Styled with Tailwind CSS
  - Markdown support with remark-gfm

- 🔄 **Real-time Features**:
  - Streaming responses
  - Dynamic agent routing
  - Real-time status updates
  - Interactive chat interface

- 🛠️ **Developer Experience**:
  - Comprehensive TypeScript types
  - Modern development tools
  - Clear project structure
  - Easy to extend and customize

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm
- OpenAI API key (for LLM integration)

## 🚀 Quick Start Guide

### Installation

1. Clone the repository:
```bash
git clone https://github.com/htondro/simple-a2a.git
cd simple-a2a
```

2. Install dependencies:
```bash
pnpm install
```

### Configuration

1. Set up environment variables:
```bash
cp .env.example .env.local
```

2. Edit `.env.local` and add the following environment variables:
```env
# OpenAI Configuration
OPENAI_API_KEY=your_api_key_here
OPENAI_API_BASE=https://api.openai.com/v1

# Application Configuration
NEXT_PUBLIC_URL=http://localhost:3000

# Agent Models (Optional)
CLIENT_AGENT_MODEL=gpt-4o-mini  # Model for the triage agent
CODER_AGENT_MODEL=gpt-4o        # Model for the code generation agent
```

### Running the Application

1. Start the development server:
```bash
pnpm dev
```

2. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   └── api/               # API routes
│       ├── agents/        # Agent implementations
│       │   └── coder/     # Code generation agent
│       └── client/        # Client API endpoints
├── components/            # React components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and shared code
│   └── llm/              # LLM provider implementations
└── types/                 # TypeScript type definitions
```

## 💻 Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint |

## 🏗️ Architecture Overview

This project implements a simplified version of the A2A protocol with the following components:

### Core Components

1. **Client (Triage Agent)**:
   - Analyzes user requests
   - Routes to appropriate agents
   - Handles response formatting
   - Manages tool selection

2. **Specialized Agents**:
   - Code Generation Agent (CodeCrafter)
   - More agents can be added dynamically

3. **Protocol Layer**:
   - JSON-RPC 2.0 based communication
   - Standardized request/response format
   - Extensible message structure

### Communication Flow

1. User sends message to client
2. Client analyzes request and selects appropriate agent
3. Agent processes request and returns response
4. Client formats and streams response to user

## 🔮 Future Plans

1. **Agent Auto-Discovery**:
   - Implement automatic scanning of agents directory
   - Dynamic registration of new agents
   - No manual configuration needed

2. **Enhanced Toolset Creation**:
   - Parse agent capabilities from agent.json
   - Create parameter schemas based on capabilities
   - Support multiple response formats
   - Implement streaming when available
   - Map agent skills to tool functions

3. **Additional Features**:
   - Support for more agent types
   - Enhanced error handling
   - Better type safety
   - Improved documentation

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - The React framework for production
- [Radix UI](https://www.radix-ui.com) - Unstyled, accessible UI components
- [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework
- [OpenAI](https://openai.com) - Advanced AI models and APIs
- [Vercel AI SDK](https://sdk.vercel.ai) - AI development toolkit for Next.js applications

## 🔗 Related Projects

- [Google A2A Protocol](https://github.com/google/a2a) - The original A2A protocol specification and implementation
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## 📞 Support

For support, please [open an issue](https://github.com/htondro/simple-a2a/issues) or contact me.

---

<div align="center">
  <sub>Built with ❤️ by htondro</sub>
</div>
