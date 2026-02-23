import React from "react";
import {
  Users,
  ShoppingBag,
  MessageCircle,
  Eye,
  TrendingUp,
  Bot,
  AlertTriangle,
  Package,
  ArrowUpRight,
  Clock,
  CheckCircle2
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
      label: "موجودی کل انبار",
      value: "۱۵۶",
      icon: <Package size={24} />,
      color: "bg-brand-secondary",
      trend: "+8",
    },
    {
      label: "بازدید سایت",
      value: "۱۲,۴۵۰",
      icon: <Eye size={24} />,
      color: "bg-brand-accent",
      trend: "+12%",
    },
  ];

  const recentArrivals = [
    { name: "HP EliteBook 840 G6", price: "۱۶,۸۰۰,۰۰۰", grade: "A++", stock: 12 },
    { name: "Lenovo ThinkPad X1 Carbon", price: "۲۸,۵۰۰,۰۰۰", grade: "Open Box", stock: 3 },
    { name: "Dell Latitude 5400", price: "۱۴,۲۰۰,۰۰۰", grade: "A+", stock: 8 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center text-brand-text-primary">
        <h2 className="text-2xl font-bold">خلاصه وضعیت هوشمند</h2>
        <div className="flex items-center gap-2 text-sm text-brand-text-muted">
          <Clock size={16} />
          <span>آخرین بروزرسانی: همین الان</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="brand-glass-card rounded-xl p-5 flex items-center justify-between border border-brand-border/50"
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Handoff Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="brand-glass-card rounded-xl p-5 border border-brand-border/50">
            <h3 className="text-lg font-bold text-brand-warning mb-4 flex items-center gap-2">
              <AlertTriangle size={20} />
              موارد نیازمند بررسی انسانی (AI Handoff)
            </h3>
            <div className="space-y-4">
              {[
                { platform: 'واتساپ', user: 'سارا محمدی', query: 'گارانتی لپ‌تاپ‌های استوک شامل چه مواردی میشه؟', time: '۱۰ دقیقه پیش' },
                { platform: 'اینستاگرام', user: '@ali_reza', query: 'شرایط اقساط برای خرید عمده چطوره؟', time: '۱ ساعت پیش' },
              ].map((item, i) => (
                <div key={i} className="p-4 bg-brand-bg-elevated border border-brand-warning/30 rounded-lg group hover:border-brand-warning transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-medium px-2 py-1 bg-brand-bg-card rounded text-brand-text-muted">{item.platform}</span>
                    <span className="text-xs text-brand-text-muted">{item.time}</span>
                  </div>
                  <p className="text-sm text-brand-text-primary mb-3"><span className="font-bold">{item.user}:</span> {item.query}</p>
                  <button className="text-sm bg-brand-warning text-brand-bg-base px-4 py-1.5 rounded-md font-medium hover:bg-yellow-500 transition-colors flex items-center gap-2">
                    پاسخگویی
                    <ArrowUpRight size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* New Section: Recent Stock Arrivals */}
          <div className="brand-glass-card rounded-xl p-5 border border-brand-border/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-brand-text-primary flex items-center gap-2">
                <Package size={20} className="text-brand-secondary" />
                آخرین لپ‌تاپ‌های اضافه شده به انبار
              </h3>
              <button className="text-sm text-brand-primary hover:underline">مشاهده همه</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="text-sm text-brand-text-muted border-b border-brand-border">
                    <th className="pb-3 font-medium">نام مدل</th>
                    <th className="pb-3 font-medium">گرید</th>
                    <th className="pb-3 font-medium">قیمت</th>
                    <th className="pb-3 font-medium">موجودی</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-border">
                  {recentArrivals.map((item, i) => (
                    <tr key={i} className="group hover:bg-brand-bg-elevated/50 transition-colors">
                      <td className="py-3 text-sm font-medium text-brand-text-primary">{item.name}</td>
                      <td className="py-3 text-xs">
                        <span className="px-2 py-0.5 bg-brand-accent/10 text-brand-accent rounded-full border border-brand-accent/20">
                          {item.grade}
                        </span>
                      </td>
                      <td className="py-3 text-sm text-brand-text-primary">{item.price}</td>
                      <td className="py-3 text-sm text-brand-success font-bold">{item.stock} عدد</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Sidebar Sections */}
        <div className="space-y-6">
          {/* AI Insights Section */}
          <div className="brand-glass-card rounded-xl p-5 border border-brand-border/50 bg-gradient-to-br from-brand-bg-card to-brand-primary/5">
            <h3 className="text-lg font-bold text-brand-primary mb-4 flex items-center gap-2">
              <Bot size={20} />
              تحلیل هوشمند انبار
            </h3>
            <div className="space-y-4">
              <div className="p-3 bg-brand-bg-elevated rounded-lg border-r-4 border-brand-primary">
                <p className="text-xs text-brand-text-muted mb-1">پیشنهاد خرید:</p>
                <p className="text-sm text-brand-text-primary font-medium">موجودی سری EliteBook رو به اتمام است. پیشنهاد می‌شود ۵ عدد جدید شارژ کنید.</p>
              </div>
              <div className="p-3 bg-brand-bg-elevated rounded-lg border-r-4 border-brand-success">
                <p className="text-xs text-brand-text-muted mb-1">تحلیل فروش:</p>
                <p className="text-sm text-brand-text-primary font-medium">لپ‌تاپ‌های گیمینگ در اینستاگرام ۲۰٪ بیشتر از هفته قبل کلیک خورده‌اند.</p>
              </div>
              <div className="p-3 bg-brand-bg-elevated rounded-lg border-r-4 border-brand-warning">
                <p className="text-xs text-brand-text-muted mb-1">هشدار قیمت:</p>
                <p className="text-sm text-brand-text-primary font-medium">قیمت دلار نوسان دارد. پیشنهاد می‌شود لیست قیمت تلگرام را بروزرسانی کنید.</p>
              </div>
            </div>
          </div>

          {/* Recent AI Success Responses */}
          <div className="brand-glass-card rounded-xl p-5 border border-brand-border/50">
            <h3 className="text-lg font-bold text-brand-text-primary mb-4 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-brand-success" />
              آخرین پاسخ‌های موفق AI
            </h3>
            <div className="space-y-4">
              {[
                { platform: 'واتساپ', query: 'قیمت لپ‌تاپ HP 840 چنده؟', response: 'قیمت این مدل ۱۵,۵۰۰,۰۰۰ تومان است.', time: 'همین الان' },
                { platform: 'اینستاگرام', query: 'آدرس فروشگاه کجاست؟', response: 'آدرس ما: تهران، خیابان ولیعصر...', time: '۵ دقیقه پیش' },
              ].map((item, i) => (
                <div key={i} className="p-3 bg-brand-bg-elevated border border-brand-border rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-medium px-1.5 py-0.5 bg-brand-bg-card rounded text-brand-text-muted">{item.platform}</span>
                    <span className="text-[10px] text-brand-text-muted">{item.time}</span>
                  </div>
                  <p className="text-xs text-brand-text-muted mb-1 line-clamp-1 italic">"{item.query}"</p>
                  <p className="text-xs text-brand-primary font-medium line-clamp-1">✓ {item.response}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
