import { useState } from "react";
import { Plus, MessageCircle, Phone, Mail, X } from "lucide-react";
import { Link } from "react-router-dom";
const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const actions = [{
    icon: MessageCircle,
    label: "WhatsApp",
    href: "https://wa.me/556499890403?text=Olá! Vi suas informações de contato e gostaria de conversar sobre um projeto.",
    color: "glass border border-green-500/50 text-green-500 hover:text-green-400 glow-green"
  }, {
    icon: Phone,
    label: "Ligar",
    href: "tel:+55649989403",
    color: "glass border border-blue-500/50 text-blue-500 hover:text-blue-400"
  }, {
    icon: Mail,
    label: "Email",
    href: "mailto:codifydev.principal@gmail.com",
    color: "glass border border-purple-500/50 text-purple-500 hover:text-purple-400"
  }];
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse items-end gap-3">
      {/* Action buttons */}
      {isOpen && (
        <div className="flex flex-col gap-2 animate-in slide-in-from-bottom-2 duration-200">
          {actions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-3 px-4 py-3 rounded-full backdrop-blur-sm border border-white/20 bg-background/80 hover:bg-background/90 transition-all duration-300 shadow-lg ${action.color}`}
            >
              <action.icon className="w-5 h-5" />
              <span className="text-sm font-medium whitespace-nowrap">{action.label}</span>
            </a>
          ))}
        </div>
      )}
      
      {/* Main FAB button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-105"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Plus className="w-6 h-6" />
        )}
      </button>
    </div>
  );
};
export default FloatingActionButton;