import React, { useState } from 'react';
import { Globe, Plus, Search, Edit, Trash2, ExternalLink, Bot } from 'lucide-react';
import { generateAIResponse } from '../services/aiService';

export default function WordPressPanel() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isGeneratingDesc, setIsGeneratingDesc] = useState(false);
  const [generatedDesc, setGeneratedDesc] = useState('');

  const products = [
    { id: 1, name: 'لپ‌تاپ HP EliteBook 840 G5', price: '۱۵,۵۰۰,۰۰۰', stock: 5, status: 'موجود', category: 'اچ‌پی' },
    { id: 2, name: 'لپ‌تاپ Lenovo ThinkPad T480', price: '۱۴,۲۰۰,۰۰۰', stock: 2, status: 'موجود', category: 'لنوو' },
    { id: 3, name: 'لپ‌تاپ Dell Latitude 7490', price: '۱۳,۸۰۰,۰۰۰', stock: 0, status: 'ناموجود', category: 'دل' },
    { id: 4, name: 'لپ‌تاپ Apple MacBook Pro 2019', price: '۳۵,۰۰۰,۰۰۰', stock: 1, status: 'موجود', category: 'اپل' },
  ];

  const handleGenerateDescription = async () => {
    setIsGeneratingDesc(true);
    const response = await generateAIResponse(`لطفا یک توضیحات محصول سئو شده و جذاب برای لپ‌تاپ HP EliteBook 840 G5 بنویس.`, 'وردپرس');
    setGeneratedDesc(response.text);
    setIsGeneratingDesc(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-text-primary">مدیریت وب‌سایت (وردپرس)</h2>
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2 px-4 py-2 bg-brand-bg-elevated border border-brand-border text-brand-text-primary rounded-lg hover:bg-brand-bg-card transition-colors text-sm font-medium">
            <ExternalLink size={16} />
            <span>مشاهده سایت</span>
          </a>
          <button className="flex items-center gap-2 px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium shadow-lg shadow-brand-primary/20">
            <Plus size={16} />
            <span>افزودن محصول جدید</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 brand-glass-card rounded-xl border border-brand-border overflow-hidden">
          <div className="p-5 border-b border-brand-border flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="relative w-full sm:w-96">
              <input 
                type="text" 
                placeholder="جستجوی محصول..." 
                className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="absolute right-3 top-3 text-brand-text-muted" />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select className="bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-primary w-full sm:w-auto">
                <option value="">همه دسته‌ها</option>
                <option value="hp">اچ‌پی</option>
                <option value="lenovo">لنوو</option>
                <option value="dell">دل</option>
                <option value="apple">اپل</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="bg-brand-bg-elevated text-sm text-brand-text-muted border-b border-brand-border">
                  <th className="px-5 py-4 font-medium">نام محصول</th>
                  <th className="px-5 py-4 font-medium">دسته بندی</th>
                  <th className="px-5 py-4 font-medium">قیمت (تومان)</th>
                  <th className="px-5 py-4 font-medium">موجودی</th>
                  <th className="px-5 py-4 font-medium">وضعیت</th>
                  <th className="px-5 py-4 font-medium text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-brand-border">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-brand-bg-elevated/50 transition-colors">
                    <td className="px-5 py-4 text-brand-text-primary font-medium">{product.name}</td>
                    <td className="px-5 py-4 text-brand-text-muted">{product.category}</td>
                    <td className="px-5 py-4 text-brand-text-primary">{product.price}</td>
                    <td className="px-5 py-4 text-brand-text-primary">{product.stock} عدد</td>
                    <td className="px-5 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-xs font-medium ${
                        product.stock > 0 ? 'bg-brand-success/20 text-brand-success' : 'bg-brand-destructive/20 text-brand-destructive'
                      }`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button className="p-1.5 text-brand-primary hover:bg-brand-primary/10 rounded-md transition-colors" title="ویرایش">
                          <Edit size={16} />
                        </button>
                        <button className="p-1.5 text-brand-destructive hover:bg-brand-destructive/10 rounded-md transition-colors" title="حذف">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="p-4 border-t border-brand-border flex items-center justify-between text-sm text-brand-text-muted">
            <span>نمایش ۱ تا ۴ از ۴۵ محصول</span>
            <div className="flex items-center gap-1">
              <button className="px-3 py-1 border border-brand-border rounded-md hover:bg-brand-bg-elevated disabled:opacity-50">قبلی</button>
              <button className="px-3 py-1 bg-brand-primary text-white rounded-md">۱</button>
              <button className="px-3 py-1 border border-brand-border rounded-md hover:bg-brand-bg-elevated">۲</button>
              <button className="px-3 py-1 border border-brand-border rounded-md hover:bg-brand-bg-elevated">۳</button>
              <button className="px-3 py-1 border border-brand-border rounded-md hover:bg-brand-bg-elevated">بعدی</button>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="brand-glass-card rounded-xl p-5 border border-brand-border">
            <h3 className="text-lg font-bold text-brand-text-primary mb-4 flex items-center gap-2">
              <Bot className="text-brand-primary" />
              تولید محتوای سئو شده (AI)
            </h3>
            <p className="text-sm text-brand-text-muted mb-4">
              با استفاده از هوش مصنوعی، توضیحات جذاب و سئو شده برای محصولات خود تولید کنید.
            </p>
            <button 
              onClick={handleGenerateDescription}
              disabled={isGeneratingDesc}
              className="w-full bg-brand-bg-elevated border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:opacity-50 mb-4"
            >
              <Bot size={18} />
              <span>{isGeneratingDesc ? 'در حال تولید...' : 'تولید نمونه برای HP 840'}</span>
            </button>

            {generatedDesc && (
              <div className="bg-brand-bg-base border border-brand-border rounded-lg p-3 max-h-64 overflow-y-auto text-sm text-brand-text-primary whitespace-pre-wrap">
                {generatedDesc}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
