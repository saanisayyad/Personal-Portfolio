import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaPaperPlane,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "👋 Hi! I'm Mohammadsaani's AI Assistant.\n\nAsk me about my projects, skills, education, experience, notes, or contact information.",
    },
  ]);

  const messagesEndRef = useRef(null);

  const chatRef = useRef(null);

  const suggestions = [
    "Tell me about yourself",
    "What projects have you built?",
    "What skills do you have?",
    "What is your education?",
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (
      isOpen &&
      chatRef.current &&
      !chatRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  document.addEventListener(
    "mousedown",
    handleClickOutside
  );

  return () => {
    document.removeEventListener(
      "mousedown",
      handleClickOutside
    );
  };
}, [isOpen]);

  const sendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = {
      role: "user",
      content: messageText,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: messageText,
          }),
        }
      );

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            data.reply ||
            "Sorry, I couldn't generate a response.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Sorry, something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  const clearChat = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "👋 Hi! I'm Mohammadsaani's AI Assistant.\n\nAsk me about my projects, skills, education, experience, notes, or contact information.",
      },
    ]);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
  <motion.button
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    onClick={() => setIsOpen(true)}
    className="
      fixed bottom-7 right-5 z-50
      h-14 w-14
      rounded-full
      bg-gradient-to-r
      from-pink-500
      to-orange-500
      text-white
      shadow-lg
      shadow-pink-500/30
      flex items-center justify-center
    "
  >
    <FaRobot size={20} />
  </motion.button>
)}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatRef}
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 30,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
              fixed bottom-5 right-5 z-50
              flex flex-col
              h-[430px]
              w-[320px]
              overflow-hidden
              rounded-3xl
              border border-white/10
              bg-[#09090b]/95
              backdrop-blur-xl
              shadow-[0_20px_60px_rgba(236,72,153,0.15)]
            "
          >
            {/* Glow Background */}
            <div
              className="
                absolute inset-0
                bg-gradient-to-r
                from-pink-500/5
                via-fuchsia-500/5
                to-orange-500/5
                pointer-events-none
              "
            />

            {/* Header */}
            <div
              className="
                relative
                bg-gradient-to-r
                from-pink-500
                via-fuchsia-500
                to-orange-500
                px-4 py-3
                text-white
              "
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold">
                    AI Portfolio Assistant
                  </h2>

                  <p className="text-xs opacity-80">
                    Ask anything about me
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={clearChat}
                    className="hover:opacity-70 transition"
                  >
                    <FaTrash size={14} />
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:opacity-70 transition"
                  >
                    <FaTimes size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="relative flex-1 overflow-y-auto no-scrollbar bg-[#09090b] p-4">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-3 flex ${
                    msg.role === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-2 text-sm ${
                      msg.role === "user"
                        ? `
                          bg-gradient-to-r
                          from-pink-500
                          to-orange-500
                          text-white
                          shadow-lg
                          shadow-pink-500/20
                        `
                        : `
                          bg-zinc-900/80
                          border
                          border-zinc-800
                          text-zinc-200
                          backdrop-blur-md
                        `
                    }`}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="mb-3 flex justify-start">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 backdrop-blur-md">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 rounded-full bg-pink-400 animate-bounce"></span>
                      <span className="h-2 w-2 rounded-full bg-pink-400 animate-bounce [animation-delay:0.15s]"></span>
                      <span className="h-2 w-2 rounded-full bg-orange-400 animate-bounce [animation-delay:0.3s]"></span>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="border-t border-zinc-800 bg-[#09090b] p-2">
              <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap no-scrollbar">
                {suggestions.map((item) => (
                  <button
                    key={item}
                    onClick={() => sendMessage(item)}
                    className="
                      whitespace-nowrap
                      rounded-full
                      border
                      border-pink-500/20
                      bg-white/5
                      backdrop-blur-md
                      px-3 py-1
                      text-xs
                      text-pink-300
                      hover:bg-pink-500/10
                      transition-all
                    "
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="border-t border-zinc-800 bg-[#09090b] p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  placeholder="Ask me anything..."
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      sendMessage();
                    }
                  }}
                  className="
                    flex-1
                    rounded-full
                    border
                    border-zinc-800
                    bg-zinc-900/80
                    text-white
                    placeholder:text-zinc-500
                    px-4 py-2
                    text-sm
                    outline-none
                    focus:border-pink-500
                  "
                />

                <button
                  onClick={() => sendMessage()}
                  className="
                    rounded-full
                    bg-gradient-to-r
                    from-pink-500
                    to-orange-500
                    px-4
                    text-white
                    hover:scale-105
                    transition-all
                    shadow-lg
                    shadow-pink-500/20
                  "
                >
                  <FaPaperPlane />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;