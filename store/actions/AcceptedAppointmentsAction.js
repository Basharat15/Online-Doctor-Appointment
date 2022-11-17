import AcceptedAppointmentClass from '../../models/AcceptedAppointments';
export const ACCEPTED_APPOINTMENT = 'ACCEPTED_APPOINTMENT';
export const SET_ACCEPTED_APPOINTMENT = 'SET_ACCEPTED_APPOINTMENT';

export const fetchAcceptedAppointments = () => {
           return async (dispatch, getState) => {
               userId = getState().patientAuth.userId;
               duserId = getState().doctorAuth.userId;
               try {
                   //you can execute any async code here what you want
                   const response = await fetch('https://medicare-2b015-default-rtdb.firebaseio.com/AcceptedAppointments.json')
                   const resData = await response.json();
       
                   if (!response.ok) {
                       throw new Error('Something went wrong!')
                   }
       
                   const loadedAcceptedAppointments = [];
                   for (const key in resData) {
                       loadedAcceptedAppointments.push(new AcceptedAppointmentClass(
                           key,
                           resData[key].acceptedOwnerId,
                           resData[key].docOwnerId,
                           resData[key].appointmentOwnerId,
                           resData[key].name,
                           resData[key].docTitle,
                           resData[key].appToken,
                           resData[key].time,
                           resData[key].date,
                       ))
                   }
                   
                  
                   dispatch({
                  type: SET_ACCEPTED_APPOINTMENT,
                  doctorAcceptedAppointments: loadedAcceptedAppointments.filter(patient => patient.docOwnerId === duserId),
                  patientAcceptedAppointments: loadedAcceptedAppointments.filter(patient => patient.appointmentOwnerId === userId)
                });
       
       
               } catch (err) {
                   //you  can also send to analytics server
                   throw new Error;
               }
       
       
           };
       };
       

export const acceptedAppointment = (docOwnerId, appointmentOwnerId, name, docTitle, appToken, time , date) => {
    return async (dispatch, getState) => {
      
      try{ //    token = getState().doctorAuth.token;
           userId = getState().doctorAuth.userId;
           //you can execute any async code here what you want
           const date = new Date();
           const response = await fetch('https://medicare-2b015-default-rtdb.firebaseio.com/AcceptedAppointments.json', {
                  method: 'POST',
                  headers: {
                         'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                         docOwnerId,
                         appointmentOwnerId,
                         name,
                         docTitle,
                         appToken,
                         time,
                         acceptedOwnerId:userId,
                         date: date.toISOString()
                  })
           });

           const resData = await response.json();

           dispatch(
                  {
                         type: ACCEPTED_APPOINTMENT,
                                Id: resData.name,
                                docOwnerId: docOwnerId,
                                appointmentOwnerId: appointmentOwnerId,
                                name: name,
                                docTitle: docTitle,
                                appToken: appToken,
                                time: time,
                                acceptedOwnerId:userId,
                                date: date
                         
                  }
           );
              } catch (err){
                     console.log(err);
              }
    }


};







// import AcceptedAppointmentClass from '../../models/AcceptedAppointments';
// export const ACCEPTED_APPOINTMENT = 'ACCEPTED_APPOINTMENT';
// export const SET_ACCEPTED_APPOINTMENT = 'SET_ACCEPTED_APPOINTMENT';

// export const fetchAcceptedAppointments = () => {
//     return async (dispatch, getState) => {
//         userId = getState().patientAuth.userId;
//         duserId = getState().doctorAuth.userId;
//         try {
//             //you can execute any async code here what you want
//             const response = await fetch('https://medicare-cc169-default-rtdb.firebaseio.com/Accepted.json')
//             const resData = await response.json();

//             if (!response.ok) {
//                 throw new Error('Something went wrong!')
//             }

//             const loadedAcceptedAppointments = [];
//             for (const key in resData) {
//                 loadedAcceptedAppointments.push(new AcceptedAppointmentClass(
//                     key,
//                     resData[key].ownerId,
//                     resData[key].docOwnerId,
//                     resData[key].appointmentOwnerId,
//                     resData[key].docTitle,
//                     resData[key].docCategory,
//                     resData[key].docImageUrl,
//                     resData[key].Token,
//                     resData[key].time,
//                 ))
//             }
//             console.log(resData)
            
//             dispatch({
//                 type: SET_ACCEPTED_APPOINTMENT,
//                 // patientAcceptedAppointments: loadedAcceptedAppointments.filter(doc => doc.ownerId === userId),
//                 doctorAcceptedAppointments: loadedAcceptedAppointments.filter(doc => doc.ownerId === userId)
//             });


//         } catch (err) {
//             //you  can also send to analytics server
//             throw new Error;
//         }


//     };
// };

// //Creating Accepted Appointment
// export const acceptedAppointment = (docOwnerId,appointmentOwnerId, docTitle, docCategory, docImageUrl, Token, time) => {
//     return async (dispatch, getState) => {
//         try {
//             // token = getState().doctorAuth.token;
//             userId = getState().doctorAuth.userId;
//             const date = new Date();
//             const response = await fetch('https://medicare-cc169-default-rtdb.firebaseio.com/Accepted.json',
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({
//                         docOwnerId,
//                         appointmentOwnerId,
//                         docTitle,
//                         docCategory,
//                         docImageUrl,
//                         Token,
//                         time,
//                         ownerId: userId,
//                         date: date.toISOString()
//                     })
//                 }
//             );

//             const resData = await response.json();
//                 // console.log(duserId)
               
                
//             dispatch({
//                 type: ACCEPTED_APPOINTMENT,
//                 Id: resData.name,
//                 docOwnerId,
//                 appointmentOwnerId,
//                 docTitle,
//                 docCategory,
//                 docImageUrl,
//                 Token,
//                 time,
//                 ownerId: userId,
//                 date: date
//             });

//         } catch (err) {
//             console.log(err)
//         }
//     };
// };