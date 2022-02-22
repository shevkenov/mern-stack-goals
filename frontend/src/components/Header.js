import React from 'react'
import {FaSignOutAlt, FaSignInAlt, FaUserAlt} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <div className="logo">
            <Link to="/">
                GoalsSetter
            </Link>
        </div>
        <ul>
            <li>
                <Link to="/login">
                    <FaSignInAlt /> Login
                </Link>
            </li>
            <li>
                <Link to="/register">
                    <FaUserAlt/> Register
                </Link>
            </li>
            <li>
                <Link to="/signout">
                    <FaSignOutAlt /> Signout
                </Link>
            </li>
        </ul>
    </div>
  )
}

export default Header