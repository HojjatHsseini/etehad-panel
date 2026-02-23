import React, { useState } from 'react';
import { Send, Image as ImageIcon, Paperclip, Smile, Eye, Bot, Users, MessageCircle, FileText, Upload, Edit3, Check } from 'lucide-react';
import { generateAIResponse } from '../services/aiService';

export default function TelegramPanel() {
  const [message, setMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAnalyzingPdf, setIsAnalyzingPdf] = useState(false);
  const [priceList, setPriceList] = useState<{name: string, price: string, newPrice: string}[]>([]);
  const [profitMargin, setProfitMargin] = useState(10);
  const [showPriceList, setShowPriceList] = useState(false);

  const handleGenerateAI = async () => {
    if (!message.trim()) return;
    setIsGenerating(true);
    const response = await generateAIResponse(`لطفا یک پست جذاب برای کانال تلگرام با این موضوع بنویس: ${message}`, 'تلگرام');
    setAiResponse(response.text);
    setIsGenerating(false);
  };

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsAnalyzingPdf(true);
      setShowPriceList(true);
      
      // Simulate AI analysis of PDF
      setTimeout(() => {
        setPriceList([
          { name: 'لپ‌تاپ HP EliteBook 840 G5', price: '۱۴,۰۰۰,۰۰۰', newPrice: '۱۵,۴۰۰,۰۰۰' },
          { name: 'لپ‌تاپ Lenovo ThinkPad T480', price: '۱۳,۰۰۰,۰۰۰', newPrice: '۱۴,۳۰۰,۰۰۰' },
          { name: 'لپ‌تاپ Dell Latitude 7490', price: '۱۲,۵۰۰,۰۰۰', newPrice: '۱۳,۷۵۰,۰۰۰' },
        ]);
        setIsAnalyzingPdf(false);
      }, 2000);
    }
  };

  const calculateNewPrices = (margin: number) => {
    setProfitMargin(margin);
    // In a real app, this would parse the Persian numbers, calculate, and format back
    // For demo, we just update the state to trigger a re-render
    setPriceList([...priceList]);
  };

  const generatePriceListPost = () => {
    let post = '🔥 لیست قیمت جدید لپ‌تاپ‌های استوک 🔥\n\n';
    priceList.forEach(item => {
      post += `💻 ${item.name}\n💰 قیمت: ${item.newPrice} تومان\n\n`;
    });
    post += '✅ تضمین بهترین قیمت و کیفیت\n✅ گارانتی معتبر\n\n@etehad_store';
    setAiResponse(post);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-text-primary">مدیریت تلگرام (هوش مصنوعی)</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          
          {/* Price List Management */}
          <div className="brand-glass-card rounded-xl p-5 border border-brand-border">
            <h3 className="text-lg font-bold text-brand-text-primary mb-4 flex items-center gap-2">
              <FileText className="text-brand-secondary" />
              مدیریت و آنالیز لیست قیمت (PDF)
            </h3>
            
            <div className="space-y-4">
              <div className="border-2 border-dashed border-brand-border rounded-xl p-6 text-center hover:bg-brand-bg-elevated transition-colors cursor-pointer relative">
                <input 
                  type="file" 
                  accept=".pdf" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handlePdfUpload}
                />
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 bg-brand-secondary/20 text-brand-secondary rounded-full flex items-center justify-center">
                    <Upload size={24} />
                  </div>
                </div>
                <p className="text-brand-text-primary font-medium">فایل PDF لیست قیمت همکار را اینجا رها کنید</p>
                <p className="text-sm text-brand-text-muted mt-1">هوش مصنوعی قیمت‌ها را استخراج می‌کند</p>
              </div>

              {isAnalyzingPdf && (
                <div className="flex items-center justify-center gap-2 text-brand-primary py-4">
                  <Bot className="animate-bounce" />
                  <span>هوش مصنوعی در حال آنالیز فایل PDF...</span>
                </div>
              )}

              {showPriceList && !isAnalyzingPdf && (
                <div className="bg-brand-bg-elevated rounded-lg border border-brand-border p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium text-brand-text-primary">قیمت‌های استخراج شده</h4>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-brand-text-muted">درصد سود:</label>
                      <input 
                        type="number" 
                        value={profitMargin}
                        onChange={(e) => calculateNewPrices(Number(e.target.value))}
                        className="w-16 bg-brand-bg-base border border-brand-border rounded px-2 py-1 text-center text-brand-text-primary"
                      />
                      <span className="text-sm text-brand-text-muted">%</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    {priceList.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-brand-bg-base p-2 rounded border border-brand-border">
                        <input 
                          type="text" 
                          value={item.name} 
                          className="flex-1 bg-transparent border-none text-sm text-brand-text-primary focus:ring-0"
                          onChange={(e) => {
                            const newList = [...priceList];
                            newList[idx].name = e.target.value;
                            setPriceList(newList);
                          }}
                        />
                        <div className="flex flex-col items-end text-xs">
                          <span className="text-brand-text-muted line-through">خرید: {item.price}</span>
                          <input 
                            type="text" 
                            value={item.newPrice} 
                            className="w-24 bg-transparent border-b border-brand-border text-brand-success font-bold focus:ring-0 text-left"
                            onChange={(e) => {
                              const newList = [...priceList];
                              newList[idx].newPrice = e.target.value;
                              setPriceList(newList);
                            }}
                            dir="ltr"
                          />
                        </div>
                        <button className="text-brand-text-muted hover:text-brand-primary">
                          <Edit3 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-end gap-2 pt-2 border-t border-brand-border">
                    <button className="px-4 py-2 bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg text-sm hover:bg-brand-bg-card flex items-center gap-2">
                      <Check size={16} /> ذخیره به عنوان منبع پاسخگویی AI
                    </button>
                    <button 
                      onClick={generatePriceListPost}
                      className="px-4 py-2 bg-brand-secondary text-white rounded-lg text-sm hover:bg-orange-600 flex items-center gap-2"
                    >
                      <Send size={16} /> آماده‌سازی برای کانال
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="brand-glass-card rounded-xl p-5 border border-brand-border">
            <h3 className="text-lg font-bold text-brand-text-primary mb-4 flex items-center gap-2">
              <Bot className="text-brand-primary" />
              تولید محتوا با هوش مصنوعی
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-text-muted mb-1">موضوع پست</label>
                <input 
                  type="text"
                  className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-3 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                  placeholder="مثال: معرفی لپ‌تاپ‌های گیمینگ جدید با تخفیف ویژه..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  dir="rtl"
                />
              </div>
              
              <button 
                onClick={handleGenerateAI}
                disabled={isGenerating || !message.trim()}
                className="bg-brand-bg-elevated border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <Bot size={18} />
                <span>{isGenerating ? 'در حال تولید...' : 'تولید متن با هوش مصنوعی'}</span>
              </button>

              {aiResponse && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-brand-text-muted mb-1">متن تولید شده (قابل ویرایش)</label>
                  <textarea 
                    rows={8}
                    className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-3 focus:ring-2 focus:ring-brand-primary outline-none transition-all"
                    value={aiResponse}
                    onChange={(e) => setAiResponse(e.target.value)}
                    dir="rtl"
                  />
                </div>
              )}
              
              <div className="flex items-center justify-between border-t border-brand-border pt-4">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-brand-text-muted hover:bg-brand-bg-elevated rounded-lg transition-colors" title="افزودن تصویر">
                    <ImageIcon size={20} />
                  </button>
                  <button className="p-2 text-brand-text-muted hover:bg-brand-bg-elevated rounded-lg transition-colors" title="پیوست فایل">
                    <Paperclip size={20} />
                  </button>
                  <button className="p-2 text-brand-text-muted hover:bg-brand-bg-elevated rounded-lg transition-colors" title="ایموجی">
                    <Smile size={20} />
                  </button>
                </div>
                
                <button className="bg-brand-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-brand-primary/20">
                  <span>ارسال به کانال</span>
                  <Send size={18} className="rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="brand-glass-card rounded-xl p-5 border border-brand-border">
            <h3 className="text-lg font-bold text-brand-text-primary mb-4">وضعیت ربات پاسخگو</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-brand-success/10 text-brand-success rounded-lg border border-brand-success/20">
                <span className="font-medium">وضعیت هوش مصنوعی</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 bg-brand-success rounded-full animate-pulse"></span> فعال</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-brand-border rounded-lg bg-brand-bg-elevated">
                <span className="text-brand-text-muted flex items-center gap-2"><Users size={16}/> کاربران ربات</span>
                <span className="font-bold text-brand-text-primary">۱,۲۴۵</span>
              </div>
              <div className="flex justify-between items-center p-3 border border-brand-border rounded-lg bg-brand-bg-elevated">
                <span className="text-brand-text-muted flex items-center gap-2"><MessageCircle size={16}/> پاسخ‌های امروز AI</span>
                <span className="font-bold text-brand-text-primary">۸۴</span>
              </div>
            </div>
          </div>
          
          <div className="brand-glass-card rounded-xl p-5 border border-brand-border">
            <h3 className="text-lg font-bold text-brand-warning mb-4 flex items-center gap-2">
              نیاز به بررسی انسانی
            </h3>
            <div className="space-y-3">
              <div className="p-3 border border-brand-warning/30 bg-brand-warning/10 rounded-lg">
                <p className="text-sm text-brand-text-primary mb-2">کاربر: شرایط اقساطی برای مک بوک پرو چطور هست؟</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-brand-text-muted">۱۰ دقیقه پیش</span>
                  <button className="text-xs bg-brand-warning text-brand-bg-base px-2 py-1 rounded">پاسخ دادن</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
