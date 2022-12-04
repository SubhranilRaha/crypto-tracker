import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import { Link } from 'react-router-dom'

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  
const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const { currency, symbol } = CryptoState();

    
    const fetchCoins = async () => {
        const { data } = await axios.get(CoinList(currency));
        console.log(data);
        setCoins(data);
      };
    
      useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [currency]);

      const filteredCoins = coins.filter(coin=>
        coin.name.toLowerCase().includes(search.toLowerCase())||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
        
  return (
    <div className='relative top-10 lg:top-20 '>
       <div className="hidden">{currency}</div>
       <h1 className="w-screen flex justify-center font-bold text-3xl text-center ">Cryptocurrency Prices by Market Cap</h1>
        <form className="flex items-center justify-center mt-3">   
        <input type="text" id="" className="p-2 pl-5 rounded-lg w-full mx-5 max-w-[700px]" placeholder="Search Coin" required onChange={(e)=>setSearch(e.target.value)}/>
        <button type="submit" className="mr-6">
        <svg className="w-7 h-7" fill="none" stroke="#f59e0a" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
        </form>

        {filteredCoins.slice((page-1)*10,(page-1)*10+10).map(coin => {
        return (
        <Link className='cursor-pointer' to={`/coin/${coin.id}`}>
          <div className="hover:scale-105 transition duration-150 ease-in-out">
         <div className="m-10 lg:py-16 rounded-3xl border border-yellow-600 flex justify-around h-[200px] items-center lg:h-[100px]">
             <div className="w-24 h-full flex flex-col items-center justify-center ml-2 lg:flex-row gap-5 lg:w-20 lg:mx-14">
                 <img src={coin.image} alt="crypto" />
                 <p className="font-extrabold">{coin.symbol.toUpperCase()}</p>
             </div>
            <div className="lg:flex lg:flex-row lg:gap-10 lg:w-[700px]">
            <div className="flex lg:justify-center lg:items-center">
            <h1 className="font-extrabold mb-2 lg:mb-0 lg:w-[200px]">{coin.name}</h1>
            </div>
             <div className="lg:text-center lg:w-[200px]">
             <p className="font-bold text-sm antialiased italic">Price:</p>
             <p className="">{symbol}{numberWithCommas(coin.current_price.toFixed(2))}</p>
             </div>
             <div className="lg:text-center lg:w-[200px]">
             <p className="font-bold text-sm antialiased italic ">Mkt Cap: </p>
             <p>{symbol}{" "}{numberWithCommas(
                            coin.market_cap.toString().slice(0, -6)
                          )}
                          {" "}M</p> 
             </div>
             <div className="lg:text-center lg:w-[200px]">
             <p className="font-bold text-sm antialiased italic ">24hr change:</p>
              { coin.price_change_percentage_24h<0?(
              <p className="text-red-500">{coin.price_change_percentage_24h.toFixed(2)}%</p> 
              ):
              (<p className="text-green-500">+{coin.price_change_percentage_24h.toFixed(2)}%</p>)
              }
             </div>
            </div>
         </div>
        </div>
        </Link>
        );
      })}
    <div class="btn-group flex justify-center items-center my-10 gap-1 ">
    <button class=" text-yellow-500 p-3 rounded-xl active:scale-95 w-16">{"<<"}</button>
    <button class="p-3 rounded-full active:scale-95 w-10">{1}</button>
    <button class="p-3 rounded-full active:scale-95 w-10">{2}</button>
    <button class="p-3 rounded-full active:scale-95 w-10">{3}</button>
    <button class="p-3 rounded-full active:scale-95 w-10">{"..."}</button>
    <button class="p-3 rounded-full active:scale-95 w-10">{(filteredCoins.length/10).toFixed(0)}</button>
    <button class=" text-yellow-500 p-3 rounded-xl active:scale-95 w-16">{">>"}</button>
    </div>
    <div className="h-1"></div>
    </div>
  )
}

export default CoinsTable

