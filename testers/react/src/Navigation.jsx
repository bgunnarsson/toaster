import React from 'react'
import { NavLink } from 'react-router-dom'

function Navigation() {
  return (
    <nav className="navigaiton">
      <ul>
        <li>
          <NavLink to="/">Basic usage</NavLink>
        </li>
        <li>
          <NavLink to="/advanced">Advanced usage</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
