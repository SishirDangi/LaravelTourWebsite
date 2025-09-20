import React, { useState, useEffect } from 'react';

// TypeScript interfaces for the data structure
interface Status {
  id: number;
  name: string;
  description?: string | null;
  created_at?: string;
  updated_at?: string;
}

interface LiveMessageData {
  id: number;
  message: string;
  show_until: string;
  status_id: number;
  created_at: string;
  updated_at: string;
  status: Status;
}

const LiveMessage: React.FC = () => {
  const [messages, setMessages] = useState<LiveMessageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMessages = async (): Promise<void> => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/live-messages`);
        if (!response.ok) {
          throw new Error(`Failed to fetch messages: ${response.statusText}`);
        }
        const data: LiveMessageData[] = await response.json();
        
        // Filter active messages: status is Active AND show_until >= today
        const today = new Date().toISOString().split('T')[0];
        const activeMessages = data.filter(msg => 
          msg.status?.name === 'Active' && 
          new Date(msg.show_until) >= new Date(today)
        );
        
        setMessages(activeMessages);
      } catch (error) {
        console.error('Error fetching live messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();

    // Refresh every 30 seconds
    const interval = setInterval(fetchMessages, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading || messages.length === 0) {
    return null;
  }

  // Create scrolling text with separators and emojis
  const fullText = messages
    .map((msg: LiveMessageData) => `📢 ${msg.message} 🚀`)
    .join(' | ')
    .concat(' | ');

  // Calculate animation duration based on text length for smoother scrolling
  const textLength = fullText.length;
  const baseDuration = 30; // base seconds
  const duration = Math.max(baseDuration, textLength * 0.1); // 0.1s per character minimum

  return (
    <div className="w-full bg-gradient-to-r from-[#1E3A5F] via-[#0F172A] to-[#1E3A5F] text-white shadow-lg overflow-hidden relative">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,#3B82F6_0%,transparent_50%),radial-gradient(circle_at_75%_75%,#10B981_0%,transparent_50%)]"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex items-center h-12">
        {/* Left indicator */}
        <div className="flex-shrink-0 w-8 h-8 mr-4 flex items-center justify-center">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
        </div>

        {/* Scrolling text container */}
        <div className="flex-1 overflow-hidden">
          <div 
            className="flex animate-marquee-container" 
            style={{ 
              '--duration': `${duration}s`,
              '--gap': '2rem'
            } as React.CSSProperties}
          >
            {/* First set of messages */}
            <p className="whitespace-nowrap flex items-center text-sm font-medium leading-relaxed min-w-max">
              {fullText}
            </p>
            
            {/* Second set of messages for seamless loop */}
            <p className="whitespace-nowrap flex items-center text-sm font-medium leading-relaxed min-w-max ml-[var(--gap)]">
              {fullText}
            </p>
          </div>
        </div>

        {/* Right indicator */}
        <div className="flex-shrink-0 w-8 h-8 ml-4 flex items-center justify-center">
          <div 
            className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" 
            style={{animationDelay: '1000ms'}}
          ></div>
        </div>
      </div>

      {/* Enhanced styles */}
      <style>{`
        @keyframes marquee {
          0% { 
            transform: translateX(100vw); 
          }
          100% { 
            transform: translateX(calc(-100% - var(--gap))); 
          }
        }

        .animate-marquee-container {
          animation: marquee var(--duration, 35s) linear infinite;
          will-change: transform;
        }

        .animate-marquee-container:hover {
          animation-play-state: paused;
        }

        @keyframes pulse-dots {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }

        .animate-marquee-container p {
          animation: pulse-dots var(--duration, 35s) ease-in-out infinite;
        }

        /* Ensure smooth text rendering */
        .animate-marquee-container p {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          backface-visibility: hidden;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee-container { 
            animation: none; 
            transform: translateX(0);
          }
          
          .animate-pulse {
            animation: none;
          }
        }

        /* High performance scrolling */
        .animate-marquee-container {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default LiveMessage;