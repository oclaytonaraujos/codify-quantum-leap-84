import { BsWhatsapp } from "react-icons/bs";

const WhatsAppButton = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "55649989403"; // Brasil country code + number
    const message = "Olá! Estou navegando no site da Codify e gostaria de conhecer mais sobre os serviços de desenvolvimento.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 glass border border-green-500/50 text-green-500 hover:text-green-400 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110 glow-green backdrop-blur-lg"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <BsWhatsapp className="w-7 h-7 group-hover:scale-110 transition-transform duration-200 drop-shadow-lg" />
      
    </button>
  );
};

export default WhatsAppButton;