"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const quickReplies = [
  "Tell me about your experience",
  "What technologies do you use?",
  "Are you available for hire?",
  "View my projects",
];

const botResponses: Record<string, string> = {
  "tell me about your experience":
    "I have 8+ years of experience as a Principal Full-Stack Engineer, leading architecture decisions and delivering enterprise-grade web platforms. I've worked with TechNova Solutions, WebCraft Labs, and CodeBridge Inc.",
  "what technologies do you use?":
    "I specialize in React, Next.js, TypeScript, Node.js, Python, PostgreSQL, GraphQL, and cloud platforms like AWS. I also work with Docker, Kubernetes, and various CI/CD tools.",
  "are you available for hire?":
    "Yes! I'm currently available for senior engineering roles. Feel free to reach out via email at tim.baker@example.com or connect with me on LinkedIn.",
  "view my projects":
    "You can check out my featured projects in the Projects section above. I've built e-commerce platforms, dev blogs, project management tools, analytics dashboards, and more!",
  default:
    "Thanks for your message! I'm a bot assistant for Tim's portfolio. Try asking about experience, technologies, hiring availability, or projects. You can also reach Tim directly at tim.baker@example.com",
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hi there! I'm Tim's portfolio assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string = inputValue.trim()) => {
    if (!text) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = botResponses.default;

      for (const [key, value] of Object.entries(botResponses)) {
        if (key !== "default" && lowerText.includes(key)) {
          responseText = value;
          break;
        }
      }

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    }, 800);
  };

  const handleQuickReply = (reply: string) => {
    handleSend(reply);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.3 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen
            ? "bg-red-500/10 text-red-400 border border-red-500/20"
            : "bg-indigo-500 text-white hover:bg-indigo-600"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass rounded-2xl overflow-hidden shadow-2xl border border-indigo-500/20"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-indigo-500/10 border-b border-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">Portfolio Assistant</h3>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${
                    message.sender === "user" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === "user"
                        ? "bg-indigo-500/20"
                        : "bg-white/10"
                    }`}
                  >
                    {message.sender === "user" ? (
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                    ) : (
                      <Bot className="w-3.5 h-3.5 text-muted-foreground" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                      message.sender === "user"
                        ? "bg-indigo-500/20 text-foreground"
                        : "bg-white/5 text-muted-foreground"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 flex gap-2 overflow-x-auto border-t border-white/5">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  className="flex-shrink-0 text-xs px-3 py-1.5 rounded-full bg-white/5 text-muted-foreground hover:bg-indigo-500/10 hover:text-indigo-400 transition-colors whitespace-nowrap"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/5 flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-500/50 transition-colors"
              />
              <motion.button
                onClick={() => handleSend()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!inputValue.trim()}
                className="p-2 rounded-lg bg-indigo-500 text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
