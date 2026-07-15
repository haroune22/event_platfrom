import type { userCommunitiesType } from '@/lib/types'
import React from 'react'

interface CommunityCardProps  {
    communities: userCommunitiesType[]
}
const CommunityCard = ({communities}:CommunityCardProps) => {
  return (
    <div>
        {communities.map((c) => (
            <h1>
                {c.name}
            </h1>
        ))}
    </div>
  )
}

export default CommunityCard