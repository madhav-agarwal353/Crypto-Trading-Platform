import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSelector } from "react-redux";
const Profile = () => {
  const auth = useSelector(state => state.auth);
  const user = auth.user;
  const [twoStep, setTwoStep] = useState(true);

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Profile Card */}
        <Card className="rounded-2xl border border-blue-600/20
bg-gradient-to-r from-blue-950/60 via-slate-900/70 to-neutral-950/85
backdrop-blur-xl shadow-xl shadow-black/60
">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24 ring-2 ring-blue-500/50">
                <AvatarImage src="https://i.pravatar.cc/150?img=3" alt="John Doe" />
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-black text-gray-100 text-xl">
                  JD
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-xl font-semibold text-gray-100">{user.name}</h2>
                <p className="text-sm text-gray-400">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 text-sm text-gray-300">
              {/* {user.city && <p><span className="text-gray-400">City:</span> {user.city}</p>} */}
              {/* {user.dateOfBirth && <p><span className="text-gray-400">Date of Birth:</span> {user.dateOfBirth}</p>} */}
              {/* {user.postcode && <p><span className="text-gray-400">Postcode:</span> {user.postcode}</p>} */}
              {/* {user.country && <p><span className="text-gray-400">Country:</span> {user.country}</p>} */}
              {user.mobileNo && <p><span className="text-gray-400">Phone Number:</span> {user.mobileNo}</p>}
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className=" rounded-2xl border border-blue-600/20
bg-gradient-to-r from-blue-950/60 via-slate-900/70 to-neutral-950/85
backdrop-blur-xl shadow-xl shadow-black/60
">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">Security Settings</h3>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-200">Two-Step Verification</p>
                <p className="text-sm text-gray-400">
                  {twoStep ? "Enabled" : "Disabled"}
                </p>
              </div>
              <Switch checked={twoStep} onCheckedChange={setTwoStep} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-200">Change Password</p>
                <p className="text-sm text-gray-400">Update your account password</p>
              </div>
              <Button
                variant="outline"
                className="border-white/20 text-gray-200 hover:bg-white/10"
              >
                Change
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="rounded-2xl border border-blue-600/20
bg-gradient-to-r from-blue-950/60 via-slate-900/70 to-neutral-950/85
backdrop-blur-xl shadow-xl shadow-black/60
">
          <CardContent className="p-6 space-y-4">
            <h3 className="text-lg font-semibold text-gray-100">Account</h3>

            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-200">Account Status</p>
              <span className="text-sm font-medium text-blue-400">Active</span>
            </div>

            <div className="flex items-center justify-between">
              <p className="font-medium text-gray-200">Delete Account</p>
              <Button
                variant="destructive"
                className="bg-red-500/80 hover:bg-red-500"
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

      </div>
    </div >
  );
};

export default Profile;