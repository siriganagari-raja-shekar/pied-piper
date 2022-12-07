import axios from 'axios'
import { getActiveToken } from './authService'

export const savePrescription = async (diagnosis, meds, appointmentId) => {
    const token = getActiveToken()
    const prescription = {
        problemDiagnosed: diagnosis,
        meds: null
    }
    const updatedMeds = meds.map(med => {
        //delete med.id
        return med
    })
    prescription.meds = updatedMeds
    
    var config = {
        method: 'put',
        url: `${process.env.REACT_APP_APPOINTMENTS}/${appointmentId}/prescription`,
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        data: prescription
    }
    
    axios(config)
        .then(function (response) {
            //console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });

}