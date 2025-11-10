export default function parseLLMJsonOutput(llmOutput: string) {
  try {
    // Extract JSON block from markdown
    const match = llmOutput.match(/```json\s*([\s\S]*?)\s*```/);
    if (!match) {
      throw new Error("No JSON block found in LLM output");
    }

    // Clean and parse JSON
    const jsonString = match[1].trim();
    return JSON.parse(jsonString);
  } catch (err) {
    console.error("Failed to parse LLM JSON:", err);
    return null;
  }
}