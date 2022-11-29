import React from 'react'
import ban from './banner.jpg'
import Caraousel from './Caraousel'

const Banner = () => {
  return (
    <div className='relative'>   
            <div className='z-50 relative'>
                <div className='w-full flex flex-col justify-start items-center'>
                    <h1 className='text-white font-extrabold text-[40px] mt-5'>Trending Cryptos</h1>
                    <h2 className='text-gray-600 mt-1 text-[10px]'>Get all the information regarding your favorite crypto currency</h2>
                    <Caraousel/>
                </div>
            </div> 
            <img src={ban} alt="banner" className='w-full absolute top-0 z-0 max-h-80 object-none'/>   
    </div>
  )
}

export default Banner