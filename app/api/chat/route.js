import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request) {
  try {
    const { messages, system, model, max_tokens } = await request.json();

    const response = await client.messages.create({
      model: model || "claude-sonnet-4-20250514",
      max_tokens: max_tokens || 1000,
      system,
      messages,
    });

    return Response.json(response);
  } catch (err) {
    const status = err.status || 500;
    return Response.json(
      { error: { message: err.message || "Internal server error" } },
      { status }
    );
  }
}
