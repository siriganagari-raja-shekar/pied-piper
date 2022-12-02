import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.scss"

const activeLink = (isActive) => {
    return isActive.isActive ? 'selected' : ''
}

const NavBar = (props) => {
    return (
        <>
            <div id="navbar">
                <div id="header">
                    <p id="logo">PP</p> <p id="title">PiedPiper</p>
                </div>
                <ul>
                    {
                        props.links.map((link) => {
                            return (
                                <li key={link.name}>
                                    <NavLink className={activeLink} to={link.url} >{link.icon}<span>{link.name}</span></NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </>
    )
}

export default NavBar