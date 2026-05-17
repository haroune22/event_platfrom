import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, ArrowRight } from "lucide-react"

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-600">
            Sign in to your account and explore amazing events
          </p>
        </div>

        <div className="space-y-6 rounded-2xl bg-white p-8 shadow-lg">
          <button className="flex w-full items-center justify-center gap-3 rounded-lg border-2 border-gray-200 px-4 py-3 font-medium text-gray-700 transition duration-200 hover:cursor-pointer hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600">
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200"></div>
            <span className="text-xs font-medium tracking-wider text-gray-500 uppercase">
              Or continue with email
            </span>
            <div className="h-px flex-1 bg-gray-200"></div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Mail size={16} className="text-blue-600" />
                Email Address
              </Label>
              <Input
                type="email"
                placeholder="name@example.com"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 transition outline-none hover:bg-white focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Lock size={16} className="text-blue-600" />
                Password
              </Label>
              <Input
                type="password"
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-2.5 transition outline-none hover:bg-white focus:border-transparent focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <Button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 font-semibold text-white transition duration-200 hover:bg-blue-700">
            Sign In
            <ArrowRight size={18} />
          </Button>

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>

        <p className="mx-auto mt-8 max-w-md text-center text-xs leading-relaxed text-gray-500">
          By continuing, you agree to our{" "}
          <Link to="/terms" className="text-blue-600 hover:underline">
            User Agreement
          </Link>{" "}
          and acknowledge that you understand the{" "}
          <Link to="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

export default Login
