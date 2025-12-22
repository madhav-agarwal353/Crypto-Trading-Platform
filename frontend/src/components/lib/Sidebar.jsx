import React from 'react'
import { House, BriefcaseBusiness, EyeClosed, Activity, BanknoteArrowUp, UserRoundPen, LogOut, BadgeCent, ChevronRight } from 'lucide-react';
import { SheetClose } from '@/components/ui/sheet';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/Auth/Action';
const menu = [
  { name: "Home", path: "/", icon: <House /> },
  { name: "Portfolio", path: "/portfolio", icon: <BriefcaseBusiness /> },
  { name: "WatchList", path: "/watchlist", icon: <EyeClosed /> },
  { name: "Activity", path: "/activity", icon: <Activity /> },
  { name: "Payment Details", path: "/payment-details", icon: <BadgeCent /> },
  { name: "Withdrawal", path: "/withdrawal", icon: <BanknoteArrowUp /> },
  { name: "Profile", path: "/profile", icon: <UserRoundPen /> },
  { name: "Logout", path: "/login", icon: <LogOut /> }
]


const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
  }
  return (
    <div className=" w-full flex flex-col items-center py-0 h-full overflow-y-scroll scrollbar-dark scroll-smooth">
      {menu.map((item, index) => (
        <SheetClose key={index} asChild>
          <button
            onClick={() => {
              if (item.name === "Logout") {
                handleLogout();
              }
              navigate(item.path)
            }}

            className="
  group
  flex items-center justify-between
  w-84
  px-5 py-4 my-3
  rounded-2xl

  /* Ultra-subtle glass base */
  bg-white/[0.04]
  backdrop-blur-xl
  border border-white/10

  /* Left-to-right soft tint */
  relative
  before:absolute before:inset-0 before:rounded-2xl
  before:bg-gradient-to-r
  before:from-primary/15
  before:via-transparent
  before:to-transparent
  before:opacity-40
  before:pointer-events-none

  /* Depth */
  shadow-lg shadow-black/30

  /* Interaction */
  hover:bg-white/[0.07]
  hover:border-white/20
  hover:scale-[1.01]
  active:scale-[0.98]

  transition-all duration-300 ease-out
"

          >
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
