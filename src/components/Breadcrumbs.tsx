import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbMap: Record<string, string> = {
    "": "Início",
    "sobre": "Sobre",
    "servicos": "Serviços",
    "portfolio": "Portfólio",
    "blog": "Blog",
    "contato": "Contato",
    "orcamento": "Solicitar Orçamento"
  };

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link 
              to="/" 
              className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-300"
              aria-label="Voltar ao início"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>
          
          {pathnames.map((pathname, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;
            const breadcrumbName = breadcrumbMap[pathname] || pathname;

            return (
              <li key={pathname} className="flex items-center">
                <ChevronRight className="w-4 h-4 mx-2 text-muted-foreground" />
                {isLast ? (
                  <span className="text-primary font-medium" aria-current="page">
                    {breadcrumbName}
                  </span>
                ) : (
                  <Link
                    to={routeTo}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300"
                  >
                    {breadcrumbName}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;