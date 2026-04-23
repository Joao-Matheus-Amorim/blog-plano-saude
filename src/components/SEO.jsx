import { Helmet } from 'react-helmet-async';

export default function SEO({ 
  title, 
  description, 
  keywords,
  ogImage = 'https://consultoriadesaude.vercel.app/logo.png',
  url = 'https://consultoriadesaude.vercel.app',
  type = 'website',
  // Novos props para Schema Markup avançado
  isBlogPost = false,
  blogPost = null,       // { title, description, datePublished, dateModified, authorName, image }
  faqItems = null,       // [{ question, answer }]
  reviewItems = null,    // [{ author, ratingValue, reviewBody, datePublished }]
}) {
  const keywordsMegaCompletas = [
    'plano de saúde', 'consultoria planos de saúde', 'corretor plano de saúde',
    'cotação plano de saúde', 'contratar plano de saúde',
    'plano de saúde RJ', 'plano de saúde Rio de Janeiro',
    'plano de saúde Magé', 'plano de saúde Baixada Fluminense',
    'plano de saúde região metropolitana RJ',
    'plano de saúde empresarial', 'plano de saúde PJ',
    'plano de saúde pessoa jurídica', 'plano de saúde familiar',
    'plano de saúde individual', 'plano de saúde MEI',
    'plano de saúde adesão', 'plano de saúde coletivo',
    'Bradesco Saúde', 'Unimed Rio', 'Unimed RJ',
    'SulAmérica Saúde', 'Amil Saúde', 'Notre Dame Intermédica',
    'quanto custa plano de saúde', 'melhor plano de saúde custo benefício',
    'plano de saúde sem carência', 'plano de saúde para gestante',
    'plano de saúde para idoso', 'simulador plano de saúde',
    'comparar planos de saúde', 'cotação gratuita plano de saúde',
    'portabilidade plano de saúde', 'trocar de plano de saúde',
    'plano de saúde barato', 'plano de saúde acessível',
    'telemedicina plano de saúde', 'rede credenciada plano de saúde',
  ];

  const allKeywords = keywords 
    ? `${keywords}, ${keywordsMegaCompletas.join(', ')}`
    : keywordsMegaCompletas.join(', ');

  const defaultTitle = 'Maisa Valentim | Consultoria Especializada em Planos de Saúde RJ';
  const defaultDescription = 'Consultoria especializada em planos de saúde no Rio de Janeiro. Bradesco, Unimed, SulAmérica e mais. Cotação gratuita em 24h. Atendimento personalizado para PJ, familiar e individual. ☎ (21) 97747-2141';

  const seoTitle = title ? `${title} | Maisa Valentim Consultoria` : defaultTitle;
  const seoDescription = description || defaultDescription;

  // ====================================================
  // SCHEMA: LocalBusiness + ProfessionalService
  // ====================================================
  const organizationSchema = {
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${url}#organization`,
    "name": "Maisa Valentim Consultoria de Planos de Saúde",
    "url": url,
    "logo": {
      "@type": "ImageObject",
      "url": ogImage,
      "width": 200,
      "height": 200
    },
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
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "08:00",
      "closes": "20:00"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "sameAs": [
      "https://www.instagram.com/planosdesaudemaisavalentim/",
      "https://wa.me/5521977472141"
    ]
  };

  // ====================================================
  // SCHEMA: BlogPosting (somente em posts de blog)
  // ====================================================
  const blogPostSchema = isBlogPost && blogPost ? {
    "@type": "BlogPosting",
    "@id": `${url}#blogpost`,
    "headline": blogPost.title || seoTitle,
    "description": blogPost.description || seoDescription,
    "image": blogPost.image || ogImage,
    "datePublished": blogPost.datePublished || new Date().toISOString(),
    "dateModified": blogPost.dateModified || blogPost.datePublished || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": blogPost.authorName || "Maisa Valentim",
      "url": `${url}/sobre`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Maisa Valentim Consultoria",
      "logo": {
        "@type": "ImageObject",
        "url": ogImage
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  } : null;

  // ====================================================
  // SCHEMA: FAQPage (gera rich snippet de FAQ no Google)
  // ====================================================
  const defaultFaqItems = [
    {
      question: "Como funciona a consultoria de planos de saúde da Maisa Valentim?",
      answer: "A Maisa Valentim oferece consultoria gratuita e personalizada. Você descreve seu perfil e necessidades, e ela apresenta as melhores opções entre as principais operadoras como Bradesco, Unimed, SulAmérica e Amil, sem custo adicional."
    },
    {
      question: "Qual a diferença entre plano PJ e plano familiar?",
      answer: "O plano PJ (Pessoa Jurídica) é contratado por empresas e costuma ter preços mais acessíveis. O plano familiar é para grupos de pessoas da mesma família. Ambos oferecem cobertura completa, mas com regras e preços diferentes."
    },
    {
      question: "A cotação de plano de saúde é gratuita?",
      answer: "Sim! A cotação é completamente gratuita e sem compromisso. Use nosso simulador no site ou entre em contato pelo WhatsApp (21) 97747-2141."
    },
    {
      question: "Quais operadoras a Maisa Valentim trabalha?",
      answer: "Trabalhamos com as principais operadoras do mercado: Bradesco Saúde, Unimed, SulAmérica, Amil e Notre Dame Intermédica. Assim garantimos a melhor opção para o seu perfil e orçamento."
    },
    {
      question: "O que é portabilidade de plano de saúde?",
      answer: "Portabilidade é a possibilidade de trocar de operadora sem cumprir novas carências, desde que você já tenha o plano atual há pelo menos 2 anos. A Maisa Valentim pode orientar todo o processo gratuitamente."
    },
    {
      question: "Qual o prazo para contratação do plano?",
      answer: "O prazo varia por operadora, mas geralmente a ativação ocorre em 2 a 5 dias úteis após a aprovação da proposta. Em casos urgentes, orientamos as opções mais rápidas do mercado."
    }
  ];

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    "mainEntity": (faqItems || defaultFaqItems).map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // ====================================================
  // SCHEMA: Reviews (depoimentos como rich snippet)
  // ====================================================
  const defaultReviews = [
    {
      author: "Carlos M.",
      ratingValue: 5,
      reviewBody: "A Maisa me ajudou a encontrar o plano ideal para minha empresa. Atendimento excepcional e suporte sempre que precisei.",
      datePublished: "2025-09-10"
    },
    {
      author: "Ana Paula S.",
      ratingValue: 5,
      reviewBody: "Fácil, rápido e sem enrolacão. Fiz a cotação pelo site e em menos de 1 hora já tinha a proposta no WhatsApp.",
      datePublished: "2025-10-05"
    },
    {
      author: "Roberto L.",
      ratingValue: 5,
      reviewBody: "Contratei o plano familiar pelo Bradesco com a orientação da Maisa. Preço muito melhor do que eu encontrava direto com a operadora.",
      datePublished: "2025-11-20"
    }
  ];

  const reviewsSchema = (reviewItems || defaultReviews).map((review, i) => ({
    "@type": "Review",
    "@id": `${url}#review-${i}`,
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.ratingValue,
      "bestRating": 5,
      "worstRating": 1
    },
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewBody": review.reviewBody,
    "datePublished": review.datePublished,
    "itemReviewed": {
      "@id": `${url}#organization`
    }
  }));

  // ====================================================
  // SCHEMA: WebSite com SearchAction
  // ====================================================
  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${url}#website`,
    "url": url,
    "name": "Maisa Valentim Consultoria",
    "publisher": { "@id": `${url}#organization` },
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${url}/blog?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  // ====================================================
  // SCHEMA: BreadcrumbList
  // ====================================================
  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Início", "item": url }
    ]
  };

  // Monta grafo completo
  const graphItems = [
    organizationSchema,
    websiteSchema,
    breadcrumbSchema,
    faqSchema,
    ...reviewsSchema
  ];

  if (blogPostSchema) {
    graphItems.push(blogPostSchema);
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": graphItems
  };

  return (
    <Helmet>
      <html lang="pt-BR" />
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={allKeywords} />
      <link rel="canonical" href={url} />
      <meta name="author" content="Maisa Valentim" />
      <meta name="publisher" content="Maisa Valentim Consultoria" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="geo.region" content="BR-RJ" />
      <meta name="geo.placename" content="Rio de Janeiro" />
      <meta name="geo.position" content="-22.9068;-43.1729" />
      <meta name="ICBM" content="-22.9068, -43.1729" />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:site_name" content="Maisa Valentim Consultoria" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      <meta name="apple-mobile-web-app-title" content="Maisa Valentim" />
      <meta name="msapplication-TileColor" content="#8B7E74" />
      <meta name="theme-color" content="#8B7E74" />
      {/* Schema Markup completo com FAQPage, Review, BlogPosting, LocalBusiness */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <link rel="alternate" hrefLang="pt-BR" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />
    </Helmet>
  );
}
