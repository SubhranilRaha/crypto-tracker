import React from 'react'
import { Link } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'
import { useEffect } from 'react'
import { themeChange } from 'theme-change'

function Header() {
  useEffect(() => {
    themeChange(false)
  }, [])
  const {currency,setCurrency}=CryptoState();
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
        <Link to='/' className="btn btn-ghost normal-case text-xl lg:text-3xl"><span className='text-yellow-400'>Crypto</span>Hunter<span className='text-yellow-400'>.</span></Link>
        </div>
        <select className="select select-bordered max-w-xs mr-5" data-choose-theme>
        <option disabled value="">
          Pick a theme
        </option>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="bumblebee">Light Alt</option>
        <option value="halloween">Dark Alt</option>
        </select>
        <div className="flex-none mr-5">
            <select className="select select-bordered w-full max-w-xs" value={currency} onChange={(e)=>setCurrency(e.target.value)}>
              {console.log(currency)}
              <option>INR</option>
              <option>USD</option>
            </select>
        </div>
      </div>
    </div>
  )
}

export default Header