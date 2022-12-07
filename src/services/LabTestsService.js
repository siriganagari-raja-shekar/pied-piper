import axios from 'axios'
import { getActiveToken } from './authService'

export const saveLabTest = async (tests, appointmentId) => {
    const token = getActiveToken()
    const labtests = {
        labs: tests
    }
    
    var config = {
        method: 'put',
        url: `${process.env.REACT_APP_APPOINTMENTS}/${appointmentId}/labs`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: labtests
    }
    
    axios(config)
        .then(function (response) {
            //console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}