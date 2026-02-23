import React from "react";
import {
  LayoutDashboard,
  Send,
  MessageCircle,
  Instagram,
  Globe,
  Settings,
  X,
  Laptop,
} from "lucide-react";
import { Tab } from "../App";

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
}: SidebarProps) {
  const menuItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "dashboard", label: "داشبورد", icon: <LayoutDashboard size={20} /> },
    { id: "telegram", label: "تلگرام", icon: <Send size={20} /> },
    { id: "whatsapp", label: "واتساپ", icon: <MessageCircle size={20} /> },
    { id: "instagram", label: "اینستاگرام", icon: <Instagram size={20} /> },
    { id: "wordpress", label: "وب‌سایت (وردپرس)", icon: <Globe size={20} /> },
    { id: "settings", label: "تنظیمات", icon: <Settings size={20} /> },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed inset-y-0 right-0 z-30 w-64 bg-brand-bg-elevated border-l border-brand-border text-brand-text-primary transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex items-center justify-between p-4 border-b border-brand-border">
          <div className="flex items-center gap-2 font-bold text-xl text-brand-primary">
            <Laptop size={24} />
            <span className="brand-gradient-text">فروشگاه اتحاد</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-brand-text-muted hover:text-brand-text-primary"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`
                w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                ${
                  activeTab === item.id
                    ? "bg-brand-primary text-white shadow-lg shadow-brand-primary/20"
                    : "text-brand-text-muted hover:bg-brand-bg-card hover:text-brand-text-primary"
                }
              `}
            >
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}
