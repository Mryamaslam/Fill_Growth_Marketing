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
    id: 'sarah-johnson',
    name: 'Sarah Johnson',
    role: 'Graphic Designer',
    photo: '👩‍🎨',
    bio: 'Sarah is a creative graphic designer with over 8 years of experience in brand identity and visual design. She specializes in creating memorable brand experiences that resonate with audiences.',
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
    id: 'michael-chen',
    name: 'Michael Chen',
    role: 'Video Editor',
    photo: '👨‍💻',
    bio: 'Michael is an expert video editor specializing in YouTube content and social media videos. With a keen eye for storytelling and pacing, he transforms raw footage into engaging narratives.',
    skills: ['Video Editing', 'Color Grading', 'Motion Graphics', 'Sound Design', 'Post-Production'],
    tools: ['Premiere Pro', 'After Effects', 'DaVinci Resolve', 'Final Cut Pro', 'Audition'],
    experience: '6+ years editing videos for YouTube creators, brands, and agencies. Produced over 500+ videos with millions of combined views.',
    portfolio: [
      {
        title: 'YouTube Channel Rebrand',
        description: 'Complete video rebrand for a 1M+ subscriber YouTube channel.',
        image: '🎬',
      },
      {
        title: 'Product Launch Video',
        description: 'High-energy product launch video that generated 2M+ views.',
        image: '🚀',
      },
      {
        title: 'Brand Documentary Series',
        description: '3-part documentary series showcasing brand story and values.',
        image: '📹',
      },
    ],
    social: {
      linkedin: '#',
      behance: '#',
    },
  },
  {
    id: 'emily-rodriguez',
    name: 'Emily Rodriguez',
    role: 'Web Developer',
    photo: '👩‍💻',
    bio: 'Emily is a full-stack web developer passionate about creating fast, responsive, and user-friendly websites. She combines technical expertise with creative problem-solving.',
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
    id: 'david-kim',
    name: 'David Kim',
    role: 'Digital Marketing Specialist',
    photo: '👨‍💼',
    bio: 'David is a results-driven digital marketing specialist with expertise in Meta Ads, SEO, and lead generation. He focuses on data-driven strategies that deliver measurable ROI.',
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
]

