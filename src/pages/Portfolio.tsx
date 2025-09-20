import { useState } from "react";
import { ExternalLink, Github, Filter } from "lucide-react";
import FuturisticButton from "@/components/FuturisticButton";
import ProjectCaptureForm from "@/components/ProjectCaptureForm";
import SEOHead from "@/components/SEOHead";
const Portfolio = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("todos");
  const filters = [{
    id: "todos",
    label: "Todos"
  }, {
    id: "web",
    label: "Web"
  }, {
    id: "mobile",
    label: "Mobile"
  }, {
    id: "ai",
    label: "IA"
  }, {
    id: "design",
    label: "Design"
  }];
  const projects = [{
    id: 1,
    title: "EcoTech Platform",
    category: "web",
    tags: ["React", "Node.js", "MongoDB"],
    description: "Plataforma de monitoramento ambiental com dashboard em tempo real e alertas inteligentes.",
    image: "/api/placeholder/600/400",
    liveUrl: "https://ecotech-platform.vercel.app",
    githubUrl: "https://github.com/usuario/ecotech-platform",
    featured: true
  }, {
    id: 2,
    title: "FinanceAI Mobile",
    category: "mobile",
    tags: ["React Native", "AI", "Firebase"],
    description: "App de gestão financeira com IA para análise de gastos e recomendações personalizadas.",
    image: "/api/placeholder/600/400",
    liveUrl: "https://financeai-demo.netlify.app",
    githubUrl: "https://github.com/usuario/financeai-mobile",
    featured: true
  }, {
    id: 3,
    title: "Neural Vision",
    category: "ai",
    tags: ["Python", "TensorFlow", "OpenCV"],
    description: "Sistema de visão computacional para análise e classificação automática de imagens.",
    image: "/api/placeholder/600/400",
    liveUrl: "https://neural-vision.herokuapp.com",
    githubUrl: "https://github.com/usuario/neural-vision",
    featured: false
  }, {
    id: 4,
    title: "Quantum UI Kit",
    category: "design",
    tags: ["Figma", "Design System", "Components"],
    description: "Kit de design futurista com componentes reutilizáveis e sistema de cores neon.",
    image: "/api/placeholder/600/400",
    liveUrl: "https://quantum-ui-kit.surge.sh",
    githubUrl: "https://github.com/usuario/quantum-ui-kit",
    featured: false
  }, {
    id: 5,
    title: "CloudSync Dashboard",
    category: "web",
    tags: ["Vue.js", "GraphQL", "AWS"],
    description: "Dashboard administrativo para gerenciamento de infraestrutura cloud em tempo real.",
    image: "/api/placeholder/600/400",
    liveUrl: "https://cloudsync-dashboard.aws-amplify.com",
    githubUrl: "https://github.com/usuario/cloudsync-dashboard",
    featured: false
  }, {
    id: 6,
    title: "MediCore App",
    category: "mobile",
    tags: ["Flutter", "Firebase", "HealthKit"],
    description: "Aplicativo médico para monitoramento de pacientes e telemedicina.",
    image: "/api/placeholder/600/400",
    liveUrl: "https://medicore-app.firebase.app",
    githubUrl: "https://github.com/usuario/medicore-app",
    featured: true
  }];
  const filteredProjects = activeFilter === "todos" ? projects : projects.filter(project => project.category === activeFilter);
  const featuredProjects = projects.filter(project => project.featured);
  return <div className="min-h-screen">
      <SEOHead title="Portfólio Codify | Projetos de Software Personalizado" description="Veja nossos projetos e cases de sucesso em desenvolvimento de software, aplicativos e soluções digitais para diversos setores." keywords="portfólio de software, projetos de desenvolvimento, cases Codify, sistemas web, apps, soluções digitais" canonicalUrl="https://codify.dev.br/portfolio" schema={{
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Portfólio Codify",
      "description": "Explore nossa coleção de projetos inovadores que demonstram nossa expertise em tecnologias futuristas.",
      "url": "https://codify.dev.br/portfolio"
    }} />
      {/* Hero Section */}
      <section className="py-20 animated-bg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-8 holographic animate-slide-up">Portfólio de Projetos</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-100">Explore nossa coleção de projetos inovadores que demonstram nossa expertise em tecnologias futuristas Codify.</p>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
              Projetos em Destaque
            </h2>
            <p className="text-xl text-muted-foreground">
              Nossos trabalhos mais impactantes e inovadores
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {featuredProjects.slice(0, 2).map((project, index) => <div key={project.id} className="group glass rounded-3xl overflow-hidden hover:scale-[1.02] transition-all duration-500 animate-fade-scale" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="aspect-video bg-gradient-primary p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="text-6xl font-orbitron font-bold text-white/20">
                    {project.title.slice(0, 2)}
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => <span key={tag} className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
                        {tag}
                      </span>)}
                  </div>
                  
                  <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex space-x-4">
                    <FuturisticButton variant="primary" size="sm" onClick={() => window.open(project.liveUrl, '_blank')}>
                      <ExternalLink className="mr-2 w-4 h-4" />
                      Ver Projeto
                    </FuturisticButton>
                    <FuturisticButton variant="outline" size="sm" onClick={() => window.open(project.githubUrl, '_blank')}>
                      <Github className="mr-2 w-4 h-4" />
                      Código
                    </FuturisticButton>
                  </div>
                </div>
              </div>)}
          </div>
        </div>
      </section>

      {/* All Projects */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
              Todos os Projetos
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              Filtre por categoria para encontrar projetos específicos
            </p>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filters.map(filter => <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeFilter === filter.id ? "bg-primary text-white glow-primary" : "glass text-muted-foreground hover:text-primary hover:border-primary/50"}`}>
                  {filter.label}
                </button>)}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => <div key={project.id} className="group glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 animate-fade-scale" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="aspect-video bg-gradient-secondary p-6 flex items-center justify-center relative overflow-hidden">
                  <div className="text-4xl font-orbitron font-bold text-white/30">
                    {project.title.slice(0, 3)}
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  
                  {/* Overlay with actions */}
                  <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button className="p-3 rounded-full glass text-white hover:text-primary transition-colors duration-300" onClick={() => window.open(project.liveUrl, '_blank')} title="Ver Projeto">
                      <ExternalLink className="w-5 h-5" />
                    </button>
                    <button className="p-3 rounded-full glass text-white hover:text-primary transition-colors duration-300" onClick={() => window.open(project.githubUrl, '_blank')} title="Ver Código">
                      <Github className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.slice(0, 2).map(tag => <span key={tag} className="px-2 py-1 text-xs font-medium bg-secondary/20 text-secondary rounded">
                        {tag}
                      </span>)}
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {project.description.slice(0, 100)}...
                  </p>
                </div>
              </div>)}
          </div>

          {filteredProjects.length === 0 && <div className="text-center py-16">
              <Filter className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum projeto encontrado</h3>
              <p className="text-muted-foreground">
                Tente selecionar uma categoria diferente
              </p>
            </div>}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
            Tem um Projeto em Mente?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Vamos criar algo extraordinário juntos. Entre em contato e 
            transforme sua ideia em realidade digital.
          </p>
          
          <FuturisticButton variant="primary" size="lg" glow onClick={() => setIsFormOpen(true)}>
            Iniciar Projeto
          </FuturisticButton>
        </div>
      </section>

      <ProjectCaptureForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>;
};
export default Portfolio;