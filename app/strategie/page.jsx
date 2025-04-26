'use client';
import { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

export default function Strategie() {
  // State to track if component is mounted (client-side only)
  const [isMounted, setIsMounted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Function to generate a unique ID (with fallback)
  const generateUniqueId = () => {
    try {
      return crypto.randomUUID();
    } catch (error) {
      // Fallback method if randomUUID is not available
      return `id-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    }
  };

  // Mark component as mounted on client side
  useEffect(() => {
    setIsMounted(true);
    
    // Check for existing session or create a new one
    let existingSessionId = localStorage.getItem('chatSessionId');
    
    if (!existingSessionId) {
      // Generate a new session ID
      existingSessionId = generateUniqueId();
      localStorage.setItem('chatSessionId', existingSessionId);
      
      // Add welcome message for new session
      setMessages([
        {
          role: 'assistant',
          content: 'Willkommen! Ich bin dein Strategie-Assistent. Wie kann ich dir heute helfen?'
        }
      ]);
    } else {
      // Load previous session
      loadPreviousSession(existingSessionId);
    }
  }, []);

  // Function to load previous session
  const loadPreviousSession = async (sessionId) => {
    setIsLoading(true);
    try { 
      const response = await fetch(`https://skillcamp.app.n8n.cloud/webhook/chat`, { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'loadPreviousSession',
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to load previous session');
      }

      const data = await response.json();
      
      if (data.messages && Array.isArray(data.messages) && data.messages.length > 0) {
        setMessages(data.messages);
      } else {
        // If no messages found, show welcome message
        setMessages([
          {
            role: 'assistant',
            content: 'Willkommen zurück! Wie kann ich dir heute helfen?'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading previous session:', error);
      setMessages([
        {
          role: 'assistant',
          content: 'Willkommen! Ich bin dein Strategie-Assistent. Wie kann ich dir heute helfen?'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

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
      // Call the n8n Chat webhook with the proper action and parameters
      const response = await fetch(`https://skillcamp.app.n8n.cloud/webhook/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'sendMessage',
          chatInput: userMessage.content,
          sessionId: localStorage.getItem('chatSessionId') || generateUniqueId()
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      // Store the session ID for future messages
      if (data.sessionId) {
        localStorage.setItem('chatSessionId', data.sessionId);
      }

      // Add assistant response to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.output || data.response || data.text || 
                (typeof data === 'string' ? data : JSON.stringify(data)) || 
                'Es tut mir leid, ich konnte keine Antwort generieren.'
      }]);
    } catch (error) {
      console.error('Error connecting to n8n agent:', error);
      
      // Add error message to chat
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Es tut mir leid, es gab einen Fehler bei der Verbindung zum n8n-Agent. Bitte versuche es später noch einmal.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Function to start a new chat session
  const startNewChat = () => {
    // Generate a new session ID
    const newSessionId = generateUniqueId();
    localStorage.setItem('chatSessionId', newSessionId);
    
    // Reset messages
    setMessages([
      {
        role: 'assistant',
        content: 'Neue Konversation gestartet! Wie kann ich dir heute helfen?'
      }
    ]);
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
              {/* Header with new chat button */}
              <div className="border-b border-white/[0.08] p-3 flex justify-between items-center">
                <div className="text-white/80 font-medium">Chat</div>
                <button 
                  onClick={startNewChat}
                  className="text-sm text-white/60 hover:text-white transition-colors px-2 py-1 rounded-md hover:bg-white/[0.05]"
                >
                  Neue Konversation
                </button>
              </div>
              
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
                      <ReactMarkdown
                        components={{
                          // Customize styling for different markdown elements
                          h1: ({node, ...props}) => <h1 className="text-xl font-bold mb-2" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-lg font-bold mb-1" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-md font-bold mb-1" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2" {...props} />,
                          li: ({node, ...props}) => <li className="mb-1" {...props} />,
                          p: ({node, ...props}) => <p className="mb-2" {...props} />,
                          a: ({node, ...props}) => <a className="text-indigo-300 underline" {...props} />,
                          code: ({node, inline, ...props}) => 
                            inline 
                              ? <code className="bg-black/20 px-1 rounded" {...props} />
                              : <code className="block bg-black/20 p-2 rounded my-2 overflow-x-auto" {...props} />
                        }}
                      >
                        {message.content}
                      </ReactMarkdown>
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