import { useState } from "react";
import { Code, Smartphone, Cloud, Cpu, ArrowRight, Zap, Shield, Palette, Database } from "lucide-react";
import FuturisticButton from "@/components/FuturisticButton";
import { Link } from "react-router-dom";
const InteractiveServices = () => {
  const [activeService, setActiveService] = useState(0);
  const services = [{
    icon: Code,
    title: "Desenvolvimento Web",
    description: "Sites e aplicações web modernas com tecnologia de ponta",
    features: ["React/Next.js", "TypeScript", "PWA", "SEO Otimizado"],
    color: "primary",
    delay: "0s"
  }, {
    icon: Smartphone,
    title: "Apps Mobile",
    description: "Aplicativos nativos e híbridos para iOS e Android",
    features: ["React Native", "Flutter", "App Store", "Push Notifications"],
    color: "secondary",
    delay: "0.1s"
  }, {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Infraestrutura escalável e automatizada na nuvem",
    features: ["AWS/Azure", "Docker", "CI/CD", "Microserviços"],
    color: "neon-purple",
    delay: "0.2s"
  }, {
    icon: Cpu,
    title: "IA & Automação",
    description: "Soluções inteligentes com Machine Learning",
    features: ["ChatBots", "Análise de Dados", "APIs IA", "Automação"],
    color: "neon-cyan",
    delay: "0.3s"
  }, {
    icon: Palette,
    title: "UX/UI Design",
    description: "Interfaces incríveis que encantam usuários",
    features: ["Design System", "Prototipagem", "User Research", "Figma"],
    color: "neon-pink",
    delay: "0.4s"
  }, {
    icon: Database,
    title: "APIs & Integrações",
    description: "Conecte sistemas e maximize eficiência",
    features: ["REST APIs", "GraphQL", "Webhooks", "Third-party"],
    color: "neon-green",
    delay: "0.5s"
  }];
  return (
    <section className="py-8 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
            Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Soluções completas de desenvolvimento que transformam ideias em realidade digital
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className={`group relative liquid-glass-card border border-primary/20 rounded-2xl p-6 hover:border-primary/40 transition-all duration-500 hover:scale-105 animate-fade-in ${
                  activeService === index ? 'ring-2 ring-primary' : ''
                }`}
                style={{ animationDelay: service.delay }}
                onClick={() => setActiveService(index)}
              >
                <div className="relative z-10">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-full h-full text-white" />
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={feature} className="flex items-center space-x-2">
                        <Zap className="w-4 h-4 text-secondary" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <Link to="/servicos">
                    <FuturisticButton variant="outline" size="sm" className="w-full group-hover:border-primary">
                      Saiba Mais
                      <ArrowRight className="w-4 h-4" />
                    </FuturisticButton>
                  </Link>
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default InteractiveServices;