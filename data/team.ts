export interface TeamMember {
  id: string
  name: string
  role: string
  photo: string
  bio: string
  skills: string[]
  tools: string[]
  experience: string
  portfolio: {
    title: string
    description: string
    image: string
  }[]
  social: {
    linkedin?: string
    twitter?: string
    behance?: string
    dribbble?: string
    github?: string
  }
}

export const teamMembers: TeamMember[] = [
  {
    id: 'fatima-ahmed',
    name: 'Fatima Ahmed',
    role: 'Graphic Designer',
    photo: '👩‍🎨',
    bio: 'Fatima is a creative graphic designer with over 8 years of experience in brand identity and visual design. She specializes in creating memorable brand experiences that resonate with audiences.',
    skills: ['Brand Identity', 'Logo Design', 'Print Design', 'UI/UX Design', 'Illustration'],
    tools: ['Adobe Illustrator', 'Photoshop', 'Figma', 'Procreate', 'InDesign'],
    experience: '8+ years of experience in graphic design, working with startups to Fortune 500 companies. Specialized in creating cohesive brand identities and marketing materials.',
    portfolio: [
      {
        title: 'Tech Startup Brand Identity',
        description: 'Complete brand identity for a fintech startup including logo, color palette, and brand guidelines.',
        image: '🎨',
      },
      {
        title: 'E-commerce Packaging Design',
        description: 'Sustainable packaging design for an eco-friendly product line.',
        image: '📦',
      },
      {
        title: 'Social Media Campaign Graphics',
        description: 'Series of engaging graphics for a social media marketing campaign.',
        image: '📱',
      },
    ],
    social: {
      behance: '#',
      dribbble: '#',
      linkedin: '#',
    },
  },
  {
    id: 'hassan-malik',
    name: 'Hassan Malik',
    role: 'Web Developer',
    photo: '👨‍💻',
    bio: 'Hassan is a full-stack web developer passionate about creating fast, responsive, and user-friendly websites. He combines technical expertise with creative problem-solving.',
    skills: ['Frontend Development', 'Backend Development', 'E-commerce', 'WordPress', 'React'],
    tools: ['React', 'Next.js', 'TypeScript', 'Node.js', 'WordPress', 'Shopify'],
    experience: '7+ years building websites and web applications. Expert in modern frameworks and e-commerce solutions.',
    portfolio: [
      {
        title: 'E-commerce Platform',
        description: 'Custom e-commerce platform with 10K+ products and advanced filtering.',
        image: '🛒',
      },
      {
        title: 'Corporate Website Redesign',
        description: 'Complete redesign of corporate website with improved UX and performance.',
        image: '💼',
      },
      {
        title: 'SaaS Dashboard',
        description: 'Complex dashboard application for SaaS platform with real-time analytics.',
        image: '📊',
      },
    ],
    social: {
      github: '#',
      linkedin: '#',
    },
  },
  {
    id: 'usman-khan',
    name: 'Usman Khan',
    role: 'Digital Marketing Specialist',
    photo: '👨‍💼',
    bio: 'Usman is a results-driven digital marketing specialist with expertise in Meta Ads, SEO, and lead generation. He focuses on data-driven strategies that deliver measurable ROI.',
    skills: ['Meta Ads', 'SEO', 'Lead Generation', 'Analytics', 'Conversion Optimization'],
    tools: ['Meta Ads Manager', 'Google Ads', 'HubSpot', 'Google Analytics', 'SEMrush'],
    experience: '9+ years managing digital marketing campaigns. Generated over $10M in revenue for clients through optimized ad campaigns.',
    portfolio: [
      {
        title: 'Meta Ads Campaign',
        description: 'ROAS of 5.2x for e-commerce client with $500K monthly ad spend.',
        image: '🎯',
      },
      {
        title: 'SEO Growth Project',
        description: 'Increased organic traffic by 300% in 12 months through comprehensive SEO strategy.',
        image: '📈',
      },
      {
        title: 'Lead Generation System',
        description: 'Built automated lead generation system generating 500+ qualified leads monthly.',
        image: '📊',
      },
    ],
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
  {
    id: 'shahzaman',
    name: 'Shahzaman',
    role: 'SEO Specialist',
    photo: '👨‍💻',
    bio: 'Shahzaman is an expert SEO specialist with deep expertise in WordPress SEO and Shopify SEO. He combines technical SEO knowledge with platform-specific optimizations to deliver exceptional results for content management systems and e-commerce platforms.',
    skills: ['SEO', 'WordPress SEO', 'Shopify SEO', 'Technical SEO', 'On-Page Optimization', 'Content Strategy', 'Link Building'],
    tools: ['WordPress', 'Shopify', 'Yoast SEO', 'Rank Math', 'Google Analytics', 'Google Search Console', 'Ahrefs', 'SEMrush', 'Screaming Frog'],
    experience: '8+ years specializing in SEO for WordPress and Shopify platforms. Optimized 200+ websites, achieving average organic traffic growth of 250% within 12 months.',
    portfolio: [
      {
        title: 'WordPress SEO Optimization',
        description: 'Increased organic traffic by 400% for a WordPress blog through comprehensive technical SEO and content optimization.',
        image: '📈',
      },
      {
        title: 'Shopify E-commerce SEO',
        description: 'Improved Shopify store rankings, resulting in 300% increase in organic product sales and 5x ROI.',
        image: '🛒',
      },
      {
        title: 'Multi-Platform SEO Strategy',
        description: 'Developed and executed SEO strategy across WordPress and Shopify platforms, achieving top 3 rankings for 50+ target keywords.',
        image: '🎯',
      },
    ],
    social: {
      linkedin: '#',
      github: '#',
    },
  },
  {
    id: 'ahmmad-raza',
    name: 'Ahmmad Raza',
    role: 'Digital Marketing Expert',
    photo: '👨‍💼',
    bio: 'Ahmmad Raza is a seasoned digital marketing expert specializing in performance marketing, paid advertising, and growth strategies. He builds data-driven campaigns that maximize ROI and scale brands across multiple channels.',
    skills: ['Performance Marketing', 'Google Ads', 'Meta Ads', 'Social Media Marketing', 'Email Marketing', 'Marketing Strategy', 'Conversion Optimization'],
    tools: ['Google Ads', 'Meta Ads Manager', 'Google Analytics', 'HubSpot', 'Mailchimp', 'SEMrush', 'Canva'],
    experience: '10+ years of experience driving digital growth for brands across e-commerce, SaaS, and local businesses. Managed multi-million dollar ad budgets with consistent, measurable results.',
    portfolio: [
      {
        title: 'Multi-Channel Growth Campaign',
        description: 'Scaled a D2C brand from $50K to $500K monthly revenue through integrated paid and organic strategies.',
        image: '🚀',
      },
      {
        title: 'Paid Advertising Optimization',
        description: 'Achieved 6x ROAS across Google and Meta Ads for an e-commerce client with optimized funnels.',
        image: '🎯',
      },
      {
        title: 'Brand Awareness Campaign',
        description: 'Grew brand social following by 250K and boosted engagement rate by 180% in 6 months.',
        image: '📣',
      },
    ],
    social: {
      linkedin: '#',
      twitter: '#',
    },
  },
]

