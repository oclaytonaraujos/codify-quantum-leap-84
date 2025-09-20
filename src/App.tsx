import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "@/components/Header";
import EnhancedFooter from "@/components/EnhancedFooter";
import FloatingActionButton from "@/components/FloatingActionButton";
import WhatsAppButton from "@/components/WhatsAppButton";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnalyticsTracker from "@/components/Analytics";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import ErrorBoundary from "@/components/ErrorBoundary";
import SEOOptimizer from "@/components/SEOOptimizer";
import { PageComponents } from "@/components/LoadingOptimizer";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <SEOOptimizer />
          <AnalyticsTracker />
          <PerformanceMonitor />
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={
              <div className="min-h-screen flex flex-col">
                <Header />
                <Breadcrumbs />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<PageComponents.Home />} />
                    <Route path="/sobre" element={<PageComponents.About />} />
                    <Route path="/servicos" element={<PageComponents.Services />} />
                    <Route path="/portfolio" element={<PageComponents.Portfolio />} />
                    <Route path="/blog" element={<PageComponents.Blog />} />
                    <Route path="/contato" element={<PageComponents.Contact />} />
                    <Route path="/solicitar-orcamento" element={<PageComponents.Quote />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <EnhancedFooter />
        <FloatingActionButton />
        <WhatsAppButton />
              </div>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
