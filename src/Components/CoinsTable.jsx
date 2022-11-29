import React, { useEffect, useState } from "react";
import axios from "axios";
import { CoinList } from "../Config/api";
import { CryptoState } from "../CryptoContext";
import { Link } from 'react-router-dom'

const CoinsTable = () => {
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    
    const { currency, symbol } = CryptoState();


    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        console.log(data);
    
        setCoins(data);
        setLoading(false);
      };
    
      useEffect(() => {
        fetchCoins();
      }, [currency]);

      const filteredCoins = coins.filter(coin=>
        coin.name.toLowerCase().includes(search.toLowerCase())||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
        )
        
  return (
    <div className='relative top-10 lg:top-20 '>
       <h1 className="w-screen flex justify-center font-bold text-3xl text-center ">Cryptocurrency Prices by Market Cap</h1>
        <form className="flex items-center justify-center mt-3">   
        <input type="text" id="" className="p-2 pl-5 rounded-lg w-full mx-5 max-w-[700px]" placeholder="Search Coin" required onChange={(e)=>setSearch(e.target.value)}/>
        <button type="submit" className="mr-6">
        <svg className="w-7 h-7" fill="none" stroke="#f59e0a" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </button>
        </form>

        {filteredCoins.map(coin => {
        return (
        <Link className='cursor-pointer' to={`/coin/${coin.id}`}>
          <Coin
          key={coin.id}
          name={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          volume={coin.total_volume}
          price={coin.current_price}
          priceChange={coin.price_change_percentage_24h}
          marketcap={coin.market_cap}
           />
        </Link>
        );
      })}
    </div>
  )
}

export default CoinsTable

const Coin = ({image,name,symbol,price,volume,priceChange,marketcap}) => {
    return (
        <div className="border border-yellow-600 m-10 rounded-3xl h-52">
         <div className="flex justify-around h-[200px] items-center">
             <div className="w-24 h-full flex flex-col items-center justify-center ml-2">
                 <img src={image} alt="crypto" />
                 <p className="font-extrabold">{symbol.toUpperCase()}</p>
             </div>
             
            <div className="">
             <h1 className="font-extrabold mb-2">{name}</h1>
             <p className="font-bold text-sm antialiased italic">Price:</p>
             <p className="">₹{price}</p>
             <p className="font-bold text-sm antialiased italic mt-1">Mkt Cap: </p>
             <p>{marketcap.toLocaleString()}</p> 
             <p className="font-bold text-sm antialiased italic mt-1">24hr change:</p>
              { priceChange<0?(
              <p className="text-red-500">{priceChange.toFixed(2)}%</p> 
              ):
              (<p className="text-green-500">+{priceChange.toFixed(2)}%</p>)
              }
            </div>
         </div>
        </div>
    )
}