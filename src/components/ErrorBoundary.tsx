import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import FuturisticButton from './FuturisticButton';
import { analytics } from './Analytics';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
  errorId: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      errorId: ''
    };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to analytics
    analytics.track('error_boundary_triggered', {
      error_message: error.message,
      error_stack: error.stack,
      component_stack: errorInfo.componentStack,
      error_id: this.state.errorId,
      url: window.location.href,
      user_agent: navigator.userAgent,
      timestamp: Date.now()
    });

    // Store error details
    this.setState({
      error,
      errorInfo
    });

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error);
      console.error('Component Stack:', errorInfo.componentStack);
    }
  }

  handleRetry = () => {
    analytics.track('error_boundary_retry', {
      error_id: this.state.errorId
    });
    
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
      errorId: ''
    });
  };

  handleGoHome = () => {
    analytics.track('error_boundary_go_home', {
      error_id: this.state.errorId
    });
    
    window.location.href = '/';
  };

  handleGoBack = () => {
    analytics.track('error_boundary_go_back', {
      error_id: this.state.errorId
    });
    
    window.history.back();
  };

  handleReportError = () => {
    analytics.track('error_boundary_report', {
      error_id: this.state.errorId
    });

    const errorReport = {
      errorId: this.state.errorId,
      message: this.state.error?.message,
      stack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString()
    };

    // Create mailto link with error details
    const subject = encodeURIComponent(`Error Report - ${this.state.errorId}`);
    const body = encodeURIComponent(`
Error Details:
${JSON.stringify(errorReport, null, 2)}

Please describe what you were doing when this error occurred:
[Your description here]
    `);
    
    window.open(`mailto:support@codify.dev.br?subject=${subject}&body=${body}`);
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-dark p-4">
          <div className="max-w-2xl w-full">
            <div className="glass p-8 rounded-3xl text-center space-y-8">
              {/* Error Icon */}
              <div className="relative">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-destructive/20 to-destructive/10 flex items-center justify-center animate-gentle-glow">
                  <AlertTriangle className="w-12 h-12 text-destructive" />
                </div>
                
                {/* Floating particles for visual appeal */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-destructive/30 rounded-full animate-float" />
                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-destructive/20 rounded-full animate-float" style={{ animationDelay: '1s' }} />
              </div>

              {/* Error Message */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl font-orbitron font-bold holographic">
                  Oops! Algo deu errado
                </h1>
                
                <p className="text-lg text-muted-foreground max-w-lg mx-auto">
                  Nossos sistemas detectaram um erro inesperado. Não se preocupe, 
                  nossa equipe foi notificada e está trabalhando para resolver isso.
                </p>

                {/* Error ID for support */}
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted/20 rounded-lg text-sm font-mono">
                  <span className="text-muted-foreground">ID do Erro:</span>
                  <span className="text-primary">{this.state.errorId}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <FuturisticButton 
                  variant="primary" 
                  onClick={this.handleRetry}
                  className="animate-gentle-glow"
                >
                  <RefreshCw className="w-4 h-4" />
                  Tentar Novamente
                </FuturisticButton>

                <FuturisticButton 
                  variant="outline" 
                  onClick={this.handleGoHome}
                >
                  <Home className="w-4 h-4" />
                  Ir para Home
                </FuturisticButton>

                <FuturisticButton 
                  variant="ghost" 
                  onClick={this.handleGoBack}
                >
                  <ArrowLeft className="w-4 h-4" />
                  Voltar
                </FuturisticButton>
              </div>

              {/* Additional Actions */}
              <div className="pt-6 border-t border-border/20">
                <p className="text-sm text-muted-foreground mb-4">
                  Se o problema persistir, você pode nos ajudar reportando este erro.
                </p>
                
                <button
                  onClick={this.handleReportError}
                  className="text-sm text-primary hover:text-primary-glow transition-colors underline"
                >
                  Reportar este erro
                </button>
              </div>

              {/* Development Mode Details */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-8 text-left">
                  <summary className="cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors">
                    Detalhes do Erro (Modo Desenvolvimento)
                  </summary>
                  <div className="mt-4 p-4 bg-muted/10 rounded-lg text-xs font-mono overflow-auto">
                    <div className="text-destructive font-semibold mb-2">
                      {this.state.error.message}
                    </div>
                    <pre className="whitespace-pre-wrap text-muted-foreground">
                      {this.state.error.stack}
                    </pre>
                    {this.state.errorInfo && (
                      <div className="mt-4 border-t border-border/20 pt-4">
                        <div className="font-semibold mb-2">Component Stack:</div>
                        <pre className="whitespace-pre-wrap text-muted-foreground">
                          {this.state.errorInfo.componentStack}
                        </pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>

            {/* Background effects */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-destructive/5 rounded-full blur-3xl animate-gentle-glow" />
              <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-gentle-glow" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  errorBoundaryProps?: Omit<Props, 'children'>
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

export default ErrorBoundary;