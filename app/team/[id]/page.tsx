import { notFound } from 'next/navigation'
import TeamMemberProfile from '@/components/TeamMemberProfile'
import { teamMembers } from '@/data/team'

export default function TeamMemberPage({ params }: { params: { id: string } }) {
  const member = teamMembers.find((m) => m.id === params.id)

  if (!member) {
    notFound()
  }

  return <TeamMemberProfile member={member} />
}

