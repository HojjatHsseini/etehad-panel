import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import TelegramPanel from "./components/TelegramPanel";
import WhatsAppPanel from "./components/WhatsAppPanel";
import InstagramPanel from "./components/InstagramPanel";
import WordPressPanel from "./components/WordPressPanel";
import SettingsPanel from "./components/SettingsPanel";

export type Tab =
  | "dashboard"
  | "telegram"
  | "whatsapp"
  | "instagram"
  | "wordpress"
  | "settings";

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "telegram":
        return <TelegramPanel />;
      case "whatsapp":
        return <WhatsAppPanel />;
      case "instagram":
        return <InstagramPanel />;
      case "wordpress":
        return <WordPressPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-brand-bg-base overflow-hidden rtl">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-brand-bg-base p-4 md:p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
