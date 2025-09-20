import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { X, Send, User, Mail, Phone, Building, Globe, Smartphone, Palette, Brain, Cloud, Code } from "lucide-react";

const projectCaptureSchema = z.object({
  // Informações pessoais
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  company: z.string().optional(),
  
  // Detalhes do projeto
  projectTitle: z.string().min(3, "Título do projeto deve ter pelo menos 3 caracteres"),
  projectType: z.string().min(1, "Selecione o tipo de projeto"),
  projectDescription: z.string().min(50, "Descrição deve ter pelo menos 50 caracteres"),
  
  // Escopo e funcionalidades
  features: z.array(z.string()).min(1, "Selecione pelo menos uma funcionalidade"),
  platforms: z.array(z.string()).min(1, "Selecione pelo menos uma plataforma"),
  
  // Orçamento e prazo
  budget: z.string().min(1, "Selecione uma faixa de orçamento"),
  timeline: z.string().min(1, "Selecione um prazo"),
  
  // Informações adicionais
  hasExistingBrand: z.string().min(1, "Responda se possui identidade visual"),
  additionalInfo: z.string().optional(),
  preferredContact: z.string().min(1, "Selecione uma forma de contato preferida"),
});

type ProjectCaptureForm = z.infer<typeof projectCaptureSchema>;

interface ProjectCaptureFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ProjectCaptureFormComponent = ({ open, onOpenChange }: ProjectCaptureFormProps) => {

  const form = useForm<ProjectCaptureForm>({
    resolver: zodResolver(projectCaptureSchema),
    defaultValues: {
      features: [],
      platforms: [],
    },
  });

  const projectTypes = [
    { value: "website", label: "Website Institucional", icon: Globe },
    { value: "ecommerce", label: "E-commerce", icon: Building },
    { value: "webapp", label: "Aplicação Web", icon: Code },
    { value: "mobile", label: "App Mobile", icon: Smartphone },
    { value: "design", label: "Design UX/UI", icon: Palette },
    { value: "ai", label: "Projeto com IA", icon: Brain },
    { value: "cloud", label: "Solução em Nuvem", icon: Cloud },
  ];

  const availableFeatures = [
    "Sistema de Login/Cadastro",
    "Painel Administrativo",
    "E-commerce/Vendas Online",
    "Blog/Sistema de Conteúdo",
    "Integração com Redes Sociais",
    "Sistema de Pagamentos",
    "Chat/Messaging",
    "Notificações Push",
    "Geolocalização",
    "Upload de Arquivos",
    "Relatórios e Analytics",
    "API/Integrações",
    "Chatbot/IA",
    "Sistema de Reservas",
    "Multi-idiomas",
  ];

  const platforms = [
    "Web (Desktop)",
    "Mobile (iOS)",
    "Mobile (Android)",
    "Progressive Web App (PWA)",
    "Desktop (Windows/Mac)",
  ];

  const budgetRanges = [
    "Até R$ 5.000",
    "R$ 5.000 - R$ 15.000",
    "R$ 15.000 - R$ 30.000",
    "R$ 30.000 - R$ 50.000",
    "R$ 50.000 - R$ 100.000",
    "Acima de R$ 100.000",
    "Vamos conversar sobre isso",
  ];

  const timelines = [
    "Urgente (até 1 mês)",
    "Rápido (1-2 meses)",
    "Normal (2-4 meses)",
    "Tranquilo (4-6 meses)",
    "Sem pressa (6+ meses)",
    "Flexível",
  ];

  const submitProjectMutation = useMutation({
    mutationFn: async (data: ProjectCaptureForm) => {
      // Transform form data to match database schema
      const projectLeadData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company || null,
        project_title: data.projectTitle,
        project_type: data.projectType,
        project_description: data.projectDescription,
        features: data.features,
        platforms: data.platforms,
        budget: data.budget,
        timeline: data.timeline,
        has_existing_brand: data.hasExistingBrand,
        additional_info: data.additionalInfo || null,
        preferred_contact: data.preferredContact,
        ip_address: null, // Could be populated with actual IP if needed
        user_agent: navigator.userAgent,
      };

      const { data: insertedData, error } = await supabase
        .from('project_leads')
        .insert([projectLeadData])
        .select()
        .single();

      if (error) {
        throw error;
      }

      // Send email notification
      try {
        await supabase.functions.invoke('send-project-notification', {
          body: { projectLeadId: insertedData.id }
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't throw - we still want to show success even if email fails
      }

      return insertedData;
    },
    onSuccess: () => {
      toast({
        title: "Projeto Enviado com Sucesso!",
        description: "Entraremos em contato em até 24 horas para discutir seu projeto.",
      });
      form.reset();
      onOpenChange(false);
    },
    onError: (error: any) => {
      console.error('Error submitting project:', error);
      toast({
        title: "Erro ao Enviar",
        description: "Tente novamente ou entre em contato diretamente pelo WhatsApp.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ProjectCaptureForm) => {
    submitProjectMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-orbitron font-bold holographic flex items-center gap-2">
            <Building className="w-6 h-6" />
            Captação de Projeto
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Preencha os detalhes do seu projeto para recebermos uma proposta personalizada.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Informações Pessoais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Informações Pessoais
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome Completo *</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" type="email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone/WhatsApp *</FormLabel>
                      <FormControl>
                        <Input placeholder="(64) 98990-4033" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Empresa/Organização</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome da empresa (opcional)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Detalhes do Projeto */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Detalhes do Projeto
              </h3>

              <FormField
                control={form.control}
                name="projectTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título do Projeto *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: App de delivery, Site institucional, etc." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Projeto *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo de projeto" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {projectTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <SelectItem key={type.value} value={type.value}>
                              <div className="flex items-center gap-2">
                                <Icon className="w-4 h-4" />
                                {type.label}
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="projectDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descrição Detalhada do Projeto *</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Descreva sua ideia, objetivos, público-alvo e qualquer detalhe importante..." 
                        className="min-h-[120px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Funcionalidades e Plataformas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Escopo do Projeto</h3>
              
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funcionalidades Necessárias *</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {availableFeatures.map((feature) => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value?.includes(feature)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, feature]);
                              } else {
                                field.onChange(field.value?.filter((f) => f !== feature));
                              }
                            }}
                          />
                          <Label className="text-sm cursor-pointer">{feature}</Label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platforms"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Plataformas *</FormLabel>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {platforms.map((platform) => (
                        <div key={platform} className="flex items-center space-x-2">
                          <Checkbox
                            checked={field.value?.includes(platform)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, platform]);
                              } else {
                                field.onChange(field.value?.filter((p) => p !== platform));
                              }
                            }}
                          />
                          <Label className="text-sm cursor-pointer">{platform}</Label>
                        </div>
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Orçamento e Prazo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Orçamento e Prazo</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Faixa de Orçamento *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma faixa" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {budgetRanges.map((range) => (
                            <SelectItem key={range} value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="timeline"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prazo Desejado *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um prazo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {timelines.map((timeline) => (
                            <SelectItem key={timeline} value={timeline}>
                              {timeline}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Informações Adicionais */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informações Adicionais</h3>
              
              <FormField
                control={form.control}
                name="hasExistingBrand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Possui identidade visual/logo? *</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="brand-yes" />
                          <Label htmlFor="brand-yes">Sim, tenho logo e identidade visual completa</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="partial" id="brand-partial" />
                          <Label htmlFor="brand-partial">Tenho apenas logo/algumas ideias</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="brand-no" />
                          <Label htmlFor="brand-no">Não, preciso criar do zero</Label>
                        </div>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferredContact"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Forma de Contato Preferida *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Como prefere ser contatado?" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="phone">Ligação</SelectItem>
                        <SelectItem value="video">Videochamada</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Informações Adicionais</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Referências, inspirações, requisitos específicos ou qualquer outra informação relevante..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="flex-1"
              >
                <X className="mr-2 w-4 h-4" />
                Cancelar
              </Button>
              
              <Button
                type="submit"
                disabled={submitProjectMutation.isPending}
                className="flex-1 bg-primary hover:bg-primary/90"
              >
                {submitProjectMutation.isPending ? (
                  <>Enviando...</>
                ) : (
                  <>
                    <Send className="mr-2 w-4 h-4" />
                    Enviar Projeto
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectCaptureFormComponent;