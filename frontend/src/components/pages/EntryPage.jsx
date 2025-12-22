import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import { FcGoogle } from "react-icons/fc"
import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { register, login } from "@/components/store/Auth/Action"

export default function FinoraAuth({ name }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const mode = name

  const { loading, error, user } = useSelector((state) => state.auth)

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      identifier: "",
      otp: "",
    },
  })

  const onSubmit = (values) => {
    console.log("Auth submit:", mode, values)

    if (mode === "signup") {
      dispatch(register({ values, navigate }))
    }

    if (mode === "login") {
      dispatch(login({ values, navigate }))
    }

    if (mode === "forgot") {
      // dispatch(verifyOtp(values))
    }
  }

  useEffect(() => {
    if (mode === "login") {
      navigate("/login")
    }

    if (mode === "signup") {
      navigate("/signup")
    }
    if (mode === "forgot") {
      navigate("/forgot-password")
    }
  }, [user, mode, navigate])

  const videoUrls = [
    // "https://cdn.pixabay.com/video/2022/03/31/112471-694704574_large.mp4",
    // "https://cdn.pixabay.com/video/2024/07/15/221356_large.mp4",
    // "https://cdn.pixabay.com/video/2023/02/09/149982-797471128_large.mp4",
    // "https://cdn.pixabay.com/video/2021/08/15/85156-590779424_large.mp4",
    // "https://cdn.pixabay.com/video/2023/01/08/145744-787427556_large.mp4",
    // "https://cdn.pixabay.com/video/2017/12/18/13460-248644879_large.mp4",
    // "https://cdn.pixabay.com/video/2022/10/11/134428-759734802_large.mp4",
    // "https://cdn.pixabay.com/video/2020/03/05/33269-396529577_large.mp4",
  ]

  return (
    <div className="h-screen overflow-hidden flex bg-black text-white">
      {/* LEFT AUTH */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md bg-black border-0 shadow-none">
          <CardContent className="space-y-6">
            {/* LOGO */}
            <div className="flex justify-center">
              <img src="/favicon.ico" className="h-10" alt="Finora" />
            </div>

            {/* HEADING */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Welcome to Finora</h1>
              <p className="text-neutral-400 mt-1">
                {mode === "login" && "Login to your account"}
                {mode === "signup" && "Create your Finora account"}
                {mode === "forgot" && "Verify using OTP"}
              </p>
            </div>

            {/* GOOGLE AUTH */}
            {mode !== "forgot" && (
              <>
                <Button className="w-full bg-white text-black hover:bg-neutral-200">
                  <FcGoogle className="mr-2 text-xl" />
                  Continue with Google
                </Button>

                <div className="flex items-center gap-3 text-neutral-500 text-sm">
                  <div className="flex-1 h-px bg-neutral-800" />
                  OR
                  <div className="flex-1 h-px bg-neutral-800" />
                </div>
              </>
            )}

            {/* ERROR */}
            {error && (
              <p className="text-sm text-red-500 text-center">{error}</p>
            )}

            {/* FORM */}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                {/* LOGIN */}
                {mode === "login" && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      rules={{ required: "Email is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              className="bg-neutral-900 border-neutral-800"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      rules={{ required: "Password is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Password"
                              className="bg-neutral-900 border-neutral-800"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      disabled={loading}
                      className="w-full bg-neutral-800 hover:bg-neutral-700"
                    >
                      {loading ? "Logging in..." : "Login"}
                    </Button>

                    <div className="flex justify-between text-sm text-neutral-400">
                      <button type="button" onClick={() => navigate("/forgot-password")}>
                        Forgot password?
                      </button>
                      <button type="button" onClick={() => navigate("/signup")}>
                        Create account
                      </button>
                    </div>
                  </>
                )}

                {/* SIGNUP */}
                {mode === "signup" && (
                  <>
                    <FormField
                      control={form.control}
                      name="name"
                      rules={{ required: "Name is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Full Name"
                              className="bg-neutral-900 border-neutral-800"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      rules={{ required: "Email is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email"
                              className="bg-neutral-900 border-neutral-800"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      rules={{ required: "Password is required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="Password"
                              className="bg-neutral-900 border-neutral-800"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      disabled={loading}
                      className="w-full bg-neutral-800 hover:bg-neutral-700"
                    >
                      {loading ? "Signing up..." : "Sign Up"}
                    </Button>

                    <p className="text-sm text-center text-neutral-400">
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="underline"
                      >
                        Login
                      </button>
                    </p>
                  </>
                )}

                {/* FORGOT */}
                {mode === "forgot" && (
                  <>
                    <FormField
                      control={form.control}
                      name="identifier"
                      rules={{ required: "Required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Email or Mobile Number"
                              className="bg-neutral-900 border-neutral-800"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="otp"
                      rules={{ required: "OTP required" }}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              placeholder="Enter OTP"
                              className="bg-neutral-900 border-neutral-800"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      disabled={loading}
                      className="w-full bg-neutral-800 hover:bg-neutral-700"
                    >
                      {loading ? "Verifying..." : "Verify OTP"}
                    </Button>

                    <p className="text-sm text-center text-neutral-400">
                      Back to{" "}
                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="underline"
                      >
                        Login
                      </button>
                    </p>
                  </>
                )}
              </form>
            </Form>

            <p className="text-xs text-neutral-500 text-center">
              By continuing, you agree to Finora’s Terms & Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT VIDEO GRID */}
      <div className="hidden lg:grid grid-cols-2 gap-3 p-6 w-[53vh]">
        {videoUrls.map((url, i) => (
          <div
            key={i}
            className="relative aspect-square overflow-hidden bg-neutral-900 border border-neutral-800"
          >
            <video
              src={url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
