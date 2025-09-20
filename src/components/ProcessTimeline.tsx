import React from 'react';
import { Lightbulb, PenTool, Code2, Rocket, Settings, CheckCircle, ArrowRight, Users } from 'lucide-react';

const ProcessTimeline = () => {
  const phases = [
    {
      phase: "01",
      title: "Descoberta",
      subtitle: "Entendendo sua visão",
      color: "from-blue-500 to-cyan-500",
      steps: [
        { icon: Lightbulb, title: "Briefing", desc: "Reunião inicial para entender objetivos" },
        { icon: Users, title: "Análise", desc: "Estudo do público-alvo e mercado" },
        { icon: Settings, title: "Escopo", desc: "Definição detalhada do projeto" }
      ]
    },
    {
      phase: "02", 
      title: "Criação",
      subtitle: "Design & Prototipagem",
      color: "from-purple-500 to-pink-500",
      steps: [
        { icon: PenTool, title: "Wireframes", desc: "Estrutura e arquitetura da informação" },
        { icon: Code2, title: "Protótipos", desc: "Versões interativas do design" },
        { icon: CheckCircle, title: "Aprovação", desc: "Validação e refinamentos finais" }
      ]
    },
    {
      phase: "03",
      title: "Desenvolvimento", 
      subtitle: "Construção da solução",
      color: "from-green-500 to-emerald-500",
      steps: [
        { icon: Code2, title: "Frontend", desc: "Interface de usuário responsiva" },
        { icon: Settings, title: "Backend", desc: "Lógica de negócio e APIs" },
        { icon: Rocket, title: "Integração", desc: "Conexão com sistemas externos" }
      ]
    },
    {
      phase: "04",
      title: "Entrega",
      subtitle: "Deploy & Suporte", 
      color: "from-orange-500 to-red-500",
      steps: [
        { icon: Settings, title: "Testes", desc: "Garantia de qualidade total" },
        { icon: Rocket, title: "Deploy", desc: "Publicação em produção" },
        { icon: CheckCircle, title: "Suporte", desc: "Acompanhamento e manutenção" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/20 to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-orbitron font-bold mb-6 holographic">
            Como Trabalhamos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Nossa metodologia ágil e colaborativa garante entregas de qualidade excepcional
          </p>
        </div>

        {/* Mobile Version */}
        <div className="md:hidden space-y-8">
          {phases.map((phase, phaseIndex) => (
            <div key={phase.phase} className="relative">
              {/* Phase Header */}
              <div className="text-center mb-6">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.color} text-white font-bold text-xl mb-4 shadow-lg`}>
                  {phase.phase}
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-2">{phase.title}</h3>
                <p className="text-muted-foreground mb-2">{phase.subtitle}</p>
              </div>

              {/* Steps */}
              <div className="space-y-4">
                {phase.steps.map((step, stepIndex) => {
                  const IconComponent = step.icon;
                  return (
                    <div key={step.title} className="flex items-center space-x-4 p-4 liquid-glass-card backdrop-blur-sm rounded-xl border border-primary/10 hover:border-primary/30 transition-all duration-300">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${phase.color} p-3 flex-shrink-0`}>
                        <IconComponent className="w-full h-full text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                        <p className="text-sm text-muted-foreground">{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Connector */}
              {phaseIndex < phases.length - 1 && (
                <div className="flex justify-center mt-8">
                  <ArrowRight className="w-6 h-6 text-primary animate-bounce" style={{ animationDelay: `${phaseIndex * 0.5}s` }} />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop Version - Horizontal Flow */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-secondary to-primary opacity-30 z-0" />
            
            {phases.map((phase, phaseIndex) => (
              <div key={phase.phase} className="relative group">
                {/* Phase Number Circle */}
                <div className="flex justify-center mb-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${phase.color} flex items-center justify-center text-white font-bold text-xl shadow-xl relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                    {phase.phase}
                  </div>
                </div>

                {/* Phase Content */}
                <div className="liquid-glass-card backdrop-blur-sm rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 group-hover:-translate-y-2">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {phase.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3">{phase.subtitle}</p>
                  </div>

                  {/* Steps List */}
                  <div className="space-y-3">
                    {phase.steps.map((step, stepIndex) => {
                      const IconComponent = step.icon;
                      return (
                        <div key={step.title} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200">
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${phase.color} p-2 flex-shrink-0 mt-0.5`}>
                            <IconComponent className="w-full h-full text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground text-sm mb-1">{step.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Arrow Connector */}
                {phaseIndex < phases.length - 1 && (
                  <div className="absolute top-20 -right-4 z-20 transform -translate-y-1/2">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span>Pronto para começar?</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;