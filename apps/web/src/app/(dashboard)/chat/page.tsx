"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles } from "lucide-react";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const messages = [
  {
    role: "assistant",
    content:
      "Hello! I'm your AI SEO assistant. I can help you with keyword research, content optimization, technical SEO analysis, and more. What would you like to work on today?",
  },
  {
    role: "user",
    content: "Can you help me find keywords for a blog about machine learning?",
  },
  {
    role: "assistant",
    content:
      "I'd be happy to help with keyword research for machine learning content! Here are some high-potential keywords:\n\n1. \"machine learning tutorial\" - 18,000 monthly searches\n2. \"what is machine learning\" - 33,000 monthly searches\n3. \"machine learning algorithms\" - 12,000 monthly searches\n4. \"machine learning vs deep learning\" - 8,000 monthly searches\n\nWould you like me to analyze any of these further or suggest content angles?",
  },
];

const suggestedPrompts = [
  "Find keyword opportunities for my niche",
  "Analyze my competitor's top pages",
  "Help me optimize this article for SEO",
  "Create a topical map for my website",
  "Suggest internal linking opportunities",
  "Check my site's technical SEO issues",
];

export default function ChatPage() {
  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col space-y-4">
      <PageHeader
        title="AI SEO Chat"
        description="Chat with your AI SEO assistant for instant insights and recommendations."
      />

      <div className="flex flex-1 gap-4 min-h-0">
        {/* Chat Area */}
        <Card className="flex flex-1 flex-col">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <Avatar className="h-8 w-8 shrink-0">
                    <AvatarFallback className={msg.role === "assistant" ? "bg-primary/10" : "bg-muted"}>
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
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t p-4">
            <div className="flex gap-2">
              <Input placeholder="Ask your AI SEO assistant..." className="flex-1" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>

        {/* Suggested Prompts Sidebar */}
        <div className="hidden w-64 lg:block space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Suggested Prompts
          </h3>
          <div className="space-y-2">
            {suggestedPrompts.map((prompt) => (
              <Card key={prompt} className="cursor-pointer hover:bg-muted/50 transition-colors">
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
