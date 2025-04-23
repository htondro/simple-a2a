import openai from "@/lib/llm/providers/openai";
import { A2ARequest, AgentCard } from "@/types/schema";
import { streamText, ToolSet } from "ai";
import { nanoid } from "nanoid";
import { NextRequest } from "next/server";
import {z} from "zod"

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  // TODO: Implement auto-discovery of all agents inside the agents folder
  // This should scan the agents directory, fetch agent.json for each agent,
  // and dynamically register them as tools without manual configuration.
  // This would allow for a more scalable approach as new agents are added.

  const agentCardResponse = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/agents/coder/well-known/agent.json`
  );
  const agentCardData: AgentCard = await agentCardResponse.json();


  // TODO: Implement proper toolset creation based on agent capabilities
  // This should:
  // 1. Parse each agent's input/output modes from their agent.json
  // 2. Create appropriate parameter schemas based on agent capabilities
  // 3. Handle different response formats (text, images, structured data)
  // 4. Support streaming responses when agent.capabilities.streaming is true
  // 5. Properly map agent skills to tool functions with appropriate descriptions
  const tools: ToolSet = {};
  if (agentCardData.name && agentCardData.description) {
    tools.coder = {
      id: `${agentCardData.name}.agent` as const,
      parameters: z.object({
          message: z.string().describe(
            "The user's request that needs to be processed. This should be a clear description of the task, " +
            "including any specific requirements, constraints, or context. The message should be formatted " +
            "in a way that the CodeCrafter agent can understand and process effectively. " +
            "Examples of good messages include:\n" +
            "- 'Create a Python function to calculate the Fibonacci sequence with memoization'\n" +
            "- 'Refactor this React component to use hooks and improve performance'\n" +
            "- 'Review this authentication implementation for security best practices'"
          )
        }
    ),
      execute: async ({message}) => {
        const payload: A2ARequest = {
          id: nanoid(),
          method: "tasks/send",
          params: {
            id: nanoid(),
            message: {
              role: "user",
              parts: [
                {
                  type: "text",
                  text: JSON.stringify(message),
                },
              ],
            },
          },
        };
        const agentResponse = await fetch(agentCardData.url, {
          method: "POST",
          body: JSON.stringify(payload),
        });

        const agentResponseData = await agentResponse.json();

        return agentResponseData;
      },
    };
  }

  const result = streamText({
    model: openai(process.env.CLIENT_AGENT_MODEL || 'gpt-4o-mini'),
    system:
      "You are an intelligent request triage agent responsible for routing user requests to the most appropriate tools. Your role is to:\n\n" +
      "1. Analyze User Requests:\n" +
      "   - Understand the user's intent and requirements\n" +
      "   - Identify the type of task (code generation, refactoring, review, etc.)\n" +
      "   - Determine the complexity and scope of the request\n\n" +
      "2. Tool Selection:\n" +
      "   - Choose the most appropriate tool for each request\n" +
      "   - Consider the tool's capabilities and limitations\n" +
      "   - Ensure the selected tool can handle the request effectively\n\n" +
      "3. Request Preparation:\n" +
      "   - Format the request appropriately for the selected tool\n" +
      "   - Include any necessary context or parameters\n" +
      "   - Ensure the request is clear and well-structured\n\n" +
      "4. Response Handling:\n" +
      "   - Pass through the tool's response to the user\n" +
      "   - Do not modify or process the tool's response\n" +
      "   - Maintain the original format and structure\n\n" +
      "Remember: Your primary role is to route requests, not to provide direct answers. Always use the available tools to handle user requests.",
    messages: messages,
    tools: tools,
    maxSteps: 2,
    // TODO: Implement proper error handling
    // This should:
    // 1. Add structured error responses with appropriate status codes
    // 2. Implement logging for errors with relevant context
    // 3. Add retry logic for transient failures
    // 4. Handle network timeouts and connection issues
    // 5. Provide meaningful error messages to the client
    onError: (e => {
        console.log(e)
    })
  });

  return result.toDataStreamResponse();
}
