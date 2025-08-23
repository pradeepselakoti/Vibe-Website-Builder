import {  gemini, createAgent} from "@inngest/agent-kit"
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system: "you are an expert summarizer.You summarize in 2 words",
model: gemini({ model: "gemini-2.0-flash-exp" })
    });

    const { output } = await codeAgent.run(
    `Summarize the following text: ${event.data.value}`,
);
    return {output };
  },
);