import React, { useState } from 'react';
import { Save, Key, Link as LinkIcon, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function SettingsPanel() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-text-primary">تنظیمات اتصال پلتفرم‌ها</h2>
        <button 
          onClick={handleSave}
          className="bg-brand-primary hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-lg shadow-brand-primary/20"
        >
          <Save size={18} />
          <span>ذخیره تغییرات</span>
        </button>
      </div>

      {saved && (
        <div className="bg-brand-success/10 border border-brand-success/30 text-brand-success px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle2 size={20} />
          <span>تنظیمات با موفقیت ذخیره شد.</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Telegram Settings */}
        <div className="brand-glass-card rounded-xl p-5 border border-brand-border">
          <div className="flex items-center gap-3 mb-6 border-b border-brand-border pb-4">
            <div className="w-10 h-10 bg-sky-500/20 text-sky-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-1.42 5.922-2.05 8.441-.268.893-.65 1.058-1.008 1.096-.818.086-1.44-.526-2.235-1.047-1.244-.816-1.947-1.316-3.156-2.112-1.39-.922-.49-1.428.303-2.25.208-.216 3.82-3.504 3.89-3.803.009-.038.017-.18-.06-.252-.077-.072-.206-.048-.295-.028-.126.028-2.13 1.353-6.01 3.974-.568.39-1.083.58-1.542.569-.506-.012-1.48-.286-2.204-.522-.892-.29-1.6-.444-1.537-.938.033-.257.394-.522 1.083-.795 4.243-1.846 7.073-3.068 8.49-3.666 4.04-1.708 4.88-2.002 5.426-2.012.12-.002.388.027.553.158.136.108.173.255.188.358.015.103.033.328.017.53z"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text-primary">تنظیمات تلگرام</h3>
              <p className="text-sm text-brand-text-muted">اتصال ربات و کانال تلگرام</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-1 flex items-center gap-2">
                <Key size={14} /> Bot Token (توکن ربات)
              </label>
              <input 
                type="password" 
                className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-2.5 focus:ring-2 focus:ring-brand-primary outline-none"
                defaultValue="123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-1 flex items-center gap-2">
                <LinkIcon size={14} /> Channel Username (آیدی کانال)
              </label>
              <input 
                type="text" 
                className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-2.5 focus:ring-2 focus:ring-brand-primary outline-none text-left"
                defaultValue="@etehad_store"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* WhatsApp Settings */}
        <div className="brand-glass-card rounded-xl p-5 border border-brand-border">
          <div className="flex items-center gap-3 mb-6 border-b border-brand-border pb-4">
            <div className="w-10 h-10 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text-primary">تنظیمات واتساپ</h3>
              <p className="text-sm text-brand-text-muted">اتصال به WhatsApp Business API</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-1 flex items-center gap-2">
                <Key size={14} /> Access Token
              </label>
              <input 
                type="password" 
                className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-2.5 focus:ring-2 focus:ring-brand-primary outline-none"
                defaultValue="EAAGm0PX4ZCpsBA..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-1 flex items-center gap-2">
                <LinkIcon size={14} /> Phone Number ID
              </label>
              <input 
                type="text" 
                className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-2.5 focus:ring-2 focus:ring-brand-primary outline-none text-left"
                defaultValue="1029384756"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* Instagram Settings */}
        <div className="brand-glass-card rounded-xl p-5 border border-brand-border">
          <div className="flex items-center gap-3 mb-6 border-b border-brand-border pb-4">
            <div className="w-10 h-10 bg-pink-500/20 text-pink-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text-primary">تنظیمات اینستاگرام</h3>
              <p className="text-sm text-brand-text-muted">اتصال به Instagram Graph API</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-1 flex items-center gap-2">
                <Key size={14} /> Long-Lived Access Token
              </label>
              <input 
                type="password" 
                className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-2.5 focus:ring-2 focus:ring-brand-primary outline-none"
                defaultValue="IGQVJ..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-1 flex items-center gap-2">
                <LinkIcon size={14} /> Instagram Account ID
              </label>
              <input 
                type="text" 
                className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-2.5 focus:ring-2 focus:ring-brand-primary outline-none text-left"
                defaultValue="17841400000000000"
                dir="ltr"
              />
            </div>
          </div>
        </div>

        {/* WordPress Settings */}
        <div className="brand-glass-card rounded-xl p-5 border border-brand-border">
          <div className="flex items-center gap-3 mb-6 border-b border-brand-border pb-4">
            <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.158 12.786l-2.698 7.84c.806.236 1.657.365 2.54.365 1.047 0 2.051-.18 2.986-.51-.024-.037-.046-.078-.065-.123l-2.763-7.572zM3.007 12c0 3.568 2.062 6.634 5.066 8.095L3.946 7.222c-.594 1.346-.939 2.845-.939 4.778zM11.814.992c-3.145 0-5.97 1.327-7.961 3.444l4.153 11.439 4.29-11.595c-.16-.008-.316-.014-.482-.014zm7.366 8.723c0-1.48-.523-2.518-1.003-3.292-.829-1.334-1.603-2.538-1.603-3.962 0-.256.024-.524.068-.78-1.375-1.177-3.191-1.889-5.186-1.889-1.411 0-2.736.37-3.896 1.015l5.528 14.935c2.73-1.42 4.603-4.256 4.603-7.535 0-1.126-.237-2.193-.664-3.153l1.489-4.045c.433 1.467.664 3.056.664 4.706z"/></svg>
            </div>
            <div>
              <h3 className="text-lg font-bold text-brand-text-primary">تنظیمات وردپرس</h3>
              <p className="text-sm text-brand-text-muted">اتصال به WooCommerce API</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-brand-text-muted mb-1 flex items-center gap-2">
                <LinkIcon size={14} /> Website URL (آدرس سایت)
              </label>
              <input 
                type="url" 
                className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-2.5 focus:ring-2 focus:ring-brand-primary outline-none text-left"
                defaultValue="https://etehadstore.com"
                dir="ltr"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-brand-text-muted mb-1 flex items-center gap-2">
                  <Key size={14} /> Consumer Key
                </label>
                <input 
                  type="password" 
                  className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-2.5 focus:ring-2 focus:ring-brand-primary outline-none"
                  defaultValue="ck_1234567890..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brand-text-muted mb-1 flex items-center gap-2">
                  <Key size={14} /> Consumer Secret
                </label>
                <input 
                  type="password" 
                  className="w-full bg-brand-bg-base border border-brand-border text-brand-text-primary rounded-lg p-2.5 focus:ring-2 focus:ring-brand-primary outline-none"
                  defaultValue="cs_1234567890..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
