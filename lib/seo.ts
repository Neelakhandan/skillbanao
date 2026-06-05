export function courseSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'UI/UX Design Fellowship',
    description:
      "India's most intensive UI/UX design fellowship with live mentorship, real projects, and 1-year placement support.",
    provider: {
      '@type': 'Organization',
      name: 'Skill Banao',
      url: 'https://skillbanao.in',
    },
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      priceCurrency: 'INR',
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'Online',
      courseWorkload: 'PT20H',
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
    sameAs: ['https://www.instagram.com/skillbanao', 'https://www.linkedin.com/company/skillbanao'],
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
