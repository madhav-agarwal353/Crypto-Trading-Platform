import React from 'react'
import { Button } from '../ui/button'
import CoinsTable from '@/components/lib/CoinsTable'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Chart from '@/components/lib/Chart'
import { useState } from 'react'

const Home = () => {

    const [category, setcategory] = useState("all")

    const handleCategory = (value) => {
        setcategory(value);
    }


    return (
        <div className='relative'>
            <div className="lg:flex ">
                <div className='lg:w-[50%] border-r px-5 h-[calc(100vh-64px)] overflow-y-scroll scrollbar-dark
  scroll-smooth
'>
                    <div className='p-7 flex items-center gap-4'>
                        <Button
                            onClick={() => handleCategory("all")} variant={category == 'all' ? "default" : "outline"}>All</Button>
                        <Button
                            onClick={() => handleCategory("top50")} variant={category == 'top50' ? "default" : "outline"}>Top 50</Button>
                        <Button
                            onClick={() => handleCategory("gainer")} variant={category == 'gainer' ? "default" : "outline"}>Top Gainer</Button>
                        <Button
                            onClick={() => handleCategory("loser")} variant={category == 'loser' ? "default" : "outline"}>Top Loser</Button>
                    </div>
                    <CoinsTable />
                </div>
                <div className='hidden lg:block lg:w-[50%] p-7 h-[calc(100vh-64px)]'>
                    <Chart />
                    <div className='flex gap-2 h-10'>
                        <div>
                            <Avatar className='h-15 w-15'>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex items-center gap-2'>
                                <p>BTN</p>
                                <p className='text-gray-400'>Bitcoin</p>
                            </div>
                            <div className='flex items-end gap-2'>
                                <p className='text-xl font-bold'>
                                    5327283
                                </p>
                                <p className='text-red-600'>
                                    <span>-1319049822.578</span>
                                    <span>(-028803%)</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <section className='absolute bottom-5 right-5 z-40 flex flex-col
             justify-end items-end gap-2'>

                <div className='relative w-40 cursor-pointer group'>
                     <Button className="w-full h-[3rem] gap-2 items-center" >
                        ChatBot
                     </Button>
                </div>
            </section> */}
        </div>
    )

}

export default Home
