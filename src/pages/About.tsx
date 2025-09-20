import { Users, Target, Eye, Heart, Clock, Award } from "lucide-react";
import FuturisticButton from "@/components/FuturisticButton";
import SEOHead from "@/components/SEOHead";
const About = () => {
  const values = [{
    icon: Target,
    title: "Missão",
    description: "Transformar ideias em soluções digitais extraordinárias que impulsionam o sucesso dos nossos clientes."
  }, {
    icon: Eye,
    title: "Visão",
    description: "Ser a referência em desenvolvimento de software personalizado, criando o futuro da tecnologia hoje."
  }, {
    icon: Heart,
    title: "Valores",
    description: "Inovação, qualidade, transparência e compromisso com a excelência em cada projeto."
  }];
  const timeline = [{
    year: "2018",
    title: "Fundação",
    description: "Início da jornada com foco em desenvolvimento web moderno"
  }, {
    year: "2020",
    title: "Expansão Mobile",
    description: "Ampliação para desenvolvimento de aplicativos mobile"
  }, {
    year: "2022",
    title: "IA & Cloud",
    description: "Integração de soluções de inteligência artificial e cloud"
  }, {
    year: "2024",
    title: "Liderança",
    description: "Reconhecida como referência em tecnologia futurista"
  }];
  const team = [{
    name: "Clayton Araújo",
    role: "CEO & Founder",
    specialty: "Engenharia de Software",
    initial: "C"
  }, {
    name: "Eugênio José Moura",
    role: "CTO",
    specialty: "Engenharia da Computação",
    initial: "E"
  }, {
    name: "João Pedro Fragoso",
    role: "Lead Developer",
    specialty: "Ciências da Computação",
    initial: "J"
  }, {
    name: "Isabela Nascimento",
    role: "UX/UI Designer",
    specialty: "Design Futurista",
    initial: "I"
  }];
  return <div className="min-h-screen">
      <SEOHead title="Sobre a Codify | Equipe, Missão e Valores da Empresa de Software" description="Conheça a história, missão e valores da Codify, empresa focada em inovação e desenvolvimento de software sob medida para seu negócio crescer." keywords="empresa de desenvolvimento de software, equipe de TI, missão, visão, valores, história Codify" canonicalUrl="https://codify.dev.br/sobre" schema={{
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "Sobre a Codify",
      "description": "Somos uma equipe de visionários apaixonados por tecnologia, dedicados a criar o software do futuro.",
      "url": "https://codify.dev.br/sobre"
    }} />
      {/* Hero Section */}
      <section className="py-20 animated-bg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-8 holographic animate-slide-up">Sobre a Codify</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-100">
            Somos uma equipe de visionários apaixonados por tecnologia, 
            dedicados a criar o software do futuro com as melhores práticas do presente.
          </p>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => <div key={value.title} className="text-center space-y-6 glass p-8 rounded-2xl hover:scale-105 transition-all duration-500 animate-fade-scale" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="w-16 h-16 mx-auto rounded-full glass flex items-center justify-center glow-primary">
                  <value.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-orbitron font-semibold text-primary">
                  {value.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-4 animate-fade-scale">
              <div className="text-4xl md:text-5xl font-orbitron font-bold holographic">
                50+
              </div>
              <div className="text-muted-foreground">Projetos Entregues</div>
            </div>
            <div className="text-center space-y-4 animate-fade-scale animate-delay-100">
              <div className="text-4xl md:text-5xl font-orbitron font-bold holographic">
                6
              </div>
              <div className="text-muted-foreground">Anos de Experiência</div>
            </div>
            <div className="text-center space-y-4 animate-fade-scale animate-delay-200">
              <div className="text-4xl md:text-5xl font-orbitron font-bold holographic">
                100%
              </div>
              <div className="text-muted-foreground">Clientes Satisfeitos</div>
            </div>
            <div className="text-center space-y-4 animate-fade-scale animate-delay-300">
              <div className="text-4xl md:text-5xl font-orbitron font-bold holographic">
                24/7
              </div>
              <div className="text-muted-foreground">Suporte Dedicado</div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
              Nossa Jornada
            </h2>
            <p className="text-xl text-muted-foreground">
              Uma trajetória de crescimento e inovação constante
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-primary rounded-full" />
            
            <div className="space-y-16">
              {timeline.map((item, index) => <div key={item.year} className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} animate-fade-scale`} style={{
              animationDelay: `${index * 0.2}s`
            }}>
                  <div className="flex-1 px-8">
                    <div className={`glass p-6 rounded-2xl ${index % 2 === 0 ? "text-right" : "text-left"}`}>
                      <div className="text-2xl font-orbitron font-bold text-primary mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                      <p className="text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-6 h-6 bg-primary rounded-full border-4 border-background relative z-10 flex-shrink-0">
                    <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
                  </div>
                  
                  <div className="flex-1 px-8" />
                </div>)}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
              Nossa Equipe
            </h2>
            <p className="text-xl text-muted-foreground">
              Especialistas dedicados à excelência tecnológica
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => <div key={member.name} className="text-center space-y-6 glass p-8 rounded-2xl hover:scale-105 transition-all duration-500 animate-fade-scale" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="relative mx-auto">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-primary flex items-center justify-center text-white text-2xl font-bold glow-primary">
                    {member.initial}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                    <Award className="w-4 h-4 text-background" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <div className="text-primary font-medium">{member.role}</div>
                  <div className="text-sm text-muted-foreground">{member.specialty}</div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
            Vamos Trabalhar Juntos?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Estamos prontos para transformar sua ideia em realidade digital. 
            Entre em contato e vamos construir o futuro juntos!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <FuturisticButton variant="primary" size="lg" glow onClick={() => {
            const phoneNumber = "5564998904033";
            const message = "Olá! Acabei de conhecer a Codify através da página Sobre e gostaria de conversar sobre um projeto.";
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
          }}>
              <Users className="w-5 h-5" />
              Fale Conosco
            </FuturisticButton>
          </div>
        </div>
      </section>
    </div>;
};
export default About;