import AcceptedAppointmentClass from "../../models/AcceptedAppointments";
import {ACCEPTED_APPOINTMENT, SET_ACCEPTED_APPOINTMENT} from '../actions/AcceptedAppointmentsAction';

const initialState = {
    patientAcceptedAppointments: [],
    doctorAcceptedAppointments:[]
};

export default (state = initialState, action) => {
    switch(action.type){ 
           case SET_ACCEPTED_APPOINTMENT:
           return {
            patientAcceptedAppointments: action.patientAcceptedAppointments,
            doctorAcceptedAppointments: action.doctorAcceptedAppointments,
                  // availableDoctors: action.doctors,   
                  }
           case ACCEPTED_APPOINTMENT:
                  const newAcceptedAppointments = new AcceptedAppointmentClass(
                  action.Id,
                  action.acceptedOwnerId,
                  action.docOwnerId,
                  action.appointmentOwnerId,
                  action.name,
                  action.docTitle,
                  action.appToken,
                  action.time,
                  action.date
                  );
                   
                  return {
                  ...state,
                  patientAcceptedAppointments: state.patientAcceptedAppointments.concat(newAcceptedAppointments),
                  doctorAcceptedAppointments:state.doctorAcceptedAppointments.concat(newAcceptedAppointments )
                  };
                  }
                  return state;
           };








































// import AcceptedAppointmentClass from "../../models/AcceptedAppointments";
// import {ACCEPTED_APPOINTMENT,SET_ACCEPTED_APPOINTMENT} from '../actions/AcceptedAppointmentsAction';

// const initialState = {
//     patientAcceptedAppointments: [],
//     doctorAcceptedAppointments:[]
// };

// export default (state = initialState, action) => {
//     switch(action.type){ 
//            case SET_ACCEPTED_APPOINTMENT:
//            return {
//             patientAcceptedAppointments: action.patientAcceptedAppointments,
//             doctorAcceptedAppointments: action.doctorAcceptedAppointments,
//                   // availableDoctors: action.doctors,   
//                   }
//            case ACCEPTED_APPOINTMENT:
//                   const newAcceptedAppointments = new AcceptedAppointmentClass(
//                   action.Id,
//                   action.ownerId,
//                   action.id,
//                   action.appointmentOwnerId,
//                   action.docTitle,
//                   action.docCategory,
//                   action.docImageUrl,
//                   action.Token, 
//                   action.time, 
//                   action.date
//                   );
                   
//                   return {
//                   ...state,
//                   patientAcceptedAppointments: state.patientAcceptedAppointments.concat(newAcceptedAppointments),
//                   doctorAcceptedAppointments:state.doctorAcceptedAppointments.concat(newAcceptedAppointments )
//                   };
//                   }
//                   return state;
//            }
