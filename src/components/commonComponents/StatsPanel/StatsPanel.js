import React from 'react'
import Stats from '../Stats/Stats'
import { Stack } from 'react-bootstrap'

const StatsPanel = ({stats}) => {
    return (
        <Stack direction='horizontal' gap={3} 
        className='
        justify-content-between
        flex-xl-nowrap
        flex-wrap
        '>
            {stats.map((stat)=> <Stats key={stat.statId} stats={stat} />)}
        </Stack>
    )
}

export default StatsPanel