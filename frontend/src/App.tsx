import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { ProtectedRoutes } from "./components/ProtectedRoutes"
import { PublicRoute } from "./components/PublicRouter"
import Post from "./pages/Post"
import Feed from "./pages/Feed"
import Events from "./pages/Events"
import Event from "./pages/Event"
import { Toaster } from "./components/ui/sonner"

export function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/event" element={<Events />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/event/:eventId" element={<Event />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <Toaster richColors position="top-right" />
    </>
  )
}

export default App
