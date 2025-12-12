import React from 'react'
import Index from '../../Index'
import HeaderLogo from "../../../assets/png/headerLogo.png"
import { NavLink } from 'react-router-dom'
const Header = () => {
  return (
    <Index.Box className="header-box">
        <Index.Box><img className='header-logo' src={HeaderLogo} alt=''/></Index.Box>
        <Index.Box>
            <ul className='header-links'>
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="/create-task">Create Task</NavLink></li>
                <li><NavLink to="/recipes">Recipes</NavLink></li>
            </ul>
        </Index.Box>
    </Index.Box>
  )
}

export default Header