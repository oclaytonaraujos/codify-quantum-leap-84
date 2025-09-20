import { Link } from "react-router-dom";
import { ArrowRight, Play, Sparkles, Zap } from "lucide-react";
import FuturisticButton from "@/components/FuturisticButton";
import { analytics } from "@/components/Analytics";
const EnhancedHero = () => {
  return <section className="relative h-screen flex items-center justify-center overflow-hidden liquid-glass-hero">
      {/* Enhanced background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/20 to-background"></div>
      <div className="absolute inset-0 bg-[var(--gradient-hero)]"></div>
      <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-30"></div>
      
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(147,71,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(147,71,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-grid-pulse"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <div className="space-y-8 animate-slide-up">
            {/* Badge */}
            
            
            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl font-orbitron font-bold leading-tight">
              <span className="cyber-text block">Software do</span>
              <span className="holographic block pb-2">Futuro, Hoje.</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-100">
              Criamos soluções digitais extraordinárias que transformam ideias em realidade. 
              <span className="text-primary font-medium"> Desenvolvimento sob demanda</span> com 
              tecnologia de ponta e design futurista.
            </p>
            
            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up animate-delay-200">
              <Link to="/solicitar-orcamento">
                <FuturisticButton variant="primary" size="lg" className="animate-gentle-glow group" onClick={() => analytics.trackClick('hero_cta', {
                section: 'hero',
                action: 'solicitar_orcamento'
              })}>
                  Iniciar Projeto
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </FuturisticButton>
              </Link>
              
              
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 animate-slide-up animate-delay-300">
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-primary">50+</div>
                <div className="text-sm text-muted-foreground">Projetos Entregues</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-secondary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfação</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-orbitron font-bold text-primary">24/7</div>
                <div className="text-sm text-muted-foreground">Suporte</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced floating elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Main floating elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="w-20 h-20 border-2 border-primary/40 rounded-full liquid-glass animate-gentle-glow" />
        </div>
        <div className="absolute bottom-20 right-10 animate-orbital-motion">
          <div className="w-16 h-16 bg-gradient-primary rounded-lg rotate-45 opacity-60" />
        </div>
        <div className="absolute top-1/2 left-5 animate-matrix-drift">
          <div className="w-12 h-12 bg-gradient-secondary rounded-full opacity-70" />
        </div>
        <div className="absolute top-20 right-20 animate-gentle-glow">
          <Zap className="w-10 h-10 text-secondary opacity-80" />
        </div>
        
        {/* Additional particles */}
        {Array.from({
        length: 6
      }).map((_, i) => <div key={i} className={`absolute w-2 h-2 bg-primary rounded-full opacity-60 animate-particle-float`} style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${8 + Math.random() * 4}s`
      }} />)}
      </div>
    </section>;
};
export default EnhancedHero;