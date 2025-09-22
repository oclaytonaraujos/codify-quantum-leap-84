import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar, Clock, User, Tag, X, Share2 } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp, FaTelegram } from "react-icons/fa";
import FuturisticButton from "./FuturisticButton";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

interface BlogPostModalProps {
  post: BlogPost | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const BlogPostModal = ({ post, open, onOpenChange }: BlogPostModalProps) => {
  if (!post) return null;

  const shareUrl = window.location.href;
  const shareText = `${post.title} - ${post.excerpt}`;
  
  const socialLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`
  };

  const handleSocialShare = (platform: keyof typeof socialLinks) => {
    window.open(socialLinks[platform], '_blank', 'width=600,height=400');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto liquid-glass border-primary/20">
        <DialogHeader className="space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1 pr-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full border border-primary/30"
                  >
                    <Tag className="w-3 h-3 inline mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
              
              <DialogTitle className="text-3xl font-orbitron font-bold mb-4 holographic leading-tight">
                {post.title}
              </DialogTitle>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString('pt-BR')}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => onOpenChange(false)}
              className="p-2 rounded-full liquid-glass hover:bg-primary/20 transition-colors duration-300"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Featured Image Placeholder */}
          <div className="aspect-video bg-gradient-primary rounded-xl p-8 flex items-center justify-center relative overflow-hidden">
            <div className="text-8xl font-orbitron font-bold text-white/20">
              {post.title.split(' ')[0].slice(0, 2)}
            </div>
          </div>
          
          {/* Post Content */}
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>
            
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>{post.content}</p>
              
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
                Principais Conceitos
              </h2>
              
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Primeiro ponto importante do artigo</li>
                <li>Segundo conceito fundamental</li>
                <li>Terceira consideração técnica</li>
                <li>Implementação prática recomendada</li>
              </ul>
              
              <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">
                Conclusão
              </h2>
              
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                veritatis et quasi architecto beatae vitae dicta sunt explicabo.
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-6 border-t border-primary/20">
            <Popover>
              <PopoverTrigger asChild>
                <FuturisticButton variant="primary">
                  <Share2 className="w-4 h-4" />
                  Compartilhar Artigo
                </FuturisticButton>
              </PopoverTrigger>
              <PopoverContent className="w-80 liquid-glass border-primary/20" align="start">
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-foreground">Compartilhar em:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => handleSocialShare('facebook')}
                      className="flex items-center gap-3 p-3 rounded-lg liquid-glass hover:bg-primary/10 transition-all duration-300 text-left"
                    >
                      <FaFacebook className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium">Facebook</span>
                    </button>
                    <button
                      onClick={() => handleSocialShare('twitter')}
                      className="flex items-center gap-3 p-3 rounded-lg liquid-glass hover:bg-primary/10 transition-all duration-300 text-left"
                    >
                      <FaTwitter className="w-5 h-5 text-blue-400" />
                      <span className="text-sm font-medium">Twitter</span>
                    </button>
                    <button
                      onClick={() => handleSocialShare('linkedin')}
                      className="flex items-center gap-3 p-3 rounded-lg liquid-glass hover:bg-primary/10 transition-all duration-300 text-left"
                    >
                      <FaLinkedin className="w-5 h-5 text-blue-600" />
                      <span className="text-sm font-medium">LinkedIn</span>
                    </button>
                    <button
                      onClick={() => handleSocialShare('whatsapp')}
                      className="flex items-center gap-3 p-3 rounded-lg liquid-glass hover:bg-primary/10 transition-all duration-300 text-left"
                    >
                      <FaWhatsapp className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </button>
                    <button
                      onClick={() => handleSocialShare('telegram')}
                      className="flex items-center gap-3 p-3 rounded-lg liquid-glass hover:bg-primary/10 transition-all duration-300 text-left col-span-2"
                    >
                      <FaTelegram className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium">Telegram</span>
                    </button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            
            <FuturisticButton 
              variant="outline"
              onClick={() => {
                const savedPosts = JSON.parse(localStorage.getItem('savedPosts') || '[]');
                if (!savedPosts.includes(post.id)) {
                  savedPosts.push(post.id);
                  localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
                  // You could add a toast notification here
                }
              }}
            >
              Salvar para Depois
            </FuturisticButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BlogPostModal;