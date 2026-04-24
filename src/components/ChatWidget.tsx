import React from 'react';

export function ChatWidget({
  chatOpen,
  setChatOpen,
  messages,
  isChatLoading,
  chatInput,
  setChatInput,
  sendChatMessage,
  messagesEndRef
}: any) {
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col w-80 shadow-2xl shadow-luxury-gold/10 transform transition-transform duration-500 ${chatOpen ? 'translate-y-0' : 'translate-y-[120%]'}`}>
      <div className="bg-luxury-dark border-t border-l border-r border-luxury-gold/30 p-3 rounded-t-sm flex justify-between items-center cursor-pointer" onClick={() => setChatOpen(!chatOpen)}>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-luxury-gold animate-pulse"></div>
          <span className="text-xs font-serif text-white tracking-widest uppercase">Live Concierge</span>
        </div>
        <button className="text-neutral-500 hover:text-white">&times;</button>
      </div>
      
      <div className="bg-black border border-luxury-gold/30 h-80 p-4 overflow-y-auto flex flex-col space-y-4">
        <div className="text-[10px] text-center text-neutral-600 uppercase tracking-widest mb-2 border-b border-neutral-800 pb-2">
          Encrypted Connection Linked
        </div>
        {messages.map((msg: any, idx: number) => (
          <div key={idx} className={msg.sender === 'agent'
            ? 'bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs p-3 rounded-br-lg rounded-tr-lg rounded-tl-lg w-5/6 shadow-md fade-in'
            : 'bg-luxury-gold/10 border border-luxury-gold/30 text-white text-xs p-3 rounded-bl-lg rounded-tl-lg rounded-tr-lg w-5/6 self-end text-right shadow-md fade-in'
          }>
            {msg.sender === 'agent' && <span className="text-luxury-gold font-serif text-[10px] block mb-1">Agent V.</span>}
            <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br/>') }} />
          </div>
        ))}
        {isChatLoading && (
          <div className="bg-neutral-900 border border-neutral-800 text-neutral-500 text-xs p-3 rounded-br-lg rounded-tr-lg rounded-tl-lg w-16 shadow-md flex justify-center space-x-1">
            <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce delay-75"></div>
            <div className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce delay-150"></div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-luxury-dark border-b border-l border-r border-luxury-gold/30 p-2 rounded-b-sm flex">
        <input 
          type="text" 
          placeholder="Type message..."
          disabled={isChatLoading}
          value={chatInput}
          onChange={(e: any) => setChatInput(e.target.value)}
          onKeyDown={(e: any) => e.key === 'Enter' && sendChatMessage()}
          className="w-full bg-black text-white text-xs px-3 py-2 focus:outline-none border border-neutral-800 disabled:opacity-50"
        />
        <button onClick={sendChatMessage} disabled={isChatLoading || !chatInput.trim()} className="bg-luxury-gold text-black px-3 text-xs uppercase font-bold ml-1 hover:bg-white transition duration-300 disabled:opacity-50 cursor-pointer">
          Send
        </button>
      </div>
    </div>
  );
}
