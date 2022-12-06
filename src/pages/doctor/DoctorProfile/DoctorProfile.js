import React, {useEffect, useState} from 'react'
import { Stack } from 'react-bootstrap';
import NavBar from '../../../components/commonComponents/NavBar/NavBar';
import { doctorNavLinks } from '../properties/doctorNavLinks';
import * as userService from './../../../services/userService.js';
import ProfileCard from '../../../components/commonComponents/ProfileCard/ProfileCard';


const DoctorProfile = () => {

    const [user, setUser] = useState(null);

    const updateUserFromStorage = () => {
        setUser(userService.getUserFromLocalStorage());
    }
    useEffect(()=>{
       updateUserFromStorage();
    }, []);
    
    return (
        
        <Stack id="dashboard" direction='horizontal' gap={3} className='justify-content-between'>
            <NavBar links={doctorNavLinks} />
            {
                user
                &&
                <Stack direction="vertical" gap={3} className="justify-content-between">
                    <ProfileCard user={user} />
                </Stack>
            }
            
        </Stack>
        
    );
}


export default DoctorProfile;