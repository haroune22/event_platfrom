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
import SavedPosts from "./pages/SavedPosts"
import Communities from "./pages/Communities"
import Community from "./pages/Community"
import CommunityPosts from "./components/CommunityDetails/CommunityPosts"
import CommunityEvents from "./components/CommunityDetails/CommunityEvents"
import CommunityMembers from "./components/CommunityDetails/CommunityMembers"
import CommunityAbout from "./components/CommunityDetails/CommunityAbout"

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
            <Route path="/posts/saved" element={<SavedPosts />} />
            <Route path="/communities" element={<Communities />} />

            {/* Community Routes */}
            <Route path="/communities/:id" element={<Community />}>
              <Route index element={<CommunityPosts />} />
              <Route path="events" element={<CommunityEvents />} />
              <Route path="members" element={<CommunityMembers />} />
              <Route path="about" element={<CommunityAbout />} />
            </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster
        position="bottom-right"
        duration={3000}
        theme="dark"
        toastOptions={{
          style: {
            background: "#fff",
            color: "#111827",
            border: "1px solid #e5e7eb",
            borderRadius: "2px",
          },
        }}
      />
    </>
  )
}

export default App
