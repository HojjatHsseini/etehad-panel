import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, Paperclip, MoreVertical, Check, CheckCheck, Bot, User } from 'lucide-react';
import { generateAIResponse } from '../services/aiService';

interface Message {
  id: number;
  text: string;
  sender: 'me' | 'them' | 'ai';
  time: string;
  status?: 'read' | 'sent';
  needsHuman?: boolean;
}

interface Chat {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  online: boolean;
  messages: Message[];
  aiEnabled: boolean;
  needsAttention: boolean;
}

export default function WhatsAppPanel() {
  const [activeChatId, setActiveChatId] = useState<number>(0);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [chats, setChats] = useState<Chat[]>([
    {
      id: 0,
      name: 'علی احمدی',
      lastMessage: 'سلام، لپ‌تاپ دل موجود دارید؟',
      time: '۱۰:۳۰',
      unread: 1,
      online: true,
      aiEnabled: true,
      needsAttention: false,
      messages: [
        { id: 1, text: 'سلام وقت بخیر', sender: 'them', time: '۱۰:۲۵' },
        { id: 2, text: 'لپ‌تاپ دل مدل Latitude 7490 موجود دارید؟', sender: 'them', time: '۱۰:۲۶' },
      ]
    },
    {
      id: 1,
      name: 'سارا محمدی',
      lastMessage: 'گارانتی چقدر هست؟',
      time: 'دیروز',
      unread: 0,
      online: false,
      aiEnabled: true,
      needsAttention: true,
      messages: [
        { id: 1, text: 'سلام', sender: 'them', time: 'دیروز' },
        { id: 2, text: 'گارانتی چقدر هست؟', sender: 'them', time: 'دیروز' },
        { id: 3, text: 'این مورد نیاز به بررسی توسط همکاران پشتیبانی دارد و به زودی پاسخ داده خواهد شد.', sender: 'ai', time: 'دیروز', needsHuman: true },
      ]
    }
  ]);

  const activeChat = chats.find(c => c.id === activeChatId) || chats[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeChat.messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: 'me',
      time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent'
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: inputText,
          time: newMessage.time,
          needsAttention: false // Human intervened
        };
      }
      return chat;
    }));

    setInputText('');
  };

  const simulateCustomerMessage = async () => {
    const customerMsg = "قیمت لپ تاپ های لنوو چنده؟";
    const time = new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    
    const newMessage: Message = {
      id: Date.now(),
      text: customerMsg,
      sender: 'them',
      time: time
    };

    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: customerMsg,
          time: time,
          unread: chat.id === activeChatId ? 0 : chat.unread + 1
        };
      }
      return chat;
    }));

    if (activeChat.aiEnabled) {
      setIsTyping(true);
      const aiResponse = await generateAIResponse(customerMsg, 'واتساپ');
      setIsTyping(false);

      const aiMsg: Message = {
        id: Date.now() + 1,
        text: aiResponse.text,
        sender: 'ai',
        time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
        needsHuman: aiResponse.needsHuman
      };

      setChats(prev => prev.map(chat => {
        if (chat.id === activeChatId) {
          return {
            ...chat,
            messages: [...chat.messages, aiMsg],
            lastMessage: aiResponse.text,
            time: aiMsg.time,
            needsAttention: aiResponse.needsHuman || chat.needsAttention
          };
        }
        return chat;
      }));
    }
  };

  const toggleAI = () => {
    setChats(prev => prev.map(chat => {
      if (chat.id === activeChatId) {
        return { ...chat, aiEnabled: !chat.aiEnabled };
      }
      return chat;
    }));
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-text-primary">پشتیبانی واتساپ (هوش مصنوعی)</h2>
        <div className="flex items-center gap-4">
          <button onClick={simulateCustomerMessage} className="px-3 py-1.5 bg-brand-bg-elevated text-brand-text-primary rounded-lg border border-brand-border text-sm hover:bg-brand-border transition-colors">
            شبیه‌سازی پیام مشتری
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-success/10 text-brand-success rounded-lg border border-brand-success/20">
            <span className="w-2 h-2 bg-brand-success rounded-full animate-pulse"></span>
            <span className="text-sm font-medium">متصل به واتساپ بیزینس</span>
          </div>
        </div>
      </div>

      <div className="flex-1 brand-glass-card rounded-xl flex overflow-hidden border border-brand-border">
        {/* Sidebar */}
        <div className="w-1/3 border-l border-brand-border flex flex-col bg-brand-bg-card">
          <div className="p-4 border-b border-brand-border">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی گفتگو..."
                className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
              />
              <Search
                size={18}
                className="absolute right-3 top-2.5 text-brand-text-muted"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => {
                  setActiveChatId(chat.id);
                  setChats(prev => prev.map(c => c.id === chat.id ? { ...c, unread: 0 } : c));
                }}
                className={`p-4 border-b border-brand-border cursor-pointer transition-colors flex gap-3
                  ${activeChatId === chat.id ? "bg-brand-bg-elevated" : "hover:bg-brand-bg-elevated/50"}
                `}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-brand-bg-base border border-brand-border rounded-full flex items-center justify-center text-brand-text-muted font-bold text-lg">
                    {chat.name.charAt(0)}
                  </div>
                  {chat.online && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-brand-success border-2 border-brand-bg-card rounded-full"></div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h4 className="font-medium text-brand-text-primary truncate flex items-center gap-2">
                      {chat.name}
                      {chat.needsAttention && <span className="w-2 h-2 bg-brand-warning rounded-full" title="نیاز به پاسخ انسانی"></span>}
                    </h4>
                    <span className="text-xs text-brand-text-muted">{chat.time}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-brand-text-muted truncate">
                      {chat.lastMessage}
                    </p>
                    {chat.unread > 0 && (
                      <span className="bg-brand-primary text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-brand-bg-base">
          {/* Chat Header */}
          <div className="p-4 bg-brand-bg-card border-b border-brand-border flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-bg-elevated border border-brand-border rounded-full flex items-center justify-center text-brand-text-muted font-bold">
                {activeChat.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-medium text-brand-text-primary flex items-center gap-2">
                  {activeChat.name}
                  {activeChat.needsAttention && (
                    <span className="text-xs bg-brand-warning/20 text-brand-warning px-2 py-0.5 rounded-full">
                      نیاز به بررسی انسانی
                    </span>
                  )}
                </h3>
                <p className="text-xs text-brand-success">آنلاین</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={toggleAI}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeChat.aiEnabled 
                    ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/30' 
                    : 'bg-brand-bg-elevated text-brand-text-muted border border-brand-border'
                }`}
              >
                <Bot size={16} />
                {activeChat.aiEnabled ? 'هوش مصنوعی فعال' : 'هوش مصنوعی غیرفعال'}
              </button>
              <button className="p-2 text-brand-text-muted hover:bg-brand-bg-elevated rounded-full">
                <MoreVertical size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === "them" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.sender === "me"
                      ? "bg-brand-secondary text-white rounded-br-none"
                      : msg.sender === "ai"
                      ? "bg-brand-primary text-white rounded-br-none"
                      : "bg-brand-bg-card text-brand-text-primary rounded-bl-none border border-brand-border"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1 opacity-80 text-xs">
                    {msg.sender === 'ai' && <><Bot size={12} /> <span>پاسخ خودکار هوش مصنوعی</span></>}
                    {msg.sender === 'me' && <><User size={12} /> <span>پشتیبان</span></>}
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  <div
                    className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      msg.sender !== "them" ? "text-white/80" : "text-brand-text-muted"
                    }`}
                  >
                    <span>{msg.time}</span>
                    {msg.sender === "me" &&
                      (msg.status === "read" ? (
                        <CheckCheck size={14} />
                      ) : (
                        <Check size={14} />
                      ))}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-brand-bg-card text-brand-text-primary rounded-2xl rounded-bl-none border border-brand-border px-4 py-3 flex items-center gap-1">
                  <div className="w-2 h-2 bg-brand-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-brand-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-brand-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-brand-bg-card border-t border-brand-border">
            <div className="flex items-center gap-2">
              <button className="p-2 text-brand-text-muted hover:bg-brand-bg-elevated rounded-full transition-colors">
                <Paperclip size={20} />
              </button>
              <input
                type="text"
                className="flex-1 bg-brand-bg-base text-brand-text-primary border border-brand-border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary transition-all"
                placeholder="پیام خود را بنویسید..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                className="p-2 bg-brand-primary text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg shadow-brand-primary/20"
              >
                <Send size={18} className="rotate-180 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
