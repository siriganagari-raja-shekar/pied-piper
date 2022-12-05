import axios from 'axios';
import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';

const VideoChat = () => {
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [token, setToken] = useState(null);

    const handleUsernameChange = useCallback(event => {
        setUsername(event.target.value);
    }, []);
    
    const handleRoomNameChange = useCallback(event => {
        setRoomName(event.target.value);
    }, []); 

    const handleSubmit = useCallback(async event => {
        event.preventDefault();
        const res = await axios.post("https://pied-piper-twilio-2284-dev.twil.io/token", {
            identity: username,
            room: roomName
        });                                     
        const data = res.data;
        setToken(data.accessToken);
    }, [username, roomName]);

    const handleLogout = useCallback(event => {
        setToken(null);
    }, []);

    let render;
    if (token) {
        console.log(token);
        render = (
            <Room roomName={roomName} token={token} handleLogout={handleLogout} />
        );
    } else {
        render = (
        <Lobby
            username={username}
            roomName={roomName}
            handleUsernameChange={handleUsernameChange}
            handleRoomNameChange={handleRoomNameChange}
            handleSubmit={handleSubmit}
        />
        );
    }
    return render;
}

export default VideoChat;
