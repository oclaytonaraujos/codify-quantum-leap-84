import { useState } from "react";
import { Code, Smartphone, Cloud, Palette, Brain, Settings, ArrowRight, Check, Zap, Bot, MessageCircle, Clock, Users, TrendingUp, Sparkles, Star } from "lucide-react";
import FuturisticButton from "@/components/FuturisticButton";
import ProjectCaptureForm from "@/components/ProjectCaptureForm";
import ServiceDetailModal from "@/components/ServiceDetailModal";
import SEOHead from "@/components/SEOHead";
const Services = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const services = [{
    icon: Code,
    title: "Desenvolvimento Web",
    subtitle: "Sites e aplicações modernas",
    description: "Criamos experiências web extraordinárias com as mais recentes tecnologias front-end e back-end.",
    detailedDescription: "Nosso serviço de desenvolvimento web combina design inovador com tecnologia de ponta para criar soluções digitais que não apenas impressionam visualmente, mas também entregam performance excepcional e experiência do usuário superior. Utilizamos as mais modernas frameworks e metodologias ágeis para garantir que seu projeto seja entregue no prazo e supere suas expectativas.",
    benefits: ["Aumento de até 300% no tempo de permanência dos usuários no site", "Melhoria significativa na taxa de conversão e vendas online", "Otimização completa para mecanismos de busca (SEO)", "Responsividade total em todos os dispositivos", "Carregamento ultra-rápido com otimização de performance", "Integração seamless com sistemas existentes"],
    features: ["React, Vue.js, Angular", "Node.js, Python, PHP", "Responsive Design", "PWA & SPA", "SEO Otimizado", "Performance Máxima"],
    techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB", "AWS", "Vercel"],
    timeline: "4-8 semanas",
    ideal: ["Empresas que precisam de presença digital forte", "E-commerces que querem aumentar vendas", "Startups buscando validação de mercado", "Organizações que precisam modernizar sistemas legados"],
    results: ["Redução de 60% no tempo de carregamento", "Aumento de 150% na taxa de conversão", "Melhoria de 200% no ranking de SEO", "Crescimento de 80% no engajamento do usuário"],
    price: "Sob consulta",
    gradient: "from-purple-500 to-blue-500"
  }, {
    icon: Smartphone,
    title: "Aplicativos Mobile",
    subtitle: "iOS e Android nativos",
    description: "Desenvolvemos apps nativos e híbridos que oferecem experiência superior em dispositivos móveis.",
    detailedDescription: "Criamos aplicativos móveis que se destacam nas lojas de apps e conquistam usuários. Nossa abordagem combina design intuitivo com funcionalidades avançadas, garantindo uma experiência móvel fluida e envolvente. Desenvolvemos tanto apps nativos quanto híbridos, sempre priorizando performance e usabilidade.",
    benefits: ["Acesso direto aos recursos nativos do dispositivo", "Performance superior e experiência fluida", "Integração com notificações push para engajamento", "Funcionamento offline para maior conveniência", "Monetização através de compras in-app", "Analytics detalhados sobre comportamento do usuário"],
    features: ["React Native & Flutter", "iOS & Android Nativo", "UI/UX Otimizado", "Integração com APIs", "Push Notifications", "App Store Deploy"],
    techStack: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase", "Redux", "SQLite", "App Store Connect"],
    timeline: "8-16 semanas",
    ideal: ["Empresas que querem mobilidade para seus serviços", "Startups com foco mobile-first", "Negócios que precisam de engajamento constante", "Organizações que querem otimizar processos internos"],
    results: ["Aumento de 250% no engajamento do usuário", "Redução de 40% nos custos operacionais", "Crescimento de 180% na retenção de clientes", "Melhoria de 300% na satisfação do usuário"],
    price: "Sob consulta",
    gradient: "from-cyan-500 to-purple-500"
  }, {
    icon: Cloud,
    title: "APIs & Integrações",
    subtitle: "Conectando sistemas",
    description: "Desenvolvemos APIs robustas e integrações seamless entre diferentes plataformas e serviços.",
    detailedDescription: "Especializamo-nos em criar pontes digitais que conectam diferentes sistemas e plataformas, permitindo que sua empresa opere de forma mais eficiente e integrada. Nossas APIs são desenvolvidas seguindo os melhores padrões de segurança e escalabilidade do mercado.",
    benefits: ["Automatização completa de processos manuais", "Sincronização em tempo real entre sistemas", "Redução drástica de erros operacionais", "Escalabilidade automática conforme demanda", "Integração com principais ERPs e CRMs do mercado", "Monitoramento 24/7 com alertas inteligentes"],
    features: ["REST & GraphQL APIs", "Microserviços", "Integração ERP/CRM", "Pagamentos Online", "Webhooks & Real-time", "Documentação Completa"],
    techStack: ["Node.js", "Express", "GraphQL", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS API Gateway"],
    timeline: "6-12 semanas",
    ideal: ["Empresas com múltiplos sistemas desconectados", "E-commerces que precisam integrar marketplaces", "Organizações que querem automatizar workflows", "Negócios que dependem de sincronização de dados"],
    results: ["Redução de 70% no tempo de processamento", "Eliminação de 95% dos erros manuais", "Aumento de 400% na eficiência operacional", "Economia de 50% nos custos de operação"],
    price: "Sob consulta",
    gradient: "from-blue-500 to-cyan-500"
  }, {
    icon: Palette,
    title: "UX/UI Design Futurista",
    subtitle: "Interfaces do futuro",
    description: "Criamos interfaces futuristas que combinam estética inovadora com usabilidade excepcional.",
    detailedDescription: "Nosso time de design cria experiências visuais que não apenas impressionam, mas também convertem. Combinamos princípios de psicologia do usuário com as últimas tendências em design digital para criar interfaces que são tanto bonitas quanto funcionais, sempre focando na jornada do usuário.",
    benefits: ["Aumento significativo na taxa de conversão", "Redução do tempo de aprendizado dos usuários", "Melhoria na satisfação e retenção de clientes", "Diferenciação competitiva através do design", "Otimização da jornada do usuário", "Consistência visual em todas as plataformas"],
    features: ["Design System", "Protótipos Interativos", "Glassmorphism & Neon", "Animações Fluidas", "Responsive Design", "Testes de Usabilidade"],
    techStack: ["Figma", "Adobe Creative Suite", "Principle", "Framer", "InVision", "Miro", "Zeplin", "Sketch"],
    timeline: "4-10 semanas",
    ideal: ["Empresas que querem se destacar visualmente", "Produtos digitais que precisam de diferenciação", "Startups buscando identidade visual forte", "Negócios que querem melhorar experiência do usuário"],
    results: ["Aumento de 180% na taxa de conversão", "Redução de 50% na taxa de abandono", "Melhoria de 250% na satisfação do usuário", "Crescimento de 120% no tempo de sessão"],
    price: "Sob consulta",
    gradient: "from-purple-500 to-pink-500"
  }, {
    icon: Brain,
    title: "Projetos com IA",
    subtitle: "Inteligência artificial",
    description: "Implementamos soluções de IA e Machine Learning para automatizar e otimizar processos.",
    detailedDescription: "Desenvolvemos soluções de inteligência artificial customizadas para resolver problemas específicos do seu negócio. Desde chatbots inteligentes até sistemas de análise preditiva, nossa expertise em IA pode transformar dados em insights valiosos e automatizar processos complexos.",
    benefits: ["Automatização de processos repetitivos e complexos", "Insights preditivos para tomada de decisão", "Atendimento ao cliente 24/7 com chatbots inteligentes", "Análise de grandes volumes de dados em tempo real", "Personalização em massa da experiência do usuário", "Redução significativa de custos operacionais"],
    features: ["Machine Learning", "Processamento de Linguagem", "Computer Vision", "Chatbots Inteligentes", "Análise Preditiva", "Automação de Processos"],
    techStack: ["Python", "TensorFlow", "PyTorch", "OpenAI", "Hugging Face", "Pandas", "NumPy", "Azure ML"],
    timeline: "8-20 semanas",
    ideal: ["Empresas com grandes volumes de dados", "Negócios que querem automatizar atendimento", "Organizações que precisam de análises preditivas", "Startups focadas em inovação tecnológica"],
    results: ["Redução de 80% no tempo de processamento", "Aumento de 300% na precisão de previsões", "Economia de 60% nos custos de atendimento", "Melhoria de 200% na eficiência operacional"],
    price: "Sob consulta",
    gradient: "from-emerald-500 to-blue-500"
  }, {
    icon: Settings,
    title: "DevOps & Cloud",
    subtitle: "Infraestrutura escalável",
    description: "Configuramos infraestrutura moderna na nuvem com práticas DevOps para máxima eficiência.",
    detailedDescription: "Implementamos infraestruturas cloud robustas e escaláveis, combinadas com práticas DevOps modernas para garantir que suas aplicações sejam confiáveis, seguras e de alta performance. Nossa abordagem inclui automação completa, monitoramento contínuo e backup estratégico.",
    benefits: ["Escalabilidade automática conforme demanda", "Redução drástica de downtime e indisponibilidade", "Backup automatizado e recuperação de desastres", "Monitoramento 24/7 com alertas proativos", "Deploy automatizado e rollback instantâneo", "Segurança enterprise com compliance regulatório"],
    features: ["AWS, Azure, GCP", "Docker & Kubernetes", "CI/CD Pipelines", "Monitoramento 24/7", "Backup Automatizado", "Segurança Avançada"],
    techStack: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitLab CI", "Prometheus", "Grafana"],
    timeline: "6-14 semanas",
    ideal: ["Empresas que precisam de alta disponibilidade", "Startups que querem escalabilidade automática", "Organizações com compliance rigoroso", "Negócios que querem reduzir custos de infraestrutura"],
    results: ["Redução de 90% no downtime", "Economia de 40% nos custos de infraestrutura", "Aumento de 500% na velocidade de deploy", "Melhoria de 99.9% na disponibilidade do sistema"],
    price: "Sob consulta",
    gradient: "from-orange-500 to-red-500"
  }, {
    icon: Bot,
    title: "Automação WhatsApp com IA",
    subtitle: "Atendimento inteligente 24/7",
    description: "Implementamos bots de WhatsApp com inteligência artificial para automatizar seu atendimento ao cliente.",
    detailedDescription: "Criamos sistemas de automação para WhatsApp que utilizam inteligência artificial avançada para fornecer atendimento personalizado e eficiente 24 horas por dia. Nossos chatbots são capazes de entender linguagem natural, responder perguntas complexas e encaminhar casos específicos para atendimento humano quando necessário.",
    benefits: ["Atendimento disponível 24 horas por dia, 7 dias por semana", "Redução de até 80% no tempo de resposta ao cliente", "Automação de processos de vendas e suporte", "Integração completa com sistemas CRM e ERP", "Personalização baseada no histórico do cliente", "Relatórios detalhados sobre interações e performance"],
    features: ["Processamento de Linguagem Natural", "Integração WhatsApp Business API", "Fluxos de Conversa Inteligentes", "Escalação para Atendimento Humano", "Analytics e Relatórios", "Treinamento Personalizado"],
    techStack: ["OpenAI GPT", "WhatsApp Business API", "Node.js", "Webhook", "Natural Language Processing", "CRM Integration", "Analytics Dashboard", "Cloud Functions"],
    timeline: "6-10 semanas",
    ideal: ["Empresas com alto volume de atendimento", "E-commerces que querem automatizar vendas", "Prestadores de serviço que precisam de suporte 24/7", "Negócios que querem reduzir custos operacionais"],
    results: ["Redução de 70% no tempo médio de resposta", "Aumento de 200% na satisfação do cliente", "Economia de 50% nos custos de atendimento", "Crescimento de 150% na taxa de conversão"],
    price: "Sob consulta",
    gradient: "from-green-500 to-emerald-500"
  }];
  const process = [{
    step: "01",
    title: "Descoberta",
    description: "Entendemos suas necessidades e objetivos"
  }, {
    step: "02",
    title: "Planejamento",
    description: "Criamos uma estratégia detalhada do projeto"
  }, {
    step: "03",
    title: "Desenvolvimento",
    description: "Construímos sua solução com tecnologia de ponta"
  }, {
    step: "04",
    title: "Testes",
    description: "Garantimos qualidade através de testes rigorosos"
  }, {
    step: "05",
    title: "Deploy",
    description: "Publicamos sua solução com segurança"
  }, {
    step: "06",
    title: "Suporte",
    description: "Oferecemos suporte contínuo e manutenção"
  }];
  return <div className="min-h-screen">
      <SEOHead title="Serviços de Desenvolvimento de Software | Codify" description="Oferecemos serviços especializados em desenvolvimento web, aplicativos mobile, APIs, UX/UI design, projetos com IA e DevOps. Saiba mais!" keywords="serviços de desenvolvimento de software, apps mobile, APIs personalizadas, UX/UI design, integração de sistemas, projetos IA" canonicalUrl="https://codify.dev.br/servicos" schema={{
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Serviços de Desenvolvimento de Software",
      "description": "Soluções completas em desenvolvimento de software para transformar sua visão em realidade digital.",
      "url": "https://codify.dev.br/servicos",
      "provider": {
        "@type": "Organization",
        "name": "Codify"
      }
    }} />
      {/* Hero Section */}
      <section className="py-20 animated-bg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-8 holographic animate-slide-up">Nossos Serviços</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-100">
            Soluções completas em desenvolvimento de software para transformar 
            sua visão em realidade digital extraordinária.
          </p>
        </div>
      </section>

      {/* WhatsApp Bot AI Featured Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10"></div>
        <div className="absolute inset-0 bg-[var(--gradient-mesh)] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full px-6 py-3 mb-6 border border-green-500/30">
              <Sparkles className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-medium">Destaque da Semana</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-orbitron font-bold mb-6 cyber-text">
              Automação WhatsApp
              <span className="block text-4xl md:text-5xl holographic">com Inteligência Artificial</span>
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto leading-relaxed">
              Revolucione seu atendimento ao cliente com nosso bot inteligente de WhatsApp. 
              <span className="text-green-400 font-medium"> Atendimento 24/7, respostas instantâneas</span> e 
              vendas automatizadas que nunca param.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Visual Elements */}
            <div className="relative">
              <div className="relative glass rounded-3xl p-8 animate-float">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center glow-green animate-gentle-glow">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-orbitron font-bold text-green-400">WhatsApp Business API</h3>
                    <p className="text-muted-foreground">Integração Oficial</p>
                  </div>
                </div>
                
                {/* Mock conversation preview */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-end">
                    <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs">
                      Oi! Gostaria de saber sobre seus produtos
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="glass rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs border border-primary/30">
                      Olá! 👋 Sou a IA da empresa. Posso te ajudar com informações sobre produtos, preços e até processar seu pedido!
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-green-500 text-white rounded-2xl rounded-tr-sm px-4 py-2 max-w-xs">
                      Perfeito! Quero fazer um orçamento
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="glass rounded-2xl rounded-tl-sm px-4 py-2 max-w-xs border border-primary/30">
                      Excelente! Vou te enviar nosso formulário inteligente...
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Online agora</span>
                  </span>
                  <span>Resposta em menos de 2s</span>
                </div>
              </div>

              {/* Floating stats */}
              <div className="absolute -top-6 -right-6 glass rounded-2xl p-4 animate-orbital-motion">
                <div className="text-center">
                  <div className="text-2xl font-orbitron font-bold text-green-400">98%</div>
                  <div className="text-xs text-muted-foreground">Satisfação</div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 animate-matrix-drift">
                <div className="text-center">
                  <div className="text-2xl font-orbitron font-bold text-emerald-400">24/7</div>
                  <div className="text-xs text-muted-foreground">Disponível</div>
                </div>
              </div>
            </div>

            {/* Right side - Features and Benefits */}
            <div className="space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                  <Clock className="w-8 h-8 text-green-400 mx-auto mb-3" />
                  <div className="text-2xl font-orbitron font-bold text-green-400">-80%</div>
                  <div className="text-sm text-muted-foreground">Tempo de Resposta</div>
                </div>
                
                <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                  <Users className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
                  <div className="text-2xl font-orbitron font-bold text-emerald-400">+200%</div>
                  <div className="text-sm text-muted-foreground">Conversões</div>
                </div>
                
                <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                  <TrendingUp className="w-8 h-8 text-teal-400 mx-auto mb-3" />
                  <div className="text-2xl font-orbitron font-bold text-teal-400">+150%</div>
                  <div className="text-sm text-muted-foreground">Vendas</div>
                </div>
                
                <div className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                  <div className="text-2xl font-orbitron font-bold text-yellow-400">4.9/5</div>
                  <div className="text-sm text-muted-foreground">Avaliação</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-2xl font-orbitron font-bold text-green-400">Principais Funcionalidades:</h4>
                
                <div className="space-y-3">
                  {[
                    "Processamento de Linguagem Natural avançado",
                    "Integração completa com WhatsApp Business API",
                    "Fluxos de conversa personalizáveis e inteligentes",
                    "Escalação automática para atendimento humano",
                    "Analytics detalhados e relatórios em tempo real",
                    "Suporte a múltiplos idiomas e contextos"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <FuturisticButton 
                  variant="primary" 
                  size="lg" 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 flex-1"
                  onClick={() => setIsFormOpen(true)}
                >
                  Quero Meu Bot IA
                  <Bot className="ml-2 w-5 h-5" />
                </FuturisticButton>
                
                <FuturisticButton 
                  variant="outline" 
                  size="lg"
                  className="border-green-500/50 text-green-400 hover:bg-green-500/10 flex-1"
                  onClick={() => {
                    const whatsappService = services.find(s => s.title === "Automação WhatsApp com IA");
                    setSelectedService(whatsappService);
                    setIsServiceModalOpen(true);
                  }}
                >
                  Ver Detalhes
                  <ArrowRight className="ml-2 w-5 h-5" />
                </FuturisticButton>
              </div>
            </div>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 animate-float opacity-60">
            <MessageCircle className="w-12 h-12 text-green-400" />
          </div>
          <div className="absolute bottom-20 right-10 animate-orbital-motion opacity-60">
            <Bot className="w-16 h-16 text-emerald-400" />
          </div>
          <div className="absolute top-1/2 right-20 animate-matrix-drift opacity-40">
            <Zap className="w-10 h-10 text-teal-400" />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => <div key={service.title} className="group glass rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 animate-fade-scale" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center glow-primary group-hover:scale-110 transition-transform duration-300`}>
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-orbitron font-bold group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground">{service.subtitle}</p>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.features.map(feature => <div key={feature} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>)}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-border">
                    <div className="text-xl font-semibold text-primary">
                      {service.price}
                    </div>
                    <FuturisticButton variant="outline" size="sm" onClick={() => {
                  setSelectedService(service);
                  setIsServiceModalOpen(true);
                }}>
                      Saiba Mais
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </FuturisticButton>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
              Nosso Processo
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Uma metodologia comprovada que garante resultados excepcionais
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {process.map((item, index) => <div key={item.step} className="relative text-center space-y-4 animate-fade-scale" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-full glass flex items-center justify-center text-2xl font-orbitron font-bold text-primary glow-primary">
                    {item.step}
                  </div>
                  {index < process.length - 1 && <div className="hidden lg:block absolute top-1/2 left-full w-full h-px bg-gradient-to-r from-primary/50 to-transparent transform -translate-y-1/2" />}
                </div>
                
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>)}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
              Tecnologias que Dominamos
            </h2>
            <p className="text-xl text-muted-foreground">
              Sempre atualizados com as mais recentes inovações
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {["React", "Vue.js", "Angular", "Node.js", "Python", "Flutter", "AWS", "Docker", "GraphQL", "MongoDB", "PostgreSQL", "Redis", "Kubernetes", "TensorFlow", "Firebase", "Next.js"].map((tech, index) => <div key={tech} className="glass p-4 rounded-xl text-center hover:scale-105 hover:border-primary/50 transition-all duration-300 animate-fade-scale" style={{
            animationDelay: `${index * 0.05}s`
          }}>
                <div className="text-sm font-medium">{tech}</div>
              </div>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
            Pronto para Começar?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Vamos discutir seu projeto e criar uma solução personalizada 
            que supere suas expectativas.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <FuturisticButton variant="primary" size="lg" glow onClick={() => setIsFormOpen(true)}>
              <Zap className="mr-2 w-5 h-5" />
              Solicitar Orçamento
            </FuturisticButton>
            
            <FuturisticButton variant="outline" size="lg" onClick={() => {
            const phoneNumber = "5564998904033";
            const message = "Olá! Gostaria de falar com um especialista sobre os serviços da Codify.";
            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
          }}>
              Falar com Especialista
            </FuturisticButton>
          </div>
        </div>
      </section>

      <ProjectCaptureForm open={isFormOpen} onOpenChange={setIsFormOpen} />

      <ServiceDetailModal service={selectedService} open={isServiceModalOpen} onOpenChange={setIsServiceModalOpen} onContactClick={() => {
      setIsServiceModalOpen(false);
      setIsFormOpen(true);
    }} />
    </div>;
};
export default Services;