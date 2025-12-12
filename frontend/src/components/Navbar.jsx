import React from 'react'
import { ChevronRight } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MagnifyingGlassIcon } from "@radix-ui/react-icons"
import Sidebar from './Sidebar';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const Navbar = () => {
    return (
        <div className='px-2 py-3 bg-gray-950 bg-opacity-0
        sticky top-0 left-0 right-0 flex justify-between items-center'>

            <div className='flex items-center gap-3'>
                <Sheet className=' bg-gray-900'>
                    <SheetTrigger>
                        <div className="h-10 w-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition">
                            <ChevronRight className="h-9 text-white" />
                        </div>
                    </SheetTrigger>
                    <SheetContent
                        className="w-96 flex flex-col h-full"
                        side="left">
                        <SheetHeader className='pt-6 pb-0'>
                            <SheetTitle className="flex items-center gap-6">
                                <Avatar className="h-14 w-14">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                </Avatar>
                                <span className="font-semibold text-2xl tracking-wide">
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
                <div className='p-0 ml-9'>
                    <input type="text" placeholder='' />
                </div>
            </div>
        </div>
    )
}

export default Navbar
