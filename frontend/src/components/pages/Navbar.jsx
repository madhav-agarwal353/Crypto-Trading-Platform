import React, { use } from 'react'
import { ChevronRight } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import Sidebar from '@/components/lib/Sidebar';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
const Navbar = () => {
    const auth = useSelector(state => state.auth);
    const name = (auth.user).name;
    return (
        <div className='px-5 py-3 bg-gray-950 bg-opacity-1 z-10
        sticky top-0 left-0 right-0 flex justify-between items-center h-17'>
            <div className='flex gap-30 items-center'>
                <Sheet>
                    <SheetTrigger>
                        <div className="h-10 w-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition">
                            <ChevronRight className="h-9 text-white" />
                        </div>
                    </SheetTrigger>
                    <SheetContent
                        className="w-96 flex flex-col h-full"
                        side="left">
                        <SheetHeader className='pt-6 pb-0'>
                            <SheetTitle className="flex items-center gap-2">
                                <Avatar className="h-14 w-14">
                                    <AvatarImage
                                        src="/favicon.ico"
                                        className="scale-78"
                                    />

                                </Avatar>
                                <span className="text-white text-3xl md:text-4xl font-normal tracking-tight font-brand transition-opacity duration-300 hover:opacity-80">
                                    FINORA
                                </span>

                            </SheetTitle>
                        </SheetHeader>
                        <Sidebar />
                    </SheetContent>
                </Sheet>
                <span className='text-sm lg:text-base cursor-pointer'>
                    FINORA
                </span>
                <div className="flex w-full max-w-sm items-center gap-2">
                    <Input type="text" placeholder="Search" />
                    <Button type="submit" variant="outline">
                        Search
                    </Button>
                </div>
            </div>
            <Avatar>
                {/* <AvatarImage></AvatarImage> */}
                <AvatarFallback>
                    {name.charAt(0).toUpperCase() + name.split(" ")[1].charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}

export default Navbar
