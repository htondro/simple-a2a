import { NextResponse } from 'next/server'
import { AgentCard } from '@/types/schema'

const agentCard : AgentCard = {
    name: "CodeCrafter",
    description:
      "A specialized AI agent that excels in code generation, refactoring, and optimization. It understands complex programming requirements and delivers high-quality, production-ready code with detailed explanations and best practices.",
    url: `${process.env.NEXT_PUBLIC_URL}/api/agents/coder/`,
    provider: {
      organization: "htondro",
      url: "https://github.com/htondro"
    },
    version: "1.0.0",
    capabilities: {
      streaming: false,
      pushNotifications: false,
      stateTransitionHistory: false,
    },
    authentication: null,
    defaultInputModes: ["text"],
    defaultOutputModes: ["text"],
    skills: [
      {
        id: "code_generation",
        name: "Intelligent Code Generation",
        description:
          "Generates production-quality code with comprehensive documentation, type safety, and best practices. Supports multiple programming languages and frameworks.",
        tags: ["code", "development", "programming", "ai", "automation"],
        examples: [
          "Create a RESTful API using Express.js with TypeScript and proper error handling",
          "Implement a React component with proper state management and TypeScript interfaces",
          "Write a Python class for handling database connections with connection pooling",
          "Generate a complete authentication system with JWT and refresh tokens",
          "Create a Docker configuration for a microservices architecture"
        ],
        inputModes: ["text"],
        outputModes: ["text"]
      },
      {
        id: "code_refactoring",
        name: "Code Refactoring & Optimization",
        description:
          "Analyzes existing code and suggests improvements for performance, readability, and maintainability. Provides detailed explanations for each refactoring suggestion.",
        tags: ["refactoring", "optimization", "code-quality", "best-practices"],
        examples: [
          "Refactor this React component to use custom hooks and improve performance",
          "Optimize this SQL query for better execution time",
          "Improve the error handling in this Python function",
          "Convert this class-based component to a functional component with hooks",
          "Apply SOLID principles to this TypeScript class"
        ],
        inputModes: ["text"],
        outputModes: ["text"]
      },
      {
        id: "code_review",
        name: "Automated Code Review",
        description:
          "Performs comprehensive code reviews, identifying potential issues, security vulnerabilities, and suggesting improvements. Provides detailed feedback and explanations.",
        tags: ["code-review", "security", "quality-assurance", "best-practices"],
        examples: [
          "Review this authentication implementation for security best practices",
          "Analyze this database schema for potential performance issues",
          "Check this API endpoint for proper input validation",
          "Review this React component for accessibility issues",
          "Analyze this error handling strategy for robustness"
        ],
        inputModes: ["text"],
        outputModes: ["text"]
      }
    ],
  }

export function GET() : NextResponse {
    return NextResponse.json(agentCard)
}