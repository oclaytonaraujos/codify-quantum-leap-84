import { useState } from "react";

const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const techCategories = {
    frontend: {
      title: "Frontend",
      icon: "🎨",
      technologies: [
        { name: "React", icon: "⚛️", description: "Biblioteca JavaScript para UIs" },
        { name: "Next.js", icon: "▲", description: "Framework React fullstack" },
        { name: "TypeScript", icon: "📘", description: "JavaScript tipado" },
        { name: "Tailwind CSS", icon: "🎨", description: "Framework CSS utilitário" },
        { name: "Vue.js", icon: "💚", description: "Framework progressivo" },
        { name: "Angular", icon: "🔺", description: "Plataforma de desenvolvimento" }
      ]
    },
    backend: {
      title: "Backend",
      icon: "🛠️",
      technologies: [
        { name: "Node.js", icon: "💚", description: "Runtime JavaScript" },
        { name: "Python", icon: "🐍", description: "Linguagem versátil" },
        { name: "Java", icon: "☕", description: "Linguagem enterprise" },
        { name: "PostgreSQL", icon: "🐘", description: "Banco relacional" },
        { name: "MongoDB", icon: "🍃", description: "Banco NoSQL" },
        { name: "Redis", icon: "📦", description: "Cache em memória" }
      ]
    },
    mobile: {
      title: "Mobile",
      icon: "📱",
      technologies: [
        { name: "React Native", icon: "📱", description: "Apps nativos multiplataforma" },
        { name: "Flutter", icon: "🦋", description: "SDK da Google" },
        { name: "Swift", icon: "🍎", description: "Linguagem iOS" },
        { name: "Kotlin", icon: "🤖", description: "Linguagem Android" },
        { name: "Expo", icon: "⚡", description: "Plataforma React Native" },
        { name: "Xamarin", icon: "💙", description: "Framework Microsoft" }
      ]
    },
    cloud: {
      title: "Cloud & DevOps",
      icon: "☁️",
      technologies: [
        { name: "AWS", icon: "☁️", description: "Amazon Web Services" },
        { name: "Azure", icon: "🔷", description: "Microsoft Cloud" },
        { name: "Docker", icon: "🐳", description: "Containerização" },
        { name: "Kubernetes", icon: "⚓", description: "Orquestração" },
        { name: "Terraform", icon: "🏗️", description: "Infrastructure as Code" },
        { name: "GitHub Actions", icon: "🔄", description: "CI/CD" }
      ]
    }
  };

  return (
    <section className="py-12 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
            Stack Tecnológico
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Utilizamos as tecnologias mais modernas e confiáveis do mercado para 
            entregar soluções robustas e escaláveis.
          </p>
        </div>

        {/* Category selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(techCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeCategory === key
                  ? 'bg-primary text-primary-foreground glow-primary'
                  : 'cyber-glass text-muted-foreground hover:text-primary hover:border-primary/50'
              }`}
            >
              <span className="mr-2">{category.icon}</span>
              {category.title}
            </button>
          ))}
        </div>

        {/* Technology grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4 md:gap-6">
          {techCategories[activeCategory as keyof typeof techCategories].technologies.map((tech, index) => (
            <div
              key={tech.name}
              className="group cyber-glass p-6 rounded-xl hover-glow transition-all duration-500 animate-fade-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center space-x-4 mb-4">
                <div className="text-3xl">{tech.icon}</div>
                <div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {tech.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {tech.description}
                  </p>
                </div>
              </div>
              
              {/* Progress indicator */}
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-gradient-primary h-2 rounded-full transition-all duration-1000 group-hover:w-full"
                  style={{ width: `${85 + Math.random() * 15}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom message */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground">
            E muito mais! Nossa equipe está sempre atualizada com as últimas tendências tecnológicas.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TechStack;