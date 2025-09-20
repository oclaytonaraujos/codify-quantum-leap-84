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
  return;
};
export default FloatingActionButton;