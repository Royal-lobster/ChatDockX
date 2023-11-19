import { useEffect } from "react";
import { SidebarInput } from "./ChatInput";
import ChatList from "./ChatList";
import type { Settings } from "~config/settings";
import { useChatCompletion } from "~hooks/useChatCompletion";
import { SYSTEM_PROMPT } from "~config/prompts";

interface ChatProps {
  settings: Settings;
}

const Chat = ({ settings }: ChatProps) => {
  const { messages, submitQuery, clearMessages, generating, cancelRequest } =
    useChatCompletion({
      model: settings.chat.modal,
      apiKey: settings.chat.openAIKey!,
      mode: settings.chat.mode,
      systemPrompt: SYSTEM_PROMPT,
    });

  useEffect(() => {
    const handleWindowMessage = (event: MessageEvent) => {
      const { action, prompt } = event.data as {
        action: string;
        prompt: string;
      };
      if (action === "generate") {
        submitQuery(prompt);
      }
    };
    window.addEventListener("message", handleWindowMessage);

    return () => {
      window.removeEventListener("message", handleWindowMessage);
    };
  }, []);

  return (
    <>
      <ChatList messages={messages} />
      <SidebarInput
        loading={generating}
        submitMessage={submitQuery}
        chatIsEmpty={messages.length <= 1}
        clearMessages={clearMessages}
        cancelRequest={cancelRequest}
      />
    </>
  );
};

export default Chat;
