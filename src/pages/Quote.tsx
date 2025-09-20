import { useState } from "react";
import { 
  Upload, 
  Check, 
  ArrowRight, 
  Calculator,
  Zap,
  Clock,
  Shield,
  Star,
  FileText
} from "lucide-react";
import FuturisticButton from "@/components/FuturisticButton";
import { useToast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";

const Quote = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Project Type
    projectType: "",
    
    // Step 2: Project Details
    name: "",
    email: "",
    company: "",
    phone: "",
    
    // Step 3: Requirements
    budget: "",
    timeline: "",
    description: "",
    features: [] as string[],
    
    // Step 4: Additional Info
    hasDesign: "",
    needsHosting: "",
    additionalInfo: "",
    file: null as File | null
  });

  const projectTypes = [
    {
      id: "website",
      title: "Website / Landing Page",
      description: "Site institucional, landing page ou portfólio",
      icon: "🌐",
      price: "Sob consulta"
    },
    {
      id: "webapp",
      title: "Aplicação Web",
      description: "Sistema web completo com funcionalidades avançadas",
      icon: "💻",
      price: "Sob consulta"
    },
    {
      id: "mobile",
      title: "App Mobile",
      description: "Aplicativo para iOS e/ou Android",
      icon: "📱",
      price: "Sob consulta"
    },
    {
      id: "ecommerce",
      title: "E-commerce",
      description: "Loja virtual completa com pagamentos",
      icon: "🛒",
      price: "Sob consulta"
    },
    {
      id: "api",
      title: "API / Backend",
      description: "Desenvolvimento de APIs e sistemas backend",
      icon: "⚙️",
      price: "Sob consulta"
    },
    {
      id: "custom",
      title: "Projeto Customizado",
      description: "Solução personalizada para suas necessidades",
      icon: "🚀",
      price: "Sob consulta"
    }
  ];

  const budgetRanges = [
    { id: "sob-consulta", label: "Sob consulta", value: "sob-consulta" }
  ];

  const timelineOptions = [
    { id: "asap", label: "Urgente (2-4 semanas)", value: "urgent" },
    { id: "normal", label: "Normal (1-2 meses)", value: "normal" },
    { id: "relaxed", label: "Flexível (2-4 meses)", value: "relaxed" },
    { id: "planned", label: "Planejado (6+ meses)", value: "planned" }
  ];

  const featureOptions = [
    "Sistema de Login/Cadastro",
    "Painel Administrativo",
    "Integração com APIs",
    "Sistema de Pagamento",
    "Chat/Mensagens",
    "Notificações Push",
    "Relatórios e Analytics",
    "Multi-idiomas",
    "Responsivo Mobile",
    "SEO Otimizado"
  ];

  const benefits = [
    {
      icon: Clock,
      title: "Resposta Rápida",
      description: "Orçamento em até 24h"
    },
    {
      icon: Calculator,
      title: "Preço Justo",
      description: "Valores transparentes"
    },
    {
      icon: Shield,
      title: "Sem Compromisso",
      description: "Análise gratuita"
    },
    {
      icon: Star,
      title: "Qualidade Garantida",
      description: "Satisfação 100%"
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature]
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Solicitação enviada com sucesso!",
      description: "Analisaremos seu projeto e retornaremos em breve com um orçamento detalhado."
    });

    // Reset form and go to success step
    setCurrentStep(5);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Solicite um Orçamento para Desenvolvimento de Software | Codify"
        description="Preencha nosso formulário para receber um orçamento personalizado para seu projeto de software sob demanda."
        keywords="orçamento desenvolvimento software, pedido orçamento TI, orçamento personalizado, consultoria software"
        canonicalUrl="https://codify.dev.br/solicitar-orcamento"
        schema={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "name": "Solicitar Orçamento",
          "description": "Conte-nos sobre seu projeto e receba um orçamento personalizado em até 24 horas.",
          "url": "https://codify.dev.br/solicitar-orcamento"
        }}
      />
      {/* Hero Section */}
      <section className="py-20 animated-bg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-8 holographic animate-slide-up">
            Solicite seu Orçamento Personalizado
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-100">
            Conte-nos sobre seu projeto e receba um orçamento personalizado 
            em até 24 horas, sem compromisso.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="text-center space-y-4 glass p-6 rounded-2xl animate-fade-scale"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 mx-auto rounded-full glass flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-center space-x-4 mb-4">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                      step <= currentStep
                        ? "bg-primary text-white glow-primary"
                        : "glass text-muted-foreground"
                    }`}
                  >
                    {step < currentStep ? <Check className="w-5 h-5" /> : step}
                  </div>
                ))}
              </div>
              <div className="w-full bg-muted/20 rounded-full h-2">
                <div
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                />
              </div>
            </div>

            <form onSubmit={handleSubmit} className="glass p-8 lg:p-12 rounded-3xl">
              {/* Step 1: Project Type */}
              {currentStep === 1 && (
                <div className="space-y-8 animate-fade-scale">
                  <div className="text-center">
                    <h2 className="text-3xl font-orbitron font-bold mb-4 holographic">
                      Tipo de Projeto
                    </h2>
                    <p className="text-muted-foreground">
                      Selecione o tipo de projeto que melhor se adequa às suas necessidades
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projectTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                          formData.projectType === type.id
                            ? "border-primary bg-primary/10 glow-primary"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, projectType: type.id }))}
                      >
                        <div className="text-4xl mb-4">{type.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                        <p className="text-muted-foreground text-sm mb-4">{type.description}</p>
                        <p className="text-primary font-semibold">{type.price}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Contact Information */}
              {currentStep === 2 && (
                <div className="space-y-8 animate-fade-scale">
                  <div className="text-center">
                    <h2 className="text-3xl font-orbitron font-bold mb-4 holographic">
                      Suas Informações
                    </h2>
                    <p className="text-muted-foreground">
                      Precisamos de alguns dados para entrar em contato
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nome Completo *</label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">E-mail *</label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="seu@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Empresa</label>
                      <input
                        name="company"
                        type="text"
                        value={formData.company}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="Nome da empresa (opcional)"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Telefone</label>
                      <input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/50"
                        placeholder="(64) 98990-4033"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Project Requirements */}
              {currentStep === 3 && (
                <div className="space-y-8 animate-fade-scale">
                  <div className="text-center">
                    <h2 className="text-3xl font-orbitron font-bold mb-4 holographic">
                      Detalhes do Projeto
                    </h2>
                    <p className="text-muted-foreground">
                      Conte-nos mais sobre suas necessidades e expectativas
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Budget */}
                    <div className="space-y-4">
                      <label className="text-lg font-semibold">Orçamento Previsto</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {budgetRanges.map((budget) => (
                          <div
                            key={budget.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                              formData.budget === budget.value
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, budget: budget.value }))}
                          >
                            <span className="font-medium">{budget.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-4">
                      <label className="text-lg font-semibold">Prazo Desejado</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {timelineOptions.map((timeline) => (
                          <div
                            key={timeline.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                              formData.timeline === timeline.value
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, timeline: timeline.value }))}
                          >
                            <span className="font-medium">{timeline.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4">
                      <label className="text-lg font-semibold">Funcionalidades Desejadas</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {featureOptions.map((feature) => (
                          <div
                            key={feature}
                            className={`p-3 rounded-lg border cursor-pointer transition-all duration-300 ${
                              formData.features.includes(feature)
                                ? "border-secondary bg-secondary/10"
                                : "border-border hover:border-secondary/50"
                            }`}
                            onClick={() => handleFeatureToggle(feature)}
                          >
                            <div className="flex items-center space-x-3">
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                                formData.features.includes(feature)
                                  ? "border-secondary bg-secondary"
                                  : "border-border"
                              }`}>
                                {formData.features.includes(feature) && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <span className="text-sm">{feature}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <label className="text-lg font-semibold">Descrição do Projeto *</label>
                      <textarea
                        name="description"
                        required
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        placeholder="Descreva seu projeto, objetivos e qualquer informação importante..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Additional Information */}
              {currentStep === 4 && (
                <div className="space-y-8 animate-fade-scale">
                  <div className="text-center">
                    <h2 className="text-3xl font-orbitron font-bold mb-4 holographic">
                      Informações Adicionais
                    </h2>
                    <p className="text-muted-foreground">
                      Últimos detalhes para finalizar sua solicitação
                    </p>
                  </div>

                  <div className="space-y-8">
                    {/* Design */}
                    <div className="space-y-4">
                      <label className="text-lg font-semibold">Você já tem um design?</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                          { id: "yes", label: "Sim, tenho design pronto" },
                          { id: "partial", label: "Tenho ideias/referências" },
                          { id: "no", label: "Não, preciso de design" }
                        ].map((option) => (
                          <div
                            key={option.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                              formData.hasDesign === option.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, hasDesign: option.id }))}
                          >
                            <span className="text-sm">{option.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Hosting */}
                    <div className="space-y-4">
                      <label className="text-lg font-semibold">Precisa de hospedagem?</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[
                          { id: "yes", label: "Sim, preciso de hospedagem" },
                          { id: "no", label: "Não, já tenho hospedagem" }
                        ].map((option) => (
                          <div
                            key={option.id}
                            className={`p-4 rounded-lg border cursor-pointer transition-all duration-300 ${
                              formData.needsHosting === option.id
                                ? "border-primary bg-primary/10"
                                : "border-border hover:border-primary/50"
                            }`}
                            onClick={() => setFormData(prev => ({ ...prev, needsHosting: option.id }))}
                          >
                            <span className="text-sm">{option.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* File Upload */}
                    <div className="space-y-4">
                      <label className="text-lg font-semibold">Anexar Arquivo (Opcional)</label>
                      <div className="border-2 border-dashed border-border hover:border-primary/50 rounded-lg p-8 text-center transition-colors duration-300">
                        <input
                          type="file"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                          accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                          <p className="text-muted-foreground">
                            {formData.file 
                              ? `Arquivo selecionado: ${formData.file.name}`
                              : "Clique para anexar briefing, referências ou documentos"
                            }
                          </p>
                          <p className="text-sm text-muted-foreground mt-2">
                            PDF, DOC, TXT, JPG, PNG (máx. 10MB)
                          </p>
                        </label>
                      </div>
                    </div>

                    {/* Additional Info */}
                    <div className="space-y-2">
                      <label className="text-lg font-semibold">Informações Adicionais</label>
                      <textarea
                        name="additionalInfo"
                        rows={3}
                        value={formData.additionalInfo}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 glass rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                        placeholder="Algo mais que gostaria de compartilhar sobre o projeto?"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Success Step */}
              {currentStep === 5 && (
                <div className="text-center space-y-8 animate-fade-scale">
                  <div className="w-24 h-24 mx-auto rounded-full bg-gradient-primary flex items-center justify-center glow-primary">
                    <Check className="w-12 h-12 text-white" />
                  </div>
                  
                  <h2 className="text-3xl font-orbitron font-bold holographic">
                    Solicitação Enviada!
                  </h2>
                  
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                    Recebemos sua solicitação de orçamento. Nossa equipe analisará 
                    seu projeto e retornará em até 24 horas com uma proposta detalhada.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="glass p-6 rounded-2xl">
                      <FileText className="w-8 h-8 mx-auto text-primary mb-4" />
                      <h3 className="font-semibold mb-2">Análise Detalhada</h3>
                      <p className="text-sm text-muted-foreground">
                        Revisaremos todos os detalhes do seu projeto
                      </p>
                    </div>
                    
                    <div className="glass p-6 rounded-2xl">
                      <Calculator className="w-8 h-8 mx-auto text-primary mb-4" />
                      <h3 className="font-semibold mb-2">Orçamento Personalizado</h3>
                      <p className="text-sm text-muted-foreground">
                        Criaremos uma proposta específica para suas necessidades
                      </p>
                    </div>
                    
                    <div className="glass p-6 rounded-2xl">
                      <Zap className="w-8 h-8 mx-auto text-primary mb-4" />
                      <h3 className="font-semibold mb-2">Resposta Rápida</h3>
                      <p className="text-sm text-muted-foreground">
                        Retornaremos em até 24 horas úteis
                      </p>
                    </div>
                  </div>

                  <div className="pt-8">
                    <FuturisticButton 
                      variant="primary" 
                      size="lg"
                      onClick={() => window.location.href = '/'}
                    >
                      Voltar ao Início
                    </FuturisticButton>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              {currentStep < 5 && (
                <div className="flex justify-between pt-8 border-t border-border">
                  <FuturisticButton
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                    className={currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    Voltar
                  </FuturisticButton>

                  {currentStep < 4 ? (
                    <FuturisticButton
                      type="button"
                      variant="primary"
                      onClick={nextStep}
                      disabled={
                        (currentStep === 1 && !formData.projectType) ||
                        (currentStep === 2 && (!formData.name || !formData.email)) ||
                        (currentStep === 3 && (!formData.budget || !formData.timeline || !formData.description))
                      }
                    >
                      Próximo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </FuturisticButton>
                  ) : (
                    <FuturisticButton type="submit" variant="primary" glow>
                      Enviar Solicitação
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </FuturisticButton>
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quote;