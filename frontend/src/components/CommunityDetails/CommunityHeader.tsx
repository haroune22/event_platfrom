import type { CommunityCRUD, userRoles } from "@/lib/types"


type CommunityHeaderProps = {
    community: CommunityCRUD
    role: userRoles
}

const CommunityHeader = ({community,role}: CommunityHeaderProps) => {
    
  return (
    <div>
        header
    </div>
  )
}

export default CommunityHeader