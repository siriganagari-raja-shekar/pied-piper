import React from 'react'
import './Vitals.scss'
import {faPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Vitals = (props) => {
  return (
    <div id="vitals">
        <div id="vitals">
                          {
                            props.vitals.map((vital)=>{
                                return (
                                    <div className='vital'>
                                        <div className="values">
                                            <span className="vitalLogo"> {vital.logo}</span>
                                            <p>{vital.value}<span>{vital.measure}</span></p>
                                        </div>
                                        <h3>{vital.name}</h3>
                                        <p>{vital.desc}</p>
                                    </div>
                                )
                            })
                          }
                          <div id="addVital">
                                <button><FontAwesomeIcon icon={faPlus}/></button>
                          </div>
                    </div>
    </div>
  )
}

export default Vitals