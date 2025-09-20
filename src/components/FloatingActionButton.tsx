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
    <div className="fixed bottom-6 left-6 z-50">
      {isOpen && (
        <div className="mb-4 space-y-3">
          {actions.map((action, index) => (
            <a
              key={action.label}
              href={action.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center space-x-2 p-3 rounded-full ${action.color} hover:scale-110 transition-all duration-300 animate-fade-scale backdrop-blur-lg`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <action.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{action.label}</span>
            </a>
          ))}
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white glow-primary hover:scale-110 transition-all duration-300 backdrop-blur-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </button>
    </div>
  );
};
export default FloatingActionButton;