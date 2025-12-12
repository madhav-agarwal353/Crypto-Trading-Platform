import React from 'react'
import { House, BriefcaseBusiness, EyeClosed, Activity, BanknoteArrowUp, UserRoundPen, LogOut, BadgeCent, ChevronRight } from 'lucide-react';
import { SheetClose } from './ui/sheet';
const menu = [
  { name: "Home", path: "/home", icon: <House /> },
  { name: "Portfolio", path: "/portfolio", icon: <BriefcaseBusiness /> },
  { name: "WatchList", path: "/watchlist", icon: <EyeClosed /> },
  { name: "Activity", path: "/activity", icon: <Activity /> },
  { name: "Payment Details", path: "/activity", icon: <BadgeCent /> },
  { name: "Withdrawal", path: "/activity", icon: <BanknoteArrowUp /> },
  { name: "Profile", path: "/activity", icon: <UserRoundPen /> },
  { name: "Logout", path: "/activity", icon: <LogOut /> }
]


const Sidebar = () => {
  return (
    <div className="h-full w-full flex flex-col items-center py-0">
      {menu.map((item, index) => (
        <SheetClose key={index}>
          <button
            className="
        flex items-center justify-between w-88
        px-5 py-4 my-3
        text-white
        rounded-2xl
        bg-white/10            
        backdrop-blur-lg        
        border border-white/20  
        shadow-lg shadow-black/20
        hover:bg-white/20
        hover:border-white/30
        transition-all duration-300">
            <div className="flex items-center gap-3">
              <span className="text-xl">{item.icon}</span>
              <p className="text-base font-medium">{item.name}</p>
            </div>

            <ChevronRight className="opacity-70" />
          </button>


        </SheetClose>
      ))}
    </div>

  );
};


export default Sidebar
