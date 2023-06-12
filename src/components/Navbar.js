import React from 'react';
import '../App';
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <div className='navbar'>
        <div>
            <h1>React University App</h1>
        </div>
        <div>
          <Link className='link1' to="/favourite"><h3>Your Favourites</h3></Link>  
        </div>     
    </div>
  )
}

export default Navbar;