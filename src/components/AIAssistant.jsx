import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Brain, Bot } from 'lucide-react';

const QA_MAP = {
  saleo: {
    question: "What is SaLeO TrEnD?",
    answer: "SaLeO TrEnD is a custom software solution designed by Pansin to digitize the end-to-end supply chain and sales tracking operations for Alphovins Global Agro Exports, enhancing logistics efficiency."
  },
  alphovins: {
    question: "Tell me about Alphovins Exports.",
    answer: "Alphovins Global Agro Exports is an international trade company where Pansin serves as CEO. He manages supply chain logistics, pricing coordination, and digitized sales tracking."
  },
  matlab: {
    question: "What is his MATLAB experience?",
    answer: "Pansin was a Research Intern at IIChE Student Chapter, AMU, where he integrated AI/ML algorithms in chemical engineering computations and system optimizations using MATLAB."
  },
  opportunity: {
    question: "Is he open to job opportunities?",
    answer: "Yes, Pansin is actively seeking internships, research collaborations, and freelance opportunities in AI, Machine Learning, and Data Science. Feel free to use the contact form to reach out!"
  },
  skills: {
    question: "What are his core technical skills?",
    answer: "His technical arsenal spans Python, SQL, Power BI, Machine Learning (including K-Means), MATLAB, React/React Native, and API integrations (like REST & Groq API)."
  }
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! I am Pansin's AI Assistant. Ask me anything about his projects, skills, or business experience!"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { id: `user-${messages.length}-${text.length}`, sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking delay
    setTimeout(() => {
      let botResponse = "I'm not fully sure about that, but Pansin is highly skilled in AI, Data Science, and B2B Operations! Feel free to mail him directly at pansinaspg@gmail.com.";
      
      const query = text.toLowerCase();
      // Match keywords
      if (query.includes('saleo') || query.includes('trend') || query.includes('software')) {
        botResponse = QA_MAP.saleo.answer;
      } else if (query.includes('alphovins') || query.includes('agro') || query.includes('ceo') || query.includes('export')) {
        botResponse = QA_MAP.alphovins.answer;
      } else if (query.includes('matlab') || query.includes('research') || query.includes('iiche') || query.includes('chemical')) {
        botResponse = QA_MAP.matlab.answer;
      } else if (query.includes('job') || query.includes('open') || query.includes('hire') || query.includes('internship') || query.includes('freelance') || query.includes('opportunity')) {
        botResponse = QA_MAP.opportunity.answer;
      } else if (query.includes('skill') || query.includes('languages') || query.includes('technologies') || query.includes('stack')) {
        botResponse = QA_MAP.skills.answer;
      } else if (query.includes('hi') || query.includes('hello') || query.includes('hey')) {
        botResponse = "Hello! What aspect of Pansin's expertise would you like to explore? (e.g. Alphovins, SaLeO TrEnD, Skills, or Internships)";
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { id: `bot-${prev.length}`, sender: 'bot', text: botResponse }]);
    }, 1200);
  };

  const handleSuggestionClick = (key) => {
    const qa = QA_MAP[key];
    handleSend(qa.question);
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 999 }}>
      {/* Expand/Collapse Trigger Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1, boxShadow: '0 0 20px var(--primary-glow)' }}
        whileTap={{ scale: 0.95 }}
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'var(--primary)',
          border: 'none',
          color: '#000',
          cursor: 'pointer',
          display: 'grid',
          placeItems: 'center',
          boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
          outline: 'none'
        }}
      >
        {isOpen ? <X size={24} /> : <Bot size={24} />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.85 }}
            className="glass-panel"
            style={{
              position: 'absolute',
              bottom: '70px',
              right: 0,
              width: '350px',
              height: '460px',
              background: 'var(--bg-panel)',
              border: '1px solid var(--border-light)',
              borderRadius: '20px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 15px 40px rgba(0,0,0,0.5)'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--border-light)',
              background: 'rgba(255,255,255,0.02)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)',
                  display: 'grid', placeItems: 'center', color: 'var(--primary)', border: '1px solid var(--border-light)'
                }}>
                  <Brain size={16} />
                </div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-main)', margin: 0, fontWeight: 700 }}>Pansin AI</h4>
                  <span style={{ fontSize: '0.7rem', color: 'var(--primary)' }}>● Online Assistant</span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Body */}
            <div style={{
              flexGrow: 1,
              padding: '20px',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              background: 'rgba(0,0,0,0.2)'
            }}>
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: msg.sender === 'user' ? '14px 14px 2px 14px' : '14px 14px 14px 2px',
                    background: msg.sender === 'user' ? 'var(--primary)' : 'rgba(255, 255, 255, 0.05)',
                    color: msg.sender === 'user' ? '#000' : 'var(--text-main)',
                    fontSize: '0.85rem',
                    lineHeight: 1.4,
                    fontWeight: msg.sender === 'user' ? 600 : 400,
                    border: msg.sender === 'bot' ? '1px solid var(--border-light)' : 'none'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '10px 16px',
                    borderRadius: '14px 14px 14px 2px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: 'var(--text-muted)',
                    fontSize: '0.8rem',
                    border: '1px solid var(--border-light)'
                  }}>
                    <motion.span
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Pansin AI is writing...
                    </motion.span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions chips */}
            {messages.length === 1 && !isTyping && (
              <div style={{
                padding: '8px 16px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                background: 'rgba(0,0,0,0.1)',
                borderTop: '1px solid var(--border-light)'
              }}>
                {Object.keys(QA_MAP).map((key) => (
                  <button
                    key={key}
                    onClick={() => handleSuggestionClick(key)}
                    style={{
                      background: 'rgba(16, 185, 129, 0.05)',
                      color: 'var(--text-muted)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '12px',
                      padding: '4px 10px',
                      fontSize: '0.72rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      fontWeight: 500
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = 'var(--primary)';
                      e.currentTarget.style.borderColor = 'var(--primary)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = 'var(--text-muted)';
                      e.currentTarget.style.borderColor = 'var(--border-light)';
                    }}
                  >
                    {QA_MAP[key].question}
                  </button>
                ))}
              </div>
            )}

            {/* Input Form Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              style={{
                padding: '12px 16px',
                borderTop: '1px solid var(--border-light)',
                display: 'flex',
                gap: '8px',
                background: 'rgba(255,255,255,0.01)'
              }}
            >
              <input
                type="text"
                placeholder="Ask a question..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
                style={{
                  flexGrow: 1,
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid var(--border-light)',
                  borderRadius: '10px',
                  color: 'var(--text-main)',
                  padding: '8px 12px',
                  fontSize: '0.85rem',
                  outline: 'none'
                }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                style={{
                  background: 'var(--primary)',
                  border: 'none',
                  color: '#000',
                  padding: '8px',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  display: 'grid',
                  placeItems: 'center',
                  opacity: inputValue.trim() && !isTyping ? 1 : 0.5,
                  transition: 'opacity 0.2s'
                }}
              >
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant;
