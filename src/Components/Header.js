import React from 'react'
import { Link } from 'react-router-dom'
import { CryptoState } from '../CryptoContext'

function Header() {
  const {currency,setCurrency}=CryptoState();
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
        <Link to='/' className="btn btn-ghost normal-case text-xl"><span className='text-yellow-400'>Crypto</span>Hunter<span className='text-yellow-400'>.</span></Link>
        </div>
        <div className="flex-none">
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