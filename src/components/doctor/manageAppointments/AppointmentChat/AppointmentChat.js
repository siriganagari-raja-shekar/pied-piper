import React from 'react'
import './AppointmentChat.scss'
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import styles from '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { useState } from 'react';
import * as appointmentService from "./../../../../services/appointmentsService";
import * as userService from "./../../../../services/userService";
import { useEffect } from 'react';
import { formatDate } from '../../../../services/utils';

const AppointmentChat = ({appointmentId}) => {

  const [appointment, setAppointment] = useState(null);
  const [user , setUser] = useState(null);

  const populateAppointment = async ()=>{
    const appointmentTemp = await appointmentService.getAppointmentById(appointmentId);
    const userTemp = userService.getUserFromLocalStorage();
    setAppointment(appointmentTemp);
    setUser(userTemp);
  }

  const refreshComments = async () =>{
    setAppointment(await appointmentService.getAppointmentById(appointmentId));
  }

  const onCommentSend = async (textContent) =>{
    const comment = {
      body: textContent,
      by: user.role,
      timePosted: JSON.stringify(new Date())
    }
    
    const updatedAppointment = await appointmentService.postAppointmentComments(appointment.id, comment);

    setAppointment(updatedAppointment);
  }
  useEffect(()=>{
    populateAppointment();
  },[])

  return (
    <div className="outer-container">
      <MainContainer>
        <ChatContainer>       
          <MessageList>
            {
              appointment
              &&
              appointment.comments.map(comment =>{
                return (
                
                  <Message model={{
                    message: comment.body,
                    direction: user.role === "doctor" ? (comment.by === "doctor" ? "outgoing" : "incoming") : (comment.by === "patient" ? "outgoing" : "incoming")
                    }}>
                      <Message.Header sentTime={formatDate(comment.timePosted, "h:mm a")}/>
                  </Message>
                )
              })
            }
            
            </MessageList>
          <MessageInput placeholder="Type message here" onSend={onCommentSend}/>
        </ChatContainer>
      </MainContainer>
    </div>
  )
}

export default AppointmentChat