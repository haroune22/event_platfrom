import { logoutUser } from "@/api/user"
import { Button } from "@/components/ui/button"

const Home = () => {
  return (
    <div>
      <Button variant="default" onClick={logoutUser}>
        Logout
      </Button>
    </div>
  )
}

export default Home
