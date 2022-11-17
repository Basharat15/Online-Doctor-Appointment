import AppointmentClass from "../../models/Appointments";
export const APPOINTMENT = 'APPOINTMENT';
export const SET_APPOINTMENT = 'SET_APPOINTMENT';
export const DELETE_APPOINTMENT = 'DELETE_APPOINTMENT';
export const DELETE_DOCTOR_APPOINTMENT = 'DELETE_DOCTOR_APPOINTMENT';


export const fetchAppointments = () => {
    return async (dispatch, getState) => {
        userId = getState().patientAuth.userId;
        duserId = getState().doctorAuth.userId;
        try {
            //you can execute any async code here what you want
            const response = await fetch('https://medicare-2b015-default-rtdb.firebaseio.com/Appointments.json')
            const resData = await response.json();

            if (!response.ok) {
                throw new Error('Something went wrong!')
            }

            const loadedAppointments = [];
            for (const key in resData) {
                loadedAppointments.push(new AppointmentClass(
                    key,
                    resData[key].ownerId,
                    resData[key].docOwnerId,
                    resData[key].docTitle,
                    resData[key].docCategory,
                    resData[key].docImageUrl,
                    resData[key].name,
                    resData[key].age,
                    resData[key].problem,
                    resData[key].phoneNum,
                    resData[key].time,
                    resData[key].date
                ))
            }
            
            dispatch({
                type: SET_APPOINTMENT,
                appointments: loadedAppointments.filter(doc => doc.ownerId === userId),
                doctorAppointments: loadedAppointments.filter(doc => doc.docOwnerId === duserId)
            });


        } catch (err) {
            //you  can also send to analytics server
            throw new Error;
        }


    };
};
//Deleting patient Appointment
export const deleteAppointment = appointmentId => {
    return async (dispatch, getState) => {
        token = getState().patientAuth.token;

           
           await fetch(
                  `https://medicare-2b015-default-rtdb.firebaseio.com/Appointments/${appointmentId}.json?auth=${token}`,
                  {
                         method: 'DELETE'
                  }
           );
                  console.log(appointmentId)
           dispatch({ type: DELETE_APPOINTMENT, apmtId: appointmentId });
    };
};
//Deleting Doctor Appointment
export const deleteDoctorAppointment = appointmentId => {
    return async (dispatch, getState) => {
        token = getState().doctorAuth.token;
           
           await fetch(
                  `https://medicare-2b015-default-rtdb.firebaseio.com/Appointments/${appointmentId}.json?auth=${token}`,
                  {
                         method: 'DELETE'
                  }
           );
                  console.log(appointmentId)
           dispatch({ type: DELETE_APPOINTMENT, apmtId: appointmentId });
    };
};
//Creating Appointment
export const Appointment = (docOwnerId, docTitle, docCategory, docImageUrl, name, age, problem, phoneNum, time, date) => {
    return async (dispatch, getState) => {
        try {
            token = getState().patientAuth.token;
            userId = getState().patientAuth.userId;
            const date = new Date();
            const response = await fetch(`https://medicare-2b015-default-rtdb.firebaseio.com/Appointments.json?auth=${token}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        docOwnerId,
                        docTitle,
                        docCategory,
                        docImageUrl,
                        name,
                        age,
                        problem,
                        phoneNum,
                        time,
                        ownerId: userId,
                        date: date.toISOString()
                    })
                }
            );

            const resData = await response.json();

            dispatch({
                type: APPOINTMENT,
                Id: resData.name,
                docOwnerId,
                docTitle,
                docCategory,
                docImageUrl,
                name,
                age,
                problem,
                phoneNum,
                time,
                ownerId: userId,
                date: date
            });

        } catch (err) {
            console.log(err)
        }
    };
};



