import React from 'react'
import './Vitals.scss'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Stack } from 'react-bootstrap'

const Vitals = (props) => {
  return (
    <Stack  id="vitals" direction='horizontal' gap={4} className='align-items-stretch'>
      {
        props.vitals.map((vital) => {
          return (
            <Stack key={vital.name} className='vital' direction='vertical'>
              <Stack className="values" direction='horizontal'>
                <span className="vitalLogo"> {vital.logo}</span>
                <p>{vital.value}<span>{vital.measure}</span></p>
              </Stack>
              <h3>{vital.name}</h3>
              <p className='vitalDesc'>{vital.desc}</p>
            </Stack>
          )
        })
      }
      <div id="addVital">
        <button><FontAwesomeIcon icon={faPlus} /></button>
      </div>
    </Stack>
  )
}

export default Vitals