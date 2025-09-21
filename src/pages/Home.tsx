import { Link } from "react-router-dom";
import { ArrowRight, Code, Smartphone, Cloud, Zap, Shield, Cpu, CheckCircle, Star, Play } from "lucide-react";
import FuturisticButton from "@/components/FuturisticButton";
import AdvancedSEO from "@/components/AdvancedSEO";
import EnhancedHero from "@/components/EnhancedHero";
import InteractiveServices from "@/components/InteractiveServices";
import TechStack from "@/components/TechStack";
import ProcessTimeline from "@/components/ProcessTimeline";
import CounterStats from "@/components/CounterStats";
import { analytics } from "@/components/Analytics";
const Home = () => {
  const services = [{
    icon: Code,
    title: "Desenvolvimento Web",
    description: "Sites e aplicações web modernas com tecnologia de ponta",
    delay: "0s"
  }, {
    icon: Smartphone,
    title: "Apps Mobile",
    description: "Aplicativos nativos e híbridos para iOS e Android",
    delay: "0.1s"
  }, {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Infraestrutura escalável e automatizada na nuvem",
    delay: "0.2s"
  }, {
    icon: Cpu,
    title: "IA & Automação",
    description: "Soluções inteligentes com Machine Learning",
    delay: "0.3s"
  }];
  const features = ["Tecnologia de última geração", "Equipe especializada", "Suporte 24/7", "Entrega no prazo", "Código limpo e documentado", "Testes automatizados"];
  const testimonials = [{
    name: "Carlos Silva",
    company: "TechCorp",
    content: "A Codify transformou nossa ideia em um produto incrível. Superaram todas as expectativas!",
    rating: 5
  }, {
    name: "Ana Costa",
    company: "StartupXYZ",
    content: "Profissionalismo e qualidade excepcionais. Recomendo fortemente!",
    rating: 5
  }, {
    name: "Pedro Santos",
    company: "InnovateLab",
    content: "Desenvolveram nossa plataforma em tempo recorde sem comprometer a qualidade.",
    rating: 5
  }];
  return <div className="min-h-screen">
      <AdvancedSEO 
        title="Codify | Desenvolvimento de Software Personalizado e Inovador" 
        description="A Codify é uma empresa brasileira especializada em desenvolvimento de software sob demanda, aplicativos mobile, APIs e soluções digitais inovadoras. Transforme sua ideia em realidade!" 
        keywords="desenvolvimento de software, empresa de software, software sob demanda, soluções digitais, software personalizado, Codify, desenvolvimento web, apps mobile, IA, automação"
        canonicalUrl="https://codify.dev.br/" 
        priority={1.0}
        changeFreq="weekly"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Codify",
          "description": "Transformamos suas ideias em soluções digitais inovadoras com tecnologia de ponta e design futurista.",
          "url": "https://codify.dev.br/",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://codify.dev.br/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          },
          "sameAs": [
            "https://github.com/codifydev",
            "https://linkedin.com/company/codifydev"
          ]
        }} 
      />
      
      {/* Enhanced Hero Section */}
      <EnhancedHero />

      {/* Interactive Services Section */}
      <InteractiveServices />

      {/* Tech Stack Section */}
      <TechStack />

      {/* Counter Stats */}
      <CounterStats />

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Features Section */}
      <section className="py-12 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl font-orbitron font-bold holographic">
                Por que escolher a Codify?
              </h2>
              
              <p className="text-xl text-muted-foreground leading-relaxed">
                Combinamos expertise técnica com design inovador para entregar 
                soluções que superam expectativas.
              </p>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
                {features.map((feature, index) => <div key={feature} className="flex items-center space-x-3 animate-fade-scale" style={{
                animationDelay: `${index * 0.1}s`
              }}>
                    <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0" />
                    <span className="text-foreground">{feature}</span>
                  </div>)}
              </div>

              <div className="pt-6">
                <Link to="/sobre">
                  <FuturisticButton variant="secondary" size="lg">
                    Nossa História
                    <ArrowRight className="w-5 h-5" />
                  </FuturisticButton>
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-square glass rounded-3xl p-8 flex items-center justify-center">
                <div className="text-center space-y-6">
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-primary flex items-center justify-center animate-gentle-glow">
                    <Shield className="w-16 h-16 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold">100% Seguro</h3>
                  <p className="text-muted-foreground">
                    Código limpo, testes automatizados e documentação completa
                  </p>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/30 rounded-full animate-gentle-glow" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-secondary/20 rounded-lg rotate-45 animate-float" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-muted-foreground">
              Histórias reais de sucesso e transformação digital
            </p>
          </div>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => <div key={testimonial.name} className="glass p-8 rounded-2xl hover:scale-105 transition-all duration-500 animate-fade-scale" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="w-5 h-5 text-secondary fill-current" />)}
                </div>
                
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-white font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-gradient-dark relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
            Pronto para o futuro?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Vamos transformar sua ideia em uma solução digital extraordinária. 
            Entre em contato conosco hoje mesmo!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/solicitar-orcamento">
              <FuturisticButton variant="primary" size="lg" glow>
                Começar Projeto
                <ArrowRight className="w-5 h-5" />
              </FuturisticButton>
            </Link>
            
            <Link to="/contato">
              <FuturisticButton variant="outline" size="lg">
                Falar Conosco
              </FuturisticButton>
            </Link>
          </div>
        </div>

        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-gentle-glow" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-gentle-glow" style={{
          animationDelay: '2s'
        }} />
        </div>
      </section>
    </div>;
};
export default Home;