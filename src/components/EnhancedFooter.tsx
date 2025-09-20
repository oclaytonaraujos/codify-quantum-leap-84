import { Link } from "react-router-dom";
import { Code2, Zap, Github, Linkedin, Mail, Phone, MapPin, Instagram, Twitter, ArrowRight, Heart } from "lucide-react";
import FuturisticButton from "./FuturisticButton";
const EnhancedFooter = () => {
  const currentYear = new Date().getFullYear();
  const quickLinks = [{
    name: "Início",
    path: "/"
  }, {
    name: "Sobre Nós",
    path: "/sobre"
  }, {
    name: "Serviços",
    path: "/servicos"
  }, {
    name: "Portfólio",
    path: "/portfolio"
  }, {
    name: "Blog",
    path: "/blog"
  }, {
    name: "Contato",
    path: "/contato"
  }];
  const services = [{
    name: "Desenvolvimento Web",
    path: "/servicos#web"
  }, {
    name: "Apps Mobile",
    path: "/servicos#mobile"
  }, {
    name: "APIs & Integrações",
    path: "/servicos#api"
  }, {
    name: "UX/UI Design",
    path: "/servicos#design"
  }, {
    name: "Cloud & DevOps",
    path: "/servicos#cloud"
  }, {
    name: "IA & Automação",
    path: "/servicos#ia"
  }];
  const socialLinks = [{
    icon: Github,
    href: "https://github.com/codifydevbr",
    label: "GitHub"
  }, {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/codify-dev/",
    label: "LinkedIn"
  }, {
    icon: Instagram,
    href: "https://www.instagram.com/codify.dev.br/",
    label: "Instagram"
  }, {
    icon: Twitter,
    href: "#",
    label: "Twitter"
  }];
  return <footer className="relative liquid-glass-footer border-t border-primary/20 mt-20 overflow-hidden">
      {/* Newsletter section */}
      <div className="container mx-auto px-4 py-12 border-b border-primary/20">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-orbitron font-bold mb-4 holographic">
            Fique por dentro das novidades
          </h3>
          <p className="text-muted-foreground mb-8">
            Receba insights sobre tecnologia, dicas de desenvolvimento e novidades da Codify
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input type="email" placeholder="Seu melhor email" className="flex-1 px-4 py-3 rounded-xl liquid-glass border border-primary/20 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors" />
            <FuturisticButton variant="primary">
              Inscrever-se
              <ArrowRight className="w-4 h-4" />
            </FuturisticButton>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img src="/lovable-uploads/bdec4111-7cae-45f7-82f3-b04547142fef.png" alt="Codify Logo" className="w-10 h-10" />
              </div>
              <span className="text-2xl font-orbitron font-bold holographic">
                CODIFY
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Transformamos ideias em realidade digital. Especialistas em desenvolvimento 
              de software personalizado com tecnologia de ponta e design futurista.
            </p>
            
            {/* Contact info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>codifydev.principal@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>(64) 9989-0403</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-secondary flex-shrink-0" />
                <span>Goiás, Brasil</span>
              </div>
            </div>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map(({
              icon: Icon,
              href,
              label
            }) => <a key={label} href={href} className="p-3 rounded-lg liquid-glass border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 hover:glow-primary transition-all duration-300 group" aria-label={label}>
                  <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </a>)}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-orbitron font-semibold text-primary">
              Navegação
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => <li key={link.name}>
                  <Link to={link.path} className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group text-sm">
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-orbitron font-semibold text-primary">
              Serviços
            </h3>
            <ul className="space-y-3">
              {services.map(service => <li key={service.name}>
                  <Link to={service.path} className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group text-sm">
                    {service.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>)}
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="space-y-6">
            <h3 className="text-lg font-orbitron font-semibold text-primary">
              Ação Rápida
            </h3>
            <div className="space-y-4">
              <Link to="/solicitar-orcamento">
                <FuturisticButton variant="primary" size="sm" className="w-full">
                  Solicitar Orçamento
                  <ArrowRight className="w-4 h-4" />
                </FuturisticButton>
              </Link>
              <Link to="/contato">
                <FuturisticButton variant="outline" size="sm" className="w-full px-0 py-0 my-[10px]">
                  Falar Conosco
                </FuturisticButton>
              </Link>
            </div>
            
            {/* Awards/certifications */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">Certificações</h4>
              <div className="flex space-x-2">
                <div className="w-12 h-8 bg-gradient-primary rounded flex items-center justify-center text-xs text-white font-bold">
                  AWS
                </div>
                <div className="w-12 h-8 bg-gradient-secondary rounded flex items-center justify-center text-xs text-white font-bold">
                  ISO
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2 text-muted-foreground text-sm">
              <span>© {currentYear} Codify. Feito com</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>no Brasil</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacidade" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Privacidade
              </Link>
              <Link to="/termos" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Termos
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-gentle-glow" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-gentle-glow" style={{
        animationDelay: '2s'
      }} />
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-gentle-glow" style={{
        animationDelay: '4s'
      }} />
      </div>
    </footer>;
};
export default EnhancedFooter;