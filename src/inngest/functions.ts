import {  gemini, createAgent} from "@inngest/agent-kit"
import { inngest } from "./client";
import {Sandbox} from "@e2b/code-interpreter"
import { getSandbox } from "./utils";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async()=>{
      const sandbox = await Sandbox.create("vibe-nextjs-prdeep");
      return sandbox.sandboxId;
    })

    const codeAgent = createAgent({
      name: "code-agent",
      system: "you are an expert summarizer.You summarize in 2 words",
model: gemini({ model: "gemini-2.0-flash-exp" })
    });

    const { output } = await codeAgent.run(
    `Summarize the following text: ${event.data.value}`,
);

const sandboxUrl = await step.run("get-sandbox-url", async()=>{
  const sandbox = await getSandbox(sandboxId);
  const host = sandbox.getHost(3000)
  return `https://${host}`;
})
    return {output, sandboxUrl };
  },
);