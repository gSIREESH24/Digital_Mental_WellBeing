import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle, Send, X, Minimize2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm here to support you. How are you feeling today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const quickReplies = ["Feeling stressed", "Need someone to talk to", "Sleep issues", "Anxiety"];

  const handleSend = (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue("");

    setIsTyping(true);
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: "I understand you're going through a difficult time. Remember, it's okay to feel this way. Would you like to explore some coping strategies or talk more about what's on your mind?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-8 left-8 z-50 group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-emerald-400 to-teal-400 rounded-full blur-lg opacity-60 group-hover:opacity-80 animate-pulse-slow" />
        <Button
          size="lg"
          className="relative h-20 w-20 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 bg-gradient-to-r from-primary to-emerald-600"
          onClick={() => setIsOpen(true)}
          data-testid="button-open-chat"
        >
          <MessageCircle className="h-9 w-9" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-8 left-8 w-[420px] max-w-[calc(100vw-4rem)] h-[650px] max-h-[calc(100vh-4rem)] flex flex-col shadow-2xl z-50 border-2" data-testid="card-chatbot">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarFallback className="bg-gradient-to-br from-primary to-emerald-600 text-white font-semibold">
                AI
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background" />
          </div>
          <div>
            <CardTitle className="text-lg">MindEase AI Assistant</CardTitle>
            <Badge variant="secondary" className="text-xs mt-1">
              Online • Ready to help
            </Badge>
          </div>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            data-testid="button-close-chat"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto space-y-4 pb-4 pt-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"} animate-fade-in-up`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm ${
                message.sender === "user"
                  ? "bg-gradient-to-br from-primary to-emerald-600 text-white rounded-tr-sm"
                  : "bg-muted rounded-tl-sm"
              }`}
              data-testid={`message-${message.sender}`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
            </div>
          </div>
        )}
      </CardContent>

      <div className="px-6 pb-3 border-t pt-3">
        <div className="flex flex-wrap gap-2">
          {quickReplies.map((reply) => (
            <Badge
              key={reply}
              variant="outline"
              className="cursor-pointer hover-elevate active-elevate-2 transition-all hover:scale-105 border-primary/30"
              onClick={() => handleSend(reply)}
              data-testid={`badge-quick-reply-${reply.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {reply}
            </Badge>
          ))}
        </div>
      </div>

      <CardFooter className="pt-0 pb-6 px-6">
        <div className="flex gap-2 w-full">
          <Input
            placeholder="Type your message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 rounded-full"
            data-testid="input-chat-message"
          />
          <Button 
            size="icon" 
            onClick={() => handleSend()} 
            className="rounded-full transition-all hover:scale-110 shadow-lg bg-gradient-to-r from-primary to-emerald-600" 
            data-testid="button-send-message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
