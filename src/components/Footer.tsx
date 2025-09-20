import { Link } from "react-router-dom";
import { 
  Code2, 
  Zap, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin,
  Instagram,
  Twitter
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Início", path: "/" },
    { name: "Sobre Nós", path: "/sobre" },
    { name: "Serviços", path: "/servicos" },
    { name: "Portfólio", path: "/portfolio" },
  ];

  const services = [
    { name: "Desenvolvimento Web", path: "/servicos#web" },
    { name: "Apps Mobile", path: "/servicos#mobile" },
    { name: "APIs & Integrações", path: "/servicos#api" },
    { name: "UX/UI Design", path: "/servicos#design" },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/codifydevbr", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/codify-dev/", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/codify.dev.br/", label: "Instagram" },
    { icon: Twitter, href: "#", label: "Twitter" },
  ];

  return (
    <footer className="bg-gradient-dark border-t border-primary/20 mt-20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img 
                  src="/lovable-uploads/bdec4111-7cae-45f7-82f3-b04547142fef.png" 
                  alt="Codify Logo" 
                  className="w-8 h-8"
                />
              </div>
              <span className="text-2xl font-orbitron font-bold holographic">
                CODIFY
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Transformamos ideias em realidade digital. Especialistas em desenvolvimento 
              de software personalizado com tecnologia de ponta.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 rounded-lg glass border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-primary/20 transition-all duration-300"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-orbitron font-semibold text-primary">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                  >
                    {link.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-orbitron font-semibold text-primary">
              Serviços
            </h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.path}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 relative group"
                  >
                    {service.name}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="text-lg font-orbitron font-semibold text-primary">
              Contato
            </h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>codifydev.principal@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>(64) 9989-0403</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="w-5 h-5 text-secondary flex-shrink-0" />
                <span>Goiás, Brasil</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-muted-foreground text-sm">
              © {currentYear} Codify. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link 
                to="/privacidade" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Política de Privacidade
              </Link>
              <Link 
                to="/termos" 
                className="text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                Termos de Uso
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-gentle-glow" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/5 rounded-full blur-3xl animate-gentle-glow" style={{ animationDelay: '2s' }} />
      </div>
    </footer>
  );
};

export default Footer;