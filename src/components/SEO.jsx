import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  keywords,
  ogImage = 'https://consultoriadesaude.vercel.app/logo.png',
  url = 'https://consultoriadesaude.vercel.app',
  type = 'website'
}) {
  // Palavras-chave MEGA completas para ranqueamento
  const keywordsMegaCompletas = [
    // Geral
    'plano de saúde',
    'consultoria planos de saúde',
    'corretor plano de saúde',
    'cotação plano de saúde',
    'contratar plano de saúde',
    
    // Geográfico (Rio de Janeiro)
    'plano de saúde RJ',
    'plano de saúde Rio de Janeiro',
    'plano de saúde Magé',
    'plano de saúde Baixada Fluminense',
    'plano de saúde região metropolitana RJ',
    
    // Tipos de plano
    'plano de saúde empresarial',
    'plano de saúde PJ',
    'plano de saúde pessoa jurídica',
    'plano de saúde familiar',
    'plano de saúde individual',
    'plano de saúde MEI',
    'plano de saúde adesão',
    'plano de saúde coletivo',
    'plano de saúde coletivo por adesão',
    
    // Operadoras
    'Bradesco Saúde',
    'Unimed Rio',
    'Unimed RJ',
    'SulAmérica Saúde',
    'Amil Saúde',
    'Notre Dame Intermédica',
    'Golden Cross',
    'Assim Saúde',
    'São Francisco Saúde',
    
    // Long-tail (cauda longa) - Alto poder de conversão
    'quanto custa plano de saúde',
    'melhor plano de saúde custo benefício',
    'plano de saúde sem carência',
    'plano de saúde para gestante',
    'plano de saúde para idoso',
    'plano de saúde com cobertura nacional',
    'plano de saúde hospitalar',
    'plano de saúde ambulatorial',
    'plano de saúde com odontológico',
    
    // Termos de busca por necessidade
    'preciso de plano de saúde urgente',
    'onde contratar plano de saúde',
    'como escolher plano de saúde',
    'simulador plano de saúde',
    'comparar planos de saúde',
    'cotação gratuita plano de saúde',
    
    // Portabilidade
    'portabilidade plano de saúde',
    'trocar de plano de saúde',
    'mudar plano de saúde',
    'portabilidade carência zero',
    
    // Termos comerciais
    'consultor plano de saúde',
    'especialista planos de saúde',
    'corretora planos de saúde',
    'atendimento plano de saúde',
    'suporte plano de saúde',
    
    // Tendências 2025 [web:125][web:129]
    'plano de saúde digital',
    'telemedicina plano de saúde',
    'consulta online plano de saúde',
    'atendimento 24h plano de saúde',
    
    // Problemas que o cliente busca resolver
    'plano de saúde barato',
    'plano de saúde acessível',
    'desconto plano de saúde',
    'promoção plano de saúde',
    'plano de saúde com melhor preço',
    
    // Dúvidas comuns
    'carência plano de saúde',
    'reembolso plano de saúde',
    'cobertura plano de saúde',
    'rede credenciada plano de saúde',
    'hospitais conveniados'
  ];

  // Combina keywords customizadas com as mega completas
  const allKeywords = keywords 
    ? `${keywords}, ${keywordsMegaCompletas.join(', ')}`
    : keywordsMegaCompletas.join(', ');

  const defaultTitle = 'Maisa Valentim | Consultoria Especializada em Planos de Saúde RJ';
  const defaultDescription = 'Consultoria especializada em planos de saúde no Rio de Janeiro. Bradesco, Unimed, SulAmérica e mais. Cotação gratuita em 24h. Atendimento personalizado para PJ, familiar e individual. ☎ (21) 97747-2141';

  const seoTitle = title ? `${title} | Maisa Valentim Consultoria` : defaultTitle;
  const seoDescription = description || defaultDescription;

  // Dados estruturados avançados [web:126]
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "@id": `${url}#organization`,
        "name": "Maisa Valentim Consultoria de Planos de Saúde",
        "legalName": "Maisa Valentim Consultoria",
        "url": url,
        "logo": ogImage,
        "description": seoDescription,
        "telephone": "+55-21-97747-2141",
        "email": "maisarvalentim@gmail.com",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "RJ",
          "addressCountry": "BR",
          "addressLocality": "Rio de Janeiro"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "-22.9068",
          "longitude": "-43.1729"
        },
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": [
            "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
          ],
          "opens": "00:00",
          "closes": "23:59"
        },
        "priceRange": "$$",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "127"
        },
        "sameAs": [
          "https://www.instagram.com/planosdesaudemaisavalentim/",
          "https://wa.me/5521977472141"
        ]
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        "serviceType": "Consultoria em Planos de Saúde",
        "provider": {
          "@id": `${url}#organization`
        },
        "areaServed": {
          "@type": "State",
          "name": "Rio de Janeiro"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Planos de Saúde Disponíveis",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Plano de Saúde Empresarial (PJ)"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Plano de Saúde Familiar"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Plano de Saúde Individual"
              }
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${url}#website`,
        "url": url,
        "name": "Maisa Valentim Consultoria",
        "publisher": {
          "@id": `${url}#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${url}/buscar?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Início",
            "item": url
          }
        ]
      }
    ]
  };

  return (
    <Helmet>
      {/* Meta Tags Básicas */}
      <html lang="pt-BR" />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={url} />
      
      {/* Autor e Publisher */}
      <meta name="author" content="Maisa Valentim" />
      <meta name="publisher" content="Maisa Valentim Consultoria" />
      
      {/* Robots e Indexação */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Geo-targeting [web:129] */}
      <meta name="geo.region" content="BR-RJ" />
      <meta name="geo.placename" content="Rio de Janeiro" />
      <meta name="geo.position" content="-22.9068;-43.1729" />
      <meta name="ICBM" content="-22.9068, -43.1729" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Maisa Valentim Consultoria" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* WhatsApp */}
      <meta property="og:image:alt" content="Maisa Valentim - Consultoria de Planos de Saúde" />

      {/* Apple */}
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Maisa Valentim" />

      {/* MS Application */}
      <meta name="msapplication-TileColor" content="#8B7E74" />
      <meta name="theme-color" content="#8B7E74" />

      {/* Dados Estruturados (Schema.org) [web:126] */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>

      {/* Alternates para idiomas (futuro) */}
      <link rel="alternate" hrefLang="pt-BR" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
}
