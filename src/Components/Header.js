import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'
import { CryptoState } from '../CryptoContext'

function Header() {

  const {currency,setCurrency}=CryptoState();

  useEffect(() => {
    themeChange(false)
  }, [])

  return (
    <div>
      <div className="navbar bg-base-100 my-2">
        <div className="flex-1">

        <Link to='/' className="btn btn-ghost normal-case text-xl lg:text-3xl"><span className='text-amber-500'>Crypto</span>Hunter<span className='text-amber-500'>.</span></Link>
        

        </div>

        <select className="select select-bordered w-[92px] mr-5" data-choose-theme>
        <option disabled value="">
          Pick a theme
        </option>

        <option value="halloween">Dark</option>
        <option value="cupcake">Light</option>
        <option value="coffee">Dark Alt</option>
        <option value="garden">Light Alt</option>
        </select>


        <div className="flex-none mr-1">

            <select className="select select-bordered w-full max-w-xs" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
              <option>INR</option>
              <option>USD</option>
            </select>

        </div>
      </div>
    </div>
  )
}

export default Header