import axios from 'axios';
import React, { useState } from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import CoinInfo from '../Components/CoinInfo';
import { SingleCoin } from '../Config/api';
import { CryptoState } from '../CryptoContext';



const Coinpage = () => {
  const {id}=useParams();
  const [coin,setCoin]=useState();


const {currency,symbol}=CryptoState();

const fetchCoin=async()=>{
  const {data}=await axios.get(SingleCoin(id));
  setCoin(data);
}

useEffect(()=>{
  fetchCoin();
},[]);

console.log(coin)

  return (
    <div className='flex flex-col lg:flex-row items-center '>
      <div className='lg:w-1/3 h-[600px] flex-col justify-center lg:border-r-2 lg:border-r-yellow-500 '>
        {/* sidebar */}
      <img src={coin?.image} alt={coin.name} />
      {coin.name}
      {coin.description.en.split(". ")[0]}
      </div>
      {/* chart */}
      <CoinInfo coin={coin}/>
    </div>
  )
}

export default Coinpage