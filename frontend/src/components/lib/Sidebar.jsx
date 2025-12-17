import React from 'react'
import { House, BriefcaseBusiness, EyeClosed, Activity, BanknoteArrowUp, UserRoundPen, LogOut, BadgeCent, ChevronRight } from 'lucide-react';
import { SheetClose } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
const menu = [
  { name: "Home", path: "/", icon: <House /> },
  { name: "Portfolio", path: "/portfolio", icon: <BriefcaseBusiness /> },
  { name: "WatchList", path: "/watchlist", icon: <EyeClosed /> },
  { name: "Activity", path: "/activity", icon: <Activity /> },
  { name: "Payment Details", path: "/payment-details", icon: <BadgeCent /> },
  { name: "Withdrawal", path: "/withdrawal", icon: <BanknoteArrowUp /> },
  { name: "Profile", path: "/profile", icon: <UserRoundPen /> },
  { name: "Logout", path: "/activity", icon: <LogOut /> }
]


const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className=" w-full flex flex-col items-center py-0 h-96">
      {menu.map((item, index) => (
        <SheetClose key={index}>
          <button
            onClick={() => navigate(item.path)}
            className="group
    flex items-center justify-between w-88
    px-5 py-4 my-3
    rounded-2xl
    bg-white/5
    backdrop-blur-lg
    shadow-lg shadow-black/20
    hover:bg-white/20
    hover:border-white/30
    hover:scale-[1.01]
    transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="
      text-xl
      text-muted-foreground
      group-hover:text-primary
      transition-colors">
                {item.icon}
              </span>

              <p className="text-base font-medium text-foreground">
                {item.name}
              </p>
            </div>

            <ChevronRight className="opacity-70 text-muted-foreground" />
          </button>
        </SheetClose>
      ))}
    </div>

  );
};


export default Sidebar
