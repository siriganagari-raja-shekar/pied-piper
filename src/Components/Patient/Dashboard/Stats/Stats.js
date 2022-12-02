import React from 'react'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Stats.scss'

const Stats = (props) => {
  return (
    <div id={props.stats.statId} className="stats">
      <div className='statContent'>
        <span className="statIcon">{props.stats.statIcon}</span>
        <p><span className="statCount">{props.stats.statCount}</span><br /> {props.stats.statName}</p>
      </div>
      <div className="statButton">
        <p>{props.stats.buttonText}</p>
        <FontAwesomeIcon icon={faPlus} />
      </div>
    </div>
  )
}

export default Stats