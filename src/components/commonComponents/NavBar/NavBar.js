import React from 'react'
import { NavLink } from 'react-router-dom'
import "./NavBar.scss"
import { Stack } from 'react-bootstrap'

const activeLink = (isActive) => {
    return isActive.isActive ? 'selected' : ''
}

const NavBar = (props) => {
    return (
        <>
            <Stack id="navbar" direction='vertical'>
                <Stack id="header" direction='horizontal'>
                    <p id="logo">PP</p> <p id="title">PiedPiper</p>
                </Stack>
                <Stack id='links' direction='vertical'>
                    {
                        props.links.map((link) => {
                            return (
                                <div key={link.name}>
                                    <NavLink className={activeLink} to={link.url} >{link.icon}<span>{link.name}</span></NavLink>
                                </div>
                            )
                        })
                    }
                </Stack>
            </Stack>
        </>
    )
}

export default NavBar