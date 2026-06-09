export interface Intern {
  id: string
  name: string
  role: string
  photo: string
  bio?: string
}

export const interns: Intern[] = [
  {
    id: 'intern-1',
    name: 'Intern Name 1',
    role: 'Digital Marketing Intern',
    photo: '/interns/intern-1.jpg',
    bio: 'Learning and contributing to social media and content marketing campaigns.',
  },
  {
    id: 'intern-2',
    name: 'Intern Name 2',
    role: 'Graphic Design Intern',
    photo: '/interns/intern-2.jpg',
    bio: 'Creating visual content and supporting brand design projects.',
  },
  {
    id: 'intern-3',
    name: 'Intern Name 3',
    role: 'SEO Intern',
    photo: '/interns/intern-3.jpg',
    bio: 'Assisting with keyword research, on-page SEO, and content optimization.',
  },
  {
    id: 'intern-4',
    name: 'Intern Name 4',
    role: 'Web Development Intern',
    photo: '/interns/intern-4.jpg',
    bio: 'Building and maintaining client websites under senior developer guidance.',
  },
]
