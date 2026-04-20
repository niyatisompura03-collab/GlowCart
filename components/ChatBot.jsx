'use client';

import { MessageCircle, X, Send, Sparkles, User, Bot, Loader2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e, forcedInput = null) => {
    if (e) e.preventDefault();
    const userMsg = (forcedInput || input).trim();
    if (!userMsg || isLoading) return;

    // 1. Add user message
    const userMessageObj = { id: Date.now().toString(), role: 'user', content: userMsg };
    const updatedMessages = [...messages, userMessageObj];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      // 2. Fetch from our API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: updatedMessages.map(m => ({ role: m.role, content: m.content })) 
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.details || errorData.error || 'Connection failed');
      }

      // 3. Setup AI message placeholder
      const aiMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiMessageId, role: 'assistant', content: '' }]);

      // 4. Manually Parse the Vercel AI Stream
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let fullContent = '';

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunk = decoder.decode(value, { stream: true });
        
        // Vercel AI Data Stream protocol parsing
        // Chunks look like: 0:"content"\n or d:{"finishReason":"stop"...}
        const lines = chunk.split('\n');
        for (const line of lines) {
          if (!line.trim()) continue;

          // 1. Check for standard Vercel AI Protocol (0:"text")
          const protocolMatch = line.match(/^0:"(.*)"$/);
          if (protocolMatch && protocolMatch[1]) {
            try {
              const text = JSON.parse(`"${protocolMatch[1]}"`);
              fullContent += text;
              continue;
            } catch (e) {}
          }

          // 2. Check for Error protocols (3: or e:)
          if (line.startsWith('3:') || line.startsWith('e:')) {
            fullContent = "Chat Error: " + line.substring(2);
            done = true;
            break;
          }

          // 3. Fallback: If it's a raw text chunk without any prefix
          if (!line.includes(':') || line.length > 50) {
            fullContent += line;
          }
        }
        
        // Final state update for the chunk
        setMessages(prev => prev.map(m => 
          m.id === aiMessageId ? { ...m, content: fullContent } : m
        ));
      }
    } catch (error) {
      console.error("Manual Chat Error:", error);
      setMessages(prev => [...prev, { 
        id: 'err', 
        role: 'assistant', 
        content: "Oops! I'm having trouble connecting. Please check your internet or try again later." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-tr from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group relative"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[380px] h-[550px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-gray-100 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-300 text-black">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 p-5 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg leading-tight">GlowBot</h3>
                  <p className="text-xs text-orange-100 opacity-90 font-medium">Beauty Consultant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-1.5 rounded-lg transition-colors"
                type="button"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f8f9fa] scroll-smooth"
          >
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center px-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                  <Sparkles size={32} className="text-orange-500" />
                </div>
                <h4 className="text-gray-800 font-bold mb-1 text-lg">Hello Beauty! ✨</h4>
                <p className="text-gray-500 text-sm">
                  I'm your official GlowBot. Ask me for skincare routines or product advice.
                </p>
                <div className="mt-6 flex flex-wrap gap-2 justify-center">
                  {['Skincare Routine', 'Makeup Tips', 'Our Products'].map((tip) => (
                    <button
                      key={tip}
                      onClick={() => {
                        const fakeEvent = { preventDefault: () => {} };
                        setInput(tip);
                        // Using a small timeout to let state update or calling manually
                        setTimeout(() => {
                           handleSend(fakeEvent, tip);
                        }, 50);
                      }}
                      className="text-xs bg-white border border-orange-200 text-orange-600 px-3 py-2 rounded-full hover:bg-orange-50 transition-colors shadow-sm font-medium"
                      type="button"
                    >
                      {tip}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-1`}>
                <div className={`flex gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ${
                    m.role === 'user' ? 'bg-orange-500' : 'bg-pink-100 border border-pink-100'
                  }`}>
                    {m.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-pink-600" />}
                  </div>
                  <div className={`p-3.5 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'bg-orange-500 text-white rounded-tr-none' 
                      : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none font-medium'
                  }`}>
                    {m.content}
                  </div>
                </div>
              </div>
            ))}

            {isLoading && !messages[messages.length-1]?.content && (
              <div className="flex justify-start">
                <div className="flex gap-2 items-center bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm">
                  <Loader2 size={16} className="text-orange-500 animate-spin" />
                  <span className="text-xs text-gray-500 font-bold">GlowBot is writing...</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <form onSubmit={handleSend} className="relative flex items-center">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message GlowBot..."
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-12 pr-12 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-gray-800 placeholder:text-gray-400"
              />
              <div className="absolute left-4 text-orange-400">
                <Sparkles size={18} />
              </div>
              <button 
                disabled={!input.trim() || isLoading}
                type="submit" 
                className="absolute right-2 bg-orange-500 text-white p-2.5 rounded-xl hover:bg-orange-600 transition-all disabled:opacity-50 disabled:grayscale shadow-lg shadow-orange-100"
              >
                <Send size={18} />
              </button>
            </form>
            <p className="text-[10px] text-center text-gray-400 mt-3 font-bold uppercase tracking-widest leading-none">Powered by GlowCart AI</p>
          </div>
        </div>
      )}
    </div>
  );
}
