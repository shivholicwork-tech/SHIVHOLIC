"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Plus, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useChatStore } from "@/stores/chat-store";
import { mockConversations, mockSuggestedPrompts } from "@/lib/mock-data";

function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className="bg-primary/10">
          <Bot className="h-4 w-4 text-primary" />
        </AvatarFallback>
      </Avatar>
      <div className="rounded-lg px-4 py-3 bg-muted">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-muted-foreground/50"
              animate={{ y: [0, -4, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  const {
    messages,
    conversations,
    activeConversation,
    isStreaming,
    addMessage,
    setConversations,
    setActiveConversation,
    setStreaming,
    clearMessages,
  } = useChatStore();

  const [inputValue, setInputValue] = React.useState("");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Initialize with mock data
  React.useEffect(() => {
    if (conversations.length === 0) {
      setConversations(mockConversations);
      // Load first conversation by default
      setActiveConversation(mockConversations[0]);
    }
  }, [conversations.length, setConversations, setActiveConversation]);

  // Auto-scroll on new messages
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isStreaming]);

  // Auto-resize textarea
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    const textarea = e.target;
    textarea.style.height = "auto";
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + "px";
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: `msg-${Date.now()}`,
      role: "user" as const,
      content: inputValue.trim(),
      timestamp: new Date().toISOString(),
    };

    addMessage(userMessage);
    setInputValue("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    // Simulate AI response
    setStreaming(true);
    setTimeout(() => {
      const assistantMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant" as const,
        content: `I've analyzed your question about "${userMessage.content.slice(0, 50)}". Here are my recommendations:\n\n1. **Focus on long-tail keywords** - They typically have lower competition and higher conversion rates.\n\n2. **Optimize your content structure** - Use clear H2/H3 headings and include your target keywords naturally.\n\n3. **Build topical authority** - Create content clusters around your main topics to signal expertise to search engines.\n\nWould you like me to dive deeper into any of these areas?`,
        timestamp: new Date().toISOString(),
      };
      addMessage(assistantMessage);
      setStreaming(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInputValue(prompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleNewChat = () => {
    clearMessages();
    setInputValue("");
  };

  const handleSelectConversation = (conv: typeof mockConversations[0]) => {
    setActiveConversation(conv);
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <PageHeader
        title="AI SEO Chat"
        description="Chat with your AI SEO assistant for instant insights and recommendations."
      />

      <div className="flex flex-1 gap-4 min-h-0">
        {/* Conversation History Sidebar */}
        <div className="hidden w-64 lg:flex flex-col border rounded-lg bg-card">
          <div className="p-3 border-b">
            <Button onClick={handleNewChat} className="w-full gap-2" size="sm">
              <Plus className="h-4 w-4" />
              New Chat
            </Button>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {conversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => handleSelectConversation(conv)}
                  className={`w-full text-left rounded-lg p-2.5 text-sm transition-colors hover:bg-muted/50 ${
                    activeConversation?.id === conv.id ? "bg-muted" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span className="font-medium truncate">{conv.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 truncate pl-5.5">
                    {conv.date}
                  </p>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <Card className="flex flex-1 flex-col">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-lg font-semibold">How can I help you today?</h3>
                  <p className="text-sm text-muted-foreground max-w-md">
                    I can assist with keyword research, content optimization, technical SEO audits, and more.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg w-full">
                  {mockSuggestedPrompts.slice(0, 6).map((prompt) => (
                    <Button
                      key={prompt}
                      variant="outline"
                      size="sm"
                      className="h-auto py-2 px-3 text-xs text-left justify-start"
                      onClick={() => handlePromptClick(prompt)}
                    >
                      <Sparkles className="h-3 w-3 mr-2 shrink-0 text-primary" />
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <AnimatePresence>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i < 5 ? i * 0.05 : 0 }}
                      className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <Avatar className="h-8 w-8 shrink-0">
                        <AvatarFallback
                          className={msg.role === "assistant" ? "bg-primary/10" : "bg-muted"}
                        >
                          {msg.role === "assistant" ? (
                            <Bot className="h-4 w-4 text-primary" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                        </AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg px-4 py-2.5 max-w-[80%] ${
                          msg.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <div className="text-sm whitespace-pre-line prose prose-sm dark:prose-invert max-w-none">
                          {msg.content}
                        </div>
                        <p className="text-[10px] mt-1 opacity-60">
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {isStreaming && <TypingIndicator />}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2 items-end">
              <textarea
                ref={textareaRef}
                value={inputValue}
                onChange={handleTextareaChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask your AI SEO assistant... (Shift+Enter for new line)"
                className="flex-1 resize-none rounded-lg border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[40px] max-h-[120px]"
                rows={1}
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isStreaming}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Suggested Prompts Sidebar - only show on wide screens */}
        <div className="hidden xl:block w-56 space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Quick Prompts
          </h3>
          <div className="space-y-2">
            {mockSuggestedPrompts.map((prompt) => (
              <Card
                key={prompt}
                className="cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handlePromptClick(prompt)}
              >
                <CardContent className="p-3">
                  <p className="text-xs">{prompt}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
