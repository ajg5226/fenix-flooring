import { siteConfig } from '../config/site';

// Organization Schema
export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.url}/#organization`,
    name: siteConfig.businessName,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}${siteConfig.logoUrl}`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: siteConfig.phone,
      contactType: 'Customer Service',
      email: siteConfig.email,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    sameAs: Object.values(siteConfig.social).filter(Boolean),
  };
}

// LocalBusiness Schema with opening hours
export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GeneralContractor',
    '@id': `${siteConfig.url}/#localbusiness`,
    name: siteConfig.businessName,
    image: `${siteConfig.url}${siteConfig.logoUrl}`,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    priceRange: siteConfig.schema.priceRange,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      postalCode: siteConfig.address.zip,
      addressCountry: siteConfig.address.country,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '14:00',
      },
    ],
    ...(siteConfig.serviceAreaGeo
      ? {
          areaServed: {
            '@type': 'GeoCircle',
            geoMidpoint: {
              '@type': 'GeoCoordinates',
              latitude: siteConfig.serviceAreaGeo.latitude,
              longitude: siteConfig.serviceAreaGeo.longitude,
            },
            geoRadius: `${siteConfig.serviceAreaGeo.radiusMiles ?? 100} mi`,
          },
        }
      : { areaServed: siteConfig.serviceArea }),
  };
}

// WebSite Schema (no SearchAction until a search page exists)
export function getWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.businessName,
    description: siteConfig.defaultDescription,
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };
}

// BreadcrumbList Schema
export function getBreadcrumbSchema(items: Array<{ label: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.url.startsWith('http') ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

// Service Schema
export function getServiceSchema(serviceName: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: serviceName,
    name: serviceName,
    description: description,
    url: url.startsWith('http') ? url : `${siteConfig.url}${url}`,
    provider: {
      '@id': `${siteConfig.url}/#organization`,
    },
    areaServed: siteConfig.serviceArea,
  };
}

// FAQPage Schema
export function getFAQPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// Review/Rating Schema
export function getReviewSchema(testimonials: Array<{ name: string; company?: string; rating: number; text: string; projectType?: string }>) {
  const reviews = testimonials.map((testimonial) => ({
    '@type': 'Review',
    author: {
      '@type': 'Person',
      name: testimonial.name,
      ...(testimonial.company && {
        affiliation: {
          '@type': 'Organization',
          name: testimonial.company,
        },
      }),
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: testimonial.rating,
      bestRating: 5,
    },
    reviewBody: testimonial.text,
  }));

  const averageRating = testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: averageRating.toFixed(1),
    reviewCount: testimonials.length,
    bestRating: 5,
    worstRating: 1,
  };
}

// Article Schema for resources/blog posts
export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    url: article.url.startsWith('http') ? article.url : `${siteConfig.url}${article.url}`,
    ...(article.datePublished && { datePublished: article.datePublished }),
    ...(article.dateModified && { dateModified: article.dateModified }),
    ...(article.image && { image: article.image.startsWith('http') ? article.image : `${siteConfig.url}${article.image}` }),
    author: {
      '@type': 'Organization',
      name: siteConfig.businessName,
    },
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };
}

// Case Study Schema (extends Article)
export function getCaseStudySchema(caseStudy: {
  title: string;
  description: string;
  url: string;
  industry: string;
  projectSize?: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: caseStudy.title,
    description: caseStudy.description,
    url: caseStudy.url.startsWith('http') ? caseStudy.url : `${siteConfig.url}${caseStudy.url}`,
    ...(caseStudy.image && { image: caseStudy.image.startsWith('http') ? caseStudy.image : `${siteConfig.url}${caseStudy.image}` }),
    about: {
      '@type': 'Service',
      name: `Commercial Flooring for ${caseStudy.industry}`,
      provider: {
        '@id': `${siteConfig.url}/#organization`,
      },
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.businessName,
    },
    publisher: {
      '@id': `${siteConfig.url}/#organization`,
    },
  };
}

// Location-specific LocalBusiness Schema with city-level areaServed
export function getLocationSchema(city: string, state: string) {
  return {
    ...getLocalBusinessSchema(),
    areaServed: {
      '@type': 'City',
      name: city,
      containedInPlace: {
        '@type': 'State',
        name: state,
      },
    },
  };
}

// Combine multiple schemas for a page
export function combineSchemas(...schemas: object[]): string {
  return JSON.stringify(schemas);
}

// Type exports
export type BreadcrumbItem = { label: string; url: string };
export type FAQItem = { question: string; answer: string };
export type TestimonialItem = { name: string; company?: string; rating: number; text: string; projectType?: string; reviewUrl?: string; photo?: string };
