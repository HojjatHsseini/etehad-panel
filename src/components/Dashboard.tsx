import React from "react";
import {
  Users,
  ShoppingBag,
  MessageCircle,
  Eye,
  TrendingUp,
  Bot,
  AlertTriangle
} from "lucide-react";

export default function Dashboard() {
  const stats = [
    {
      label: "پاسخ‌های هوش مصنوعی",
      value: "۸۴۲",
      icon: <Bot size={24} />,
      color: "bg-brand-primary",
      trend: "+15%",
    },
    {
      label: "نیاز به پشتیبان انسانی",
      value: "۱۲",
      icon: <AlertTriangle size={24} />,
      color: "bg-brand-warning",
      trend: "-5%",
    },
    {
      label: "سفارشات جدید",
      value: "۳۴",
      icon: <ShoppingBag size={24} />,
      color: "bg-brand-success",
      trend: "+5%",
    },
    {
      label: "بازدید سایت",
      value: "۱۲,۴۵۰",
      icon: <Eye size={24} />,
      color: "bg-brand-accent",
      trend: "+12%",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-brand-text-primary">خلاصه وضعیت هوشمند</h2>
        <span className="text-sm text-brand-text-muted">
          آخرین بروزرسانی: همین الان
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="brand-glass-card rounded-xl p-5 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-brand-text-muted mb-1">{stat.label}</p>
              <h3 className="text-2xl font-bold text-brand-text-primary">{stat.value}</h3>
              <div className={`flex items-center gap-1 text-sm mt-2 ${stat.trend.startsWith('+') ? 'text-brand-success' : 'text-brand-warning'}`}>
                <TrendingUp size={16} className={stat.trend.startsWith('-') ? 'rotate-180' : ''} />
                <span>{stat.trend}</span>
              </div>
            </div>
            <div
              className={`w-12 h-12 rounded-full ${stat.color} text-white flex items-center justify-center shadow-lg`}
            >
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="brand-glass-card rounded-xl p-5">
          <h3 className="text-lg font-bold text-brand-warning mb-4 flex items-center gap-2">
            <AlertTriangle size={20} />
            موارد نیازمند بررسی انسانی (AI Handoff)
          </h3>
          <div className="space-y-4">
            {[
              { platform: 'واتساپ', user: 'سارا محمدی', query: 'گارانتی لپ‌تاپ‌های استوک شامل چه مواردی میشه؟', time: '۱۰ دقیقه پیش' },
              { platform: 'اینستاگرام', user: '@ali_reza', query: 'شرایط اقساط برای خرید عمده چطوره؟', time: '۱ ساعت پیش' },
              { platform: 'تلگرام', user: 'محمد', query: 'من لپ‌تاپ رو خریدم ولی روشن نمیشه!', time: '۲ ساعت پیش' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-brand-bg-elevated border border-brand-warning/30 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-brand-bg-card rounded text-brand-text-muted">{item.platform}</span>
                  <span className="text-xs text-brand-text-muted">{item.time}</span>
                </div>
                <p className="text-sm text-brand-text-primary mb-3"><span className="font-bold">{item.user}:</span> {item.query}</p>
                <button className="text-sm bg-brand-warning text-brand-bg-base px-4 py-1.5 rounded-md font-medium hover:bg-yellow-500 transition-colors">
                  پاسخگویی
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="brand-glass-card rounded-xl p-5">
          <h3 className="text-lg font-bold text-brand-text-primary mb-4 flex items-center gap-2">
            <Bot size={20} className="text-brand-primary" />
            آخرین پاسخ‌های موفق هوش مصنوعی
          </h3>
          <div className="space-y-4">
            {[
              { platform: 'واتساپ', query: 'قیمت لپ‌تاپ HP 840 چنده؟', response: 'قیمت این مدل ۱۵,۵۰۰,۰۰۰ تومان است.', time: 'همین الان' },
              { platform: 'اینستاگرام', query: 'آدرس فروشگاه کجاست؟', response: 'آدرس ما: تهران، خیابان ولیعصر...', time: '۵ دقیقه پیش' },
              { platform: 'تلگرام', query: 'ارسال به شهرستان دارید؟', response: 'بله، ارسال به سراسر کشور از طریق تیپاکس انجام می‌شود.', time: '۱۵ دقیقه پیش' },
            ].map((item, i) => (
              <div key={i} className="p-4 bg-brand-bg-elevated border border-brand-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-brand-bg-card rounded text-brand-text-muted">{item.platform}</span>
                  <span className="text-xs text-brand-text-muted">{item.time}</span>
                </div>
                <p className="text-sm text-brand-text-muted mb-1 line-clamp-1">سوال: {item.query}</p>
                <p className="text-sm text-brand-primary line-clamp-1">پاسخ AI: {item.response}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
