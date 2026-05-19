import { logoutUser } from "@/api/user"
import { Button } from "@/components/ui/button"

const Home = () => {
  return (
    <div>
      hello
      <Button variant="default" onClick={logoutUser}>
        Logout
      </Button>
    </div>
  )
}

export default Home
