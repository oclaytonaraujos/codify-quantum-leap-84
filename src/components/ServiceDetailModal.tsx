import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  ArrowRight, 
  Star, 
  Clock, 
  Users, 
  Target,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";
import FuturisticButton from "@/components/FuturisticButton";

interface ServiceDetail {
  title: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  benefits: string[];
  features: string[];
  techStack: string[];
  timeline: string;
  ideal: string[];
  results: string[];
  gradient: string;
  icon: any;
}

interface ServiceDetailModalProps {
  service: ServiceDetail | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContactClick: () => void;
}

const ServiceDetailModal = ({ service, open, onOpenChange, onContactClick }: ServiceDetailModalProps) => {
  if (!service) return null;

  const Icon = service.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center glow-primary`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <DialogTitle className="text-3xl font-orbitron font-bold holographic">
                {service.title}
              </DialogTitle>
              <DialogDescription className="text-lg text-muted-foreground">
                {service.subtitle}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-8">
          {/* Descrição Detalhada */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Sobre o Serviço
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {service.detailedDescription}
            </p>
          </div>

          {/* Benefícios */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Benefícios da Implantação
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 liquid-glass rounded-lg">
                  <Star className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Funcionalidades Técnicas */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Funcionalidades Incluídas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-secondary flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack Tecnológico */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Tecnologias Utilizadas
            </h3>
            <div className="flex flex-wrap gap-2">
              {service.techStack.map((tech, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          {/* Para quem é ideal */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Ideal Para
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {service.ideal.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Resultados Esperados */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Resultados Esperados
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {service.results.map((result, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/20">
                  <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm leading-relaxed">{result}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" />
              Prazo de Implementação
            </h3>
            <div className="p-4 liquid-glass rounded-lg">
              <p className="text-lg font-medium text-primary">{service.timeline}</p>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
            <FuturisticButton 
              variant="primary" 
              size="lg" 
              glow 
              className="flex-1"
              onClick={onContactClick}
            >
              <ArrowRight className="mr-2 w-5 h-5" />
              Solicitar Orçamento
            </FuturisticButton>
            
            <FuturisticButton 
              variant="outline" 
              size="lg" 
              className="flex-1"
              onClick={() => {
                const phoneNumber = "5564998904033";
                const message = `Olá! Gostaria de saber mais sobre o serviço: ${service.title}`;
                const encodedMessage = encodeURIComponent(message);
                const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
                window.open(whatsappUrl, '_blank');
              }}
            >
              Falar com Especialista
            </FuturisticButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDetailModal;