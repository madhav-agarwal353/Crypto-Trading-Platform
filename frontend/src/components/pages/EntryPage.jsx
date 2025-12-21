import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
export default function FinoraAuth(props) {
  const videoUrls = [
    "https://cdn.pixabay.com/video/2022/03/31/112471-694704574_large.mp4",
    "https://cdn.pixabay.com/video/2024/07/15/221356_large.mp4",
    "https://cdn.pixabay.com/video/2023/02/09/149982-797471128_large.mp4",
    "https://cdn.pixabay.com/video/2021/08/15/85156-590779424_large.mp4",
    "https://cdn.pixabay.com/video/2023/01/08/145744-787427556_large.mp4",
    "https://cdn.pixabay.com/video/2017/12/18/13460-248644879_large.mp4",
    "https://cdn.pixabay.com/video/2022/10/11/134428-759734802_large.mp4",
    "https://cdn.pixabay.com/video/2020/03/05/33269-396529577_large.mp4"
  ];
  const stockVideos = [
    "kGZh6X8HBw8", "1OF53QNbMrE", "qiNna3KiS-o", "HybyM8lY35E",
    "3aqZf6Vp9l0", "lGlpRe2WD6g", "b5BsywkETfU", "8xuvOFwSJJQ"
  ];
  const navigate = useNavigate();
  const mode = props.name;
  return (
    <div className="h-screen overflow-hidden flex bg-black text-white">
      {/* LEFT AUTH PANEL */}
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md bg-black border-0 shadow-none">
          <CardContent className="space-y-6">
            {/* Logo */}
            <div className="flex justify-center text-3xl font-bold">
              <img src="/favicon.ico" alt="" className="h-10"/>
            </div>

            {/* Heading */}
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
              <Button className="w-full bg-white text-black hover:bg-neutral-200">
                <FcGoogle className="mr-2 text-xl" /> Continue with Google
              </Button>
            )}

            {mode !== "forgot" && (
              <div className="flex items-center gap-3 text-neutral-500 text-sm">
                <div className="flex-1 h-px bg-neutral-800" />OR
                <div className="flex-1 h-px bg-neutral-800" />
              </div>
            )}

            {/* LOGIN */}
            {mode === "login" && (
              <div className="space-y-4">
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-neutral-900 border-neutral-800"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-neutral-900 border-neutral-800"
                />

                <Button className="w-full bg-neutral-800 hover:bg-neutral-700">
                  Login
                </Button>

                <div className="flex justify-between text-sm text-neutral-400">
                  <button onClick={() => navigate("/forgot")}>
                    Forgot password?
                  </button>
                  <button onClick={() => navigate("/signup")}>
                    Create account
                  </button>
                </div>
              </div>
            )}

            {/* SIGNUP */}
            {mode === "signup" && (
              <div className="space-y-4">
                <Input
                  placeholder="Full Name"
                  className="bg-neutral-900 border-neutral-800"
                />
                <Input
                  type="email"
                  placeholder="Email"
                  className="bg-neutral-900 border-neutral-800"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  className="bg-neutral-900 border-neutral-800"
                />

                <Button className="w-full bg-neutral-800 hover:bg-neutral-700">
                  Sign Up
                </Button>

                <p className="text-sm text-center text-neutral-400">
                  Already have an account?{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            )}

            {/* FORGOT PASSWORD / OTP */}
            {mode === "forgot" && (
              <div className="space-y-4">
                <Input
                  placeholder="Email or Mobile Number"
                  className="bg-neutral-900 border-neutral-800"
                />
                <Input
                  placeholder="Enter OTP"
                  className="bg-neutral-900 border-neutral-800"
                />

                <Button className="w-full bg-neutral-800 hover:bg-neutral-700">
                  Verify OTP
                </Button>

                <p className="text-sm text-center text-neutral-400">
                  Back to{" "}
                  <button
                    onClick={() => navigate("/login")}
                    className="underline"
                  >
                    Login
                  </button>
                </p>
              </div>
            )}

            {/* FOOTER */}
            <p className="text-xs text-neutral-500 text-center">
              By continuing, you agree to Finora’s Terms & Privacy Policy
            </p>
          </CardContent>
        </Card>
      </div>

      {/* RIGHT INSPIRATION GRID (like Framer) */}
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
  );
}
