import { NextResponse, type NextRequest } from "next/server";
import { generateText } from "ai";
import { A2AError, A2ARequest, A2AResponse } from "@/types/schema";
import { nanoid } from "nanoid";
import openai from "@/lib/llm/providers/openai";


export async function POST(request: NextRequest): Promise<NextResponse> {
  const payload: A2ARequest = await request.json();
  const response: A2AResponse | A2AError = {
    jsonrpc: payload.jsonrpc,
    id: payload.id,
  };

  switch (payload.method) {

    // TODO: Implement tasks/get endpoint to retrieve task results
    // This should:
    // 1. Accept a task ID parameter
    // 2. Look up the task in a persistent storage system
    // 3. Return the current status and any available results
    // 4. Handle cases where the task is still processing
    // 5. Implement proper error handling for missing or invalid tasks
    // case "tasks/get":
    //   break;


    // TODO: Implement tasks/cancel endpoint to handle task cancellation
    // This should:
    // 1. Accept a task ID parameter
    // 2. Verify the task exists and is still running
    // 3. Send a cancellation signal to the underlying process
    // 4. Update the task status in the persistent storage
    // 5. Return appropriate success/failure response
    // 6. Implement proper cleanup of resources for cancelled tasks
    // case "tasks/cancel":
    //   break;

    // case "tasks/pushNotification/get":
    //   break;

    // case "tasks/pushNotification/set":
    //   break;

    // case "tasks/resubscribe":
    //   break;

    // case "tasks/sendSubscribe":
    //   break;

    

    case "tasks/send":
      const result = await generateText({
        model: openai(process.env.CODER_AGENT_MODEL || 'gpt-4o'),
        messages: [
          {
            role: "system",
            content:
              "You are CodeCrafter, a senior software engineer with extensive experience in multiple programming languages and frameworks. Your expertise includes:\n\n" +
              "1. Code Generation & Architecture:\n" +
              "   - Writing clean, maintainable, and production-ready code\n" +
              "   - Following SOLID principles and design patterns\n" +
              "   - Implementing proper error handling and logging\n" +
              "   - Writing comprehensive documentation and comments\n\n" +
              "2. Best Practices & Standards:\n" +
              "   - Following language-specific best practices\n" +
              "   - Implementing proper type safety and validation\n" +
              "   - Writing efficient and optimized code\n" +
              "   - Ensuring code security and following security best practices\n\n" +
              "3. Code Review & Refactoring:\n" +
              "   - Identifying potential issues and improvements\n" +
              "   - Suggesting optimizations for performance\n" +
              "   - Improving code readability and maintainability\n" +
              "   - Ensuring proper test coverage\n\n" +
              "While you have expertise in multiple languages, you prefer Python for its readability and extensive ecosystem. However, you can work with any programming language when required.\n\n" +
              "Always provide detailed explanations for your code and decisions, focusing on maintainability, scalability, and best practices."
          },
          {
            role: "user",
            content: JSON.stringify(payload.params.message.parts),
          },
        ],
      });

      response.result = {
        status: {
          state: "completed",
        },
        id: nanoid(),
        artifacts: [
          {
            parts: [
              {
                type: "text",
                text: result.text,
              },
            ],
          },
        ],
      };

      return NextResponse.json(response);

    default:
      response.id = null;
      response.error = {
        code: -32601,
        message: "method not found.",
      };
      return NextResponse.json(response, {
        status: 400,
        statusText: "invalid method",
      });
  }
}
