export function courseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'UI/UX Design Fellowship',
    description:
      "India's most intensive enterprise UI/UX design fellowship with live mentorship, real projects, and 1-year placement support. Led by 20+ year industry veterans from IBM and TCS.",
    url: 'https://skillbanao.in',
    inLanguage: 'en-IN',
    educationalCredentialAwarded: 'UI/UX Design Fellowship Certificate',
    teaches: [
      'User Experience Design',
      'User Interface Design',
      'Figma',
      'Design Systems',
      'User Research',
      'Prototyping',
      'Enterprise UX',
      'AI-Powered UX Workflows',
      'Design Thinking',
    ],
    provider: {
      '@type': 'Organization',
      name: 'Skill Banao',
      url: 'https://skillbanao.in',
      logo: 'https://skillbanao.in/logo/skill-banao-logo.svg',
    },
    instructor: [
      {
        '@type': 'Person',
        name: 'Anil G',
        jobTitle: 'Design Manager & Head of Studios, Data & AI',
        worksFor: { '@type': 'Organization', name: 'IBM' },
        url: 'https://neelan.design',
      },
    ],
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT20H',
      duration: 'P5M',
      startDate: '2026-07-01',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      bestRating: '5',
      ratingCount: '3500',
    },
  }
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Skill Banao',
    url: 'https://skillbanao.in',
    logo: 'https://skillbanao.in/logo/skill-banao-logo.svg',
    description: "India's leading enterprise UX design education programme. Learn the Way Industry Works.",
    foundingDate: '2022',
    areaServed: 'IN',
    sameAs: [
      'https://www.instagram.com/skillbanao',
      'https://www.linkedin.com/company/skillbanao',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: 'English',
    },
  }
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Skill Banao',
    url: 'https://skillbanao.in',
    description: "India's most intensive enterprise UI/UX design fellowship.",
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://skillbanao.in/?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}
