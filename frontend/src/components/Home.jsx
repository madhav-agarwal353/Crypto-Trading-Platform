import React from 'react'
import { Button } from './ui/button'
import CoinsTable from '@/components/CoinsTable'
import Chart from '@/components/Chart'
import { useState } from 'react'

const Home = () => {

    const [category, setcategory] = useState("all")

    const handleCategory = (value) => {
        setcategory(value);
    }


    return (
        <div className='h-full relative'>
            <div className="left lg:flex ">
                <div className='lg:w-[50%] border-r'>
                    <div className='p-3 flex items-center gap-4'>
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
                <div className='hidden lg:block lg:w-[50%] p-5'>
                    <Chart />
                </div>
            </div>
        </div>
    )

}

export default Home
