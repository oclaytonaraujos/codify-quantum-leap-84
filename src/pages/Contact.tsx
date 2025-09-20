import { useState } from "react";
import { Mail, Phone, MapPin, MessageCircle, Send, Clock, Globe, Linkedin, Instagram, Twitter } from "lucide-react";
import FuturisticButton from "@/components/FuturisticButton";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
const Contact = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const contactInfo = [{
    icon: Mail,
    title: "E-mail",
    content: "codifydev.principal@gmail.com",
    description: "Resposta em até 2 horas",
    action: "mailto:codifydev.principal@gmail.com"
  }, {
    icon: Phone,
    title: "Telefone",
    content: "(64) 9 9890-403",
    description: "Seg-Sex: 9h às 18h",
    action: "tel:+5564998904033"
  }, {
    icon: MapPin,
    title: "Localização",
    content: "Goiás",
    description: "Brasil",
    action: "#"
  }, {
    icon: MessageCircle,
    title: "WhatsApp",
    content: "(64) 9 9890-403",
    description: "Atendimento instantâneo",
    action: "https://wa.me/5564998904033?text=Olá! Estou entrando em contato através da página de contato do site da Codify."
  }];
  const socialLinks = [{
    icon: Linkedin,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/codify-dev/",
    color: "from-blue-600 to-blue-400"
  }, {
    icon: Instagram,
    name: "Instagram",
    url: "https://www.instagram.com/codify.dev.br/",
    color: "from-pink-600 to-purple-400"
  }, {
    icon: Twitter,
    name: "Twitter",
    url: "#",
    color: "from-blue-400 to-cyan-400"
  }, {
    icon: Globe,
    name: "Website",
    url: "https://github.com/codifydevbr",
    color: "from-green-400 to-blue-500"
  }];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simulação de envio
    toast({
      title: "Mensagem enviada com sucesso!",
      description: "Entraremos em contato em breve. Obrigado!"
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: ""
    });
  };
  return <div className="min-h-screen">
      <SEOHead title="Contato Codify | Fale Conosco para Desenvolvimento de Software" description="Entre em contato com a Codify para solicitar informações, suporte ou orçamento para seu projeto de software personalizado." keywords="contato empresa software, fale conosco Codify, suporte Codify, atendimento, orçamento personalizado" canonicalUrl="https://codify.dev.br/contato" schema={{
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "name": "Contato Codify",
      "description": "Entre em contato conosco para transformar sua ideia em realidade digital.",
      "url": "https://codify.dev.br/contato"
    }} />
      {/* Hero Section */}
      <section className="py-20 animated-bg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-8 holographic animate-slide-up">Entre em Contato</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-100">
            Estamos prontos para transformar sua ideia em realidade digital. 
            Vamos conversar sobre seu próximo projeto!
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => <a key={info.title} href={info.action} className="group glass p-8 rounded-2xl text-center hover:scale-105 transition-all duration-500 animate-fade-scale" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="w-16 h-16 mx-auto rounded-full glass flex items-center justify-center mb-6 group-hover:glow-primary transition-all duration-300">
                  <info.icon className="w-8 h-8 text-primary group-hover:text-secondary transition-colors duration-300" />
                </div>
                
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                  {info.title}
                </h3>
                
                <p className="text-foreground font-medium mb-2 break-all text-sm sm:text-base">
                  {info.content}
                </p>
                
                <p className="text-sm text-muted-foreground">
                  {info.description}
                </p>
              </a>)}
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-orbitron font-bold mb-6 holographic">
                  Envie uma Mensagem
                </h2>
                <p className="text-xl text-muted-foreground">
                  Preencha o formulário e entraremos em contato em breve
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">
                      Nome Completo *
                    </label>
                    <input id="name" name="name" type="text" required value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground transition-all duration-300" placeholder="Seu nome completo" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">
                      E-mail *
                    </label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground transition-all duration-300" placeholder="seu@email.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">
                      Telefone
                    </label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground transition-all duration-300" placeholder="(64) 98990-4033" />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">
                      Assunto *
                    </label>
                    <input id="subject" name="subject" type="text" required value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground transition-all duration-300" placeholder="Sobre o que você gostaria de falar?" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">
                    Mensagem *
                  </label>
                  <textarea id="message" name="message" required rows={6} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground resize-none transition-all duration-300" placeholder="Conte-nos mais sobre seu projeto ou dúvida..." />
                </div>

                <FuturisticButton type="submit" variant="primary" size="lg" className="w-full" glow>
                  <Send className="w-5 h-5" />
                  Enviar
                </FuturisticButton>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl font-orbitron font-bold mb-6 holographic">
                  Vamos Conectar?
                </h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Siga-nos nas redes sociais para ficar por dentro das últimas novidades 
                  em tecnologia e desenvolvimento de software.
                </p>

                {/* Social Links */}
                <div className="grid grid-cols-2 gap-4 mb-12">
                  {socialLinks.map((social, index) => <a key={social.name} href={social.url} className={`group p-6 glass rounded-2xl hover:scale-105 transition-all duration-500 animate-fade-scale`} style={{
                  animationDelay: `${index * 0.1}s`
                }}>
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${social.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <social.icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-medium group-hover:text-primary transition-colors duration-300">
                          {social.name}
                        </span>
                      </div>
                    </a>)}
                </div>
              </div>

              {/* Office Hours */}
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-6 flex items-center">
                  <Clock className="mr-3 w-6 h-6 text-primary" />
                  Horário de Atendimento
                </h3>
                
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span>Segunda - Sexta</span>
                    <span className="text-foreground font-medium">09:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span>Sábado</span>
                    <span className="text-foreground font-medium">09:00 - 14:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Domingo</span>
                    <span className="text-muted-foreground">Fechado</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm text-primary font-medium">
                    ⚡ Atendimento de emergência 24/7 para clientes premium
                  </p>
                </div>
              </div>

              {/* FAQ Quick Links */}
              <div className="glass p-8 rounded-2xl">
                <h3 className="text-2xl font-semibold mb-6">
                  Perguntas Frequentes
                </h3>
                
                <div className="space-y-4">
                  <div className="text-muted-foreground">
                    <p className="font-medium text-foreground mb-2">
                      Qual o tempo médio para desenvolvimento?
                    </p>
                    <p className="text-sm">
                      Projetos web: 4-12 semanas | Apps mobile: 6-16 semanas
                    </p>
                  </div>
                  
                  <div className="text-muted-foreground">
                    <p className="font-medium text-foreground mb-2">
                      Vocês oferecem suporte pós-lançamento?
                    </p>
                    <p className="text-sm">
                      Sim! Oferecemos diferentes planos de suporte e manutenção.
                    </p>
                  </div>
                  
                  <div className="text-muted-foreground">
                    <p className="font-medium text-foreground mb-2">
                      Como funciona o processo de orçamento?
                    </p>
                    <p className="text-sm">
                      Análise gratuita → Proposta detalhada → Contrato → Desenvolvimento
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
              Nossa Localização
            </h2>
            <p className="text-xl text-muted-foreground">
              Venha nos visitar ou marque uma reunião virtual
            </p>
          </div>

            <div className="aspect-video glass rounded-3xl p-8 flex items-center justify-center relative overflow-hidden">
            <div className="text-center space-y-4">
              <MapPin className="w-16 h-16 mx-auto text-primary animate-bounce" />
              <h3 className="text-2xl font-semibold">Goiás</h3>
              <p className="text-muted-foreground">Brasil</p>
              <FuturisticButton variant="outline">
                Ver no Google Maps
              </FuturisticButton>
            </div>
            
            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-10">
              <div className="grid grid-cols-8 gap-4 h-full">
                {Array.from({
                length: 32
              }).map((_, i) => <div key={i} className="border border-primary/20" />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>;
};
export default Contact;