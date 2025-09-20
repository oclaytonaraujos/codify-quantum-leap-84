import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { 
  Lock, 
  Settings, 
  Users, 
  Briefcase, 
  Code, 
  FolderOpen,
  Folder,
  FileText,
  MessageSquare,
  UserCheck,
  PlusCircle,
  Eye,
  EyeOff,
  Save,
  Edit,
  Trash2,
  Shield
} from "lucide-react";
import FuturisticButton from "@/components/FuturisticButton";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Data states
  const [teamMembers, setTeamMembers] = useState([]);
  const [services, setServices] = useState([]);
  const [technologies, setTechnologies] = useState([]);
  const [projectCategories, setProjectCategories] = useState([]);
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [blogCategories, setBlogCategories] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [clients, setClients] = useState([]);
  const [clientProjects, setClientProjects] = useState([]);

  // Form states
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});

  const verifyPassword = async (inputPassword: string) => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'admin_password')
        .single();

      if (error) throw error;
      return data.setting_value === inputPassword;
    } catch (error) {
      console.error('Erro ao verificar senha:', error);
      return false;
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    try {
      const isValid = await verifyPassword(password);
      if (isValid) {
        setIsAuthenticated(true);
        loadAllData();
        toast({
          title: "Acesso autorizado",
          description: "Bem-vindo ao painel administrativo!",
        });
      } else {
        toast({
          title: "Senha incorreta",
          description: "Verifique sua senha e tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao fazer login. Tente novamente.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  const changePassword = async () => {
    if (!newPassword || newPassword.length < 6) {
      toast({
        title: "Senha inválida",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }

    try {
      const isCurrentValid = await verifyPassword(currentPassword);
      if (!isCurrentValid) {
        toast({
          title: "Senha atual incorreta",
          description: "Verifique sua senha atual e tente novamente.",
          variant: "destructive",
        });
        return;
      }

      const { error } = await supabase
        .from('admin_settings')
        .update({ setting_value: newPassword })
        .eq('setting_key', 'admin_password');

      if (error) throw error;

      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso!",
      });
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao alterar senha. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  const loadAllData = async () => {
    try {
      // Carregar membros da equipe
      const { data: teamData } = await supabase.from('team_members').select('*').order('order_index');
      setTeamMembers(teamData || []);

      // Carregar serviços
      const { data: servicesData } = await supabase.from('services').select('*').order('order_index');
      setServices(servicesData || []);

      // Carregar tecnologias
      const { data: techData } = await supabase.from('technologies').select('*').order('category, order_index');
      setTechnologies(techData || []);

      // Carregar categorias de projetos
      const { data: projCatData } = await supabase.from('project_categories').select('*').order('order_index');
      setProjectCategories(projCatData || []);

      // Carregar projetos do portfólio
      const { data: portfolioData } = await supabase
        .from('portfolio_projects')
        .select('*, project_categories(name)')
        .order('order_index');
      setPortfolioProjects(portfolioData || []);

      // Carregar categorias do blog
      const { data: blogCatData } = await supabase.from('blog_categories').select('*').order('order_index');
      setBlogCategories(blogCatData || []);

      // Carregar posts do blog
      const { data: blogData } = await supabase
        .from('blog_posts')
        .select('*, blog_categories(name)')
        .order('created_at DESC');
      setBlogPosts(blogData || []);

      // Carregar clientes
      const { data: clientsData } = await supabase.from('clients').select('*').order('created_at DESC');
      setClients(clientsData || []);

      // Carregar projetos de clientes
      const { data: clientProjectsData } = await supabase
        .from('client_projects')
        .select('*, clients(name, company)')
        .order('created_at DESC');
      setClientProjects(clientProjectsData || []);

    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      toast({
        title: "Erro",
        description: "Erro ao carregar dados. Recarregue a página.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center animated-bg">
        <Card className="w-full max-w-md p-8 glass">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center mb-6 glow-primary">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-orbitron font-bold holographic mb-2">
              Admin Access
            </h1>
            <p className="text-muted-foreground">
              Digite a senha para acessar o painel administrativo
            </p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <FuturisticButton
              onClick={handleLogin}
              disabled={!password || loading}
              className="w-full"
              variant="primary"
              size="lg"
            >
              <Lock className="w-5 h-5 mr-2" />
              {loading ? "Verificando..." : "Acessar Painel"}
            </FuturisticButton>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-orbitron font-bold holographic mb-4">
            Painel Administrativo
          </h1>
          <p className="text-muted-foreground text-lg">
            Gerencie todo o conteúdo do site em um só lugar
          </p>
        </div>

        <Tabs defaultValue="settings" className="space-y-8">
          <TabsList className="grid grid-cols-5 lg:grid-cols-10 gap-2 h-auto p-2">
            <TabsTrigger value="settings" className="flex flex-col items-center gap-2 p-4">
              <Settings className="w-5 h-5" />
              <span className="text-xs">Config</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex flex-col items-center gap-2 p-4">
              <Users className="w-5 h-5" />
              <span className="text-xs">Equipe</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex flex-col items-center gap-2 p-4">
              <Briefcase className="w-5 h-5" />
              <span className="text-xs">Serviços</span>
            </TabsTrigger>
            <TabsTrigger value="technologies" className="flex flex-col items-center gap-2 p-4">
              <Code className="w-5 h-5" />
              <span className="text-xs">Techs</span>
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="flex flex-col items-center gap-2 p-4">
              <FolderOpen className="w-5 h-5" />
              <span className="text-xs">Portfolio</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex flex-col items-center gap-2 p-4">
              <Folder className="w-5 h-5" />
              <span className="text-xs">Categorias</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex flex-col items-center gap-2 p-4">
              <FileText className="w-5 h-5" />
              <span className="text-xs">Blog</span>
            </TabsTrigger>
            <TabsTrigger value="posts" className="flex flex-col items-center gap-2 p-4">
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">Posts</span>
            </TabsTrigger>
            <TabsTrigger value="clients" className="flex flex-col items-center gap-2 p-4">
              <UserCheck className="w-5 h-5" />
              <span className="text-xs">Clientes</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex flex-col items-center gap-2 p-4">
              <Briefcase className="w-5 h-5" />
              <span className="text-xs">Projetos</span>
            </TabsTrigger>
          </TabsList>

          {/* Configurações */}
          <TabsContent value="settings">
            <Card className="p-6 glass">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <Settings className="w-6 h-6" />
                Configurações do Sistema
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Alterar Senha Administrativa</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                    <Input
                      type="password"
                      placeholder="Senha atual"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    <Input
                      type="password"
                      placeholder="Nova senha"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <FuturisticButton
                    onClick={changePassword}
                    disabled={!currentPassword || !newPassword}
                    className="mt-4"
                    variant="secondary"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Alterar Senha
                  </FuturisticButton>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Membros da Equipe */}
          <TabsContent value="team">
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Membros da Equipe ({teamMembers.length})
                </h2>
                <FuturisticButton variant="primary">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Adicionar Membro
                </FuturisticButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="p-4 glass">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold">{member.name}</h3>
                      <div className="flex items-center gap-2">
                        <Switch checked={member.active} />
                        <button className="text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{member.position}</p>
                    {member.bio && (
                      <p className="text-xs text-muted-foreground line-clamp-2">{member.bio}</p>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Serviços */}
          <TabsContent value="services">
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Briefcase className="w-6 h-6" />
                  Serviços ({services.length})
                </h2>
                <FuturisticButton variant="primary">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Adicionar Serviço
                </FuturisticButton>
              </div>

              <div className="space-y-4">
                {services.map((service) => (
                  <Card key={service.id} className="p-4 glass">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{service.title}</h3>
                          <Badge variant={service.active ? "default" : "secondary"}>
                            {service.active ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{service.subtitle}</p>
                        <p className="text-sm line-clamp-2">{service.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Switch checked={service.active} />
                        <button className="text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-destructive hover:text-destructive/80">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Tecnologias */}
          <TabsContent value="technologies">
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Code className="w-6 h-6" />
                  Tecnologias ({technologies.length})
                </h2>
                <FuturisticButton variant="primary">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Adicionar Tecnologia
                </FuturisticButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technologies.map((tech) => (
                  <Card key={tech.id} className="p-4 glass">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{tech.name}</h3>
                        <p className="text-sm text-muted-foreground">{tech.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={tech.active} />
                        <button className="text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Nível: {tech.proficiency_level}/5</span>
                      <span>{tech.years_experience} anos</span>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Portfolio */}
          <TabsContent value="portfolio">
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <FolderOpen className="w-6 h-6" />
                  Projetos do Portfólio ({portfolioProjects.length})
                </h2>
                <FuturisticButton variant="primary">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Adicionar Projeto
                </FuturisticButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portfolioProjects.map((project) => (
                  <Card key={project.id} className="p-4 glass">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold">{project.title}</h3>
                          {project.featured && <Badge variant="default">Destaque</Badge>}
                          <Badge variant={project.active ? "default" : "secondary"}>
                            {project.active ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {project.project_categories?.name}
                        </p>
                        <p className="text-sm line-clamp-2">{project.description}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-destructive hover:text-destructive/80">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Categorias */}
          <TabsContent value="categories">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Categorias de Projetos */}
              <Card className="p-6 glass">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Categorias de Projetos</h3>
                  <FuturisticButton variant="primary" size="sm">
                    <PlusCircle className="w-4 h-4" />
                  </FuturisticButton>
                </div>
                <div className="space-y-3">
                  {projectCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 glass rounded-lg">
                      <div>
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">{category.slug}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={category.active} />
                        <button className="text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Categorias do Blog */}
              <Card className="p-6 glass">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Categorias do Blog</h3>
                  <FuturisticButton variant="primary" size="sm">
                    <PlusCircle className="w-4 h-4" />
                  </FuturisticButton>
                </div>
                <div className="space-y-3">
                  {blogCategories.map((category) => (
                    <div key={category.id} className="flex items-center justify-between p-3 glass rounded-lg">
                      <div>
                        <h4 className="font-medium">{category.name}</h4>
                        <p className="text-sm text-muted-foreground">{category.slug}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Switch checked={category.active} />
                        <button className="text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Blog */}
          <TabsContent value="blog">
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <FileText className="w-6 h-6" />
                  Configurações do Blog
                </h2>
              </div>
              <p className="text-muted-foreground">
                Configure as configurações gerais do blog, layouts e SEO.
              </p>
            </Card>
          </TabsContent>

          {/* Posts */}
          <TabsContent value="posts">
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <MessageSquare className="w-6 h-6" />
                  Posts do Blog ({blogPosts.length})
                </h2>
                <FuturisticButton variant="primary">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Novo Post
                </FuturisticButton>
              </div>

              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <Card key={post.id} className="p-4 glass">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{post.title}</h3>
                          {post.featured && <Badge variant="default">Destaque</Badge>}
                          <Badge variant={post.published ? "default" : "secondary"}>
                            {post.published ? "Publicado" : "Rascunho"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Por {post.author} • {post.blog_categories?.name} • {post.read_time} min
                        </p>
                        <p className="text-sm line-clamp-2">{post.excerpt}</p>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-destructive hover:text-destructive/80">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Clientes */}
          <TabsContent value="clients">
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <UserCheck className="w-6 h-6" />
                  Clientes ({clients.length})
                </h2>
                <FuturisticButton variant="primary">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Adicionar Cliente
                </FuturisticButton>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {clients.map((client) => (
                  <Card key={client.id} className="p-4 glass">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold">{client.name}</h3>
                        {client.company && (
                          <p className="text-sm text-muted-foreground">{client.company}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{client.email}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={client.status === 'client' ? 'default' : 'secondary'}>
                          {client.status}
                        </Badge>
                        <button className="text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    {client.industry && (
                      <p className="text-xs text-muted-foreground">{client.industry}</p>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Projetos de Clientes */}
          <TabsContent value="projects">
            <Card className="p-6 glass">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2">
                  <Briefcase className="w-6 h-6" />
                  Projetos de Clientes ({clientProjects.length})
                </h2>
                <FuturisticButton variant="primary">
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Novo Projeto
                </FuturisticButton>
              </div>

              <div className="space-y-4">
                {clientProjects.map((project) => (
                  <Card key={project.id} className="p-4 glass">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg">{project.title}</h3>
                          <Badge variant={
                            project.status === 'completed' ? 'default' :
                            project.status === 'in_progress' ? 'secondary' :
                            'outline'
                          }>
                            {project.status}
                          </Badge>
                          <Badge variant={
                            project.priority === 'urgent' ? 'destructive' :
                            project.priority === 'high' ? 'default' :
                            'outline'
                          }>
                            {project.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Cliente: {project.clients?.name} {project.clients?.company && `(${project.clients.company})`}
                        </p>
                        {project.description && (
                          <p className="text-sm line-clamp-2">{project.description}</p>
                        )}
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          {project.budget_min && project.budget_max && (
                            <span>Orçamento: R$ {project.budget_min} - R$ {project.budget_max}</span>
                          )}
                          {project.timeline && <span>Prazo: {project.timeline}</span>}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <button className="text-muted-foreground hover:text-primary">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="text-destructive hover:text-destructive/80">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;