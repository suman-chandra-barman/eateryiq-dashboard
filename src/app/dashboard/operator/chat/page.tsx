import { ChatHistory } from "@/components/ChatHistory";
import { ChatInterface } from "@/components/ChatInterface";
import DashboardHeader from "@/components/DashboardHeader";

export default function ChatPage() {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader title="Operator Dashboard" />
      <h1 className="text-3xl font-bold text-foreground mb-4">
        EateryGPT Chat
      </h1>
      <div className="flex-1 flex overflow-hidden gap-4">
        <div className="flex-1 overflow-auto">
          <ChatInterface />
        </div>
        <ChatHistory />
      </div>
    </div>
  );
}
