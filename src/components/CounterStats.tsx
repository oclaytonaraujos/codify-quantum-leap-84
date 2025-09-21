import { useEffect, useState } from "react";
import { Code, Users, Clock, Award } from "lucide-react";
const CounterStats = () => {
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    hours: 0,
    awards: 0
  });
  const finalValues = {
    projects: 150,
    clients: 98,
    hours: 5000,
    awards: 12
  };
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increments = {
      projects: finalValues.projects / steps,
      clients: finalValues.clients / steps,
      hours: finalValues.hours / steps,
      awards: finalValues.awards / steps
    };
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setCounters({
          projects: Math.floor(increments.projects * currentStep),
          clients: Math.floor(increments.clients * currentStep),
          hours: Math.floor(increments.hours * currentStep),
          awards: Math.floor(increments.awards * currentStep)
        });
      } else {
        setCounters(finalValues);
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, []);
  const stats = [{
    icon: Code,
    value: counters.projects,
    suffix: "+",
    label: "Projetos Entregues",
    description: "Soluções desenvolvidas com excelência"
  }, {
    icon: Users,
    value: counters.clients,
    suffix: "%",
    label: "Satisfação dos Clientes",
    description: "Taxa de satisfação comprovada"
  }, {
    icon: Clock,
    value: counters.hours,
    suffix: "+",
    label: "Horas de Desenvolvimento",
    description: "Experiência acumulada"
  }, {
    icon: Award,
    value: counters.awards,
    suffix: "+",
    label: "Prêmios e Reconhecimentos",
    description: "Qualidade reconhecida no mercado"
  }];
  return <section className="py-12 bg-gradient-dark relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
            Números que Impressionam
          </h2>
          <p className="text-xl text-muted-foreground">
            Resultados que falam por si só
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 md:gap-6 lg:gap-8">
          {stats.map((stat, index) => <div key={stat.label} className="text-center group animate-fade-scale" style={{
          animationDelay: `${index * 0.1}s`
        }}>
              <div className="cyber-glass p-8 rounded-2xl hover-glow transition-all duration-500">
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>

                {/* Counter */}
                <div className="mb-4">
                  <div className="text-4xl md:text-5xl font-orbitron font-bold cyber-text px-0">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                </div>

                {/* Label */}
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {stat.description}
                </p>
              </div>
            </div>)}
        </div>

        {/* Additional content */}
        <div className="text-center mt-16">
          <div className="cyber-glass p-8 rounded-2xl max-w-3xl mx-auto">
            <h3 className="text-2xl font-orbitron font-bold mb-4 holographic">
              Comprometidos com a Excelência
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Cada projeto é uma oportunidade de superar expectativas. Nossa equipe dedicada 
              trabalha incansavelmente para entregar soluções que não apenas atendem, 
              mas excedem os requisitos dos nossos clientes.
            </p>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl animate-gentle-glow" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-2xl animate-gentle-glow" style={{
        animationDelay: '1s'
      }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-gentle-glow" style={{
        animationDelay: '2s'
      }} />
      </div>
    </section>;
};
export default CounterStats;