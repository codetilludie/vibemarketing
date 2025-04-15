'use client';
import { useEffect, useState, useRef } from 'react';

export default function Strategie() {
  // State to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Mark component as mounted on client side
  useEffect(() => {
    setIsMounted(true);
    // Add welcome message
    setMessages([
      {
        role: 'assistant',
        content: 'Willkommen! Ich bin dein Strategie-Assistent. Wie kann ich dir heute helfen?'
      }
    ]);
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and set loading state
    setInputValue('');
    setIsLoading(true);

    try {
      // Call your n8n workflow endpoint
      const response = await fetch('https://n8n.vibe.ai/webhook/strategie-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();

      // Add assistant response to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.message || 'Es tut mir leid, ich konnte keine Antwort generieren.'
      }]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Es tut mir leid, es gab einen Fehler bei der Verarbeitung deiner Anfrage.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] via-transparent to-rose-500/[0.05] blur-3xl"></div>

        {/* Decorative shapes (same as homepage) */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="shape-initial"
            style={{
              left: '-5%', top: '15%',
              '--delay': '0.3s',
              '--initial-rotate': '-10deg',
              '--final-rotate': '5deg',
              '--shape-size': '250px',
              '--float-rotate': '-4deg',
            }}>
            <div className="shape-float-inner">
              <div className="geometric-shape shape-circle" style={{'--shape-gradient': 'linear-gradient(to right, rgba(139, 92, 246, 0.15), transparent)'}}></div>
            </div>
          </div>
          <div
            className="shape-initial"
            style={{
              right: '0%', top: '65%',
              '--delay': '0.5s',
              '--initial-rotate': '30deg',
              '--final-rotate': '-10deg',
              '--shape-size': '180px',
              '--float-rotate': '5deg',
            }}>
            <div className="shape-float-inner">
              <div className="geometric-shape shape-square" style={{'--shape-gradient': 'linear-gradient(to left, rgba(244, 63, 94, 0.15), transparent)'}}></div>
            </div>
          </div>
          <div
            className="shape-initial"
            style={{
              left: '10%', bottom: '10%',
              '--delay': '0.4s',
              '--initial-rotate': '-20deg',
              '--final-rotate': '8deg',
              '--shape-size': '120px',
              '--float-rotate': '2deg',
            }}>
            <div className="shape-float-inner">
              <div className="geometric-shape shape-circle" style={{'--shape-gradient': 'linear-gradient(to top, rgba(167, 139, 250, 0.15), transparent)'}}></div>
            </div>
          </div>
        </div>

        <div className="relative z-10 container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="fade-up-element" style={{'--delay': '0.5s'}}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-6 tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300">
                  Vibe-Strategie
                </span>
              </h1>
            </div>

            <div className="fade-up-element" style={{'--delay': '0.7s'}}>
              <p className="text-base sm:text-lg text-white/40 mb-8 leading-relaxed font-light tracking-wide max-w-xl mx-auto px-4">
                Sprich mit unserem Strategie-Assistenten und erhalte personalisierte Marketing-Beratung.
              </p>
            </div>
          </div>

          <div className="fade-up-element" style={{'--delay': '0.9s'}}>
            <div className="max-w-2xl mx-auto bg-white/[0.03] border border-white/[0.08] rounded-xl overflow-hidden">
              {/* Chat messages container */}
              <div className="h-[400px] overflow-y-auto p-4 flex flex-col space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white' 
                          : 'bg-white/[0.07] text-white/90'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-lg px-4 py-2 bg-white/[0.07] text-white/90">
                      <span className="flex items-center gap-1">
                        <span className="animate-bounce">.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>.</span>
                        <span className="animate-bounce" style={{ animationDelay: '0.4s' }}>.</span>
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
              
              {/* Chat input form */}
              <form onSubmit={handleSubmit} className="border-t border-white/[0.08] p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Schreibe deine Nachricht..."
                    className="custom-input flex-grow bg-white/[0.03] border border-white/[0.08] rounded-full text-white/80 placeholder:text-white/30 px-4 py-2 focus:ring-0"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="rounded-full p-2 bg-gradient-to-r from-indigo-500 to-rose-500 hover:from-indigo-600 hover:to-rose-600 text-white transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent pointer-events-none"></div>
      </div>

      <footer className="py-8 text-center text-white/40 text-sm relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          &copy; {new Date().getFullYear()} VIBE. All rights reserved.
        </div>
      </footer>
    </>
  );
} 