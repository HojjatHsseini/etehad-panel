import React, { useState } from 'react';
import { Instagram, Image as ImageIcon, Video, Heart, MessageCircle, Bot, MessageSquare } from 'lucide-react';
import { generateAIResponse } from '../services/aiService';

export default function InstagramPanel() {
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [topic, setTopic] = useState('');

  const handleGenerateCaption = async () => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    const response = await generateAIResponse(`لطفا یک کپشن جذاب برای اینستاگرام با هشتگ های مناسب برای این موضوع بنویس: ${topic}`, 'اینستاگرام');
    setCaption(response.text);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-text-primary">مدیریت اینستاگرام (هوش مصنوعی)</h2>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-accent/10 text-brand-accent rounded-lg border border-brand-accent/20">
          <Instagram size={16} />
          <span className="text-sm font-medium">@etehad_store</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="brand-glass-card rounded-xl shadow-sm border border-brand-border p-5">
            <h3 className="text-lg font-bold text-brand-text-primary mb-4">انتشار پست جدید</h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-brand-border rounded-xl p-8 text-center hover:bg-brand-bg-elevated transition-colors cursor-pointer">
                <div className="flex justify-center gap-4 mb-3">
                  <div className="w-12 h-12 bg-brand-primary/20 text-brand-primary rounded-full flex items-center justify-center">
                    <ImageIcon size={24} />
                  </div>
                  <div className="w-12 h-12 bg-brand-accent/20 text-brand-accent rounded-full flex items-center justify-center">
                    <Video size={24} />
                  </div>
                </div>
                <p className="text-brand-text-primary font-medium">عکس یا ویدیو را اینجا رها کنید</p>
                <p className="text-sm text-brand-text-muted mt-1">یا برای انتخاب فایل کلیک کنید</p>
              </div>

              <div className="bg-brand-bg-elevated p-4 rounded-lg border border-brand-border">
                <label className="block text-sm font-medium text-brand-text-muted mb-2 flex items-center gap-2">
                  <Bot size={16} className="text-brand-accent" />
                  تولید کپشن با هوش مصنوعی
                </label>
                <div className="flex gap-2 mb-3">
                  <input 
                    type="text"
                    className="flex-1 bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    placeholder="موضوع عکس..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  />
                  <button 
                    onClick={handleGenerateCaption}
                    disabled={isGenerating || !topic.trim()}
                    className="bg-brand-accent text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                  >
                    {isGenerating ? 'تولید...' : 'تولید'}
                  </button>
                </div>
                <textarea 
                  rows={4}
                  className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-3 focus:ring-2 focus:ring-brand-accent outline-none transition-all text-sm"
                  placeholder="کپشن پست خود را بنویسید یا با هوش مصنوعی تولید کنید..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  dir="rtl"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-sm text-brand-text-muted">
                  {caption.length} / ۲۲۰۰ کاراکتر
                </div>
                <button className="bg-gradient-to-r from-brand-accent to-brand-primary text-white px-6 py-2 rounded-lg font-medium transition-all shadow-lg shadow-brand-accent/20">
                  انتشار پست
                </button>
              </div>
            </div>
          </div>

          <div className="brand-glass-card rounded-xl shadow-sm border border-brand-border p-5">
            <h3 className="text-lg font-bold text-brand-text-primary mb-4 flex items-center gap-2">
              <MessageSquare size={20} className="text-brand-accent" />
              پاسخگویی خودکار به کامنت‌ها (AI)
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-brand-bg-elevated border border-brand-border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-brand-text-primary">پاسخ به قیمت (دایرکت)</p>
                  <p className="text-xs text-brand-text-muted mt-1">ارسال قیمت به دایرکت کاربرانی که کلمه "قیمت" را کامنت می‌کنند</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle1" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
                  <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-5 rounded-full bg-brand-success cursor-pointer"></label>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-brand-bg-elevated border border-brand-border rounded-lg">
                <div>
                  <p className="text-sm font-medium text-brand-text-primary">پاسخ هوشمند به سوالات</p>
                  <p className="text-xs text-brand-text-muted mt-1">پاسخ به سوالات متداول در کامنت‌ها توسط AI</p>
                </div>
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="toggle" id="toggle2" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer" defaultChecked/>
                  <label htmlFor="toggle2" className="toggle-label block overflow-hidden h-5 rounded-full bg-brand-success cursor-pointer"></label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="brand-glass-card rounded-xl shadow-sm border border-brand-border p-5">
            <h3 className="text-lg font-bold text-brand-text-primary mb-4">آخرین پست‌ها</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { img: 'https://picsum.photos/seed/laptop1/400/400', likes: '۱.۲K', comments: '۴۵' },
                { img: 'https://picsum.photos/seed/laptop2/400/400', likes: '۸۵۶', comments: '۲۳' },
                { img: 'https://picsum.photos/seed/laptop3/400/400', likes: '۲.۱K', comments: '۱۱۲' },
                { img: 'https://picsum.photos/seed/laptop4/400/400', likes: '۹۴۳', comments: '۳۴' },
              ].map((post, i) => (
                <div key={i} className="group relative rounded-xl overflow-hidden aspect-square border border-brand-border">
                  <img src={post.img} alt="Post" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-white font-medium">
                    <div className="flex items-center gap-1">
                      <Heart size={18} className="fill-brand-accent text-brand-accent" />
                      <span>{post.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={18} className="fill-brand-primary text-brand-primary" />
                      <span>{post.comments}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
