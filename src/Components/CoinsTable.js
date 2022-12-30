import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import { Link } from 'react-router-dom'
import Pagination from '@mui/material/Pagination';

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
    <div className='relative top-10 lg:top-16 '>

        <form class="flex items-center justify-center flex-col gap-5 lg:flex-row lg:gap-0 lg:justify-between mx-12">   
        <h1 className="flex justify-center font-bold text-3xl top-20 text-center mt-2 ">Cryptocurrency Prices  <br className="lg:hidden" />  by Market Cap</h1>
            <div class="relative w-[300px]">
            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
            </div>
            <input type="text"  class=" text-sm rounded-lg w-full pl-10 p-2.5" placeholder="Search Coins" required onChange={(e)=>setSearch(e.target.value)}/>
            </div>
        </form>


        {filteredCoins.slice((page-1)*10,(page-1)*10+10).map(coin => {
        return (
     
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
     
        );
      })}
      <div className="flex justify-center items-center">
      <div className="bg-amber-500 py-2 rounded-xl mb-5 w-[342px] ">
      <Pagination className="flex justify-center items-center  "
          count={(filteredCoins?.length / 10).toFixed(0)}
          
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 500);
          }}
          shape="rounded"
          variant="text"
        />
      </div>
      </div>
    </div>
  )
}

export default CoinsTable