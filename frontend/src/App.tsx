import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import { ProtectedRoutes } from "./components/ProtectedRoutes"
import { PublicRoute } from "./components/PublicRouter"
import Post from "./pages/Post"
import CreatePost from "./pages/CreatePost"

export function App() {
  return (
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
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/createPost" element={<CreatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
