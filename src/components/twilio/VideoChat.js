import axios from 'axios';
import React, { useState, useCallback } from 'react';
import { useEffect } from 'react';
import { getStoredUser } from '../../services/authService';
import Room from './Room';

const VideoChat = ({ appointment }) => {
    const [username, setUsername] = useState('');
    const [roomName, setRoomName] = useState('');
    const [token, setToken] = useState(null);

    const createToken = async () => {
        const storedUserName = getStoredUser()
        setUsername(storedUserName.name)
        setRoomName(appointment)
        const res = await axios.post("https://pied-piper-twilio-2284-dev.twil.io/token", {
            identity: storedUserName.name,
            room: appointment
        });
        const data = res.data;
        setToken(data.accessToken);
    }

    useEffect(() => {
        createToken()
    }, [])

    const handleLogout = useCallback(event => {
        setToken(null);
    }, []);

    let render;
    if (token) {
        render = (
            <Room roomName={roomName} token={token} handleLogout={handleLogout} />
        );
    }
    return render;
}

export default VideoChat;
