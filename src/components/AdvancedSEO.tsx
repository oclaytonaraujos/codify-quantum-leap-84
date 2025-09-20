import { useEffect } from "react";

interface AdvancedSEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogImage?: string;
  schema?: object;
  breadcrumbs?: Array<{ name: string; url: string }>;
  alternateUrls?: Array<{ lang: string; url: string }>;
  robotsContent?: string;
  priority?: number;
  changeFreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
}

const AdvancedSEO = ({ 
  title, 
  description, 
  keywords, 
  canonicalUrl, 
  ogImage, 
  schema,
  breadcrumbs = [],
  alternateUrls = [],
  robotsContent = "index, follow",
  priority = 0.7,
  changeFreq = 'weekly'
}: AdvancedSEOProps) => {
  useEffect(() => {
    // Basic meta tags
    document.title = title;
    
    // Meta description
    updateMetaTag('name', 'description', description);
    
    // Keywords
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }
    
    // Robots
    updateMetaTag('name', 'robots', robotsContent);
    
    // Canonical URL
    updateLinkTag('rel', 'canonical', 'href', canonicalUrl);
    
    // Open Graph tags
    const ogTags = [
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Codify" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: ogImage || "https://codify.dev.br/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: title },
      { property: "og:locale", content: "pt_BR" }
    ];

    ogTags.forEach(({ property, content }) => {
      updateMetaTag('property', property, content);
    });

    // Twitter Card tags
    const twitterTags = [
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@codifydev" },
      { name: "twitter:creator", content: "@codifydev" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage || "https://codify.dev.br/og-image.png" },
      { name: "twitter:image:alt", content: title }
    ];

    twitterTags.forEach(({ name, content }) => {
      updateMetaTag('name', name, content);
    });

    // Additional SEO meta tags
    const additionalTags = [
      { name: "author", content: "Codify Team" },
      { name: "publisher", content: "Codify" },
      { name: "copyright", content: "© 2024 Codify. Todos os direitos reservados." },
      { name: "language", content: "pt-BR" },
      { name: "geo.region", content: "BR" },
      { name: "geo.country", content: "Brazil" },
      { name: "distribution", content: "global" },
      { name: "rating", content: "general" },
      { name: "referrer", content: "no-referrer-when-downgrade" }
    ];

    additionalTags.forEach(({ name, content }) => {
      updateMetaTag('name', name, content);
    });

    // Alternate language links
    alternateUrls.forEach(({ lang, url }) => {
      updateLinkTag('rel', 'alternate', 'hreflang', lang, url);
    });

    // Breadcrumbs schema
    if (breadcrumbs.length > 0) {
      const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "name": crumb.name,
          "item": crumb.url
        }))
      };
      
      updateSchemaMarkup('breadcrumbs', breadcrumbSchema);
    }

    // Main schema markup
    if (schema) {
      updateSchemaMarkup('main', schema);
    }

    // Organization schema (global)
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Codify",
      "description": "Empresa brasileira especializada em desenvolvimento de software sob demanda e soluções digitais inovadoras",
      "url": "https://codify.dev.br",
      "logo": "https://codify.dev.br/logo.png",
      "image": "https://codify.dev.br/og-image.png",
      "sameAs": [
        "https://github.com/codifydev",
        "https://linkedin.com/company/codifydev",
        "https://instagram.com/codifydev"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+55-11-99999-9999",
        "contactType": "customer service",
        "areaServed": "BR",
        "availableLanguage": "Portuguese"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "BR",
        "addressRegion": "SP"
      }
    };
    
    updateSchemaMarkup('organization', organizationSchema);

    // Performance optimization meta tags
    const performanceTags = [
      { name: "dns-prefetch", href: "//fonts.googleapis.com" },
      { name: "dns-prefetch", href: "//fonts.gstatic.com" },
      { name: "preconnect", href: "https://fonts.googleapis.com", crossorigin: "true" },
      { name: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "true" }
    ];

    performanceTags.forEach(({ name, href, crossorigin }) => {
      updateLinkTag('rel', name, 'href', href, href, crossorigin);
    });

  }, [title, description, keywords, canonicalUrl, ogImage, schema, breadcrumbs, alternateUrls, robotsContent]);

  return null;
};

// Utility functions
function updateMetaTag(attr: string, value: string, content: string) {
  let tag = document.querySelector(`meta[${attr}="${value}"]`);
  if (tag) {
    tag.setAttribute("content", content);
  } else {
    tag = document.createElement("meta");
    tag.setAttribute(attr, value);
    tag.setAttribute("content", content);
    document.head.appendChild(tag);
  }
}

function updateLinkTag(rel: string, relValue: string, href: string, hrefValue: string, url?: string, crossorigin?: string) {
  let tag = document.querySelector(`link[${rel}="${relValue}"]`);
  if (tag) {
    tag.setAttribute(href, url || hrefValue);
  } else {
    tag = document.createElement("link");
    tag.setAttribute(rel, relValue);
    tag.setAttribute(href, url || hrefValue);
    if (crossorigin) {
      tag.setAttribute("crossorigin", crossorigin);
    }
    document.head.appendChild(tag);
  }
}

function updateSchemaMarkup(id: string, schema: object) {
  let script = document.querySelector(`script[data-schema="${id}"]`);
  if (script) {
    script.textContent = JSON.stringify(schema);
  } else {
    script = document.createElement("script");
    script.setAttribute("type", "application/ld+json");
    script.setAttribute("data-schema", id);
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}

export default AdvancedSEO;