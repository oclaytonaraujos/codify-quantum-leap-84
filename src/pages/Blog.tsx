import { useState } from "react";
import { Calendar, Clock, User, Tag, Search, TrendingUp } from "lucide-react";
import FuturisticButton from "@/components/FuturisticButton";
import BlogPostModal from "@/components/BlogPostModal";
import SEOHead from "@/components/SEOHead";
const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("todos");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tags = [{
    id: "todos",
    label: "Todos",
    count: 24
  }, {
    id: "ia",
    label: "Inteligência Artificial",
    count: 8
  }, {
    id: "web",
    label: "Desenvolvimento Web",
    count: 6
  }, {
    id: "mobile",
    label: "Mobile",
    count: 4
  }, {
    id: "cloud",
    label: "Cloud Computing",
    count: 3
  }, {
    id: "seguranca",
    label: "Segurança",
    count: 3
  }];
  const featuredPost = {
    id: 1,
    title: "O Futuro da Inteligência Artificial no Desenvolvimento de Software",
    excerpt: "Explore como a IA está revolucionando a forma como desenvolvemos software e quais são as tendências para os próximos anos.",
    content: "A inteligência artificial está transformando radicalmente o panorama do desenvolvimento de software. Com ferramentas como GitHub Copilot, ChatGPT e outras soluções baseadas em IA, os desenvolvedores agora têm acesso a assistentes inteligentes que podem gerar código, detectar bugs e otimizar performance de forma automatizada.",
    author: "Alex Rodriguez",
    date: "2024-01-15",
    readTime: "8 min",
    tags: ["IA", "Tecnologia", "Futuro"],
    featured: true,
    trending: true
  };
  const posts = [{
    id: 2,
    title: "Microserviços vs Arquitetura Monolítica: Qual Escolher?",
    excerpt: "Uma análise detalhada das vantagens e desvantagens de cada abordagem arquitetural.",
    content: "A escolha entre microserviços e arquitetura monolítica é uma das decisões mais importantes no desenvolvimento de software moderno. Cada abordagem tem suas vantagens e desvantagens específicas que devem ser consideradas cuidadosamente.",
    author: "Marina Silva",
    date: "2024-01-12",
    readTime: "6 min",
    tags: ["Arquitetura", "Backend", "Microserviços"],
    category: "web"
  }, {
    id: 3,
    title: "Flutter vs React Native: Comparativo Completo 2024",
    excerpt: "Descubra qual framework é melhor para seu próximo projeto mobile.",
    content: "O desenvolvimento mobile multiplataforma ganhou muito destaque nos últimos anos. Flutter e React Native são as duas principais opções disponíveis, cada uma com suas características únicas e casos de uso específicos.",
    author: "Carlos Santos",
    date: "2024-01-10",
    readTime: "10 min",
    tags: ["Mobile", "Flutter", "React Native"],
    category: "mobile"
  }, {
    id: 4,
    title: "Segurança em APIs: Melhores Práticas e Ferramentas",
    excerpt: "Como proteger suas APIs contra ameaças modernas e implementar autenticação robusta.",
    content: "A segurança em APIs é fundamental para proteger dados sensíveis e garantir a integridade dos sistemas. Implementar as melhores práticas de segurança desde o início do desenvolvimento é essencial para evitar vulnerabilidades.",
    author: "Ana Costa",
    date: "2024-01-08",
    readTime: "7 min",
    tags: ["Segurança", "API", "Authentication"],
    category: "seguranca"
  }, {
    id: 5,
    title: "Kubernetes na Prática: Do Zero à Produção",
    excerpt: "Tutorial completo para implementar Kubernetes em ambientes de produção.",
    content: "Kubernetes se tornou o padrão de facto para orquestração de containers. Este guia abrangente mostra como implementar e gerenciar clusters Kubernetes em ambientes de produção com segurança e eficiência.",
    author: "Pedro Lima",
    date: "2024-01-05",
    readTime: "12 min",
    tags: ["Kubernetes", "DevOps", "Cloud"],
    category: "cloud"
  }, {
    id: 6,
    title: "Design Systems: Construindo Consistência Visual",
    excerpt: "Como criar e manter design systems eficazes para produtos digitais.",
    content: "Um design system bem estruturado é a base para criar produtos digitais consistentes e escaláveis. Aprenda as melhores práticas para implementar e manter um design system eficaz em sua organização.",
    author: "Sofia Oliveira",
    date: "2024-01-03",
    readTime: "5 min",
    tags: ["Design", "UI/UX", "Frontend"],
    category: "web"
  }];
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag === "todos" || post.category === selectedTag;
    return matchesSearch && matchesTag;
  });
  const handleOpenPost = post => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };
  return <div className="min-h-screen">
      <SEOHead title="Blog Codify | Notícias e Artigos sobre Desenvolvimento de Software" description="Fique por dentro das novidades em tecnologia, desenvolvimento de software, transformação digital e tendências do mercado." keywords="blog desenvolvimento software, novidades tecnologia, tendências TI, artigos programação, transformação digital" canonicalUrl="https://codify.dev.br/blog" schema={{
      "@context": "https://schema.org",
      "@type": "Blog",
      "name": "Blog Codify",
      "description": "Insights, tutoriais e tendências sobre tecnologia e desenvolvimento de software.",
      "url": "https://codify.dev.br/blog"
    }} />
      {/* Hero Section */}
      <section className="py-20 animated-bg">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-orbitron font-bold mb-8 holographic animate-slide-up">Blog Técnico</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-slide-up animate-delay-100">
            Insights, tutoriais e tendências sobre tecnologia e desenvolvimento 
            de software para manter você sempre atualizado.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16">
            <h2 className="text-3xl font-orbitron font-bold mb-8 holographic text-center">
              Post em Destaque
            </h2>
            
            <div className="glass rounded-3xl overflow-hidden hover:scale-[1.01] transition-all duration-500 animate-fade-scale">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="aspect-video lg:aspect-square bg-gradient-primary p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="text-8xl font-orbitron font-bold text-white/20">IA</div>
                  <div className="absolute top-4 right-4 flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <TrendingUp className="w-4 h-4 text-white" />
                    <span className="text-white text-sm font-medium">Trending</span>
                  </div>
                </div>
                
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredPost.tags.map(tag => <span key={tag} className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30">
                        {tag}
                      </span>)}
                  </div>
                  
                  <h3 className="text-3xl font-bold mb-4 hover:text-primary transition-colors duration-300">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{featuredPost.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(featuredPost.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <FuturisticButton variant="primary" size="lg" onClick={() => handleOpenPost(featuredPost)}>
                    Ler Artigo Completo
                  </FuturisticButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-gradient-dark">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type="text" placeholder="Buscar artigos..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 glass rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground" />
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3">
              {tags.map(tag => <button key={tag.id} onClick={() => setSelectedTag(tag.id)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedTag === tag.id ? "bg-primary text-white glow-primary" : "glass text-muted-foreground hover:text-primary hover:border-primary/50"}`}>
                  {tag.label} ({tag.count})
                </button>)}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => <article key={post.id} className="group glass rounded-2xl overflow-hidden hover:scale-105 transition-all duration-500 cursor-pointer animate-fade-scale" style={{
            animationDelay: `${index * 0.1}s`
          }} onClick={() => handleOpenPost(post)}>
                <div className="aspect-video bg-gradient-secondary p-6 flex items-center justify-center relative overflow-hidden">
                  <div className="text-4xl font-orbitron font-bold text-white/30">
                    {post.title.split(' ')[0].slice(0, 3)}
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map(tag => <span key={tag} className="px-2 py-1 text-xs font-medium bg-secondary/20 text-secondary rounded">
                        <Tag className="w-3 h-3 inline mr-1" />
                        {tag}
                      </span>)}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </article>)}
          </div>

          {filteredPosts.length === 0 && <div className="text-center py-16">
              <Search className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Nenhum artigo encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar sua busca ou selecionar uma categoria diferente
              </p>
            </div>}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6 holographic">
            Receba as Novidades
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Assine nossa newsletter e receba artigos exclusivos sobre tecnologia 
            e desenvolvimento diretamente no seu e-mail.
          </p>
          
          <div className="max-w-md mx-auto flex gap-4">
            <input type="email" placeholder="Seu melhor e-mail" className="flex-1 px-4 py-3 glass rounded-full border-0 focus:outline-none focus:ring-2 focus:ring-primary/50 text-foreground placeholder-muted-foreground" />
            <FuturisticButton variant="primary" size="md">
              Assinar
            </FuturisticButton>
          </div>
        </div>
      </section>

      {/* Blog Post Modal */}
      <BlogPostModal post={selectedPost} open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>;
};
export default Blog;