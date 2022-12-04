import React from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Stats.scss'
import { Stack } from 'react-bootstrap'

const Stats = (props) => {
  return (
    <Stack id={props.stats.statId} className="stats" lg={12} direction='vertical'>
      <Stack className='statContent' direction='horizontal'>
        <span className="statIcon">{props.stats.statIcon}</span>
        <p><span className="statCount">{props.stats.statCount}</span><br /> {props.stats.statName}</p>
      </Stack>
      <Stack className="statButton justify-content-between" direction='horizontal'>
        <p>{props.stats.buttonText}</p>
        <FontAwesomeIcon icon={faPlus} />
      </Stack> 
    </Stack>
  )
}

export default Stats