import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl: string;
  ogImage?: string;
  schema?: object;
}

const SEOHead = ({ title, description, keywords, canonicalUrl, ogImage, schema }: SEOHeadProps) => {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    } else {
      metaDescription = document.createElement("meta");
      metaDescription.setAttribute("name", "description");
      metaDescription.setAttribute("content", description);
      document.head.appendChild(metaDescription);
    }

    // Update keywords if provided
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute("content", keywords);
      } else {
        metaKeywords = document.createElement("meta");
        metaKeywords.setAttribute("name", "keywords");
        metaKeywords.setAttribute("content", keywords);
        document.head.appendChild(metaKeywords);
      }
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute("href", canonicalUrl);
    } else {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      canonical.setAttribute("href", canonicalUrl);
      document.head.appendChild(canonical);
    }

    // Update Open Graph meta tags
    const ogTags = [
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: ogImage || "https://codify.dev.br/codify-logo.png" }
    ];

    ogTags.forEach(({ property, content }) => {
      let ogTag = document.querySelector(`meta[property="${property}"]`);
      if (ogTag) {
        ogTag.setAttribute("content", content);
      } else {
        ogTag = document.createElement("meta");
        ogTag.setAttribute("property", property);
        ogTag.setAttribute("content", content);
        document.head.appendChild(ogTag);
      }
    });

    // Update Twitter Card meta tags
    const twitterTags = [
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:url", content: canonicalUrl },
      { name: "twitter:image", content: ogImage || "https://codify.dev.br/codify-logo.png" }
    ];

    twitterTags.forEach(({ name, content }) => {
      let twitterTag = document.querySelector(`meta[name="${name}"]`);
      if (twitterTag) {
        twitterTag.setAttribute("content", content);
      } else {
        twitterTag = document.createElement("meta");
        twitterTag.setAttribute("name", name);
        twitterTag.setAttribute("content", content);
        document.head.appendChild(twitterTag);
      }
    });

    // Add schema markup if provided
    if (schema) {
      let schemaScript = document.querySelector('script[type="application/ld+json"]:last-of-type');
      if (schemaScript) {
        schemaScript.textContent = JSON.stringify(schema);
      } else {
        schemaScript = document.createElement("script");
        schemaScript.setAttribute("type", "application/ld+json");
        schemaScript.textContent = JSON.stringify(schema);
        document.head.appendChild(schemaScript);
      }
    }
  }, [title, description, keywords, canonicalUrl, ogImage, schema]);

  return null;
};

export default SEOHead;