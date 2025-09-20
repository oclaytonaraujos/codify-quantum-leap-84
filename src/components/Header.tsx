import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Code2, Zap } from "lucide-react";
import FuturisticButton from "./FuturisticButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/sobre" },
    { name: "Serviços", path: "/servicos" },
    { name: "Portfólio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Contato", path: "/contato" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 liquid-glass-nav border-b border-primary/20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <img 
                src="/lovable-uploads/bdec4111-7cae-45f7-82f3-b04547142fef.png" 
                alt="Codify Logo" 
                className="w-10 h-10 group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <span className="text-2xl font-orbitron font-bold holographic">
              CODIFY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4 xl:space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`relative px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  isActive(item.path)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary animate-slide-up" />
                )}
                <div className="absolute inset-0 bg-primary/5 scale-0 hover:scale-100 transition-transform duration-300 rounded-lg" />
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/solicitar-orcamento">
              <FuturisticButton variant="primary" glow className="text-xs lg:text-sm px-3 lg:px-4">
                <span className="hidden lg:inline">Solicitar Orçamento</span>
                <span className="lg:hidden">Orçamento</span>
              </FuturisticButton>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors duration-300"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 liquid-glass border-t border-primary/20 animate-fade-scale">
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium transition-all duration-300 rounded-lg ${
                    isActive(item.path)
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-primary/20">
                <Link to="/solicitar-orcamento" onClick={() => setIsMenuOpen(false)}>
                  <FuturisticButton variant="primary" className="w-full">
                    Solicitar Orçamento
                  </FuturisticButton>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;