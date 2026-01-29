export interface Service {
  id: string
  name: string
  icon: string
  description: string
  fullDescription: string
  benefits: string[]
  tools: string[]
  process: {
    step: number
    title: string
    description: string
  }[]
}

export const services: Service[] = [
  {
    id: 'youtube-video-editing',
    name: 'YouTube Video Editing',
    icon: '🎬',
    description: 'Professional video editing services for YouTube content creators',
    fullDescription: 'Transform your raw footage into engaging YouTube videos that captivate your audience. Our expert video editors create polished, professional content optimized for YouTube\'s algorithm and viewer engagement.',
    benefits: [
      'Increased viewer engagement and watch time',
      'Professional quality that builds credibility',
      'Optimized for YouTube algorithm',
      'Faster turnaround times',
      'Consistent brand style across all videos',
      'Higher subscriber conversion rates',
    ],
    tools: [
      'Adobe Premiere Pro',
      'Final Cut Pro',
      'DaVinci Resolve',
      'After Effects',
      'Motion Graphics',
      'Color Grading Tools',
    ],
    process: [
      {
        step: 1,
        title: 'Consultation & Planning',
        description: 'We discuss your video goals, style preferences, and brand guidelines to create a customized editing plan.',
      },
      {
        step: 2,
        title: 'Raw Footage Review',
        description: 'Our team reviews your raw footage and identifies the best moments to highlight in the final edit.',
      },
      {
        step: 3,
        title: 'Editing & Enhancement',
        description: 'We edit your video with professional transitions, color grading, sound design, and motion graphics.',
      },
      {
        step: 4,
        title: 'Review & Revisions',
        description: 'You review the first draft and request any changes. We refine until it\'s perfect.',
      },
      {
        step: 5,
        title: 'Final Delivery',
        description: 'Receive your polished video in the optimal format for YouTube upload, ready to publish.',
      },
    ],
  },
  {
    id: 'graphic-designing',
    name: 'Graphic Designing',
    icon: '🎨',
    description: 'Professional visual designs that capture your brand essence',
    fullDescription: 'Create stunning visual designs that represent your brand perfectly. Our graphic design services include logos, social media graphics, marketing materials, and brand identity development.',
    benefits: [
      'Professional brand identity',
      'Consistent visual communication',
      'Increased brand recognition',
      'Higher engagement on social media',
      'Professional marketing materials',
      'Scalable design assets',
    ],
    tools: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe InDesign',
      'Figma',
      'Canva Pro',
      'Sketch',
    ],
    process: [
      {
        step: 1,
        title: 'Discovery & Brief',
        description: 'We learn about your brand, target audience, and design requirements through a detailed consultation.',
      },
      {
        step: 2,
        title: 'Research & Inspiration',
        description: 'Our designers research your industry, competitors, and current design trends to create unique concepts.',
      },
      {
        step: 3,
        title: 'Concept Development',
        description: 'We create multiple design concepts and present them for your review and feedback.',
      },
      {
        step: 4,
        title: 'Refinement',
        description: 'Based on your feedback, we refine the selected concept until it perfectly matches your vision.',
      },
      {
        step: 5,
        title: 'Final Delivery',
        description: 'You receive all design files in various formats (PNG, SVG, PDF) ready for use across all platforms.',
      },
    ],
  },
  {
    id: 'custom-graphic-designing',
    name: 'Custom Graphic Designing',
    icon: '✨',
    description: 'Bespoke graphic design solutions tailored to your unique needs',
    fullDescription: 'Get custom graphic design solutions that are uniquely tailored to your brand. From complete brand identity systems to specialized marketing materials, we create designs that stand out.',
    benefits: [
      '100% custom and unique designs',
      'Complete brand identity system',
      'Tailored to your specific needs',
      'Exclusive ownership of designs',
      'Comprehensive brand guidelines',
      'Multi-platform design assets',
    ],
    tools: [
      'Adobe Creative Suite',
      'Figma',
      'Procreate',
      'Blender',
      'Cinema 4D',
      'Custom Design Tools',
    ],
    process: [
      {
        step: 1,
        title: 'Brand Strategy Session',
        description: 'Deep dive into your brand values, mission, and unique selling propositions to inform the design direction.',
      },
      {
        step: 2,
        title: 'Mood Board & Concepts',
        description: 'We create mood boards and develop multiple unique design concepts aligned with your brand strategy.',
      },
      {
        step: 3,
        title: 'Design Development',
        description: 'Selected concepts are developed into complete design systems with all necessary variations and applications.',
      },
      {
        step: 4,
        title: 'Brand Guidelines',
        description: 'We create comprehensive brand guidelines documenting colors, typography, usage rules, and examples.',
      },
      {
        step: 5,
        title: 'Asset Delivery',
        description: 'Receive all design files, brand guidelines, and source files for future use and modifications.',
      },
    ],
  },
  {
    id: 'web-development',
    name: 'Web Development',
    icon: '💻',
    description: 'Custom websites and web applications built for performance',
    fullDescription: 'Build fast, responsive, and user-friendly websites that convert visitors into customers. Our web development services include custom website design, e-commerce solutions, and web applications.',
    benefits: [
      'Fast loading times',
      'Mobile-responsive design',
      'SEO optimized',
      'Secure and scalable',
      'User-friendly interface',
      'Higher conversion rates',
    ],
    tools: [
      'React & Next.js',
      'TypeScript',
      'Node.js',
      'WordPress',
      'Shopify',
      'AWS & Cloud Services',
    ],
    process: [
      {
        step: 1,
        title: 'Requirements & Planning',
        description: 'We analyze your business needs, target audience, and goals to create a detailed project plan.',
      },
      {
        step: 2,
        title: 'Design & Wireframing',
        description: 'Our team creates wireframes and designs that align with your brand and user experience goals.',
      },
      {
        step: 3,
        title: 'Development',
        description: 'We build your website using modern technologies, ensuring fast performance and best practices.',
      },
      {
        step: 4,
        title: 'Testing & Optimization',
        description: 'Rigorous testing across devices and browsers, followed by performance optimization.',
      },
      {
        step: 5,
        title: 'Launch & Support',
        description: 'We launch your website and provide ongoing support, maintenance, and updates as needed.',
      },
    ],
  },
  {
    id: 'meta-ads',
    name: 'Meta Ads',
    icon: '🎯',
    description: 'Targeted Facebook and Instagram advertising for maximum ROI',
    fullDescription: 'Leverage the power of Facebook and Instagram advertising with our data-driven Meta Ads campaigns. We optimize your ad spend to reach the right audience at the right time, driving conversions and maximizing your return on investment.',
    benefits: [
      'Precise audience targeting',
      'Higher conversion rates',
      'Lower cost per acquisition',
      'Detailed performance analytics',
      'A/B testing optimization',
      'Scalable ad campaigns',
    ],
    tools: [
      'Meta Ads Manager',
      'Facebook Pixel',
      'Google Analytics',
      'Conversion Tracking',
      'Audience Insights',
      'Campaign Optimization Tools',
    ],
    process: [
      {
        step: 1,
        title: 'Audience Research',
        description: 'We analyze your target audience, competitors, and market to create effective targeting strategies.',
      },
      {
        step: 2,
        title: 'Campaign Strategy',
        description: 'Develop comprehensive ad campaigns with clear objectives, budgets, and KPIs.',
      },
      {
        step: 3,
        title: 'Creative Development',
        description: 'Create compelling ad creatives (images, videos, copy) that resonate with your target audience.',
      },
      {
        step: 4,
        title: 'Launch & Monitoring',
        description: 'Launch campaigns and continuously monitor performance, making real-time optimizations.',
      },
      {
        step: 5,
        title: 'Optimization & Reporting',
        description: 'Regular performance analysis, A/B testing, and detailed reports to improve ROI continuously.',
      },
    ],
  },
  {
    id: 'seo',
    name: 'SEO',
    icon: '🔍',
    description: 'Search engine optimization to boost your online visibility',
    fullDescription: 'Improve your search engine rankings and organic traffic with our comprehensive SEO services. We conduct thorough keyword research, optimize your website content, and build quality backlinks to help you rank higher on Google and other search engines.',
    benefits: [
      'Higher search engine rankings',
      'Increased organic traffic',
      'Better online visibility',
      'Long-term sustainable growth',
      'Higher quality leads',
      'Improved user experience',
    ],
    tools: [
      'Google Analytics',
      'Google Search Console',
      'Ahrefs',
      'SEMrush',
      'Moz',
      'Screaming Frog',
    ],
    process: [
      {
        step: 1,
        title: 'SEO Audit',
        description: 'Comprehensive analysis of your website\'s current SEO performance, identifying opportunities and issues.',
      },
      {
        step: 2,
        title: 'Keyword Research',
        description: 'Identify high-value keywords relevant to your business that your target audience is searching for.',
      },
      {
        step: 3,
        title: 'On-Page Optimization',
        description: 'Optimize website content, meta tags, headings, and structure for search engines and users.',
      },
      {
        step: 4,
        title: 'Link Building',
        description: 'Build high-quality backlinks from authoritative websites to boost your domain authority.',
      },
      {
        step: 5,
        title: 'Monitoring & Reporting',
        description: 'Track rankings, traffic, and conversions with regular reports and continuous optimization.',
      },
    ],
  },
  {
    id: 'lead-generation',
    name: 'Lead Generation',
    icon: '📊',
    description: 'Data-driven strategies to capture and convert quality leads',
    fullDescription: 'Generate high-quality leads that convert into customers. Our lead generation strategies combine multiple channels and tactics to attract, capture, and nurture prospects throughout their buyer journey.',
    benefits: [
      'Higher quality leads',
      'Increased conversion rates',
      'Multi-channel approach',
      'Automated lead nurturing',
      'Better ROI on marketing spend',
      'Scalable lead generation',
    ],
    tools: [
      'HubSpot',
      'Salesforce',
      'Google Ads',
      'LinkedIn Ads',
      'Email Marketing Tools',
      'CRM Systems',
    ],
    process: [
      {
        step: 1,
        title: 'Lead Strategy Development',
        description: 'Define your ideal customer profile and develop a comprehensive lead generation strategy.',
      },
      {
        step: 2,
        title: 'Channel Setup',
        description: 'Set up multiple lead generation channels including ads, landing pages, and forms.',
      },
      {
        step: 3,
        title: 'Campaign Launch',
        description: 'Launch targeted campaigns across various platforms to attract and capture leads.',
      },
      {
        step: 4,
        title: 'Lead Nurturing',
        description: 'Implement automated email sequences and follow-up campaigns to nurture leads.',
      },
      {
        step: 5,
        title: 'Conversion Optimization',
        description: 'Continuously optimize campaigns based on performance data to improve conversion rates.',
      },
    ],
  },
  {
    id: 'linkedin-marketing',
    name: 'LinkedIn Marketing',
    icon: '💼',
    description: 'B2B focused campaigns to reach decision-makers and professionals',
    fullDescription: 'Target B2B audiences effectively with our LinkedIn marketing services. We help you connect with decision-makers, build thought leadership, and generate qualified business leads through strategic LinkedIn campaigns.',
    benefits: [
      'Access to decision-makers',
      'Higher quality B2B leads',
      'Professional brand presence',
      'Thought leadership positioning',
      'Better engagement rates',
      'LinkedIn ad optimization',
    ],
    tools: [
      'LinkedIn Ads Manager',
      'LinkedIn Sales Navigator',
      'LinkedIn Analytics',
      'Content Creation Tools',
      'Lead Tracking Systems',
      'CRM Integration',
    ],
    process: [
      {
        step: 1,
        title: 'Profile & Company Page Optimization',
        description: 'Optimize your LinkedIn profile and company page to attract the right professional audience.',
      },
      {
        step: 2,
        title: 'Content Strategy',
        description: 'Develop a content strategy that positions you as a thought leader in your industry.',
      },
      {
        step: 3,
        title: 'Campaign Development',
        description: 'Create targeted LinkedIn ad campaigns and organic content strategies.',
      },
      {
        step: 4,
        title: 'Engagement & Networking',
        description: 'Active engagement with your network, industry groups, and target audience.',
      },
      {
        step: 5,
        title: 'Lead Management',
        description: 'Track, nurture, and convert LinkedIn connections into qualified business leads.',
      },
    ],
  },
]

