import React from "react";
import { Menu, Bell, User } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="bg-brand-bg-card border-b border-brand-border px-4 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 -mr-2 text-brand-text-muted hover:bg-brand-bg-elevated rounded-lg md:hidden"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-bold text-brand-text-primary hidden md:block brand-gradient-text">
          پنل اتوماسیون
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 text-brand-text-muted hover:bg-brand-bg-elevated rounded-full relative">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-brand-secondary rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-brand-border">
          <div className="w-8 h-8 bg-brand-bg-elevated text-brand-primary rounded-full flex items-center justify-center font-bold border border-brand-border">
            <User size={18} />
          </div>
          <span className="text-sm font-medium text-brand-text-primary hidden sm:block">
            مدیر سیستم
          </span>
        </div>
      </div>
    </header>
  );
}
