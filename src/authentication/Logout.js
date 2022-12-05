import React from 'react'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

const Logout = () => {

    useEffect(() => {
        localStorage.clear();
    })

    return (
        <Navigate to='/signin' />
    )
}

export default Logout