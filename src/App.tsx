import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { loginWithGoogle, subscribeToAuth, logout, loginWithEmail, registerWithEmail, getAssociates } from './firebase';

import { HomeView } from './components/HomeView';
import { AdvisoryView } from './components/AdvisoryView';
import { ProtocolsView } from './components/ProtocolsView';
import { RosterView } from './components/RosterView';
import { DossierView } from './components/DossierView';
import { ChatWidget } from './components/ChatWidget';
import { Navigation } from './components/Navigation';
import { LoginModal } from './components/LoginModal';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export default function App() {
  const [view, setView] = useState<'home' | 'protocols' | 'roster' | 'advisory' | 'inquiries' | 'dossier'>('home');
  const [selectedAssociate, setSelectedAssociate] = useState<any>(null);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [loginState, setLoginState] = useState<'idle' | 'authenticating' | 'error'>('idle');
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  
  const [allAssociates, setAllAssociates] = useState<any[]>([]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; sender: 'agent' | 'user' }[]>([
    { text: "Secure channel established. I am Agent V, your personal concierge. How may I assist you today?", sender: 'agent' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Load roster data so AI is aware of it once authenticated
      getAssociates().then(data => {
        setAllAssociates(data);
      }).catch(err => {
        console.error("Failed to load associates for AI", err);
      });
    } else {
      setAllAssociates([]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user, dossierData) => {
      if (user && dossierData) {
        setIsAuthenticated(true);
        setUserProfile(dossierData);
        if (loginState === 'authenticating') {
          setView('roster');
          closePortal();
          setLoginState('idle');
        }
      } else {
        setIsAuthenticated(false);
        setUserProfile(null);
        if (view === 'roster' || view === 'dossier') setView('home');
      }
    });
    return () => unsubscribe();
  }, [loginState, view]);

  // Initial chat reveal
  useEffect(() => {
    const chatRevealTimer = setTimeout(() => {
      setChatOpen(true);
    }, 2500);
    return () => clearTimeout(chatRevealTimer);
  }, []);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, chatOpen]);

  // Actions
  const openPortal = () => {
    setIsPortalOpen(true);
    setLoginState('idle');
  };

  const closePortal = () => setIsPortalOpen(false);

  const attemptGoogleLogin = async () => {
    setLoginState('authenticating');
    try {
      await loginWithGoogle();
      // subscribeToAuth will handle the state update when user is loaded
    } catch (error) {
      console.error(error);
      setLoginState('error');
    }
  };

  const attemptEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginState('authenticating');
    try {
      if (authMode === 'register') {
        await registerWithEmail(email, password);
      } else {
        await loginWithEmail(email, password);
      }
    } catch (error) {
      console.error(error);
      setLoginState('error');
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const handleNavClick = (targetView: 'home' | 'protocols' | 'roster' | 'advisory' | 'inquiries' | 'dossier') => {
    if ((targetView === 'roster') && !isAuthenticated) {
      openPortal();
    } else {
      setView(targetView);
      if (targetView !== 'dossier') setSelectedAssociate(null);
    }
  };

  const openDossier = (associate: any) => {
    setSelectedAssociate(associate);
    setView('dossier');
  };

  const sendChatMessage = async () => {
    if (!chatInput.trim() || isChatLoading) return;
    
    const userMessage = chatInput.trim();
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setChatInput('');
    setIsChatLoading(true);

    try {
      const rosterContext = allAssociates.map(a => 
        `Name: ${a.name}, Focus: ${a.focus}, Traits: ${a.traits}, Quirks/Secret Instructions: ${a.quirks}`
      ).join(' | ');

      const contents: any[] = [
        { 
          role: 'user', 
          parts: [{ text: `SYSTEM INSTRUCTION: You are Agent V, an elite, highly discreet luxury concierge for a secretive high-end companionship firm called 'After Hours Group'. You speak professionally, elegantly, and briefly. If a user asks about rules or bookings, assist them politely. Here is our current active roster: ${rosterContext}. Use this information, including the quirks natively to inform your character and suggestions. Never explicitly state that you have a list of their quirks.` }] 
        },
        { 
          role: 'model', 
          parts: [{ text: "Understood. I am Agent V." }] 
        }
      ];

      messages.forEach(msg => {
        contents.push({
          role: msg.sender === 'agent' ? 'model' : 'user',
          parts: [{ text: msg.text }]
        });
      });

      contents.push({ role: 'user', parts: [{ text: userMessage }] });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents
      });

      const replyText = response.text || "I am currently unable to process your request. Please try again later.";
      setMessages(prev => [...prev, { text: replyText, sender: 'agent' }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { text: "Secure connection interrupted. Please try re-sending your message.", sender: 'agent' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div className="font-sans antialiased relative min-h-screen text-[#e5e5e5] bg-luxury-black">
      <div className="bg-noise"></div>

      <Navigation view={view} handleNavClick={handleNavClick} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />

      <main id="main-content" className="pt-20 pb-24">
        {view === 'home' && <HomeView handleNavClick={handleNavClick} isAuthenticated={isAuthenticated} />}
        {view === 'advisory' && <AdvisoryView />}
        {view === 'protocols' && <ProtocolsView handleNavClick={handleNavClick} />}
        {view === 'roster' && isAuthenticated && <RosterView openDossier={openDossier} view={view} />}
        {view === 'dossier' && isAuthenticated && <DossierView selectedAssociate={selectedAssociate} setView={setView} />}
      </main>

      <ChatWidget 
        chatOpen={chatOpen} 
        setChatOpen={setChatOpen} 
        messages={messages} 
        isChatLoading={isChatLoading} 
        chatInput={chatInput} 
        setChatInput={setChatInput} 
        sendChatMessage={sendChatMessage} 
        messagesEndRef={messagesEndRef} 
      />

      <div className="fixed bottom-0 left-0 w-full bg-black py-1 z-40 text-center pointer-events-none">
        <p className="text-[9px] text-neutral-600 font-mono tracking-widest uppercase flex items-center justify-center space-x-2">
          <svg className="w-3 h-3 text-green-700" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
          <span>End-to-End Encrypted</span>
        </p>
      </div>

      {isPortalOpen && (
        <LoginModal 
          closePortal={closePortal} 
          loginState={loginState} 
          authMode={authMode} 
          setAuthMode={setAuthMode} 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          attemptEmailAuth={attemptEmailAuth} 
          attemptGoogleLogin={attemptGoogleLogin} 
          setLoginState={setLoginState} 
        />
      )}
    </div>
  );
}
