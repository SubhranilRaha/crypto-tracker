import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { TrendingCoins } from '../Config/api'
import { CryptoState } from "../CryptoContext.js";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { Link } from 'react-router-dom'

export function numberWithCommas(x){
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",");
}

export function profitorlosscolor(profit){
  if(profit) <span className='text-green-600'></span>
  else <span className='text-red-600'></span>
}

const Caraousel = () => {

    const [trending,setTrending]=useState([])
    const {currency,symbol}=CryptoState();

    const fetchTrendingCoins=async()=>{
        const {data}=await axios.get(TrendingCoins(currency));
        setTrending(data);
        console.log(trending);
    }

    useEffect(()=>{
        fetchTrendingCoins();
    },[currency]);

    const responsive={
      0:{items:3,},
      512:{items:5,}
    }

    const items=trending.map((coin) =>  {

      let profit=coin.market_cap_change_percentage_24h>=0;

    

      return(
      <Link className='flex flex-col items-center gap-2 cursor-pointer mx-5' to={`/coin/${coin.id}`}>
        <img className='h-20' src={coin.image} alt={coin.name} />
        <span>
        {coin.symbol}
          {profit?<span className='text-green-500'>&nbsp;{profit && "+"}{coin.market_cap_change_percentage_24h.toFixed(2)}%</span>
          :<span className='text-red-500'>&nbsp;{profit && "+"}{coin.market_cap_change_percentage_24h.toFixed(2)}%</span>}
        </span>
        <span className='text-xs'>
        {symbol} {numberWithCommas(coin.current_price.toFixed(2))}
        </span>
      </Link>
      )
    })

  return (
    <div className='flex align-center mt-5 w-[380px]'>
      <AliceCarousel
      mouseTracking
      infinite
      autoPlayInterval={1000}
      animationDuration={1500}
      disableDotsControls
      responsive={responsive}
      disableButtonsControls
      autoPlay
      items={items}
      />
    </div>
  )
}

export default Caraousel